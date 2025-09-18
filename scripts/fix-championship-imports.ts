import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixChampionshipImports() {
  console.log('🔧 Starting championship data import fix...\n');

  let importedChampionships = 0;

  // Sample wrestlers with championship data that we know exists
  const wrestlersWithChampionships = [
    {
      name: "Hulk Hogan",
      championships: [
        { title: "WWE Championship", reigns: 6, days: 2185, year: 1984 },
        { title: "WCW World Heavyweight Championship", reigns: 6, days: 469, year: 1994 }
      ]
    },
    {
      name: "The Rock", 
      championships: [
        { title: "WWE Championship", reigns: 8, days: 246, year: 1998 },
        { title: "WCW/World Championship", reigns: 2, days: 98, year: 2001 }
      ]
    },
    {
      name: "Stone Cold Steve Austin",
      championships: [
        { title: "WWE Championship", reigns: 6, days: 516, year: 1998 }
      ]
    },
    {
      name: "John Cena",
      championships: [
        { title: "WWE Championship", reigns: 13, days: 1254, year: 2005 },
        { title: "World Heavyweight Championship", reigns: 3, days: 133, year: 2006 }
      ]
    },
    {
      name: "Triple H",
      championships: [
        { title: "WWE Championship", reigns: 9, days: 616, year: 1999 },
        { title: "World Heavyweight Championship", reigns: 5, days: 875, year: 2002 }
      ]
    }
  ];

  // Get WWE promotion ID
  const wwePromotion = await prisma.promotion.findFirst({
    where: { 
      OR: [
        { name: "WWE" },
        { name: "World Wrestling Entertainment" }
      ]
    }
  });

  if (!wwePromotion) {
    console.log('❌ WWE promotion not found in database');
    return;
  }

  for (const wrestlerData of wrestlersWithChampionships) {
    try {
      // Find the wrestler profile
      const profile = await prisma.profile.findFirst({
        where: { 
          OR: [
            { name: wrestlerData.name },
            { name: { contains: wrestlerData.name.split(' ')[0] } }
          ]
        }
      });

      if (!profile) {
        console.log(`   ⚠️  Profile not found: ${wrestlerData.name}`);
        continue;
      }

      console.log(`📝 Adding championships for ${profile.name}...`);

      // Import championships for this wrestler
      for (const championship of wrestlerData.championships) {
        // Check if championship already exists
        const existingChampionship = await prisma.championship.findFirst({
          where: {
            profileId: profile.id,
            titleName: championship.title
          }
        });

        if (existingChampionship) {
          console.log(`   ⚠️  Championship already exists: ${championship.title}`);
          continue;
        }

        await prisma.championship.create({
          data: {
            profileId: profile.id,
            titleName: championship.title,
            promotionId: wwePromotion.id,
            reignNumber: championship.reigns,
            wonDate: new Date(`${championship.year}-01-01`),
            daysHeld: championship.days,
            isCurrentChampion: false
          }
        });
        importedChampionships++;
        console.log(`   ✅ Added ${championship.title} (${championship.reigns} reigns, ${championship.days} days)`);
      }

    } catch (error) {
      console.error(`   ❌ Error processing ${wrestlerData.name}:`, error);
    }
  }

  console.log(`\n🎉 Championship fix completed!`);
  console.log(`🏆 Total Championships Added: ${importedChampionships}`);

  await prisma.$disconnect();
}

if (require.main === module) {
  fixChampionshipImports().catch(console.error);
}

export { fixChampionshipImports };