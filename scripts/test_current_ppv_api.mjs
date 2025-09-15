#!/usr/bin/env node
/**
 * Test current PPV Flashback API response
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function getISOWeekNumber(date) {
  const target = new Date(date.getTime());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - target) / 604800000);
}

function getCurrentISOWeek() {
  return getISOWeekNumber(new Date());
}

function getISOWeekMatcher() {
  const currentWeek = getCurrentISOWeek();
  return (eventDate) => {
    return getISOWeekNumber(eventDate) === currentWeek;
  };
}

async function testCurrentAPI() {
  console.log('🔍 Testing current PPV Flashback API logic...\n');
  
  const currentISOWeek = getCurrentISOWeek();
  console.log(`Current ISO Week: ${currentISOWeek}`);
  
  // Get all PPV events (matching API logic)
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

  console.log(`Total PPV events: ${allPPVEvents.length}`);

  // Filter events to only those that happened in the same ISO week
  const isoWeekMatcher = getISOWeekMatcher();
  const weekMatchingEvents = allPPVEvents.filter(event => 
    isoWeekMatcher(new Date(event.date))
  );

  console.log(`Events matching current week (${currentISOWeek}): ${weekMatchingEvents.length}`);

  if (weekMatchingEvents.length === 0) {
    console.log('❌ No events found for current week');
    return;
  }

  // Sort by "biggest" criteria: attendance > buyrate > recency
  const sortedEvents = weekMatchingEvents.sort((a, b) => {
    const attendanceA = a.attendance || 0;
    const attendanceB = b.attendance || 0;
    if (attendanceA !== attendanceB) {
      return attendanceB - attendanceA;
    }

    const buyrateA = a.buyrate || 0;
    const buyrateB = b.buyrate || 0;
    if (buyrateA !== buyrateB) {
      return buyrateB - buyrateA;
    }

    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const selectedEvent = sortedEvents[0];
  console.log('\n📺 Selected Event:');
  console.log(`  Name: ${selectedEvent.name}`);
  console.log(`  Promotion: ${selectedEvent.promotion.name}`);
  console.log(`  Date: ${selectedEvent.date.toISOString().split('T')[0]}`);
  console.log(`  Venue: ${selectedEvent.venue || 'N/A'}`);
  console.log(`  Attendance: ${selectedEvent.attendance || 'N/A'}`);
  console.log(`  Buyrate: ${selectedEvent.buyrate || 'N/A'}`);
  console.log(`  Headliners: ${selectedEvent.headliners.length}`);
  console.log(`  Title Changes: ${selectedEvent.titleChanges.length}`);

  // Show the exact API response format
  const flashbackEvent = {
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
      .map(tc => `${tc.titleName}: ${tc.newChampion} defeats ${tc.oldChampion}`),
    score: 0 // This is the problematic field causing the "0"
  };

  console.log('\n📊 API Response:');
  console.log(JSON.stringify(flashbackEvent, null, 2));
}

testCurrentAPI().finally(() => prisma.$disconnect());