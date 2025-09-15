import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { OnThisDayEvent } from '@/lib/types/ppv';

/**
 * GET /api/events/on-this-day?month=4&day=6
 * Returns historical wrestling/MMA events that happened on this date
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const monthParam = searchParams.get('month');
    const dayParam = searchParams.get('day');

    // Validate required parameters
    if (!monthParam || !dayParam) {
      return NextResponse.json({
        error: 'Missing required parameters. Please provide both month and day.',
        example: '/api/events/on-this-day?month=4&day=6'
      }, { status: 400 });
    }

    const month = parseInt(monthParam);
    const day = parseInt(dayParam);

    // Validate month and day ranges
    if (isNaN(month) || month < 1 || month > 12) {
      return NextResponse.json({
        error: 'Invalid month parameter. Must be a number between 1 and 12.'
      }, { status: 400 });
    }

    if (isNaN(day) || day < 1 || day > 31) {
      return NextResponse.json({
        error: 'Invalid day parameter. Must be a number between 1 and 31.'
      }, { status: 400 });
    }

    // Validate day for specific month
    const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (day > daysInMonth[month - 1]) {
      return NextResponse.json({
        error: `Invalid day ${day} for month ${month}. Month ${month} has at most ${daysInMonth[month - 1]} days.`
      }, { status: 400 });
    }

    // Get events for this date
    const events = await getEventsForDate(month, day);

    if (events.length === 0) {
      return NextResponse.json({
        events: [],
        date: { month, day, monthName: getMonthName(month) },
        message: `No events found for ${getMonthName(month)} ${day}`,
        total: 0
      });
    }

    return NextResponse.json({
      events,
      date: { month, day, monthName: getMonthName(month) },
      summary: {
        total: events.length,
        ppvCount: events.filter(e => e.isPpv).length,
        yearRange: events.length > 0 
          ? `${Math.min(...events.map(e => e.date.getFullYear()))}-${Math.max(...events.map(e => e.date.getFullYear()))}`
          : null,
        promotions: Array.from(new Set(events.map(e => e.promotion))).sort()
      }
    });

  } catch (error) {
    console.error('Error in on-this-day API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch events for this date',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

async function getEventsForDate(month: number, day: number): Promise<OnThisDayEvent[]> {
  try {
    // Get all events and filter by month/day in JavaScript since raw SQL has issues
    const allEvents = await prisma.event.findMany({
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

    // Filter events for the specific month/day across all years
    const matchingEvents = allEvents.filter((event: any) => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === (month - 1) && eventDate.getDate() === day; // getMonth() is 0-indexed
    });

    // Transform to API format
    const apiEvents: OnThisDayEvent[] = matchingEvents.map((event: any) => ({
      id: event.id,
      promotion: event.promotion.name,
      name: event.name,
      date: event.date,
      venue: event.venue || undefined,
      city: event.city || undefined,
      country: event.country || undefined,
      buyrate: event.buyrate || undefined,
      attendance: event.attendance || undefined,
      isPpv: event.isPpv,
      headliners: event.headliners.map((h: any) => h.name),
      titleChanges: event.titleChanges.map((tc: any) => 
        `${tc.titleName}: ${tc.newChampion} defeats ${tc.oldChampion}`
      )
    }));

    // Sort by year (most recent first)
    apiEvents.sort((a, b) => b.date.getFullYear() - a.date.getFullYear());

    return apiEvents;

  } catch (error) {
    console.error('Database error in getEventsForDate:', error);
    throw error;
  }
}

/**
 * Get month name from number
 */
function getMonthName(month: number): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month - 1] || 'Unknown';
}

// Enable ISR caching
export const revalidate = 60 * 60 * 12; // 12 hours
