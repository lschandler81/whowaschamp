import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const WOMENS_WRESTLERS = [
  {
    name: "Trish Stratus",
    realName: "Patricia Anne Stratigeas",
    nickname: "Queen of WWE",
    hometown: "Toronto, Ontario, Canada",
    height: "5'4\"",
    weight: "125 lbs",
    debut: "2000-03-19",
    retirement: "2019-08-10",
    finisher: "Stratusfaction",
    era: "Ruthless Aggression",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Women's Championship", reigns: 7, days: 924, year: 2001 },
      { title: "WWE Hardcore Championship", reigns: 1, days: 1, year: 2000 }
    ],
    bio: "Seven-time Women's Champion widely considered the greatest female wrestler of all time."
  },
  {
    name: "Lita",
    realName: "Amy Christine Dumas",
    nickname: "The Hardcore Princess",
    hometown: "Sanford, North Carolina",
    height: "5'6\"",
    weight: "125 lbs",
    debut: "1999-02-13",
    retirement: "2006-11-27",
    finisher: "Litasault",
    era: "Attitude",
    promotions: ["WWE", "ECW"],
    championships: [
      { title: "WWE Women's Championship", reigns: 4, days: 279, year: 2000 }
    ],
    bio: "Revolutionary high-flying daredevil who changed women's wrestling forever."
  },
  {
    name: "Chyna",
    realName: "Joanie Marie Laurer",
    nickname: "The Ninth Wonder of the World",
    hometown: "Rochester, New York",
    height: "5'10\"",
    weight: "180 lbs",
    debut: "1997-02-16",
    retirement: "2011-01-01",
    finisher: "Pedigree",
    era: "Attitude",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Intercontinental Championship", reigns: 2, days: 97, year: 1999 },
      { title: "WWE Women's Championship", reigns: 1, days: 364, year: 2001 }
    ],
    bio: "The Ninth Wonder of the World who broke barriers competing against men."
  },
  {
    name: "Charlotte Flair",
    realName: "Ashley Elizabeth Fliehr",
    nickname: "The Queen",
    hometown: "Charlotte, North Carolina",
    height: "5'10\"",
    weight: "143 lbs",
    debut: "2012-01-17",
    retirement: null,
    finisher: "Natural Selection",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Raw Women's Championship", reigns: 3, days: 380, year: 2016 },
      { title: "WWE SmackDown Women's Championship", reigns: 6, days: 552, year: 2018 },
      { title: "NXT Women's Championship", reigns: 1, days: 258, year: 2014 }
    ],
    bio: "Ric Flair's daughter and the most decorated women's champion in modern WWE."
  },
  {
    name: "Becky Lynch",
    realName: "Rebecca Quin",
    nickname: "The Man",
    hometown: "Dublin, Ireland",
    height: "5'6\"",
    weight: "135 lbs",
    debut: "2002-01-01",
    retirement: null,
    finisher: "Dis-arm-her",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Raw Women's Championship", reigns: 1, days: 398, year: 2019 },
      { title: "WWE SmackDown Women's Championship", reigns: 2, days: 84, year: 2018 }
    ],
    bio: "The Man who became the face of the women's evolution in WWE."
  },
  {
    name: "Sasha Banks",
    realName: "Mercedes Justine Kaestner-Varnado",
    nickname: "The Boss",
    hometown: "Boston, Massachusetts",
    height: "5'5\"",
    weight: "114 lbs",
    debut: "2010-01-01",
    retirement: null,
    finisher: "Bank Statement",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Raw Women's Championship", reigns: 5, days: 230, year: 2016 },
      { title: "NXT Women's Championship", reigns: 1, days: 192, year: 2015 }
    ],
    bio: "The Boss who helped revolutionize women's wrestling in the modern era."
  },
  {
    name: "Bayley",
    realName: "Pamela Rose Martinez",
    nickname: "The Role Model",
    hometown: "San Jose, California",
    height: "5'6\"",
    weight: "119 lbs",
    debut: "2008-01-01",
    retirement: null,
    finisher: "Bayley-to-Belly",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "WWE SmackDown Women's Championship", reigns: 1, days: 380, year: 2019 },
      { title: "WWE Raw Women's Championship", reigns: 1, days: 76, year: 2017 },
      { title: "NXT Women's Championship", reigns: 1, days: 223, year: 2015 }
    ],
    bio: "The hugger turned role model who captured hearts and championships."
  },
  {
    name: "Ronda Rousey",
    realName: "Ronda Jean Rousey",
    nickname: "Rowdy",
    hometown: "Riverside, California",
    height: "5'7\"",
    weight: "134 lbs",
    debut: "2018-01-28",
    retirement: null,
    finisher: "Armbar",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Raw Women's Championship", reigns: 1, days: 231, year: 2018 },
      { title: "WWE SmackDown Women's Championship", reigns: 1, days: 27, year: 2023 }
    ],
    bio: "UFC Hall of Famer who brought mainstream attention and legitimacy to women's wrestling."
  },
  {
    name: "Rhea Ripley",
    realName: "Demi Bennett",
    nickname: "Mami",
    hometown: "Adelaide, Australia",
    height: "5'7\"",
    weight: "137 lbs",
    debut: "2013-09-10",
    retirement: null,
    finisher: "Riptide",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Raw Women's Championship", reigns: 1, days: 380, year: 2023 },
      { title: "NXT Women's Championship", reigns: 1, days: 161, year: 2019 },
      { title: "WWE Women's World Championship", reigns: 1, days: 71, year: 2023 }
    ],
    bio: "Dominant Australian powerhouse who has become one of the top stars in modern WWE."
  },
  {
    name: "Bianca Belair",
    realName: "Bianca Nicole Blair",
    nickname: "The EST",
    hometown: "Knoxville, Tennessee",
    height: "5'7\"",
    weight: "165 lbs",
    debut: "2016-04-13",
    retirement: null,
    finisher: "KOD",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Raw Women's Championship", reigns: 2, days: 420, year: 2021 },
      { title: "WWE SmackDown Women's Championship", reigns: 1, days: 175, year: 2023 }
    ],
    bio: "The EST of WWE who represents strength, speed, and athleticism in women's wrestling."
  }
];

