import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getFinalSummary() {
  const profiles = await prisma.profile.count();
  const wrestlers = await prisma.profile.count({ where: { type: 'wrestler' } });
  const fighters = await prisma.profile.count({ where: { type: 'fighter' } });
  const championships = await prisma.championship.count();
  const promotions = await prisma.promotion.count();
  const rivalries = await prisma.rivalry.count();

  console.log('🏆 FINAL DATABASE EXPANSION SUMMARY');
  console.log('====================================');
  console.log();
  console.log('📊 TOTAL COUNTS:');
  console.log(`   👥 Total Profiles: ${profiles}`);
  console.log(`   🤼 Wrestlers: ${wrestlers}`);  
  console.log(`   🥊 Fighters: ${fighters}`);
  console.log(`   🏆 Championships: ${championships}`);
  console.log(`   🏢 Promotions: ${promotions}`);
  console.log(`   ⚔️  Rivalries: ${rivalries}`);
  console.log();
  
  // Era breakdown
  const eras = await prisma.wrestlerProfile.groupBy({
    by: ['era'],
    _count: {
      era: true
    },
    orderBy: {
      _count: {
        era: 'desc'
      }
    }
  });
  
  console.log('📈 WRESTLERS BY ERA:');
  eras.forEach((era) => {
    if (era.era) {
      console.log(`   ${era.era}: ${era._count.era} wrestlers`);
    }
  });
  console.log();
  
  // Top promotions
  console.log('🏢 TOP PROMOTIONS:');
  const topPromotions = await prisma.promotion.findMany({
    include: {
      _count: {
        select: {
          profilePromotions: true,
          championships: true
        }
      }
    },
    orderBy: {
      profilePromotions: {
        _count: 'desc'
      }
    },
    take: 10
  });
  
  topPromotions.forEach((promotion) => {
    if (promotion._count.profilePromotions > 0) {
      console.log(`   ${promotion.name}: ${promotion._count.profilePromotions} wrestlers, ${promotion._count.championships} championships`);
    }
  });
}

getFinalSummary()
  .catch(console.error)
  .finally(() => prisma.$disconnect());