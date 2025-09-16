import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getISOWeek } from 'date-fns';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

function calculateEventScore(event: any): number {
  let score = 0;
  
  // Base score for WWE events
  if (event.promotion.name === 'World Wrestling Entertainment') {
    score += 2000; // Higher base score for WWE
  } else {
    return 0; // Only WWE events for this endpoint
  }

  // Major WWE event bonuses
  const eventName = event.name.toLowerCase();
  if (eventName.includes('wrestlemania')) score += 500;
  else if (eventName.includes('summerslam')) score += 300;
  else if (eventName.includes('royal rumble')) score += 200;
  else if (eventName.includes('survivor series')) score += 150;
  else if (eventName.includes('money in the bank')) score += 100;
  else if (eventName.includes('hell in a cell')) score += 100;
  else if (eventName.includes('elimination chamber')) score += 100;
  else if (eventName.includes('tlc')) score += 100;
  else if (eventName.includes('king of the ring')) score += 100;
  
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
    console.log('[WWE Flashback API] Starting request...');
    
    // Get current week
    const now = new Date();
    const currentWeek = getISOWeek(now);
    console.log(`[WWE Flashback API] Current week: ${currentWeek}`);

    let selectedEvent: any = null;
    let fallbackUsed = false;

    try {
      // Try database first
      console.log('[WWE Flashback API] Querying database...');
      
      const events = await prisma.event.findMany({
        where: {
          isPpv: true,
          promotion: {
            name: 'World Wrestling Entertainment'
          }
        },
        include: {
          promotion: true
        },
        orderBy: {
          date: 'desc'
        }
      });

      console.log(`[WWE Flashback API] Found ${events.length} WWE PPV events`);

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
          
          // Get alternative events from the same week (excluding the selected one)
          const alternativeEvents = weekEvents
            .filter(event => event.id !== selectedEvent.id)
            .slice(0, 3) // Limit to 3 alternative events
            .map(event => ({
              id: event.id,
              name: event.name,
              date: event.date,
              venue: event.venue,
              city: event.city,
              country: event.country,
              promotion: event.promotion
            }));

          // Calculate years ago more robustly
          const eventDate = new Date(selectedEvent.date);
          const currentDate = new Date();
          let yearsAgo = currentDate.getFullYear() - eventDate.getFullYear();
          
          // Adjust if the event hasn't occurred this year yet
          const monthDiff = currentDate.getMonth() - eventDate.getMonth();
          if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < eventDate.getDate())) {
            yearsAgo--;
          }

          // Add additional context to the selected event
          selectedEvent.alternativeEvents = alternativeEvents;
          selectedEvent.yearsAgo = yearsAgo;
          selectedEvent.totalMatchingEvents = weekEvents.length;
          
          console.log('[WWE Flashback API] Selected event:', selectedEvent.name);
          console.log('[WWE Flashback API] Years ago calculated:', yearsAgo);
          console.log('[WWE Flashback API] Alternative events count:', alternativeEvents.length);
        }
      }

    } catch (dbError) {
      console.log('[WWE Flashback API] Database failed, trying static fallback...', dbError);
      
      // Fallback to static data
      try {
        const path = require('path');
        const fs = require('fs');
        const staticFilePath = path.join(process.cwd(), 'public', 'data', 'wwe-flashback.json');
        const staticData = JSON.parse(fs.readFileSync(staticFilePath, 'utf8'));
        const weekData = staticData[currentWeek.toString()];
        
        if (weekData && weekData.event) {
          selectedEvent = weekData.event;
          fallbackUsed = true;
        }
      } catch (staticError) {
        console.log('[WWE Flashback API] Static fallback failed:', staticError);
      }
    }

    // Final fallback - return a default event
    if (!selectedEvent) {
      selectedEvent = {
        name: 'WrestleMania I',
        date: '1985-03-31',
        venue: 'Madison Square Garden',
        city: 'New York',
        country: 'USA',
        attendance: 19121,
        buyrate: 400,
        promotion: {
          name: 'World Wrestling Entertainment'
        }
      };
      fallbackUsed = true;
    }

    // Final response preparation
    let yearsAgo = 0;
    let alternativeEvents: any[] = [];
    let totalMatchingEvents = 1;

    if (selectedEvent) {
      // Calculate years ago consistently
      const eventDate = new Date(selectedEvent.date);
      const currentDate = new Date();
      yearsAgo = currentDate.getFullYear() - eventDate.getFullYear();
      
      // Adjust if the event hasn't occurred this year yet
      const monthDiff = currentDate.getMonth() - eventDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < eventDate.getDate())) {
        yearsAgo--;
      }

      // Get alternative events and total count
      alternativeEvents = selectedEvent.alternativeEvents || [];
      totalMatchingEvents = selectedEvent.totalMatchingEvents || 1;
    }

    const response = {
      event: selectedEvent,
      currentWeek,
      fallbackUsed,
      context: {
        source: fallbackUsed ? 'static' : 'database',
        timestamp: new Date().toISOString(),
        alternativeEvents,
        yearsAgo,
        totalMatchingEvents
      }
    };

    console.log('[WWE Flashback API] Returning response:', response);
    
    return NextResponse.json(response);

  } catch (error) {
    console.error('[WWE Flashback API] Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch WWE event',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}