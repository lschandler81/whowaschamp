#!/usr/bin/env node
/**
 * Test fixed PPV Flashback query
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function getISOWeek(date) {
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

async function testFixedPPVFlashback(inputDate) {
  console.log(`\n🔍 Testing PPV Flashback for date: ${inputDate}`);
  
  const testDate = new Date(inputDate);
  const currentYear = testDate.getFullYear();
  const isoWeek = getISOWeek(testDate);
  
  console.log(`📅 Year: ${currentYear}, ISO Week: ${isoWeek}`);
  
  // Fixed query - exclude current year differently
  const events = await prisma.event.findMany({
    where: {
      isPpv: true,
      date: {
        lt: new Date(`${currentYear}-01-01`)  // Only events before current year
      }
    },
    include: {
      promotion: true,
      headliners: true,
      titleChanges: true,
    },
    orderBy: {
      date: 'desc'
    }
  });

  // Filter events that fall in the same ISO week
  const matchingEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const eventIsoWeek = getISOWeek(eventDate);
    return eventIsoWeek === isoWeek;
  });

  console.log(`📊 Total PPV events before ${currentYear}: ${events.length}`);
  console.log(`🎯 Events matching ISO week ${isoWeek}: ${matchingEvents.length}`);

  if (matchingEvents.length > 0) {
    console.log('\n🎪 Matching events:');
    matchingEvents.slice(0, 5).forEach(event => { // Show up to 5 events
      const eventDate = new Date(event.date);
      console.log(`  • ${event.promotion.name}: ${event.name} (${eventDate.getFullYear()})`);
    });
    if (matchingEvents.length > 5) {
      console.log(`    ... and ${matchingEvents.length - 5} more events`);
    }
  } else {
    console.log('\n📭 No major PPV events happened during this week in wrestling history');
  }

  return matchingEvents;
}

async function main() {
  console.log('🎯 Fixed PPV Flashback Comprehensive Data Test');
  
  // Test with several dates
  await testFixedPPVFlashback('2024-08-03'); // SummerSlam week (week 31)
  await testFixedPPVFlashback('2024-04-06'); // WrestleMania week (week 14)
  await testFixedPPVFlashback('2024-01-27'); // Royal Rumble week (week 4)
  await testFixedPPVFlashback('2024-03-29'); // Classic WrestleMania week
  
  console.log('\n🎉 Fixed query test completed!');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().finally(() => prisma.$disconnect());
}