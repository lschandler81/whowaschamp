import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { PPVFlashbackEvent } from '@/lib/types/ppv';
import { getISOWeekNumber, getCurrentISOWeek, getISOWeekMatcher } from '@/lib/iso-week';

// Ensure this route runs on the Node.js runtime (Prisma is not supported on Edge)
export const runtime = 'nodejs';

type EventWithRelations = {
  id: string;
  name: string;
  date: Date;
  venue: string | null;
  city: string | null;
  country: string | null;
  buyrate: number | null;
  attendance: number | null;
  isPpv: boolean;
  promotion: { name: string };
  headliners: Array<{ name: string; side: string }>;
  titleChanges: Array<{
    titleName: string;
    newChampion: string | null;
    oldChampion: string | null;
    changedHands: boolean;
  }>;
};

type ScoredEvent = EventWithRelations & { score: number };

/**
 * GET /api/events/ppv-flashback
 * Returns the biggest PPV event that happened during the current ISO week in history
 * "Biggest" is determined by attendance > buyrate > recency as tiebreaker
 */
export async function GET(request: NextRequest) {
  try {
    console.log('PPV Flashback API: Starting request...');
    
    // Test database connection first
    try {
      await prisma.$connect();
      console.log('PPV Flashback API: Database connection successful');
    } catch (dbError) {
      console.error('PPV Flashback API: Database connection failed:', dbError);
      return NextResponse.json(
        { 
          error: 'Database connection failed',
          details: dbError instanceof Error ? dbError.message : 'Unknown database error'
        },
        { status: 500 }
      );
    }

    // Get the current ISO week number (1-53)
    const currentISOWeek = getCurrentISOWeek();
    console.log('PPV Flashback API: Current ISO week:', currentISOWeek);
    
    // Get all PPV events
    console.log('PPV Flashback API: Querying database...');
    const allPPVEvents = await prisma.event.findMany({
      where: {
        isPpv: true
      },
      include: {
        promotion: true,
        headliners: {
          orderBy: { side: 'asc' }
        },
        titleChanges: {
          where: { changedHands: true }
        }
      },
      orderBy: { date: 'desc' }
    });

    console.log('PPV Flashback API: Found', allPPVEvents.length, 'PPV events total');

    // Filter events to only those that happened in the same ISO week
    const isoWeekMatcher = getISOWeekMatcher();
    const weekMatchingEvents = allPPVEvents.filter(event => 
      isoWeekMatcher(new Date(event.date))
    );

    console.log('PPV Flashback API: Found', weekMatchingEvents.length, 'events matching current week');

    if (weekMatchingEvents.length === 0) {
      console.log('PPV Flashback API: No matching events, returning empty result');
      return NextResponse.json({
        event: null,
        message: `No major PPV events happened during this week in wrestling history`,
        currentWeek: currentISOWeek,
        totalPPVs: allPPVEvents.length,
        context: {
          yearsAgo: null,
          alternativeEvents: allPPVEvents.slice(0, 3).map(e => e.name)
        }
      });
    }

    // Sort by "biggest" criteria: attendance > buyrate > recency
    const sortedEvents = weekMatchingEvents.sort((a: EventWithRelations, b: EventWithRelations) => {
      // Primary: attendance (higher is better)
      const attendanceA = a.attendance || 0;
      const attendanceB = b.attendance || 0;
      if (attendanceA !== attendanceB) {
        return attendanceB - attendanceA;
      }

      // Secondary: buyrate (higher is better)
      const buyrateA = a.buyrate || 0;
      const buyrateB = b.buyrate || 0;
      if (buyrateA !== buyrateB) {
        return buyrateB - buyrateA;
      }

      // Tertiary: recency (more recent is better)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    const selectedEvent = sortedEvents[0];
    
    // Calculate years ago for context
    const eventDate = new Date(selectedEvent.date);
    const now = new Date();
    const yearsAgo = Math.floor((now.getTime() - eventDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

    // Format for API response
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
      headliners: selectedEvent.headliners.map((h: { name: string }) => h.name),
      titleChanges: selectedEvent.titleChanges
        .filter((tc: any) => tc.newChampion && tc.oldChampion)
        .map((tc: any) => 
          `${tc.titleName}: ${tc.newChampion} defeats ${tc.oldChampion}`
        )
    };

    return NextResponse.json({
      event: flashbackEvent,
      currentWeek: currentISOWeek,
      context: {
        yearsAgo,
        totalMatchingEvents: weekMatchingEvents.length,
        alternativeEvents: sortedEvents.slice(1, 4).map((e: EventWithRelations) => ({
          name: e.name,
          promotion: e.promotion.name,
          date: e.date.toISOString().split('T')[0],
          attendance: e.attendance,
          buyrate: e.buyrate
        }))
      },
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

  } catch (error) {
    console.error('PPV Flashback API: Caught error:', error);
    console.error('PPV Flashback API: Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch PPV flashback',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Enable ISR caching
export const revalidate = 60 * 60 * 12; // 12 hours
