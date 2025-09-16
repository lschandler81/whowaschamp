import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getISOWeek } from 'date-fns';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

function calculateEventScore(event: any): number {
  let score = 0;
  
  // Base score for UFC events
  if (event.promotion.name === 'Ultimate Fighting Championship') {
    score += 1000;
  } else {
    return 0; // Only UFC events for this endpoint
  }

  // Major UFC event bonuses
  const eventName = event.name.toLowerCase();
  if (eventName.includes('ufc 100')) score += 500;
  else if (eventName.includes('ufc 200')) score += 400;
  else if (eventName.includes('ufc 300')) score += 400;
  else if (eventName.includes('ufc 1 ')) score += 300;
  else if (eventName.includes('ufc 50')) score += 200;
  else if (eventName.includes('ufc 150')) score += 200;
  else if (eventName.includes('ufc 250')) score += 200;
  
  // Attendance bonus
  if (event.attendance) {
    score += Math.floor(event.attendance / 1000) * 10;
  }
  
  // Buyrate bonus
  if (event.buyrate) {
    score += Math.floor(event.buyrate / 100) * 20;
  }

  return score;
}

export async function GET(request: NextRequest) {
  try {
    console.log('[UFC Flashback API] Starting request...');
    
    // Get current week
    const now = new Date();
    const currentWeek = getISOWeek(now);
    console.log(`[UFC Flashback API] Current week: ${currentWeek}`);

    let selectedEvent = null;
    let fallbackUsed = false;

    try {
      // Try database first
      console.log('[UFC Flashback API] Querying database...');
      
      const events = await prisma.event.findMany({
        where: {
          isPpv: true,
          promotion: {
            name: 'Ultimate Fighting Championship'
          }
        },
        include: {
          promotion: true
        },
        orderBy: {
          date: 'desc'
        }
      });

      console.log(`[UFC Flashback API] Found ${events.length} UFC PPV events`);

      if (events.length > 0) {
        // Group events by week and score them
        const eventsByWeek: { [key: number]: any[] } = {};
        
        events.forEach(event => {
          const eventWeek = getISOWeek(new Date(event.date));
          if (!eventsByWeek[eventWeek]) {
            eventsByWeek[eventWeek] = [];
          }
          eventsByWeek[eventWeek].push({
            ...event,
            score: calculateEventScore(event)
          });
        });

        // Get events for current week, or fallback to another week
        let weekEvents = eventsByWeek[currentWeek];
        if (!weekEvents || weekEvents.length === 0) {
          // Find the closest week with events
          const availableWeeks = Object.keys(eventsByWeek).map(Number).sort((a, b) => {
            const diffA = Math.abs(a - currentWeek);
            const diffB = Math.abs(b - currentWeek);
            return diffA - diffB;
          });
          
          if (availableWeeks.length > 0) {
            weekEvents = eventsByWeek[availableWeeks[0]];
          }
        }

        if (weekEvents && weekEvents.length > 0) {
          // Sort by score and pick the best event
          weekEvents.sort((a, b) => b.score - a.score);
          selectedEvent = weekEvents[0];
        }
      }

    } catch (dbError) {
      console.log('[UFC Flashback API] Database failed, trying static fallback...', dbError);
      
      // Fallback to static data
      try {
        const staticData = require('@/public/data/ufc-flashback.json');
        const weekData = staticData[currentWeek.toString()];
        
        if (weekData && weekData.event) {
          selectedEvent = weekData.event;
          fallbackUsed = true;
        }
      } catch (staticError) {
        console.log('[UFC Flashback API] Static fallback failed:', staticError);
      }
    }

    // Final fallback - return a default event
    if (!selectedEvent) {
      selectedEvent = {
        name: 'UFC 1: The Beginning',
        date: '1993-11-12',
        venue: 'McNichols Sports Arena',
        city: 'Denver',
        country: 'USA',
        attendance: 7800,
        buyrate: null,
        promotion: {
          name: 'Ultimate Fighting Championship'
        }
      };
      fallbackUsed = true;
    }

    const response = {
      event: selectedEvent,
      currentWeek,
      fallbackUsed,
      context: {
        source: fallbackUsed ? 'static' : 'database',
        timestamp: new Date().toISOString()
      }
    };

    console.log('[UFC Flashback API] Returning response:', response);
    
    return NextResponse.json(response);

  } catch (error) {
    console.error('[UFC Flashback API] Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch UFC event',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}