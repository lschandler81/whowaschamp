import { PrismaClient } from '@prisma/client';
import { toSlug } from '../lib/slug';

const prisma = new PrismaClient();

const ecwLegends = [
  // ECW Originals and Legends
  {
    name: "Tommy Dreamer",
    nickname: "The Innovator of Violence",
    hometown: "Yonkers, New York",
    height: "188",
    weight: "118",
    debut: "1989-07-04",
    retired: false,
    description: "ECW's heart and soul, known for his extreme hardcore matches and loyalty to the company.",
    era: "Attitude",
    promotions: ["ECW", "WWE"],
    championships: [
      {
        title: "ECW Heavyweight Championship",
        promotion: "ECW",
        won: "2000-08-26",
        lost: "2000-10-22",
        days: 57,
        defenses: 3
      },
      {
        title: "ECW Tag Team Championship",
        promotion: "ECW",
        won: "1996-02-17",
        lost: "1996-09-07",
        days: 202,
        defenses: 8
      },
      {
        title: "WWE Hardcore Championship",
        promotion: "WWE",
        won: "2000-04-23",
        lost: "2000-05-15",
        days: 22,
        defenses: 4
      }
    ]
  },
  {
    name: "Sandman",
    nickname: "The Hardcore Icon",
    hometown: "Philadelphia, Pennsylvania",
    height: "180",
    weight: "102",
    debut: "1989-04-03",
    retired: true,
    description: "ECW's beer-drinking, cigarette-smoking antihero known for his Singapore cane and Enter Sandman entrance.",
    era: "Attitude",
    promotions: ["ECW", "WWE"],
    championships: [
      {
        title: "ECW Heavyweight Championship",
        promotion: "ECW",
        won: "1995-06-24",
        lost: "1996-02-17",
        days: 238,
        defenses: 12
      },
      {
        title: "ECW Tag Team Championship",
        promotion: "ECW",
        won: "1994-05-14",
        lost: "1994-11-05",
        days: 175,
        defenses: 6
      }
    ]
  },
  {
    name: "Raven",
    nickname: "The Flock Leader",
    hometown: "The Bowery",
    height: "185",
    weight: "107",
    debut: "1988-08-01",
    retired: true,
    description: "Grunge-inspired villain known for his psychological mind games and Raven's Nest stable.",
    era: "Attitude",
    promotions: ["ECW", "WCW", "WWE"],
    championships: [
      {
        title: "ECW Heavyweight Championship",
        promotion: "ECW",
        won: "1995-04-08",
        lost: "1995-06-24",
        days: 77,
        defenses: 4
      },
      {
        title: "WCW United States Heavyweight Championship",
        promotion: "WCW",
        won: "1998-07-20",
        lost: "1998-10-26",
        days: 98,
        defenses: 5
      },
      {
        title: "WWE Hardcore Championship",
        promotion: "WWE",
        won: "2000-05-04",
        lost: "2000-06-05",
        days: 32,
        defenses: 8
      }
    ]
  },
  {
    name: "Tazz",
    nickname: "The Human Suplex Machine",
    hometown: "Red Hook, Brooklyn, New York",
    height: "175",
    weight: "109",
    debut: "1991-01-01",
    retired: true,
    description: "Submission specialist known for the Tazzmission and his undefeated streak in ECW.",
    era: "Attitude",
    promotions: ["ECW", "WWE"],
    championships: [
      {
        title: "ECW Heavyweight Championship",
        promotion: "ECW",
        won: "1999-01-10",
        lost: "2000-04-13",
        days: 459,
        defenses: 18
      },
      {
        title: "ECW Television Championship",
        promotion: "ECW",
        won: "1995-01-07",
        lost: "1998-12-13",
        days: 1436,
        defenses: 34
      },
      {
        title: "WWE Hardcore Championship",
        promotion: "WWE",
        won: "2000-06-25",
        lost: "2000-07-23",
        days: 28,
        defenses: 3
      }
    ]
  },
  {
    name: "Rob Van Dam",
    nickname: "Mr. Monday Night",
    hometown: "Battle Creek, Michigan",
    height: "183",
    weight: "107",
    debut: "1990-06-04",
    retired: false,
    description: "High-flying innovator known for his unique offense and 'The Whole F'N Show' persona.",
    era: "Attitude",
    promotions: ["ECW", "WWE", "TNA"],
    championships: [
      {
        title: "ECW Television Championship",
        promotion: "ECW",
        won: "1998-12-13",
        lost: "2001-03-11",
        days: 818,
        defenses: 41
      },
      {
        title: "WWE Championship",
        promotion: "WWE",
        won: "2006-06-11",
        lost: "2006-07-03",
        days: 22,
        defenses: 1
      },
      {
        title: "ECW Heavyweight Championship",
        promotion: "ECW",
        won: "2006-06-11",
        lost: "2006-12-03",
        days: 175,
        defenses: 9
      }
    ]
  },
  {
    name: "Sabu",
    nickname: "The Homicidal, Suicidal, Genocidal Maniac",
    hometown: "Bombay, Michigan",
    height: "180",
    weight: "98",
    debut: "1985-08-01",
    retired: false,
    description: "Extreme high-flyer known for putting himself through tables and his barbed wire matches.",
    era: "Attitude", 
    promotions: ["ECW", "WWE"],
    championships: [
      {
        title: "ECW Heavyweight Championship",
        promotion: "ECW",
        won: "1993-05-15",
        lost: "1994-08-27",
        days: 469,
        defenses: 21
      },
      {
        title: "ECW Tag Team Championship",
        promotion: "ECW",
        won: "1995-09-16",
        lost: "1996-04-13",
        days: 210,
        defenses: 7
      }
    ]
  },
  {
    name: "New Jack",
    nickname: "The Original Gangsta",
    hometown: "Atlanta, Georgia",
    height: "188",
    weight: "104",
    debut: "1992-01-01",
    retired: true,
    description: "Hardcore brawler known for his wild weapon-filled matches and Natural Born Killaz entrance.",
    era: "Attitude",
    promotions: ["ECW"],
    championships: [
      {
        title: "ECW Tag Team Championship",
        promotion: "ECW",
        won: "1996-09-07",
        lost: "1997-11-30",
        days: 449,
        defenses: 15
      }
    ]
  },
  {
    name: "Bam Bam Bigelow",
    nickname: "The Beast from the East",
    hometown: "Asbury Park, New Jersey",
    height: "196",
    weight: "163",
    debut: "1985-01-01",
    retired: true,
    description: "Agile big man known for his flame tattoos and surprising athleticism for his size.",
    era: "Monday Night Wars",
    promotions: ["WWE", "ECW", "WCW"],
    championships: [
      {
        title: "ECW Heavyweight Championship",
        promotion: "ECW",
        won: "1997-09-20",
        lost: "1997-11-30",
        days: 71,
        defenses: 4
      },
      {
        title: "ECW Television Championship",
        promotion: "ECW",
        won: "1998-03-01",
        lost: "1998-07-19",
        days: 140,
        defenses: 6
      }
    ]
  },
  {
    name: "Shane Douglas",
    nickname: "The Franchise",
    hometown: "Pittsburgh, Pennsylvania",
    height: "183",
    weight: "111",
    debut: "1982-01-01",
    retired: true,
    description: "The man who threw down the NWA Title and declared ECW a legitimate third alternative.",
    era: "Monday Night Wars",
    promotions: ["ECW", "WWE", "WCW"],
    championships: [
      {
        title: "ECW Heavyweight Championship",
        promotion: "ECW",
        won: "1994-08-27",
        lost: "1995-04-08",
        days: 224,
        defenses: 12
      },
      {
        title: "ECW Tag Team Championship",
        promotion: "ECW",
        won: "1999-07-18",
        lost: "2000-02-26",
        days: 223,
        defenses: 8
      }
    ]
  },
  {
    name: "Terry Funk",
    nickname: "The Hardcore Legend",
    hometown: "Amarillo, Texas",
    height: "185",
    weight: "109",
    debut: "1965-12-09",
    retired: true,
    description: "Wrestling legend who helped legitimize ECW and became synonymous with hardcore wrestling.",
    era: "Territory",
    promotions: ["ECW", "WWE", "WCW", "NWA"],
    championships: [
      {
        title: "ECW Heavyweight Championship",
        promotion: "ECW",
        won: "1994-05-14",
        lost: "1994-08-27",
        days: 105,
        defenses: 6
      },
      {
        title: "NWA World Heavyweight Championship",
        promotion: "NWA",
        won: "1975-12-10",
        lost: "1977-02-06",
        days: 423,
        defenses: 18
      }
    ]
  },
  {
    name: "Mikey Whipwreck",
    nickname: "The Suicidal, Homicidal Kid",
    hometown: "Buffalo, New York", 
    height: "170",
    weight: "79",
    debut: "1994-06-01",
    retired: true,
    description: "Underdog fan favorite who overcame his small stature to become a triple crown winner.",
    era: "Attitude",
    promotions: ["ECW"],
    championships: [
      {
        title: "ECW Heavyweight Championship",
        promotion: "ECW",
        won: "1995-10-28",
        lost: "1996-02-03",
        days: 98,
        defenses: 5
      },
      {
        title: "ECW Television Championship",
        promotion: "ECW",
        won: "1995-04-08",
        lost: "1995-09-16",
        days: 161,
        defenses: 7
      },
      {
        title: "ECW Tag Team Championship",
        promotion: "ECW",
        won: "1996-04-13",
        lost: "1996-09-07",
        days: 147,
        defenses: 6
      }
    ]
  },
  {
    name: "Cactus Jack",
    nickname: "The Hardcore Legend",
    hometown: "Truth or Consequences, New Mexico",
    height: "185",
    weight: "127",
    debut: "1986-06-24",
    retired: true,
    description: "Mick Foley's most extreme persona, known for his death-defying hardcore matches.",
    era: "Attitude",
    promotions: ["ECW", "WCW", "WWE"],
    championships: [
      {
        title: "ECW Heavyweight Championship", 
        promotion: "ECW",
        won: "1994-05-14",
        lost: "1994-05-14",
        days: 0,
        defenses: 0
      },
      {
        title: "WCW Tag Team Championship",
        promotion: "WCW",
        won: "1994-05-21",
        lost: "1994-09-18",
        days: 120,
        defenses: 5
      }
    ]
  },
  {
    name: "Justin Credible",
    nickname: "That's Incredible",
    hometown: "The Bowery",
    height: "185",
    weight: "104",
    debut: "1992-01-01",
    retired: true,
    description: "Cocky heel who became ECW's final champion before the company's closure.",
    era: "Attitude",
    promotions: ["ECW", "WWE"],
    championships: [
      {
        title: "ECW Heavyweight Championship",
        promotion: "ECW",
        won: "2000-04-13",
        lost: "2000-08-26",
        days: 135,
        defenses: 8
      },
      {
        title: "ECW Tag Team Championship",
        promotion: "ECW",
        won: "1997-11-30",
        lost: "1999-07-18",
        days: 595,
        defenses: 18
      }
    ]
  },
  {
    name: "Lance Storm",
    nickname: "The Calgary Kid",
    hometown: "Calgary, Alberta, Canada",
    height: "183",
    weight: "104",
    debut: "1990-04-01",
    retired: true,
    description: "Technical wrestler known for his serious demeanor and championship collecting in WCW.",
    era: "Attitude",
    promotions: ["ECW", "WCW", "WWE"],
    championships: [
      {
        title: "ECW Tag Team Championship",
        promotion: "ECW",
        won: "1999-07-18",
        lost: "2000-02-26",
        days: 223,
        defenses: 8
      },
      {
        title: "WCW United States Heavyweight Championship",
        promotion: "WCW",
        won: "2000-07-09",
        lost: "2001-01-14",
        days: 189,
        defenses: 9
      }
    ]
  },
  {
    name: "Steve Corino",
    nickname: "The King of Old School",
    hometown: "Philadelphia, Pennsylvania",
    height: "185",
    weight: "104", 
    debut: "1994-06-01",
    retired: false,
    description: "Heel champion known for his old school wrestling values and feuds with Sandman.",
    era: "Attitude",
    promotions: ["ECW"],
    championships: [
      {
        title: "ECW Heavyweight Championship",
        promotion: "ECW",
        won: "2000-10-22",
        lost: "2001-01-07",
        days: 77,
        defenses: 4
      }
    ]
  },
  {
    name: "Jerry Lynn",
    nickname: "Mr. JL",
    hometown: "Minneapolis, Minnesota",
    height: "175",
    weight: "95",
    debut: "1988-01-01", 
    retired: true,
    description: "Gifted technical wrestler who had classic matches with RVD and became ECW's final champion.",
    era: "Attitude",
    promotions: ["ECW", "WWE", "TNA"],
    championships: [
      {
        title: "ECW Heavyweight Championship",
        promotion: "ECW",
        won: "2001-01-07",
        lost: "2001-01-07",
        days: 0,
        defenses: 0
      },
      {
        title: "TNA X-Division Championship",
        promotion: "TNA",
        won: "2002-06-19",
        lost: "2002-11-20",
        days: 154,
        defenses: 8
      }
    ]
  }
];

async function importECWLegends() {
  console.log('🔥 Importing ECW Wrestling Legends...\n');
  
  let imported = 0;
  let skipped = 0;
  
  for (const wrestler of ecwLegends) {
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
  console.log(`   📊 Total processed: ${ecwLegends.length} wrestlers`);
}

importECWLegends()
  .catch(console.error)
  .finally(() => prisma.$disconnect());