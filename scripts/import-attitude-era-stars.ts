import { PrismaClient } from '@prisma/client';
import { toSlug } from '../lib/slug';

const prisma = new PrismaClient();

const attitudeEraWrestlers = [
  // Attitude Era Stars (Missing from current database)
  {
    name: "Big Boss Man",
    nickname: "The Big Boss Man",
    hometown: "Cobb County, Georgia",
    height: "201",
    weight: "151", 
    debut: "1986-11-15",
    retired: true,
    description: "Former prison guard turned wrestler, known for his nightstick and hard-hitting style.",
    era: "Attitude",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Hardcore Championship",
        promotion: "WWE",
        won: "1998-11-15",
        lost: "1999-01-04",
        days: 50,
        defenses: 4
      },
      {
        title: "WWE Tag Team Championship", 
        promotion: "WWE",
        won: "1988-12-13",
        lost: "1989-07-29",
        days: 228,
        defenses: 6
      }
    ]
  },
  {
    name: "D-Lo Brown",
    nickname: "The Real Deal",
    hometown: "New Jersey",
    height: "185",
    weight: "118",
    debut: "1993-10-01", 
    retired: false,
    description: "High-energy performer known for his head-shake entrance and European Championship reigns.",
    era: "Attitude",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE European Championship",
        promotion: "WWE",
        won: "1998-07-26",
        lost: "1999-05-10",
        days: 287,
        defenses: 8
      },
      {
        title: "WWE Intercontinental Championship",
        promotion: "WWE",
        won: "1999-07-25", 
        lost: "1999-08-22",
        days: 28,
        defenses: 1
      }
    ]
  },
  {
    name: "Mark Henry",
    nickname: "The World's Strongest Man",
    hometown: "Silsbee, Texas",
    height: "196",
    weight: "181",
    debut: "1996-05-11",
    retired: true,
    description: "Olympic weightlifter turned wrestler, holder of multiple powerlifting world records.",
    era: "Attitude", 
    promotions: ["WWE"],
    championships: [
      {
        title: "World Heavyweight Championship",
        promotion: "WWE",
        won: "2011-09-18",
        lost: "2011-11-20",
        days: 63,
        defenses: 2
      },
      {
        title: "ECW Championship",
        promotion: "WWE",
        won: "2008-01-13",
        lost: "2008-05-13", 
        days: 120,
        defenses: 4
      }
    ]
  },
  {
    name: "Test",
    nickname: "Big Boot",
    hometown: "Toronto, Ontario, Canada",
    height: "206",
    weight: "136",
    debut: "1997-10-13",
    retired: true,
    description: "Tall powerhouse known for his big boot finisher and involvement with the McMahon-Helmsley storyline.",
    era: "Attitude",
    promotions: ["WWE", "WCW"],
    championships: [
      {
        title: "WWE Intercontinental Championship", 
        promotion: "WWE",
        won: "1999-11-14",
        lost: "2000-01-03",
        days: 50,
        defenses: 2
      },
      {
        title: "WCW United States Heavyweight Championship",
        promotion: "WCW", 
        won: "2001-07-30",
        lost: "2001-08-12",
        days: 13,
        defenses: 0
      }
    ]
  },
  {
    name: "Albert",
    nickname: "The Hip Hop Hippo", 
    hometown: "Boston, Massachusetts",
    height: "188",
    weight: "159",
    debut: "1999-06-01",
    retired: false,
    description: "Large athlete known for his agility and partnerships with Test and X-Pac.",
    era: "Attitude",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Intercontinental Championship",
        promotion: "WWE",
        won: "2001-04-01",
        lost: "2001-05-20",
        days: 49,
        defenses: 3
      }
    ]
  },
  {
    name: "Val Venis", 
    nickname: "The Big Valbowski",
    hometown: "Las Vegas, Nevada", 
    height: "188",
    weight: "116",
    debut: "1991-01-01",
    retired: true,
    description: "Adult film star character known for his provocative entrance and in-ring ability.",
    era: "Attitude",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Intercontinental Championship",
        promotion: "WWE",
        won: "1999-02-14",
        lost: "1999-03-14", 
        days: 28,
        defenses: 1
      },
      {
        title: "WWE European Championship",
        promotion: "WWE",
        won: "1999-07-25",
        lost: "2000-01-31",
        days: 190,
        defenses: 7
      }
    ]
  },
  {
    name: "Godfather",
    nickname: "The Godfather",
    hometown: "Las Vegas, Nevada",
    height: "196", 
    weight: "145",
    debut: "1991-09-01",
    retired: true,
    description: "Pimp character known for his ho train and entertaining entrance.",
    era: "Attitude",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Intercontinental Championship",
        promotion: "WWE", 
        won: "1999-04-12",
        lost: "1999-05-10",
        days: 28,
        defenses: 1
      }
    ]
  },
  {
    name: "Steve Blackman",
    nickname: "The Lethal Weapon",
    hometown: "Annville, Pennsylvania",
    height: "188",
    weight: "109", 
    debut: "1988-01-01",
    retired: true,
    description: "Martial arts expert known for his kendo stick and serious demeanor.",
    era: "Attitude",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Hardcore Championship",
        promotion: "WWE",
        won: "2000-06-29",
        lost: "2000-09-24",
        days: 87,
        defenses: 12
      }
    ]
  },
  {
    name: "Al Snow",
    nickname: "Head", 
    hometown: "Lima, Ohio",
    height: "188",
    weight: "104",
    debut: "1982-10-01",
    retired: false,
    description: "Hardcore legend known for his mannequin head prop and J.O.B. Squad leadership.",
    era: "Attitude",
    promotions: ["WWE", "ECW"],
    championships: [
      {
        title: "WWE Hardcore Championship",
        promotion: "WWE",
        won: "1999-02-15", 
        lost: "1999-03-15",
        days: 28,
        defenses: 6
      },
      {
        title: "WWE European Championship",
        promotion: "WWE",
        won: "1999-03-15",
        lost: "1999-04-12",
        days: 28,
        defenses: 2
      }
    ]
  },
  {
    name: "Crash Holly",
    nickname: "Hardcore Holly",
    hometown: "Mobile, Alabama", 
    height: "175",
    weight: "76",
    debut: "1999-08-26",
    retired: true,
    description: "Hardcore division mainstay known for claiming to weigh over 400 pounds.",
    era: "Attitude",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Hardcore Championship",
        promotion: "WWE",
        won: "2000-01-24",
        lost: "2000-02-27",
        days: 34,
        defenses: 8
      },
      {
        title: "WWE Light Heavyweight Championship", 
        promotion: "WWE",
        won: "2000-03-13",
        lost: "2000-05-15",
        days: 63,
        defenses: 4
      }
    ]
  },
  {
    name: "Hardcore Holly",
    nickname: "The Alabama Slammer",
    hometown: "Mobile, Alabama",
    height: "185",
    weight: "108",
    debut: "1994-01-10", 
    retired: true,
    description: "Tough veteran known for his hard-hitting style and NASCAR racing gimmick.",
    era: "Attitude",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Tag Team Championship",
        promotion: "WWE",
        won: "1999-10-18",
        lost: "2000-01-10", 
        days: 84,
        defenses: 3
      },
      {
        title: "WWE Hardcore Championship",
        promotion: "WWE",
        won: "2000-04-02",
        lost: "2000-04-03",
        days: 1,
        defenses: 0
      }
    ]
  },
  {
    name: "Viscera",
    nickname: "The World's Largest Love Machine",
    hometown: "Harlem, New York",
    height: "203", 
    weight: "227",
    debut: "1993-07-01",
    retired: true,
    description: "Massive athlete who evolved from evil Undertaker ally to dancing entertainer.",
    era: "Attitude",
    promotions: ["WWE"],
    championships: []
  },
  {
    name: "Mideon", 
    nickname: "Naked Mideon",
    hometown: "The Bowery",
    height: "196",
    weight: "136",
    debut: "1995-05-01",
    retired: true,
    description: "Ministry of Darkness member known for his bizarre naked phase.",
    era: "Attitude",
    promotions: ["WWE"],
    championships: []
  },
  {
    name: "Droz",
    nickname: "Puke",
    hometown: "New Jersey", 
    height: "188",
    weight: "118",
    debut: "1998-06-01",
    retired: true,
    description: "Former NFL player whose career was cut short due to an in-ring injury.",
    era: "Attitude",
    promotions: ["WWE"],
    championships: []
  },
  {
    name: "Prince Albert",
    nickname: "The Piercing Prince", 
    hometown: "Parts Unknown",
    height: "201",
    weight: "159",
    debut: "1999-01-01",
    retired: true,
    description: "Intimidating big man known for his body piercings and association with Boss Man.",
    era: "Attitude",
    promotions: ["WWE"],
    championships: []
  },
  {
    name: "Bull Buchanan",
    nickname: "B²",
    hometown: "Philadelphia, Pennsylvania",
    height: "201",
    weight: "136", 
    debut: "2000-01-01",
    retired: true,
    description: "Tag team specialist known for partnering with Boss Man and Goodfather.",
    era: "Attitude",
    promotions: ["WWE"],
    championships: []
  },
  {
    name: "The Big Show",
    nickname: "The World's Largest Athlete",
    hometown: "Tampa, Florida",
    height: "213",
    weight: "181",
    debut: "1995-02-20",
    retired: false,
    description: "Massive athlete and former basketball player, one of the most dominant big men ever.",
    era: "Attitude", 
    promotions: ["WCW", "WWE"],
    championships: [
      {
        title: "WWE Championship",
        promotion: "WWE",
        won: "1999-11-14",
        lost: "2000-01-03",
        days: 50,
        defenses: 2
      },
      {
        title: "WCW World Heavyweight Championship",
        promotion: "WCW",
        won: "1996-07-07", 
        lost: "1996-08-10",
        days: 34,
        defenses: 1
      },
      {
        title: "WWE Tag Team Championship",
        promotion: "WWE",
        won: "2002-09-23",
        lost: "2002-11-17",
        days: 55,
        defenses: 4
      }
    ]
  },
  {
    name: "Rikishi", 
    nickname: "The Dancing Machine",
    hometown: "San Francisco, California",
    height: "191",
    weight: "188",
    debut: "1985-10-01",
    retired: true,
    description: "Samoan powerhouse known for his stinkface finisher and dancing entrance.",
    era: "Attitude",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Intercontinental Championship",
        promotion: "WWE",
        won: "2000-10-19", 
        lost: "2000-10-22",
        days: 3,
        defenses: 0
      },
      {
        title: "WWE Tag Team Championship",
        promotion: "WWE",
        won: "2000-08-28",
        lost: "2000-10-19",
        days: 52,
        defenses: 3
      }
    ]
  },
  {
    name: "Too Cool",
    nickname: "The Dancing Duo",
    hometown: "Various",
    height: "185",
    weight: "104",
    debut: "1999-01-01", 
    retired: true,
    description: "Fan-favorite tag team known for their post-match dance celebrations.",
    era: "Attitude",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Tag Team Championship",
        promotion: "WWE",
        won: "2000-05-29",
        lost: "2000-08-28",
        days: 91,
        defenses: 6
      }
    ]
  },
  {
    name: "Road Dogg", 
    nickname: "The Road Dogg",
    hometown: "Marietta, Georgia", 
    height: "185",
    weight: "107",
    debut: "1994-01-01",
    retired: true,
    description: "D-Generation X member known for his charismatic mic work and tag team success.",
    era: "Attitude",
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Intercontinental Championship",
        promotion: "WWE",
        won: "1999-01-04",
        lost: "1999-02-14", 
        days: 41,
        defenses: 2
      },
      {
        title: "WWE Tag Team Championship", 
        promotion: "WWE",
        won: "1997-07-14",
        lost: "1998-03-29",
        days: 258,
        defenses: 11
      }
    ]
  }
];

async function importAttitudeEraStars() {
  console.log('🔥 Importing Attitude Era Wrestling Stars...\n');
  
  let imported = 0;
  let skipped = 0;
  
  for (const wrestler of attitudeEraWrestlers) {
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
  console.log(`   📊 Total processed: ${attitudeEraWrestlers.length} wrestlers`);
}

importAttitudeEraStars()
  .catch(console.error)
  .finally(() => prisma.$disconnect());