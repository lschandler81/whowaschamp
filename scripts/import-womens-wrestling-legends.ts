import { PrismaClient } from '@prisma/client';
import { toSlug } from '../lib/slug';

const prisma = new PrismaClient();

const womensWrestlingLegends = [
  // Women's Wrestling Legends Across All Eras
  {
    name: "Chyna",
    nickname: "The Ninth Wonder of the World",
    hometown: "Rochester, New York",
    height: "180",
    weight: "84",
    debut: "1995-03-01",
    retired: true,
    description: "Groundbreaking female wrestler who competed with men and broke barriers in WWE.",
    era: "Attitude",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Intercontinental Championship",
        promotion: "WWE",
        won: "1999-02-14",
        lost: "1999-03-28",
        days: 42,
        defenses: 2
      },
      {
        title: "WWE Women's Championship",
        promotion: "WWE",
        won: "2001-03-30",
        lost: "2001-08-23",
        days: 146,
        defenses: 6
      }
    ]
  },
  {
    name: "Lita",
    nickname: "The Thrill-Seeker",
    hometown: "Sanford, North Carolina",
    height: "165",
    weight: "56",
    debut: "1999-02-13",
    retired: true,
    description: "High-flying daredevil who revolutionized women's wrestling with her extreme style.",
    era: "Attitude",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Women's Championship",
        promotion: "WWE",
        won: "2000-08-21",
        lost: "2001-04-01",
        days: 223,
        defenses: 8
      },
      {
        title: "WWE Women's Championship",
        promotion: "WWE",
        won: "2004-09-13",
        lost: "2005-04-03",
        days: 202,
        defenses: 7
      }
    ]
  },
  {
    name: "Victoria",
    nickname: "The Hardcore Diva",
    hometown: "San Bernardino, California",
    height: "168",
    weight: "59",
    debut: "2002-07-29",
    retired: true,
    description: "Former fitness competitor known for her aggressive style and memorable feuds.",
    era: "Ruthless Aggression",
    promotions: ["WWE", "TNA"],
    championships: [
      {
        title: "WWE Women's Championship",
        promotion: "WWE",
        won: "2002-11-17",
        lost: "2003-06-30",
        days: 225,
        defenses: 9
      },
      {
        title: "TNA Knockouts Championship",
        promotion: "TNA",
        won: "2008-10-12",
        lost: "2009-01-04",
        days: 84,
        defenses: 4
      }
    ]
  },
  {
    name: "Molly Holly",
    nickname: "Mighty Molly",
    hometown: "Forest Lake, Minnesota",
    height: "163",
    weight: "52",
    debut: "2000-09-24",
    retired: true,
    description: "Technical wrestler known for her wholesome character and championship reigns.",
    era: "Ruthless Aggression", 
    promotions: ["WWE", "WCW"],
    championships: [
      {
        title: "WWE Women's Championship",
        promotion: "WWE",
        won: "2002-07-21",
        lost: "2002-11-17",
        days: 119,
        defenses: 5
      },
      {
        title: "WWE Hardcore Championship",
        promotion: "WWE",
        won: "2002-02-17",
        lost: "2002-02-18",
        days: 1,
        defenses: 0
      }
    ]
  },
  {
    name: "Jazz",
    nickname: "The Baddest",
    hometown: "New Orleans, Louisiana",
    height: "170",
    weight: "64",
    debut: "1998-01-01",
    retired: false,
    description: "Tough competitor known for her hardcore style and ECW background.",
    era: "Ruthless Aggression",
    promotions: ["WWE", "ECW"],
    championships: [
      {
        title: "WWE Women's Championship",
        promotion: "WWE", 
        won: "2003-06-30",
        lost: "2004-03-14",
        days: 258,
        defenses: 10
      }
    ]
  },
  {
    name: "Gail Kim",
    nickname: "The Queen Bee",
    hometown: "Toronto, Ontario, Canada",
    height: "165",
    weight: "52",
    debut: "2002-06-01",
    retired: true,
    description: "Talented high-flyer who made history as the first Asian Women's Champion in WWE.",
    era: "Ruthless Aggression",
    promotions: ["WWE", "TNA"],
    championships: [
      {
        title: "WWE Women's Championship",
        promotion: "WWE",
        won: "2003-06-30",
        lost: "2003-08-18",
        days: 49,
        defenses: 2
      },
      {
        title: "TNA Knockouts Championship",
        promotion: "TNA",
        won: "2007-10-14",
        lost: "2008-01-13",
        days: 91,
        defenses: 6
      }
    ]
  },
  {
    name: "Mickie James",
    nickname: "Hardcore Country",
    hometown: "Richmond, Virginia",
    height: "160",
    weight: "56",
    debut: "2003-01-01",
    retired: false,
    description: "Country music singer and multi-time champion known for her versatility.",
    era: "Ruthless Aggression",
    promotions: ["WWE", "TNA"],
    championships: [
      {
        title: "WWE Women's Championship",
        promotion: "WWE",
        won: "2006-04-02",
        lost: "2007-02-19",
        days: 323,
        defenses: 11
      },
      {
        title: "TNA Knockouts Championship",
        promotion: "TNA",
        won: "2009-01-04", 
        lost: "2009-07-19",
        days: 196,
        defenses: 8
      }
    ]
  },
  {
    name: "Melina",
    nickname: "The Paparazzi Princess",
    hometown: "Los Angeles, California", 
    height: "165",
    weight: "50",
    debut: "2004-04-05",
    retired: false,
    description: "Flexible and athletic performer known for her unique entrance and feuds.",
    era: "Ruthless Aggression",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Women's Championship",
        promotion: "WWE",
        won: "2007-02-19",
        lost: "2008-01-27",
        days: 342,
        defenses: 12
      },
      {
        title: "WWE Divas Championship",
        promotion: "WWE",
        won: "2009-08-23",
        lost: "2010-02-21",
        days: 182,
        defenses: 7
      }
    ]
  },
  {
    name: "Beth Phoenix",
    nickname: "The Glamazon",
    hometown: "Buffalo, New York",
    height: "175",
    weight: "68",
    debut: "2004-10-01",
    retired: true,
    description: "Powerhouse known for her incredible strength and glamorous presentation.",
    era: "Ruthless Aggression",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Women's Championship",
        promotion: "WWE",
        won: "2007-10-07",
        lost: "2008-08-17",
        days: 315,
        defenses: 11
      },
      {
        title: "WWE Divas Championship", 
        promotion: "WWE",
        won: "2010-01-31",
        lost: "2011-04-11",
        days: 434,
        defenses: 15
      }
    ]
  },
  {
    name: "Michelle McCool",
    nickname: "The Cool One",
    hometown: "Palatka, Florida",
    height: "175",
    weight: "59",
    debut: "2004-09-17",
    retired: true,
    description: "Former teacher who became the first WWE Divas Champion and formed LayCool.",
    era: "Ruthless Aggression",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Divas Championship",
        promotion: "WWE",
        won: "2008-07-20",
        lost: "2009-04-05",
        days: 259,
        defenses: 9
      },
      {
        title: "WWE Women's Championship",
        promotion: "WWE",
        won: "2009-07-26",
        lost: "2010-01-31",
        days: 189,
        defenses: 7
      }
    ]
  },
  {
    name: "Layla",
    nickname: "The English Rose",
    hometown: "London, England",
    height: "160",
    weight: "50",
    debut: "2006-05-26",
    retired: true,
    description: "Former dancer who became a successful wrestler and formed LayCool with McCool.",
    era: "PG",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Divas Championship",
        promotion: "WWE",
        won: "2010-05-23",
        lost: "2012-04-29",
        days: 706,
        defenses: 22
      }
    ]
  },
  {
    name: "Kaitlyn",
    nickname: "The Hybrid Diva",
    hometown: "Houston, Texas",
    height: "175",
    weight: "63",
    debut: "2010-08-24",
    retired: true,
    description: "Former bodybuilder and Tough Enough winner known for her strength.",
    era: "PG",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Divas Championship",
        promotion: "WWE",
        won: "2013-01-28",
        lost: "2013-08-18",
        days: 202,
        defenses: 8
      }
    ]
  },
  {
    name: "AJ Lee",
    nickname: "The Black Widow",
    hometown: "Union City, New Jersey",
    height: "157",
    weight: "52",
    debut: "2009-05-15",
    retired: true,
    description: "Mental health advocate known for her 'crazy' character and record-breaking title reign.",
    era: "PG", 
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Divas Championship", 
        promotion: "WWE",
        won: "2013-06-16",
        lost: "2014-04-06",
        days: 294,
        defenses: 11
      }
    ]
  },
  {
    name: "Paige",
    nickname: "The Anti-Diva",
    hometown: "Norwich, England",
    height: "173",
    weight: "54",
    debut: "2005-12-01",
    retired: true,
    description: "Youngest Divas Champion in history, known for her goth appearance and wrestling family.",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Divas Championship",
        promotion: "WWE",
        won: "2014-04-07",
        lost: "2014-08-17",
        days: 132,
        defenses: 5
      },
      {
        title: "NXT Women's Championship",
        promotion: "WWE",
        won: "2013-06-20",
        lost: "2014-04-03",
        days: 287,
        defenses: 10
      }
    ]
  },
  {
    name: "Nikki Bella",
    nickname: "Fearless Nikki",
    hometown: "San Diego, California",
    height: "168",
    weight: "56",
    debut: "2007-11-23",
    retired: true,
    description: "Reality TV star and longest-reigning Divas Champion in WWE history.",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Divas Championship",
        promotion: "WWE",
        won: "2014-11-23",
        lost: "2015-09-20",
        days: 301,
        defenses: 12
      }
    ]
  },
  {
    name: "Brie Bella",
    nickname: "Brie Mode",
    hometown: "San Diego, California", 
    height: "168",
    weight: "55",
    debut: "2007-11-23",
    retired: true,
    description: "Twin sister of Nikki Bella, known for her 'Yes!' chants and Daniel Bryan marriage.",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Divas Championship",
        promotion: "WWE",
        won: "2011-04-11",
        lost: "2011-06-20",
        days: 70,
        defenses: 3
      }
    ]
  },
  {
    name: "Natalya",
    nickname: "The Queen of Harts",
    hometown: "Calgary, Alberta, Canada",
    height: "165",
    weight: "61",
    debut: "2007-01-01",
    retired: false,
    description: "Third generation Hart family wrestler known for her technical ability.",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Divas Championship",
        promotion: "WWE",
        won: "2010-09-19",
        lost: "2011-01-30",
        days: 133,
        defenses: 5
      },
      {
        title: "SmackDown Women's Championship",
        promotion: "WWE",
        won: "2017-08-13",
        lost: "2017-11-14",
        days: 93,
        defenses: 4
      }
    ]
  },
  {
    name: "Eve Torres",
    nickname: "Hoeski",
    hometown: "Boston, Massachusetts",
    height: "165",
    weight: "56",
    debut: "2007-08-13",
    retired: true,
    description: "Former model and dancer who became a three-time Divas Champion.",
    era: "PG",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Divas Championship",
        promotion: "WWE",
        won: "2010-04-26",
        lost: "2010-05-23",
        days: 27,
        defenses: 1
      }
    ]
  },
  {
    name: "Kelly Kelly",
    nickname: "Kelly Kelly",
    hometown: "Jacksonville, Florida",
    height: "163",
    weight: "50",
    debut: "2006-06-13",
    retired: true,
    description: "Former model known for her energetic personality and championship reign.",
    era: "PG",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Divas Championship", 
        promotion: "WWE",
        won: "2011-06-20",
        lost: "2011-10-02",
        days: 104,
        defenses: 4
      }
    ]
  },
  {
    name: "Maryse",
    nickname: "The Sexiest of the Sexy",
    hometown: "Montreal, Quebec, Canada",
    height: "175",
    weight: "56",
    debut: "2006-08-20",
    retired: false,
    description: "French-Canadian model who became a two-time Divas Champion.",
    era: "PG",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Divas Championship",
        promotion: "WWE",
        won: "2008-12-28",
        lost: "2009-08-23",
        days: 238,
        defenses: 9
      }
    ]
  }
];

async function importWomensWrestlingLegends() {
  console.log('👑 Importing Women\'s Wrestling Legends...\n');
  
  let imported = 0;
  let skipped = 0;
  
  for (const wrestler of womensWrestlingLegends) {
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
      const promotionIds: number[] = [];
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
  console.log(`   📊 Total processed: ${womensWrestlingLegends.length} wrestlers`);
}

importWomensWrestlingLegends()
  .catch(console.error)
  .finally(() => prisma.$disconnect());