#!/usr/bin/env node
/**
 * Debug PPV Flashback query
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function debugQuery() {
  console.log('🔍 Debugging PPV Flashback queries...\n');
  
  // Check total PPV events
  const totalPPV = await prisma.event.count({ where: { isPpv: true } });
  console.log(`📊 Total PPV events: ${totalPPV}`);
  
  // Check PPV events by year
  const ppvByPromotion = await prisma.event.groupBy({
    by: ['promotionId'],
    where: { isPpv: true },
    _count: { id: true }
  });
  
  const promotions = await prisma.promotion.findMany();
  const promotionMap = Object.fromEntries(
    promotions.map(p => [p.id, p.slug])
  );
  
  console.log('\n📈 PPV events by promotion:');
  for (const stat of ppvByPromotion) {
    const promotionSlug = promotionMap[stat.promotionId];
    console.log(`  • ${promotionSlug?.toUpperCase()}: ${stat._count.id} PPV events`);
  }
  
  // Check some sample PPV events
  const samplePPVs = await prisma.event.findMany({
    where: { isPpv: true },
    include: { promotion: true },
    orderBy: { date: 'desc' },
    take: 10
  });
  
  console.log('\n🎪 Sample PPV events:');
  samplePPVs.forEach(event => {
    const eventDate = new Date(event.date);
    console.log(`  • ${event.promotion.name}: ${event.name} (${eventDate.toISOString().split('T')[0]})`);
  });
  
  // Test the year exclusion query that was problematic
  const currentYear = 2024;
  const eventsExcludingCurrentYear = await prisma.event.findMany({
    where: {
      isPpv: true,
      date: {
        not: {
          gte: new Date(`${currentYear}-01-01`),
          lt: new Date(`${currentYear + 1}-01-01`)
        }
      }
    },
    include: { promotion: true },
    take: 5
  });
  
  console.log(`\n🚫 PPV events excluding ${currentYear}: ${eventsExcludingCurrentYear.length}`);
  eventsExcludingCurrentYear.forEach(event => {
    const eventDate = new Date(event.date);
    console.log(`  • ${event.promotion.name}: ${event.name} (${eventDate.toISOString().split('T')[0]})`);
  });
}

debugQuery().finally(() => prisma.$disconnect());