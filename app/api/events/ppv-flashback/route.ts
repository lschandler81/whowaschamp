import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PPVFlashbackEvent } from '@/lib/types/ppv';

const prisma = new PrismaClient();

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
 * GET /api/events/ppv-flashback?weekOf=YYYY-MM-DD
 * Returns a high-scoring PPV event from the past for the "PPV Flashback" widget
 * Optional weekOf parameter to find events from a specific week
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const weekOfParam = searchParams.get('weekOf');
    
    // Parse weekOf parameter if provided
    let weekOfDate: Date | undefined;
    if (weekOfParam) {
      weekOfDate = new Date(weekOfParam);
      if (isNaN(weekOfDate.getTime())) {
        return NextResponse.json({
          error: 'Invalid weekOf parameter. Use YYYY-MM-DD format.'
        }, { status: 400 });
      }
    }

    // Get all PPV events with scoring data
    const ppvEvents = await prisma.event.findMany({
      where: {
        isPpv: true,
        // If weekOf is specified, filter to events within that week
        ...(weekOfDate && {
          date: {
            gte: getWeekStart(weekOfDate),
            lte: getWeekEnd(weekOfDate)
          }
        })
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

    if (ppvEvents.length === 0) {
      const message = weekOfParam 
        ? `No PPV events found for week of ${weekOfParam}`
        : 'No PPV events found';
        
      return NextResponse.json({
        event: null,
        message,
        weekOf: weekOfParam || undefined
      });
    }

    // Score events based on multiple factors
    const scoredEvents = ppvEvents.map((event: EventWithRelations): ScoredEvent => {
      let score = 0;
      
      // Buyrate score (scale: 1-10, max at 1.5M buys)
      if (event.buyrate) {
        score += Math.min(10, (event.buyrate / 150));
      }
      
      // Attendance score (scale: 1-10, max at 100k attendance)
      if (event.attendance) {
        score += Math.min(10, (event.attendance / 10000));
      }
      
      // Title changes bonus (2 points per title change)
      score += event.titleChanges.length * 2;
      
      // Main event bonus (1 point if has main event)
      if (event.headliners.some(h => h.side === 'main')) {
        score += 1;
      }
      
      // Historical significance (older events get slight bonus)
      const yearsDiff = new Date().getFullYear() - event.date.getFullYear();
      if (yearsDiff >= 10) score += 2;
      if (yearsDiff >= 20) score += 1;
      
      // Special event bonus for landmark shows
      if (isLandmarkEvent(event.name)) {
        score += 3;
      }
      
      return { ...event, score };
    });

    // Sort by score and pick top event
    const topEvent = scoredEvents.sort((a: ScoredEvent, b: ScoredEvent) => b.score - a.score)[0];

    // Format for API response
    const flashbackEvent: PPVFlashbackEvent = {
      id: topEvent.id,
      promotion: topEvent.promotion.name,
      name: topEvent.name,
      date: topEvent.date,
      venue: topEvent.venue || undefined,
      city: topEvent.city || undefined,
      country: topEvent.country || undefined,
      buyrate: topEvent.buyrate || undefined,
      attendance: topEvent.attendance || undefined,
      headliners: topEvent.headliners.map((h: { name: string }) => h.name),
      titleChanges: topEvent.titleChanges
        .filter((tc: any) => tc.newChampion && tc.oldChampion)
        .map((tc: any) => 
          `${tc.titleName}: ${tc.newChampion} defeats ${tc.oldChampion}`
        ),
      score: topEvent.score
    };

    return NextResponse.json({
      event: flashbackEvent,
      weekOf: weekOfParam || undefined,
      debugInfo: {
        totalPPVs: ppvEvents.length,
        queryDate: weekOfDate?.toISOString(),
        topScores: scoredEvents
          .sort((a: ScoredEvent, b: ScoredEvent) => b.score - a.score)
          .slice(0, 3)
          .map((e: ScoredEvent) => ({
            name: e.name,
            date: e.date.toISOString().split('T')[0],
            score: e.score,
            buyrate: e.buyrate,
            attendance: e.attendance
          }))
      }
    });

  } catch (error) {
    console.error('Error in ppv-flashback API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch PPV flashback',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Get the start of the week (Sunday) for a given date
 */
function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
}

/**
 * Get the end of the week (Saturday) for a given date
 */
function getWeekEnd(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + 6;
  return new Date(d.setDate(diff));
}

/**
 * Check if an event is a landmark show that deserves bonus points
 */
function isLandmarkEvent(eventName: string): boolean {
  const landmarkPatterns = [
    /wrestlemania/i,
    /ufc\s+(100|200|300)/i,
    /royal rumble/i,
    /summerslam/i,
    /survivor series/i
  ];
  
  return landmarkPatterns.some(pattern => pattern.test(eventName));
}

// Enable ISR caching
export const revalidate = 60 * 60 * 12; // 12 hours
