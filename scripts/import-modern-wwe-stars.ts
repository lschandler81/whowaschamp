import { PrismaClient } from '@prisma/client';
import { toSlug } from '../lib/slug';

const prisma = new PrismaClient();

const modernWWEStars = [
  // Modern WWE Era (2010s-2020s)
  {
    name: "Braun Strowman", 
    nickname: "The Monster Among Men",
    hometown: "Sherristown, North Carolina",
    height: "203",
    weight: "171",
    debut: "2015-08-24",
    retired: false,
    description: "Massive powerhouse known for flipping over cars and ambulances in his feuds.",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      {
        title: "Universal Championship",
        promotion: "WWE",
        won: "2020-08-23",
        lost: "2020-08-30",
        days: 7,
        defenses: 0
      },
      {
        title: "WWE Intercontinental Championship",
        promotion: "WWE",
        won: "2018-06-17",
        lost: "2018-08-19",
        days: 63,
        defenses: 3
      }
    ]
  },
  {
    name: "Kevin Owens",
    nickname: "The Prizefighter",
    hometown: "Marieville, Quebec, Canada",
    height: "183",
    weight: "118",
    debut: "2014-12-11",
    retired: false,
    description: "Hard-hitting brawler known for his pop-up powerbomb and never-give-up attitude.",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      {
        title: "Universal Championship",
        promotion: "WWE", 
        won: "2016-08-29",
        lost: "2017-03-05",
        days: 188,
        defenses: 7
      },
      {
        title: "WWE Intercontinental Championship",
        promotion: "WWE",
        won: "2015-09-20",
        lost: "2016-01-25",
        days: 127,
        defenses: 6
      },
      {
        title: "WWE United States Championship",
        promotion: "WWE",
        won: "2017-05-21",
        lost: "2017-08-20", 
        days: 91,
        defenses: 4
      }
    ]
  },
  {
    name: "Sami Zayn",
    nickname: "The Underdog from the Underground",
    hometown: "Montreal, Quebec, Canada",
    height: "183",
    weight: "98",
    debut: "2013-05-02",
    retired: false,
    description: "High-energy underdog known for his ska music entrance and helluva kick finisher.",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      {
        title: "NXT Championship",
        promotion: "WWE",
        won: "2014-12-11",
        lost: "2015-04-01",
        days: 111,
        defenses: 3
      },
      {
        title: "WWE Intercontinental Championship",
        promotion: "WWE", 
        won: "2022-04-02",
        lost: "2022-07-02",
        days: 91,
        defenses: 5
      }
    ]
  },
  {
    name: "Kofi Kingston",
    nickname: "The New Day",
    hometown: "Ghana, West Africa",
    height: "183",
    weight: "98",
    debut: "2008-01-22",
    retired: false,
    description: "High-flying veteran who achieved his childhood dream of becoming WWE Champion.",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Championship",
        promotion: "WWE",
        won: "2019-04-07",
        lost: "2019-10-04",
        days: 180,
        defenses: 6
      },
      {
        title: "WWE Intercontinental Championship",
        promotion: "WWE", 
        won: "2010-01-03",
        lost: "2010-05-23",
        days: 140,
        defenses: 8
      },
      {
        title: "WWE United States Championship",
        promotion: "WWE",
        won: "2014-01-19",
        lost: "2014-05-05",
        days: 105,
        defenses: 6
      }
    ]
  },
  {
    name: "Xavier Woods",
    nickname: "The New Day",
    hometown: "Atlanta, Georgia",
    height: "180",
    weight: "95",
    debut: "2010-08-28",
    retired: false,
    description: "Energetic performer known for his trombone playing and video game streaming.",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Tag Team Championship",
        promotion: "WWE",
        won: "2015-08-23",
        lost: "2016-12-18",
        days: 483,
        defenses: 11
      }
    ]
  },
  {
    name: "Big E",
    nickname: "The Powerhouse of Positivity", 
    hometown: "Tampa, Florida",
    height: "180",
    weight: "127",
    debut: "2009-08-15",
    retired: false,
    description: "Powerhouse known for his infectious personality and belly-to-belly suplex.",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Championship",
        promotion: "WWE",
        won: "2021-09-13",
        lost: "2022-01-01",
        days: 110,
        defenses: 4
      },
      {
        title: "WWE Intercontinental Championship",
        promotion: "WWE",
        won: "2013-11-18",
        lost: "2014-12-15",
        days: 392,
        defenses: 12
      }
    ]
  },
  {
    name: "Cesaro",
    nickname: "The Swiss Superman",
    hometown: "Lucerne, Switzerland",
    height: "196",
    weight: "106",
    debut: "2011-04-29",
    retired: false,
    description: "Incredibly strong technical wrestler known for his swing and uppercuts.",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE United States Championship",
        promotion: "WWE",
        won: "2012-08-19",
        lost: "2013-05-19",
        days: 273,
        defenses: 9
      },
      {
        title: "WWE Tag Team Championship",
        promotion: "WWE",
        won: "2014-01-26",
        lost: "2014-04-06", 
        days: 70,
        defenses: 3
      }
    ]
  },
  {
    name: "Sheamus",
    nickname: "The Celtic Warrior",
    hometown: "Dublin, Ireland",
    height: "193",
    weight: "119",
    debut: "2009-06-30",
    retired: false,
    description: "Hard-hitting Irishman known for his brogue kick and warrior spirit.",
    era: "Modern",
    promotions: ["WWE"], 
    championships: [
      {
        title: "WWE Championship",
        promotion: "WWE",
        won: "2009-12-13",
        lost: "2010-06-20",
        days: 189,
        defenses: 7
      },
      {
        title: "World Heavyweight Championship",
        promotion: "WWE",
        won: "2012-11-18",
        lost: "2013-04-07",
        days: 140,
        defenses: 5
      },
      {
        title: "WWE United States Championship",
        promotion: "WWE",
        won: "2015-05-04",
        lost: "2016-01-17",
        days: 258,
        defenses: 11
      }
    ]
  },
  {
    name: "Drew McIntyre",
    nickname: "The Scottish Warrior", 
    hometown: "Ayr, Scotland",
    height: "196",
    weight: "120",
    debut: "2007-08-17",
    retired: false,
    description: "Scottish warrior who reclaimed his spot at the top after years of hard work.",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Championship",
        promotion: "WWE",
        won: "2020-04-05",
        lost: "2020-11-16",
        days: 225,
        defenses: 8
      },
      {
        title: "WWE Intercontinental Championship",
        promotion: "WWE",
        won: "2009-08-24",
        lost: "2010-05-23",
        days: 272,
        defenses: 9
      }
    ]
  },
  {
    name: "Bobby Lashley",
    nickname: "The All Mighty",
    hometown: "Junction City, Kansas",
    height: "191",
    weight: "122",
    debut: "2005-09-23",
    retired: false,
    description: "Mixed martial artist and amateur wrestler known for his incredible strength.",
    era: "Modern",
    promotions: ["WWE", "TNA"],
    championships: [
      {
        title: "WWE Championship",
        promotion: "WWE",
        won: "2021-03-01",
        lost: "2021-09-21",
        days: 204,
        defenses: 7
      },
      {
        title: "ECW Championship",
        promotion: "WWE",
        won: "2007-06-24",
        lost: "2007-07-29",
        days: 35,
        defenses: 1
      }
    ]
  },
  {
    name: "The Miz",
    nickname: "The A-Lister",
    hometown: "Cleveland, Ohio",
    height: "185",
    weight: "100",
    debut: "2006-07-25",
    retired: false,
    description: "Reality TV star turned wrestler, known for his Hollywood persona and mic skills.",
    era: "PG",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Championship",
        promotion: "WWE",
        won: "2010-11-22",
        lost: "2011-05-01",
        days: 160,
        defenses: 6
      },
      {
        title: "WWE Intercontinental Championship",
        promotion: "WWE",
        won: "2010-01-18",
        lost: "2010-05-03",
        days: 105,
        defenses: 7
      }
    ]
  },
  {
    name: "Dolph Ziggler",
    nickname: "The Show-Off",
    hometown: "Hollywood, Florida",
    height: "183",
    weight: "98",
    debut: "2008-09-15",
    retired: false,
    description: "Amateur wrestler turned sports entertainer known for his incredible athleticism.",
    era: "PG",
    promotions: ["WWE"],
    championships: [
      {
        title: "World Heavyweight Championship",
        promotion: "WWE",
        won: "2013-04-08",
        lost: "2013-06-16",
        days: 69,
        defenses: 2
      },
      {
        title: "WWE Intercontinental Championship", 
        promotion: "WWE",
        won: "2012-06-18",
        lost: "2012-08-19",
        days: 62,
        defenses: 4
      }
    ]
  },
  {
    name: "Damien Sandow",
    nickname: "The Intellectual Savior",
    hometown: "Palo Alto, California",
    height: "185",
    weight: "104",
    debut: "2010-06-07",
    retired: true,
    description: "Intellectual character known for his Money in the Bank cash-in attempt.",
    era: "PG",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Tag Team Championship",
        promotion: "WWE",
        won: "2013-09-22",
        lost: "2013-11-18",
        days: 57,
        defenses: 2
      }
    ]
  },
  {
    name: "Wade Barrett",
    nickname: "Bad News",
    hometown: "Preston, England",
    height: "196",
    weight: "118",
    debut: "2010-06-07",
    retired: true,
    description: "Leader of The Nexus invasion and former bare-knuckle boxer from England.",
    era: "PG", 
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Intercontinental Championship",
        promotion: "WWE",
        won: "2010-12-19",
        lost: "2011-03-28",
        days: 99,
        defenses: 4
      }
    ]
  },
  {
    name: "Ryback",
    nickname: "The Big Guy", 
    hometown: "Las Vegas, Nevada",
    height: "196",
    weight: "129",
    debut: "2012-04-02",
    retired: true,
    description: "Powerhouse known for his 'Feed Me More' catchphrase and Goldberg-like entrance.",
    era: "PG",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Intercontinental Championship",
        promotion: "WWE",
        won: "2015-04-27",
        lost: "2015-05-31",
        days: 34,
        defenses: 1
      }
    ]
  },
  {
    name: "Curtis Axel",
    nickname: "The Perfect Son",
    hometown: "Champlin, Minnesota", 
    height: "185",
    weight: "104",
    debut: "2007-01-15",
    retired: false,
    description: "Third generation wrestler, son of Mr. Perfect Curt Hennig.",
    era: "PG",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Intercontinental Championship", 
        promotion: "WWE",
        won: "2013-06-16",
        lost: "2013-11-18",
        days: 155,
        defenses: 8
      }
    ]
  },
  {
    name: "Rusev",
    nickname: "The Bulgarian Brute",
    hometown: "Plovdiv, Bulgaria",
    height: "188",
    weight: "127",
    debut: "2014-01-13",
    retired: false,
    description: "Former MMA fighter turned wrestler with a patriotic Bulgarian character.",
    era: "Modern",
    promotions: ["WWE"], 
    championships: [
      {
        title: "WWE United States Championship",
        promotion: "WWE",
        won: "2014-11-03",
        lost: "2015-06-14",
        days: 223,
        defenses: 9
      }
    ]
  },
  {
    name: "Baron Corbin",
    nickname: "The Lone Wolf", 
    hometown: "Kansas City, Missouri",
    height: "201",
    weight: "122",
    debut: "2012-09-12",
    retired: false,
    description: "Former NFL player and Golden Gloves boxer turned wrestler.",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      {
        title: "Money in the Bank",
        promotion: "WWE",
        won: "2017-06-18",
        lost: "2017-08-15",
        days: 58,
        defenses: 0
      }
    ]
  },
  {
    name: "Apollo Crews",
    nickname: "The One Man Nation",
    hometown: "Atlanta, Georgia",
    height: "183",
    weight: "109",
    debut: "2015-08-22",
    retired: false,
    description: "Incredible athlete known for his amazing strength and gorilla press slam.",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE United States Championship",
        promotion: "WWE",
        won: "2021-04-11",
        lost: "2021-08-21",
        days: 132,
        defenses: 7
      }
    ]
  },
  {
    name: "Ricochet",
    nickname: "The One and Only",
    hometown: "Louisville, Kentucky",
    height: "175",
    weight: "82",
    debut: "2018-01-27",
    retired: false,
    description: "High-flying sensation known for his incredible aerial ability.",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE United States Championship",
        promotion: "WWE",
        won: "2019-06-07",
        lost: "2019-07-14",
        days: 37,
        defenses: 2
      },
      {
        title: "NXT North American Championship",
        promotion: "WWE", 
        won: "2018-07-25",
        lost: "2019-02-16",
        days: 206,
        defenses: 9
      }
    ]
  }
];

