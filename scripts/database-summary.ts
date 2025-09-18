import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getDatabaseSummary() {
  console.log('🏆 WHO WAS CHAMP - DATABASE SUMMARY\n');
  
  // Basic counts
  const totalProfiles = await prisma.profile.count();
  const totalWrestlers = await prisma.wrestlerProfile.count();
  const totalFighters = await prisma.fighterProfile.count();
  const totalChampionships = await prisma.championship.count();
  const totalPromotions = await prisma.promotion.count();
  
  console.log('📊 DATABASE OVERVIEW:');
  console.log(`Total Profiles: ${totalProfiles}`);
  console.log(`└── Wrestlers: ${totalWrestlers}`);
  console.log(`└── Fighters: ${totalFighters}`);
  console.log(`Total Championships: ${totalChampionships}`);
  console.log(`Total Promotions: ${totalPromotions}\n`);
  
  // Wrestler breakdown
  console.log('🤼 WWE WRESTLER PROFILES:');
  const wrestlers = await prisma.profile.findMany({
    where: { type: 'wrestler' },
    include: {
      wrestler: true,
      championships: {
        include: { promotion: true }
      }
    },
    orderBy: { name: 'asc' }
  });
  
  wrestlers.forEach((wrestler, index) => {
    const titleCount = wrestler.championships.length;
    console.log(`${index + 1}. ${wrestler.nickname || wrestler.name}`);
    console.log(`   └── Championships: ${titleCount}`);
    console.log(`   └── Era: ${wrestler.wrestler?.era || 'Unknown'}`);
    console.log(`   └── Days as Champion: ${wrestler.wrestler?.combinedDaysAsChampion || 0}`);
  });
  
  console.log('\n🥊 UFC FIGHTER PROFILES:');
  const fighters = await prisma.profile.findMany({
    where: { type: 'fighter' },
    include: {
      fighter: true,
      championships: {
        include: { promotion: true }
      }
    },
    orderBy: { name: 'asc' }
  });
  
  fighters.forEach((fighter, index) => {
    const record = fighter.fighter;
    const titleCount = fighter.championships.length;
    console.log(`${index + 1}. ${fighter.nickname ? `"${fighter.nickname}" ${fighter.name}` : fighter.name}`);
    console.log(`   └── Record: ${record?.wins}-${record?.losses}-${record?.draws}`);
    console.log(`   └── Championships: ${titleCount}`);
    console.log(`   └── Stance: ${record?.stance || 'Unknown'}`);
  });
  
  // Championship breakdown
  console.log('\n🏆 CHAMPIONSHIP SUMMARY:');
  const championshipsByTitle = await prisma.championship.groupBy({
    by: ['titleName'],
    _count: { titleName: true },
    orderBy: { _count: { titleName: 'desc' } }
  });
  
  championshipsByTitle.slice(0, 10).forEach((title, index) => {
    console.log(`${index + 1}. ${title.titleName}: ${title._count.titleName} reigns`);
  });
  
  // Current champions
  console.log('\n👑 CURRENT CHAMPIONS:');
  const currentChampions = await prisma.championship.findMany({
    where: { isCurrentChampion: true },
    include: {
      profile: true,
      promotion: true
    },
    orderBy: { wonDate: 'desc' }
  });
  
  currentChampions.forEach((champ, index) => {
    const daysHeld = champ.daysHeld || 0;
    console.log(`${index + 1}. ${champ.titleName}`);
    console.log(`   └── Champion: ${champ.profile.nickname || champ.profile.name}`);
    console.log(`   └── Days Held: ${daysHeld}`);
    console.log(`   └── Promotion: ${champ.promotion.name}`);
  });
  
  // Promotions
  console.log('\n🏢 PROMOTIONS:');
  const promotions = await prisma.promotion.findMany({
    include: {
      _count: {
        select: {
          championships: true,
          profilePromotions: true
        }
      }
    },
    orderBy: { name: 'asc' }
  });
  
  promotions.forEach((promotion, index) => {
    console.log(`${index + 1}. ${promotion.name}`);
    console.log(`   └── Profiles: ${promotion._count.profilePromotions}`);
    console.log(`   └── Championships: ${promotion._count.championships}`);
  });
  
  await prisma.$disconnect();
}

if (require.main === module) {
  getDatabaseSummary().catch(console.error);
}

export { getDatabaseSummary };