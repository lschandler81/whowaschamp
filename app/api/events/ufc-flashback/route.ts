import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getISOWeek, getYear } from 'date-fns';

// Force dynamic rendering and set revalidation
export const dynamic = 'force-dynamic';
export const revalidate = 60 * 60 * 6; // 6 hours - updates multiple times per day

// Use explicit database path for Netlify functions
const databaseUrl = process.env.NETLIFY ? 'file:/opt/build/repo/dev.db' : process.env.DATABASE_URL || 'file:./dev.db';
const prisma = new PrismaClient({
  datasourceUrl: databaseUrl
});

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
    
    // Get current week - use consistent calculation
    const now = new Date();
    const currentWeek = getISOWeek(now);
    const currentYear = getYear(now);
    console.log(`[UFC Flashback API] Current week: ${currentWeek} of ${currentYear}`);
    console.log(`[UFC Flashback API] Today: ${now.toLocaleDateString()}`);

    let selectedEvent: any = null;
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
        const allEvents = events.map(e => ({ ...e }));
        
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
        // Find the closest week list for potential fallbacks
        const availableWeeks = Object.keys(eventsByWeek).map(Number).sort((a, b) => {
          const diffA = Math.abs(a - currentWeek);
          const diffB = Math.abs(b - currentWeek);
          return diffA - diffB;
        });
        if (!weekEvents || weekEvents.length === 0) {
          if (availableWeeks.length > 0) {
            weekEvents = eventsByWeek[availableWeeks[0]];
          }
        }

        if (weekEvents && weekEvents.length > 0) {
          // Sort by score and pick the best event
          weekEvents.sort((a, b) => b.score - a.score);
          selectedEvent = weekEvents[0];
          
          // Get alternative events from the same week (excluding the selected one)
          let alternativeEvents = weekEvents
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

          // If no alternative events in this week, pull from nearest weeks to ensure UI richness
          if (!alternativeEvents || alternativeEvents.length === 0) {
            for (const wk of availableWeeks) {
              const candidates = (eventsByWeek[wk] || [])
                .filter(ev => ev.id !== selectedEvent.id)
                .slice(0, 3 - alternativeEvents.length)
                .map(ev => ({
                  id: ev.id,
                  name: ev.name,
                  date: ev.date,
                  venue: ev.venue,
                  city: ev.city,
                  country: ev.country,
                  promotion: ev.promotion
                }));
              alternativeEvents = [...alternativeEvents, ...candidates];
              if (alternativeEvents.length >= 3) break;
            }
          }

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
          
          console.log('[UFC Flashback API] Selected event:', selectedEvent.name);
          console.log('[UFC Flashback API] Years ago calculated:', yearsAgo);
          console.log('[UFC Flashback API] Alternative events count:', alternativeEvents.length);
        }
      }

    } catch (dbError) {
      console.log('[UFC Flashback API] Database failed, trying static fallback...', dbError);
      
      // Fallback to static data
      try {
        const path = require('path');
        const fs = require('fs');
        const staticFilePath = path.join(process.cwd(), 'public', 'data', 'ufc-flashback.json');
        const staticData = JSON.parse(fs.readFileSync(staticFilePath, 'utf8'));
        const weekData = staticData[currentWeek.toString()];

        if (weekData && weekData.event) {
          const alternatives = weekData.alternatives || weekData.alternativeEvents || [];

          selectedEvent = {
            ...weekData.event,
            alternativeEvents: alternatives,
            totalMatchingEvents:
              weekData.totalEvents ?? (Array.isArray(alternatives) ? alternatives.length + 1 : 1),
          };
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
