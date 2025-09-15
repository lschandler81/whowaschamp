#!/usr/bin/env node
/**
 * Test PPV Flashback functionality with comprehensive data
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

async function testPPVFlashback(inputDate) {
  console.log(`\n🔍 Testing PPV Flashback for date: ${inputDate}`);
  
  const testDate = new Date(inputDate);
  const currentYear = testDate.getFullYear();
  const isoWeek = getISOWeek(testDate);
  
  console.log(`📅 Year: ${currentYear}, ISO Week: ${isoWeek}`);
  
  // Query for PPV events in the same ISO week from previous years
  const events = await prisma.event.findMany({
    where: {
      isPpv: true,
      AND: [
        {
          date: {
            not: {
              gte: new Date(`${currentYear}-01-01`),
              lt: new Date(`${currentYear + 1}-01-01`)
            }
          }
        }
      ]
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

  console.log(`📊 Total PPV events in database: ${events.length}`);
  console.log(`🎯 Events matching ISO week ${isoWeek}: ${matchingEvents.length}`);

  if (matchingEvents.length > 0) {
    console.log('\n🎪 Matching events:');
    matchingEvents.forEach(event => {
      const eventDate = new Date(event.date);
      console.log(`  • ${event.promotion.name}: ${event.name} (${eventDate.toISOString().split('T')[0]})`);
      if (event.headliners.length > 0) {
        console.log(`    Main Event: ${event.headliners[0].description}`);
      }
      if (event.titleChanges.length > 0) {
        console.log(`    Title Changes: ${event.titleChanges.length}`);
      }
    });
  } else {
    console.log('\n📭 No major PPV events happened during this week in wrestling history');
  }

  return matchingEvents;
}

async function main() {
  console.log('🎯 PPV Flashback Comprehensive Data Test');
  
  // Test with several dates
  await testPPVFlashback('2024-08-03'); // SummerSlam 2024 week
  await testPPVFlashback('2024-04-06'); // WrestleMania week
  await testPPVFlashback('2024-01-27'); // Royal Rumble week
  await testPPVFlashback('2024-07-06'); // Money in the Bank week
  
  // Get overall database stats
  const stats = await prisma.event.groupBy({
    by: ['promotionId'],
    _count: { id: true }
  });

  const promotions = await prisma.promotion.findMany();
  const promotionMap = Object.fromEntries(
    promotions.map(p => [p.id, p.slug])
  );

  console.log('\n📈 Database Statistics:');
  for (const stat of stats) {
    const promotionSlug = promotionMap[stat.promotionId];
    console.log(`  • ${promotionSlug?.toUpperCase()}: ${stat._count.id} events`);
  }

  const totalEvents = await prisma.event.count();
  const ppvEvents = await prisma.event.count({ where: { isPpv: true } });
  
  console.log(`  • Total Events: ${totalEvents}`);
  console.log(`  • PPV Events: ${ppvEvents}`);
  console.log(`\n🎉 Comprehensive data test completed!`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().finally(() => prisma.$disconnect());
}