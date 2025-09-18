import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CURRENT_WWE_STARS = [
  {
    name: "Gunther",
    realName: "Walter Hahn",
    nickname: "The Ring General",
    hometown: "Vienna, Austria",
    height: "6'4\"",
    weight: "317 lbs",
    debut: "2007-06-02",
    retirement: null,
    finisher: "Powerbomb",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Intercontinental Championship", reigns: 1, days: 666, year: 2022 },
      { title: "NXT United Kingdom Championship", reigns: 1, days: 870, year: 2019 },
      { title: "WWE King of the Ring", reigns: 1, days: 1, year: 2024 }
    ],
    bio: "Austrian powerhouse who dominated NXT UK and became the longest-reigning Intercontinental Champion in modern WWE."
  },
  {
    name: "LA Knight",
    realName: "Shaun Ricker",
    nickname: "The Megastar",
    hometown: "Los Angeles, California",
    height: "6'0\"",
    weight: "240 lbs",
    debut: "2003-01-01",
    retirement: null,
    finisher: "BFT",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "WWE United States Championship", reigns: 1, days: 45, year: 2024 }
    ],
    bio: "Charismatic performer who became a breakout star with his infectious personality and catchphrases."
  },
  {
    name: "Jade Cargill",
    realName: "Jade Cargill",
    nickname: "That B*tch",
    hometown: "Jacksonville, Florida",
    height: "5'10\"",
    weight: "160 lbs",
    debut: "2020-09-09",
    retirement: null,
    finisher: "Jaded",
    era: "Modern",
    promotions: ["AEW", "WWE"],
    championships: [
      { title: "AEW TBS Championship", reigns: 1, days: 508, year: 2022 }
    ],
    bio: "Undefeated powerhouse who transferred from AEW to WWE as one of the most dominant women's wrestlers."
  },
  {
    name: "Tiffany Stratton",
    realName: "Tiffany Nieves",
    nickname: "The Center of the Universe",
    hometown: "Orlando, Florida",
    height: "5'7\"",
    weight: "130 lbs",
    debut: "2021-09-14",
    retirement: null,
    finisher: "Prettiest Moonsault Ever",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "NXT Women's Championship", reigns: 1, days: 283, year: 2023 }
    ],
    bio: "Gymnastics background athlete who quickly rose through NXT to become a main roster star."
  },
  {
    name: "Solo Sikoa",
    realName: "Joseph Fatu",
    nickname: "The Tribal Combat Officer",
    hometown: "Pensacola, Florida",
    height: "6'1\"",
    weight: "265 lbs",
    debut: "2021-04-08",
    retirement: null,
    finisher: "Samoan Spike",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "NXT North American Championship", reigns: 1, days: 91, year: 2022 }
    ],
    bio: "Member of the legendary Anoa'i wrestling family and Roman Reigns' Bloodline enforcer."
  },
  {
    name: "Jacob Fatu",
    realName: "Jacob Samuel Fatu",
    nickname: "The Samoan Werewolf",
    hometown: "Sacramento, California", 
    height: "6'1\"",
    weight: "290 lbs",
    debut: "2013-02-02",
    retirement: null,
    finisher: "Moonsault",
    era: "Modern",
    promotions: ["WWE", "MLW"],
    championships: [
      { title: "MLW World Heavyweight Championship", reigns: 2, days: 819, year: 2019 }
    ],
    bio: "High-flying super heavyweight from the Anoa'i family who shocked WWE by joining The Bloodline."
  },
  {
    name: "Bronson Reed",
    realName: "Jermaine Haley",
    nickname: "Big Bronson Reed",
    hometown: "Adelaide, Australia",
    height: "6'0\"",
    weight: "330 lbs",
    debut: "2007-01-01",
    retirement: null,
    finisher: "Tsunami",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "NXT North American Championship", reigns: 1, days: 51, year: 2021 }
    ],
    bio: "Australian powerhouse known for incredible athleticism despite his massive size."
  },
  {
    name: "IYO SKY",
    realName: "Masami Odate",
    nickname: "The Genius of the Sky",
    hometown: "Tokyo, Japan",
    height: "5'2\"",
    weight: "115 lbs",
    debut: "2007-08-26",
    retirement: null,
    finisher: "Over the Moonsault",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Women's Championship", reigns: 1, days: 105, year: 2023 }
    ],
    bio: "Japanese wrestling prodigy and former WWE Women's Champion with incredible technical skills."
  },
  {
    name: "Dakota Kai",
    realName: "Cheree Georgina Crowley",
    nickname: "Captain Team Kick",
    hometown: "Auckland, New Zealand",
    height: "5'3\"",
    weight: "120 lbs",
    debut: "2007-01-01",
    retirement: null,
    finisher: "Kairopractor",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Women's Tag Team Championship", reigns: 1, days: 49, year: 2022 }
    ],
    bio: "New Zealand striker who became a fan favorite with her resilient underdog story."
  },
  {
    name: "Damian Priest",
    realName: "Luis Martinez",
    nickname: "The Archer of Infamy",
    hometown: "New York, New York",
    height: "6'5\"",
    weight: "250 lbs",
    debut: "2004-01-01",
    retirement: null,
    finisher: "South of Heaven",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "WWE World Heavyweight Championship", reigns: 1, days: 120, year: 2024 },
      { title: "WWE United States Championship", reigns: 1, days: 252, year: 2021 }
    ],
    bio: "Puerto Rican powerhouse who reached the pinnacle by capturing the World Heavyweight Championship."
  },
  {
    name: "Dominik Mysterio",
    realName: "Dominik Gutiérrez",
    nickname: "Dirty Dom",
    hometown: "San Diego, California",
    height: "6'1\"",
    weight: "175 lbs",
    debut: "2020-08-23",
    retirement: null,
    finisher: "619",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "WWE NXT North American Championship", reigns: 1, days: 28, year: 2023 }
    ],
    bio: "Rey Mysterio's son who turned heel and became one of WWE's most hated villains with The Judgment Day."
  },
  {
    name: "Finn Balor",
    realName: "Fergal Devitt",
    nickname: "The Prince / The Demon",
    hometown: "Bray, County Wicklow, Ireland",
    height: "5'11\"",
    weight: "190 lbs",
    debut: "2000-01-01",
    retirement: null,
    finisher: "Coup de Grâce",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Universal Championship", reigns: 1, days: 1, year: 2016 },
      { title: "WWE Intercontinental Championship", reigns: 2, days: 22, year: 2019 }
    ],
    bio: "Irish wrestler and first Universal Champion who transforms into The Demon for big matches."
  },
  {
    name: "JD McDonagh",
    realName: "Jordan Devlin",
    nickname: "The Irish Ace",
    hometown: "Bray, County Wicklow, Ireland",
    height: "5'10\"",
    weight: "180 lbs",
    debut: "2006-01-01",
    retirement: null,
    finisher: "Devil Inside",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "NXT Cruiserweight Championship", reigns: 1, days: 273, year: 2020 }
    ],
    bio: "Technical wrestler from Ireland and member of The Judgment Day faction."
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
      { title: "WWE Women's World Championship", reigns: 1, days: 380, year: 2023 },
      { title: "NXT Women's Championship", reigns: 1, days: 161, year: 2019 }
    ],
    bio: "Dominant Australian who became the face of WWE's women's division as champion."
  },
  {
    name: "Liv Morgan",
    realName: "Gionna Jene Daddio",
    nickname: "Pure Fusion Collective",
    hometown: "Elmwood Park, New Jersey",
    height: "5'3\"",
    weight: "115 lbs",
    debut: "2014-06-12",
    retirement: null,
    finisher: "ObLIVion",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "WWE SmackDown Women's Championship", reigns: 1, days: 91, year: 2022 },
      { title: "WWE Women's World Championship", reigns: 1, days: 67, year: 2024 }
    ],
    bio: "Resilient competitor who overcame early career struggles to become a two-time women's champion."
  },
  {
    name: "Nia Jax",
    realName: "Savelina Fanene",
    nickname: "The Irresistible Force",
    hometown: "Sydney, Australia",
    height: "6'0\"",
    weight: "272 lbs",
    debut: "2014-07-11",
    retirement: null,
    finisher: "Samoan Drop",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Raw Women's Championship", reigns: 1, days: 70, year: 2018 },
      { title: "WWE Women's Championship", reigns: 1, days: 42, year: 2024 }
    ],
    bio: "Samoan powerhouse and cousin of The Rock who dominated the women's division with her size advantage."
  },
  {
    name: "Raquel Rodriguez",
    realName: "Victoria González",
    nickname: "Big Mami Cool",
    hometown: "Katy, Texas",
    height: "6'0\"",
    weight: "150 lbs",
    debut: "2016-05-04",
    retirement: null,
    finisher: "Texana Bomb",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "NXT Women's Championship", reigns: 1, days: 413, year: 2021 },
      { title: "WWE Women's Tag Team Championship", reigns: 1, days: 91, year: 2023 }
    ],
    bio: "Towering Texan who dominated NXT before making her mark on the main roster."
  },
  {
    name: "Shayna Baszler",
    realName: "Shayna Andrea Baszler",
    nickname: "The Queen of Spades",
    hometown: "Sioux Falls, South Dakota",
    height: "5'7\"",
    weight: "138 lbs",
    debut: "2015-01-01",
    retirement: null,
    finisher: "Kirifuda Clutch",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "NXT Women's Championship", reigns: 2, days: 548, year: 2018 },
      { title: "WWE Women's Tag Team Championship", reigns: 3, days: 180, year: 2020 }
    ],
    bio: "Former MMA fighter who brought legitimate fighting credentials to WWE's women's division."
  },
  {
    name: "Zoey Stark",
    realName: "Theresa Serrano",
    nickname: "Hunter",
    hometown: "Detroit, Michigan",
    height: "5'5\"",
    weight: "130 lbs",
    debut: "2020-08-19",
    retirement: null,
    finisher: "Z-360",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Speed Women's Championship", reigns: 1, days: 56, year: 2024 }
    ],
    bio: "High-energy competitor who climbed from NXT to become a contender on the main roster."
  },
  {
    name: "Carlito",
    realName: "Carlos Edwin Colón Jr.",
    nickname: "Caribbean Cool",
    hometown: "San Juan, Puerto Rico", 
    height: "5'10\"",
    weight: "220 lbs",
    debut: "1999-04-17",
    retirement: null,
    finisher: "Backstabber",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "WWE United States Championship", reigns: 1, days: 119, year: 2004 },
      { title: "WWE Intercontinental Championship", reigns: 1, days: 119, year: 2005 }
    ],
    bio: "Cool Puerto Rican who returned to WWE after years away, still spitting apple and taking names."
  },
  {
    name: "Chad Gable",
    realName: "Charles Betts",
    nickname: "American Made",
    hometown: "Minneapolis, Minnesota",
    height: "5'8\"",
    weight: "202 lbs",
    debut: "2015-08-19",
    retirement: null,
    finisher: "Angle Slam",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Tag Team Championship", reigns: 2, days: 91, year: 2017 },
      { title: "SmackDown Tag Team Championship", reigns: 1, days: 35, year: 2019 }
    ],
    bio: "Olympic amateur wrestling standout who became a technical master in WWE."
  },
  {
    name: "Ludwig Kaiser",
    realName: "Marcel Barthel",
    nickname: "The Ring General's Lieutenant",
    hometown: "Dresden, Germany",
    height: "6'0\"",
    weight: "195 lbs",
    debut: "2017-01-01",
    retirement: null,
    finisher: "Kaiser Roll",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "NXT Tag Team Championship", reigns: 2, days: 202, year: 2019 }
    ],
    bio: "German technician and Gunther's loyal partner who excels in tag team competition."
  },
  {
    name: "Giovanni Vinci",
    realName: "Fabian Aichner",
    nickname: "The Italian Stallion",
    hometown: "St. Lorenzen, Italy",
    height: "6'1\"",
    weight: "241 lbs",
    debut: "2010-01-01",
    retirement: null,
    finisher: "Lariat",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "NXT Tag Team Championship", reigns: 2, days: 202, year: 2019 }
    ],
    bio: "Italian powerhouse who formed a dominant tag team partnership with Ludwig Kaiser."
  },
  {
    name: "Pete Dunne",
    realName: "Peter England",
    nickname: "The Bruiserweight",
    hometown: "Birmingham, England",
    height: "5'10\"",
    weight: "205 lbs",
    debut: "2004-01-01",
    retirement: null,
    finisher: "Bitter End",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "NXT United Kingdom Championship", reigns: 1, days: 685, year: 2017 },
      { title: "NXT Tag Team Championship", reigns: 1, days: 7, year: 2021 }
    ],
    bio: "Brutal British wrestler known for his hard-hitting style and finger manipulation."
  },
  {
    name: "Tyler Bate",
    realName: "Tyler Bate",
    nickname: "Big Strong Boy",
    hometown: "Dudley, England",
    height: "5'7\"",
    weight: "185 lbs",
    debut: "2013-01-01",
    retirement: null,
    finisher: "Tyler Driver 97",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "NXT United Kingdom Championship", reigns: 2, days: 287, year: 2017 },
      { title: "NXT Championship", reigns: 1, days: 63, year: 2023 }
    ],
    bio: "Youngest ever WWE United Kingdom Champion with incredible strength for his size."
  },
  {
    name: "Ilja Dragunov",
    realName: "Ilja Rukober",
    nickname: "Unbesiegbar",
    hometown: "Moscow, Russia",
    height: "5'9\"",
    weight: "196 lbs",
    debut: "2007-01-01",
    retirement: null,
    finisher: "Torpedo Moscow",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "NXT United Kingdom Championship", reigns: 1, days: 269, year: 2021 },
      { title: "NXT Championship", reigns: 1, days: 50, year: 2023 }
    ],
    bio: "Intense Russian-German wrestler known for his unmatched intensity and emotional matches."
  },
  {
    name: "Carmelo Hayes",
    realName: "Christian Brigham",
    nickname: "Him",
    hometown: "Worcester, Massachusetts",
    height: "5'10\"",
    weight: "191 lbs",
    debut: "2018-01-01",
    retirement: null,
    finisher: "Nothing But Net",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "NXT Championship", reigns: 2, days: 280, year: 2022 },
      { title: "NXT North American Championship", reigns: 1, days: 238, year: 2021 }
    ],
    bio: "Smooth operator from Massachusetts who dominated NXT with his athletic ability and confidence."
  },
  {
    name: "Trick Williams",
    realName: "Matrick Williams",
    nickname: "Whoop That Trick",
    hometown: "Columbia, South Carolina",
    height: "6'3\"",
    weight: "220 lbs",
    debut: "2021-04-08",
    retirement: null,
    finisher: "Trick Knee",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "NXT Championship", reigns: 1, days: 132, year: 2024 }
    ],
    bio: "Charismatic athlete who evolved from Carmelo Hayes' protégé to NXT Champion."
  },
  {
    name: "Ethan Page",
    realName: "Julian Micevski",
    nickname: "All Ego",
    hometown: "Hamilton, Ontario, Canada",
    height: "6'2\"",
    weight: "240 lbs",
    debut: "2002-01-01",
    retirement: null,
    finisher: "Ego's Edge",
    era: "Modern",
    promotions: ["WWE", "AEW"],
    championships: [
      { title: "NXT Championship", reigns: 1, days: 12, year: 2024 }
    ],
    bio: "Veteran performer who brought his 'All Ego' persona from AEW to capture the NXT Championship."
  },
  {
    name: "Je'Von Evans",
    realName: "Je'Von Evans",
    nickname: "Young OG",
    hometown: "Syracuse, New York",
    height: "5'11\"",
    weight: "185 lbs",
    debut: "2023-07-01",
    retirement: null,
    finisher: "Meteora",
    era: "Modern",
    promotions: ["WWE"],
    championships: [],
    bio: "Rising young star with incredible athletic ability and high-flying offense making waves in NXT."
  }
];

