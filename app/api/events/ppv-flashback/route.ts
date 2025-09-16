import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { PPVFlashbackEvent } from '@/lib/types/ppv';
import { getISOWeekNumber, getCurrentISOWeek, getISOWeekMatcher } from '@/lib/iso-week';
import fs from 'fs';
import path from 'path';

// Ensure this route runs on the Node.js runtime (Prisma is not supported on Edge)
export const runtime = 'nodejs';

/**
 * Try to load static PPV data as fallback when database is unavailable
 */
async function getStaticPPVData(isoWeek: number) {
  try {
    const staticDataPath = path.join(process.cwd(), 'public', 'data', 'ppv-flashback.json');
    
    if (!fs.existsSync(staticDataPath)) {
      console.log('PPV Flashback API: No static data file found');
      return null;
    }

    const staticData = JSON.parse(fs.readFileSync(staticDataPath, 'utf8'));
    const weekData = staticData[isoWeek.toString()];
    
    if (!weekData || !weekData.event) {
      console.log('PPV Flashback API: No static data for ISO week', isoWeek);
      return null;
    }

    return {
      event: weekData.event,
      currentWeek: isoWeek,
      context: {
        yearsAgo: weekData.event.yearsAgo,
        totalMatchingEvents: weekData.totalEvents,
        alternativeEvents: weekData.alternativeEvents
      },
      source: 'static',
      debugInfo: {
        totalPPVs: Object.values(staticData).reduce((sum: number, week: any) => 
          sum + (week.event ? 1 : 0), 0),
        weekMatchingPPVs: weekData.totalEvents
      }
    };
  } catch (error) {
    console.error('PPV Flashback API: Error loading static data:', error);
    return null;
  }
}

/**
 * Returns the biggest PPV event that happened during the current ISO week in wrestling history.
 * Uses hybrid approach: tries database first, falls back to static data if database fails.
 */
export async function GET(request: NextRequest) {
  const currentISOWeek = getCurrentISOWeek();
  
  try {
    console.log('PPV Flashback API: Starting request (hybrid mode)...');
    
    // Try database first
    try {
      await prisma.$connect();
      console.log('PPV Flashback API: Database connection successful, using live data');
      
      const allPPVEvents = await prisma.event.findMany({
        where: { isPpv: true },
        include: {
          promotion: true,
          headliners: { orderBy: { side: 'asc' } },
          titleChanges: { where: { changedHands: true } }
        },
        orderBy: { date: 'desc' }
      });

      console.log(`PPV Flashback API: Found ${allPPVEvents.length} PPV events total`);
      console.log(`PPV Flashback API: Current ISO week: ${currentISOWeek}`);

      const isoWeekMatcher = getISOWeekMatcher();
      const weekMatchingEvents = allPPVEvents.filter(event => 
        isoWeekMatcher(new Date(event.date))
      );

      console.log(`PPV Flashback API: Found ${weekMatchingEvents.length} events matching current week`);

      if (weekMatchingEvents.length === 0) {
        // Try static fallback
        const staticResult = await getStaticPPVData(currentISOWeek);
        if (staticResult) {
          return NextResponse.json({
            ...staticResult,
            message: 'Using static data fallback - no live events for this week',
            source: 'static-fallback'
          });
        }

        // Ultimate fallback: recent events
        const fallbackEvents = allPPVEvents.slice(0, 3);
        return NextResponse.json({
          event: null,
          message: `No major PPV events happened during this week in wrestling history`,
          currentWeek: currentISOWeek,
          totalPPVs: allPPVEvents.length,
          fallbackEvents: fallbackEvents.map(e => ({
            id: e.id,
            name: e.name,
            date: e.date,
            promotion: e.promotion.name,
            attendance: e.attendance,
            buyrate: e.buyrate
          })),
          source: 'database-fallback'
        });
      }

      // Sort by biggest: attendance > buyrate > recency
      const sortedEvents = weekMatchingEvents.sort((a, b) => {
        const attendanceA = a.attendance || 0;
        const attendanceB = b.attendance || 0;
        if (attendanceA !== attendanceB) return attendanceB - attendanceA;

        const buyrateA = a.buyrate || 0;
        const buyrateB = b.buyrate || 0;
        if (buyrateA !== buyrateB) return buyrateB - buyrateA;

        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      const selectedEvent = sortedEvents[0];
      const eventDate = new Date(selectedEvent.date);
      const now = new Date();
      const yearsAgo = Math.floor((now.getTime() - eventDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

      const flashbackEvent: PPVFlashbackEvent = {
        id: selectedEvent.id,
        promotion: selectedEvent.promotion.name,
        name: selectedEvent.name,
        date: selectedEvent.date,
        venue: selectedEvent.venue || undefined,
        city: selectedEvent.city || undefined,
        country: selectedEvent.country || undefined,
        buyrate: selectedEvent.buyrate || undefined,
        attendance: selectedEvent.attendance || undefined,
        headliners: selectedEvent.headliners.map(h => h.name),
        titleChanges: selectedEvent.titleChanges
          .filter(tc => tc.newChampion && tc.oldChampion)
          .map(tc => `${tc.titleName}: ${tc.newChampion} defeats ${tc.oldChampion}`)
      };

      return NextResponse.json({
        event: flashbackEvent,
        currentWeek: currentISOWeek,
        context: {
          yearsAgo,
          totalMatchingEvents: weekMatchingEvents.length,
          alternativeEvents: sortedEvents.slice(1, 4).map(e => ({
            name: e.name,
            promotion: e.promotion.name,
            date: e.date.toISOString().split('T')[0],
            attendance: e.attendance,
            buyrate: e.buyrate
          }))
        },
        source: 'database',
        debugInfo: {
          totalPPVs: allPPVEvents.length,
          weekMatchingPPVs: weekMatchingEvents.length,
          selectedReason: {
            attendance: selectedEvent.attendance,
            buyrate: selectedEvent.buyrate,
            date: selectedEvent.date.toISOString().split('T')[0]
          }
        }
      });

    } catch (dbError) {
      console.log('PPV Flashback API: Database failed, trying static fallback...');
      console.error('PPV Flashback API: Database error:', dbError);
      
      // Try static data fallback
      const staticResult = await getStaticPPVData(currentISOWeek);
      if (staticResult) {
        return NextResponse.json({
          ...staticResult,
          message: 'Database unavailable, using static data',
          source: 'static-fallback'
        });
      }

      throw dbError; // If static also fails, throw original error
    }

  } catch (error) {
    console.error('PPV Flashback API: All methods failed:', error);
    return NextResponse.json(
      {
        error: 'PPV Flashback service temporarily unavailable',
        details: error instanceof Error ? error.message : 'Unknown error',
        currentWeek: currentISOWeek,
        source: 'error'
      },
      { status: 500 }
    );
  }
}

// Enable ISR caching
export const revalidate = 60 * 60 * 12; // 12 hours