#!/usr/bin/env node

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Test On This Day API logic
async function testOnThisDayAPI(month, day) {
  console.log(`\n🗓️  Testing On This Day API for ${month}/${day}:`);
  
  try {
    // Get all events and filter by month/day in JavaScript
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
    const matchingEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === (month - 1) && eventDate.getDate() === day; // getMonth() is 0-indexed
    });

    if (matchingEvents.length === 0) {
      console.log(`❌ No events found for ${month}/${day}`);
      return;
    }

    console.log(`✅ Found ${matchingEvents.length} events:`);
    matchingEvents.forEach(event => {
      console.log(`   - ${event.name} (${event.date.getFullYear()}) - ${event.promotion.name}`);
      console.log(`     PPV: ${event.isPpv ? 'Yes' : 'No'}`);
      if (event.headliners.length > 0) {
        console.log(`     Headliners: ${event.headliners.map(h => h.name).join(', ')}`);
      }
      if (event.titleChanges.length > 0) {
        console.log(`     Title Changes: ${event.titleChanges.length}`);
      }
    });

  } catch (error) {
    console.error('❌ Error in On This Day API test:', error.message);
  }
}

// Test PPV Flashback API logic  
async function testPPVFlashbackAPI(weekOf = null) {
  console.log(`\n🎬 Testing PPV Flashback API${weekOf ? ` for week of ${weekOf}` : ''}:`);
  
  try {
    let weekOfDate;
    if (weekOf) {
      weekOfDate = new Date(weekOf);
      if (isNaN(weekOfDate.getTime())) {
        console.log('❌ Invalid weekOf parameter');
        return;
      }
    }

    // Get PPV events with scoring data
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
      const message = weekOf 
        ? `No PPV events found for week of ${weekOf}`
        : 'No PPV events found';
      console.log(`❌ ${message}`);
      return;
    }

    // Score events based on multiple factors
    const scoredEvents = ppvEvents.map(event => {
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
    const topEvent = scoredEvents.sort((a, b) => b.score - a.score)[0];
    
    console.log(`✅ Found ${ppvEvents.length} PPV events, top scorer:`);
    console.log(`   🏆 ${topEvent.name} (${topEvent.date.getFullYear()}) - ${topEvent.promotion.name}`);
    console.log(`   📊 Score: ${topEvent.score.toFixed(2)}`);
    if (topEvent.buyrate) console.log(`   💰 Buyrate: ${topEvent.buyrate}K`);
    if (topEvent.attendance) console.log(`   👥 Attendance: ${topEvent.attendance.toLocaleString()}`);
    console.log(`   🎯 Title Changes: ${topEvent.titleChanges.length}`);
    console.log(`   🥊 Headliners: ${topEvent.headliners.map(h => h.name).join(', ')}`);

    // Show top 3 scores for comparison
    console.log('\n   🏅 Top 3 Scoring Events:');
    scoredEvents.sort((a, b) => b.score - a.score).slice(0, 3).forEach((event, index) => {
      console.log(`   ${index + 1}. ${event.name} (${event.date.getFullYear()}) - Score: ${event.score.toFixed(2)}`);
    });

  } catch (error) {
    console.error('❌ Error in PPV Flashback API test:', error.message);
  }
}

function getWeekStart(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
}

function getWeekEnd(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + 6;
  return new Date(d.setDate(diff));
}

function isLandmarkEvent(eventName) {
  const landmarkPatterns = [
    /wrestlemania/i,
    /ufc\s+(100|200|300)/i,
    /royal rumble/i,
    /summerslam/i,
    /survivor series/i
  ];
  
  return landmarkPatterns.some(pattern => pattern.test(eventName));
}

// Run tests
async function runValidation() {
  console.log('🔍 API Validation Tests');
  console.log('========================');
  
  // Test known dates from our sample data
  await testOnThisDayAPI(4, 6);  // WrestleMania 40
  await testOnThisDayAPI(7, 9);  // UFC 200
  await testOnThisDayAPI(1, 1);  // New Year's Day (should be empty)
  
  await testPPVFlashbackAPI();      // General PPV flashback
  await testPPVFlashbackAPI('2016-07-09'); // Specific week with UFC 200
  await testPPVFlashbackAPI('2024-04-06'); // Specific week with WrestleMania 40
  
  console.log('\n✅ Validation complete!');
}

runValidation()
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