async function importCurrentWWEStars() {
  console.log('⭐ Starting current WWE stars import...\n');

  let importedProfiles = 0;
  let importedChampionships = 0;
  let skipped = 0;

  for (const starData of CURRENT_WWE_STARS) {
    try {
      console.log(`📝 Processing ${starData.name}...`);

      // Check if profile already exists
      const existingProfile = await prisma.profile.findFirst({
        where: { 
          OR: [
            { name: starData.name },
            { slug: starData.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-') }
          ]
        }
      });

      if (existingProfile) {
        console.log(`   ⚠️  ${starData.name} already exists, skipping...`);
        skipped++;
        continue;
      }

      // Create profile
      const profile = await prisma.profile.create({
        data: {
          name: starData.name,
          slug: starData.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
          type: 'wrestler',
          nickname: starData.nickname,
          hometown: starData.hometown,
          height: starData.height,
          weight: starData.weight,
          debut: starData.debut ? new Date(starData.debut) : null,
          retired: starData.retirement ? new Date(starData.retirement) : null,
          bio: starData.bio,
          tagline: `Current WWE Superstar${starData.championships?.length ? ` • ${starData.championships?.reduce((total, c) => total + c.reigns, 0)}-time Champion` : ''}`
        }
      });

      // Create wrestler-specific profile
      await prisma.wrestlerProfile.create({
        data: {
          profileId: profile.id,
          finisher: starData.finisher,
          era: starData.era,
          worldTitleReigns: starData.championships?.reduce((total, c) => total + c.reigns, 0) || 0,
          combinedDaysAsChampion: starData.championships?.reduce((total, c) => total + c.days, 0) || 0,
          firstReignDate: starData.championships?.length ? new Date(`${starData.championships[0].year}-01-01`) : null,
          lastReignDate: starData.championships?.length ? new Date(`${starData.championships[starData.championships.length - 1].year}-01-01`) : null
        }
      });

      importedProfiles++;

      // Handle promotions and championships
      if (starData.promotions && starData.championships?.length) {
        for (const promotionName of starData.promotions) {
          // Find or create promotion
          let promotion = await prisma.promotion.findFirst({
            where: { 
              OR: [
                { name: promotionName },
                { name: promotionName === "WWE" ? "World Wrestling Entertainment" : promotionName }
              ]
            }
          });
          
          if (!promotion) {
            try {
              promotion = await prisma.promotion.create({
                data: {
                  name: promotionName,
                  slug: promotionName.toLowerCase().replace(/[^a-z0-9]/g, '-')
                }
              });
            } catch (error) {
              // Promotion might already exist with different slug, find it
              promotion = await prisma.promotion.findFirst({
                where: { 
                  slug: promotionName.toLowerCase().replace(/[^a-z0-9]/g, '-')
                }
              });
            }
          }

          if (promotion) {
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
        }

        // Import championships
        for (const championship of starData.championships) {
          const promotion = await prisma.promotion.findFirst({
            where: { 
              OR: [
                { name: { in: starData.promotions } },
                { name: "World Wrestling Entertainment" }
              ]
            }
          });

          if (promotion) {
            await prisma.championship.create({
              data: {
                profileId: profile.id,
                titleName: championship.title,
                promotionId: promotion.id,
                reignNumber: championship.reigns,
                wonDate: new Date(`${championship.year}-01-01`),
                daysHeld: championship.days,
                isCurrentChampion: false
              }
            });
            importedChampionships++;
          }
        }
      } else if (starData.promotions) {
        // Just connect to promotions without championships
        for (const promotionName of starData.promotions) {
          let promotion = await prisma.promotion.findFirst({
            where: { 
              OR: [
                { name: promotionName },
                { name: promotionName === "WWE" ? "World Wrestling Entertainment" : promotionName }
              ]
            }
          });

          if (promotion) {
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
        }
      }

      console.log(`   ✅ ${starData.name} imported successfully`);

    } catch (error) {
      console.error(`   ❌ Error importing ${starData.name}:`, error);
    }
  }

  console.log('\n🌟 Current WWE stars import completed!');
  console.log(`📊 Total Profiles Imported: ${importedProfiles}`);
  console.log(`⚠️  Profiles Skipped: ${skipped}`);
  console.log(`🏆 Total Championships Imported: ${importedChampionships}`);

  await prisma.$disconnect();
}

if (require.main === module) {
  importCurrentWWEStars().catch(console.error);
}

export { importCurrentWWEStars };