async function importModernWWEStars() {
  console.log('🌟 Importing Modern WWE Era Stars...\n');
  
  let imported = 0;
  let skipped = 0;
  
  for (const wrestler of modernWWEStars) {
    try {
      // Check if wrestler already exists
      const existingProfile = await prisma.profile.findFirst({
        where: { name: wrestler.name }
      });
      
      if (existingProfile) {
        console.log(`⚠️  Skipping ${wrestler.name} - already exists`);
        skipped++;
        continue;
      }

      // Get or create promotions
      const promotionIds: string[] = [];
      for (const promotionName of wrestler.promotions) {
        let promotion = await prisma.promotion.findFirst({
          where: { 
            OR: [
              { name: promotionName },
              { name: promotionName === 'WWE' ? 'World Wrestling Entertainment' : promotionName }
            ]
          }
        });
        
        if (!promotion) {
          try {
            promotion = await prisma.promotion.create({
              data: {
                name: promotionName,
                slug: toSlug(promotionName)
              }
            });
          } catch (error) {
            // If creation fails due to duplicate slug/name, try to find it again
            promotion = await prisma.promotion.findFirst({
              where: { 
                OR: [
                  { name: promotionName },
                  { slug: toSlug(promotionName) }
                ]
              }
            });
          }
        }
        
        if (promotion) {
          promotionIds.push(promotion.id);
        }
      }

      // Create wrestler profile
      const profile = await prisma.profile.create({
        data: {
          name: wrestler.name,
          slug: toSlug(wrestler.name),
          nickname: wrestler.nickname,
          type: 'wrestler',
          hometown: wrestler.hometown,
          height: wrestler.height,
          weight: wrestler.weight,
          debut: wrestler.debut ? new Date(wrestler.debut) : null,
          retired: wrestler.retired ? new Date() : null,
          bio: wrestler.description,
          wrestler: {
            create: {
              era: wrestler.era,
              finisher: null
            }
          },
          promotions: {
            create: promotionIds.map(promotionId => ({
              promotionId
            }))
          }
        }
      });

      // Add championships
      let championshipCount = 0;
      for (const championship of wrestler.championships) {
        try {
          // Get or create promotion for championship
          let promotion = await prisma.promotion.findFirst({
            where: { 
              OR: [
                { name: championship.promotion },
                { name: championship.promotion === 'WWE' ? 'World Wrestling Entertainment' : championship.promotion }
              ]
            }
          });
          
          if (!promotion) {
            try {
              promotion = await prisma.promotion.create({
                data: {
                  name: championship.promotion,
                  slug: toSlug(championship.promotion)
                }
              });
            } catch (error) {
              // If creation fails, try to find it again
              promotion = await prisma.promotion.findFirst({
                where: { 
                  OR: [
                    { name: championship.promotion },
                    { slug: toSlug(championship.promotion) }
                  ]
                }
              });
            }
          }

          if (!promotion) {
            console.log(`   ❌ Could not find or create promotion ${championship.promotion}`);
            continue;
          }

          // Create championship entry
          await prisma.championship.create({
            data: {
              profileId: profile.id,
              titleName: championship.title,
              promotionId: promotion.id,
              reignNumber: 1,
              wonDate: new Date(championship.won),
              lostDate: championship.lost ? new Date(championship.lost) : null,
              daysHeld: championship.days,
              isCurrentChampion: !championship.lost
            }
          });

          championshipCount++;
        } catch (error) {
          console.log(`   ❌ Failed to add championship ${championship.title}: ${error}`);
        }
      }

      console.log(`✅ Created ${wrestler.name} (${wrestler.nickname}) with ${championshipCount} championships`);
      imported++;
      
    } catch (error) {
      console.error(`❌ Failed to import ${wrestler.name}: ${error}`);
      skipped++;
    }
  }
  
  console.log(`\n🎯 Import Summary:`);
  console.log(`   ✅ Successfully imported: ${imported} wrestlers`);
  console.log(`   ⚠️  Skipped: ${skipped} wrestlers`);
  console.log(`   📊 Total processed: ${modernWWEStars.length} wrestlers`);
}

importModernWWEStars()
  .catch(console.error)
  .finally(() => prisma.$disconnect());