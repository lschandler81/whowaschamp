import { PrismaClient } from '@prisma/client';
import { writeFile } from 'fs/promises';
import path from 'path';
import { getISOWeek } from 'date-fns';

const prisma = new PrismaClient();

function calculateEventScore(event: any): number {
  let score = 0;
  
  // Base score for WWE events
  if (event.promotion.name === 'World Wrestling Entertainment') {
    score += 2000; // Higher base score for WWE
  } else {
    return 0; // Only WWE events
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

async function generateWWEData() {
  console.log('🚀 Generating WWE static data...');
  
  try {
    console.log('✅ Database connected successfully');
    
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
        date: 'asc'
      }
    });

    console.log(`📊 Found ${events.length} WWE PPV events in database`);

    // Add scores to events
    const scoredEvents = events.map(event => ({
      ...event,
      score: calculateEventScore(event)
    }));

    // Group events by ISO week
    const eventsByWeek: { [key: number]: any[] } = {};
    
    scoredEvents.forEach(event => {
      const weekNumber = getISOWeek(new Date(event.date));
      if (!eventsByWeek[weekNumber]) {
        eventsByWeek[weekNumber] = [];
      }
      eventsByWeek[weekNumber].push(event);
    });

    // Generate data for all 53 weeks
    const weeklyData: any = {};
    
    for (let week = 1; week <= 53; week++) {
      let weekEvents = eventsByWeek[week] || [];
      
      // If no events for this week, find events from nearby weeks
      if (weekEvents.length === 0) {
        const nearbyWeeks = Object.keys(eventsByWeek)
          .map(Number)
          .sort((a, b) => Math.abs(a - week) - Math.abs(b - week))
          .slice(0, 3);
        
        for (const nearbyWeek of nearbyWeeks) {
          if (eventsByWeek[nearbyWeek] && eventsByWeek[nearbyWeek].length > 0) {
            weekEvents = [...eventsByWeek[nearbyWeek]];
            break;
          }
        }
      }

      if (weekEvents.length > 0) {
        // Sort by score descending
        weekEvents.sort((a, b) => b.score - a.score);
        
        const bestEvent = weekEvents[0];
        const alternatives = weekEvents.slice(1, 3); // Up to 2 alternatives

        weeklyData[week] = {
          event: {
            id: bestEvent.id,
            name: bestEvent.name,
            date: bestEvent.date,
            venue: bestEvent.venue,
            city: bestEvent.city,
            country: bestEvent.country,
            attendance: bestEvent.attendance,
            buyrate: bestEvent.buyrate,
            promotion: bestEvent.promotion.name,
            posterUrl: bestEvent.posterUrl,
            sourceUrl: bestEvent.sourceUrl
          },
          alternatives: alternatives.map(alt => ({
            id: alt.id,
            name: alt.name,
            date: alt.date,
            venue: alt.venue,
            city: alt.city,
            country: alt.country,
            attendance: alt.attendance,
            buyrate: alt.buyrate,
            promotion: alt.promotion.name,
            posterUrl: alt.posterUrl,
            sourceUrl: alt.sourceUrl
          }))
        };

        console.log(`✅ Week ${week}: ${bestEvent.name} (${bestEvent.promotion.name})`);
      }
    }

    // Write the static data file
    const outputPath = path.join(process.cwd(), 'public', 'data', 'wwe-flashback.json');
    await writeFile(outputPath, JSON.stringify(weeklyData, null, 2));
    
    console.log('🎉 WWE static data generated successfully!');
    console.log(`📁 Output: ${outputPath}`);
    console.log(`📊 Summary: ${Object.keys(weeklyData).length}/53 weeks have WWE events`);

    // Generate summary file
    const summary = {
      generatedAt: new Date().toISOString(),
      totalWeeks: 53,
      weeksWithEvents: Object.keys(weeklyData).length,
      totalWWEEvents: events.length,
      sampleEvents: Object.keys(weeklyData).slice(0, 5).map(week => ({
        week: parseInt(week),
        name: weeklyData[week].event.name,
        promotion: weeklyData[week].event.promotion,
        date: weeklyData[week].event.date
      }))
    };

    const summaryPath = path.join(process.cwd(), 'public', 'data', 'wwe-flashback-summary.json');
    await writeFile(summaryPath, JSON.stringify(summary, null, 2));
    console.log(`📋 Summary file: ${summaryPath}`);

  } catch (error) {
    console.error('❌ Error generating WWE data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

generateWWEData();