async function importWomensWrestlers() {
  console.log('💪 Starting women\'s wrestlers import...\n');

  let importedProfiles = 0;
  let importedChampionships = 0;
  let skipped = 0;

  for (const wrestlerData of WOMENS_WRESTLERS) {
    try {
      console.log(`📝 Processing ${wrestlerData.name}...`);

      // Check if profile already exists
      const existingProfile = await prisma.profile.findFirst({
        where: { 
          OR: [
            { name: wrestlerData.name },
            { slug: wrestlerData.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-') }
          ]
        }
      });

      if (existingProfile) {
        console.log(`   ⚠️  ${wrestlerData.name} already exists, skipping...`);
        skipped++;
        continue;
      }

      // Create profile
      const profile = await prisma.profile.create({
        data: {
          name: wrestlerData.name,
          slug: wrestlerData.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
          type: 'wrestler',
          nickname: wrestlerData.nickname,
          hometown: wrestlerData.hometown,
          height: wrestlerData.height,
          weight: wrestlerData.weight,
          debut: wrestlerData.debut ? new Date(wrestlerData.debut) : null,
          retired: wrestlerData.retirement ? new Date(wrestlerData.retirement) : null,
          bio: wrestlerData.bio,
          tagline: `${wrestlerData.championships?.reduce((total, c) => total + c.reigns, 0) || 0}-time Women's Champion`
        }
      });

      // Create wrestler-specific profile
      await prisma.wrestlerProfile.create({
        data: {
          profileId: profile.id,
          finisher: wrestlerData.finisher,
          era: wrestlerData.era,
          worldTitleReigns: wrestlerData.championships?.reduce((total, c) => total + c.reigns, 0) || 0,
          combinedDaysAsChampion: wrestlerData.championships?.reduce((total, c) => total + c.days, 0) || 0,
          firstReignDate: wrestlerData.championships?.length ? new Date(`${wrestlerData.championships[0].year}-01-01`) : null,
          lastReignDate: wrestlerData.championships?.length ? new Date(`${wrestlerData.championships[wrestlerData.championships.length - 1].year}-01-01`) : null
        }
      });

      importedProfiles++;

      // Handle promotions and championships
      if (wrestlerData.promotions && wrestlerData.championships) {
        for (const promotionName of wrestlerData.promotions) {
          // Find or create promotion
          let promotion = await prisma.promotion.findUnique({
            where: { name: promotionName }
          });
          
          if (!promotion) {
            promotion = await prisma.promotion.create({
              data: {
                name: promotionName,
                slug: promotionName.toLowerCase().replace(/[^a-z0-9]/g, '-')
              }
            });
          }

          // Connect profile to promotion
          await prisma.profilePromotion.upsert({
            where: {
              profileId_promotionId: {
                profileId: profile.id,
                promotionId: promotion.id
              }
            },
            update: {},
            create: {
              profileId: profile.id,
              promotionId: promotion.id
            }
          });
        }

        // Import championships
        for (const championship of wrestlerData.championships) {
          const promotion = await prisma.promotion.findFirst({
            where: { name: { in: wrestlerData.promotions } }
          });

          await prisma.championship.create({
            data: {
              profileId: profile.id,
              titleName: championship.title,
              promotionId: promotion?.id || (await prisma.promotion.findFirst({ where: { name: 'WWE' } }))?.id!,
              reignNumber: championship.reigns,
              wonDate: new Date(`${championship.year}-01-01`),
              daysHeld: championship.days,
              isCurrentChampion: false
            }
          });
          importedChampionships++;
        }
      }

      console.log(`   ✅ ${wrestlerData.name} imported successfully`);

    } catch (error) {
      console.error(`   ❌ Error importing ${wrestlerData.name}:`, error);
    }
  }

  console.log('\n🎉 Women\'s wrestlers import completed!');
  console.log(`📊 Total Profiles Imported: ${importedProfiles}`);
  console.log(`⚠️  Profiles Skipped: ${skipped}`);
  console.log(`🏆 Total Championships Imported: ${importedChampionships}`);

  await prisma.$disconnect();
}

if (require.main === module) {
  importWomensWrestlers().catch(console.error);
}

export { importWomensWrestlers };