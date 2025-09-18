import { PrismaClient } from '@prisma/client';
import { toSlug } from '../lib/slug';

const prisma = new PrismaClient();

const internationalWrestlers = [
  // Japanese Wrestling Legends (NJPW/AJPW)
  {
    name: "Hiroshi Tanahashi",
    nickname: "The Ace",
    birthday: "1976-11-13",
    height: 181,
    weight: 107,
    hometown: "Ogaki, Gifu, Japan",
    debut: "1999-10-10",
    retired: false,
    description: "The once in a century talent who carried NJPW through its darkest period and helped establish the modern era.",
    era: "Modern",
    promotions: ["NJPW"],
    championships: [
      {
        title: "IWGP Heavyweight Championship",
        promotion: "NJPW",
        won: "2006-10-09",
        lost: "2007-04-13",
        days: 186,
        defenses: 2
      },
      {
        title: "IWGP Intercontinental Championship",
        promotion: "NJPW", 
        won: "2011-05-03",
        lost: "2011-08-14",
        days: 103,
        defenses: 1
      },
      {
        title: "IWGP United States Heavyweight Championship",
        promotion: "NJPW",
        won: "2018-03-25", 
        lost: "2018-07-15",
        days: 112,
        defenses: 3
      }
    ]
  },
  {
    name: "Kenta Kobashi",
    nickname: "The Burning Hammer",
    birthday: "1967-03-27",
    height: 186,
    weight: 123,
    hometown: "Fukuchiyama, Kyoto, Japan", 
    debut: "1988-07-26",
    retired: true,
    description: "Four Pillars of Heaven member known for his incredible toughness and legendary burning hammer finisher.",
    era: "Monday Night Wars",
    promotions: ["AJPW", "NOAH"],
    championships: [
      {
        title: "Triple Crown Heavyweight Championship",
        promotion: "AJPW",
        won: "1998-07-24",
        lost: "1999-01-24",
        days: 184,
        defenses: 2
      },
      {
        title: "GHC Heavyweight Championship", 
        promotion: "NOAH",
        won: "2004-07-10",
        lost: "2005-10-29",
        days: 476,
        defenses: 13
      }
    ]
  },
  {
    name: "Mitsuharu Misawa",
    nickname: "The Emerald Warrior",
    birthday: "1962-06-18",
    height: 188,
    weight: 109,
    hometown: "Koshigaya, Saitama, Japan",
    debut: "1981-08-21",
    retired: false,
    description: "Four Pillars of Heaven leader and arguably Japan's greatest wrestler. Tragically died in the ring in 2009.",
    era: "Monday Night Wars", 
    promotions: ["AJPW", "NOAH"],
    championships: [
      {
        title: "Triple Crown Heavyweight Championship",
        promotion: "AJPW",
        won: "1990-06-08",
        lost: "1992-09-01", 
        days: 816,
        defenses: 5
      },
      {
        title: "GHC Heavyweight Championship",
        promotion: "NOAH",
        won: "2000-08-05",
        lost: "2003-03-01",
        days: 938,
        defenses: 8
      }
    ]
  },
  {
    name: "Toshiaki Kawada",
    nickname: "Dangerous K",
    birthday: "1963-12-08",
    height: 190,
    weight: 108,
    hometown: "Tokyo, Japan",
    debut: "1982-08-17",
    retired: true,
    description: "Four Pillars of Heaven member known for his dangerous kicks and powerbomb finisher.",
    era: "Monday Night Wars",
    promotions: ["AJPW"],
    championships: [
      {
        title: "Triple Crown Heavyweight Championship",
        promotion: "AJPW", 
        won: "1994-05-03",
        lost: "1994-12-06",
        days: 217,
        defenses: 3
      },
      {
        title: "World Tag Team Championship",
        promotion: "AJPW",
        won: "1996-12-06",
        lost: "1997-07-27", 
        days: 233,
        defenses: 2
      }
    ]
  },
  {
    name: "Akira Taue",
    nickname: "The Dynamite Kid",
    birthday: "1961-07-24", 
    height: 196,
    weight: 118,
    hometown: "Niigata, Japan",
    debut: "1988-02-05",
    retired: true,
    description: "Four Pillars of Heaven member known for his chokeslam and being the tallest of the group.",
    era: "Monday Night Wars",
    promotions: ["AJPW"],
    championships: [
      {
        title: "Triple Crown Heavyweight Championship",
        promotion: "AJPW",
        won: "1999-01-24",
        lost: "1999-10-23",
        days: 272,
        defenses: 4
      }
    ]
  },
  {
    name: "Tetsuya Naito",
    nickname: "El Ingobernable",
    birthday: "1982-06-22",
    height: 181,
    weight: 103,
    hometown: "Adachi, Tokyo, Japan",
    debut: "2004-10-10", 
    retired: false,
    description: "Tranquilo leader of Los Ingobernables de Japon, known for his charismatic anti-hero persona.",
    era: "Modern",
    promotions: ["NJPW"],
    championships: [
      {
        title: "IWGP Heavyweight Championship",
        promotion: "NJPW",
        won: "2020-01-05",
        lost: "2020-07-12",
        days: 189,
        defenses: 1
      },
      {
        title: "IWGP Intercontinental Championship", 
        promotion: "NJPW",
        won: "2016-01-04",
        lost: "2016-04-10",
        days: 96,
        defenses: 2
      }
    ]
  },
  {
    name: "Hiroshi Hase",
    nickname: "Mr. Uranage",
    birthday: "1961-05-05",
    height: 188,
    weight: 120,
    hometown: "Karatsu, Saga, Japan", 
    debut: "1986-08-12",
    retired: true,
    description: "Olympic amateur wrestler who became a legend in both NJPW and AJPW.",
    era: "Monday Night Wars",
    promotions: ["NJPW", "AJPW"],
    championships: [
      {
        title: "IWGP Tag Team Championship",
        promotion: "NJPW",
        won: "1992-03-16",
        lost: "1992-08-12",
        days: 149,
        defenses: 1
      }
    ]
  },

  // Mexican Wrestling Legends
  {
    name: "El Santo",
    nickname: "The Saint",
    birthday: "1917-09-23", 
    height: 178,
    weight: 89,
    hometown: "Tulancingo, Hidalgo, Mexico",
    debut: "1934-07-26",
    retired: true,
    description: "The most iconic luchador in history, known for his silver mask and film career.",
    era: "Territory",
    promotions: ["CMLL", "AAA"],
    championships: [
      {
        title: "NWA World Welterweight Championship",
        promotion: "CMLL",
        won: "1942-09-26",
        lost: "1947-05-02",
        days: 1679,
        defenses: 15
      }
    ]
  },
  {
    name: "Blue Demon",
    nickname: "The Blue Demon",
    birthday: "1922-04-24",
    height: 180,
    weight: 95,
    hometown: "Garcia, Nuevo León, Mexico",
    debut: "1948-04-30",
    retired: true,
    description: "Santo's greatest rival and Mexico's second most famous luchador.",
    era: "Territory", 
    promotions: ["CMLL"],
    championships: [
      {
        title: "NWA World Middleweight Championship",
        promotion: "CMLL",
        won: "1953-09-18",
        lost: "1956-04-27",
        days: 953,
        defenses: 8
      }
    ]
  },
  {
    name: "Mil Máscaras",
    nickname: "Man of a Thousand Masks", 
    birthday: "1942-07-15",
    height: 178,
    weight: 107,
    hometown: "San Luis Potosí, Mexico",
    debut: "1965-07-20",
    retired: false,
    description: "International superstar who never lost his mask and wrestled worldwide.",
    era: "Territory",
    promotions: ["CMLL", "WWE"],
    championships: [
      {
        title: "IWA World Heavyweight Championship",
        promotion: "CMLL",
        won: "1975-12-02",
        lost: "1977-03-18",
        days: 471,
        defenses: 6
      }
    ]
  },
  {
    name: "Rey Mysterio Sr.",
    nickname: "The Original Rey Mysterio",
    birthday: "1958-01-08", 
    height: 170,
    weight: 79,
    hometown: "Tijuana, Baja California, Mexico",
    debut: "1976-01-01",
    retired: true,
    description: "Lucha libre legend and uncle of Rey Mysterio Jr., pioneer of high-flying style.",
    era: "Territory", 
    promotions: ["AAA"],
    championships: [
      {
        title: "AAA World Cruiserweight Championship",
        promotion: "AAA",
        won: "1992-05-15",
        lost: "1994-08-28",
        days: 835,
        defenses: 12
      }
    ]
  },
  {
    name: "La Parka",
    nickname: "The Chairman of WCW",
    birthday: "1965-01-16",
    height: 185,
    weight: 98,
    hometown: "México City, Mexico",
    debut: "1987-01-01", 
    retired: false,
    description: "Iconic skeleton-costumed luchador who became a cult favorite in WCW.",
    era: "Monday Night Wars",
    promotions: ["WCW", "AAA"],
    championships: [
      {
        title: "AAA Heavyweight Championship",
        promotion: "AAA",
        won: "1996-06-16",
        lost: "1997-08-17",
        days: 427,
        defenses: 5
      }
    ]
  },
  {
    name: "Psicosis", 
    nickname: "The Psycho Clown",
    birthday: "1971-12-16",
    height: 178,
    weight: 86,
    hometown: "México City, Mexico",
    debut: "1989-10-01",
    retired: false,
    description: "High-flying luchador who was part of the legendary WCW cruiserweight division.",
    era: "Monday Night Wars",
    promotions: ["WCW", "AAA"],
    championships: [
      {
        title: "WCW Cruiserweight Championship",
        promotion: "WCW",
        won: "1996-09-14",
        lost: "1996-12-29", 
        days: 106,
        defenses: 3
      }
    ]
  },

  // UK Wrestling Stars
  {
    name: "William Regal",
    nickname: "The Real Man's Man",
    birthday: "1968-05-10",
    height: 185,
    weight: 109,
    hometown: "Blackpool, England", 
    debut: "1983-12-29",
    retired: true,
    description: "British wrestling legend known for his technical ability and villainous character work.",
    era: "Monday Night Wars",
    promotions: ["WCW", "WWE"],
    championships: [
      {
        title: "WCW World Television Championship",
        promotion: "WCW",
        won: "1993-09-19",
        lost: "1994-05-22",
        days: 245,
        defenses: 7
      },
      {
        title: "WWE Intercontinental Championship",
        promotion: "WWE",
        won: "2002-05-06",
        lost: "2002-07-21",
        days: 76,
        defenses: 2
      }
    ]
  },
  {
    name: "Wade Barrett", 
    nickname: "The Bare Knuckle Brawler",
    birthday: "1980-08-10",
    height: 196,
    weight: 118,
    hometown: "Preston, England",
    debut: "2004-05-01",
    retired: true,
    description: "Leader of The Nexus and former bare-knuckle boxer turned WWE superstar.",
    era: "PG", 
    promotions: ["WWE"],
    championships: [
      {
        title: "WWE Intercontinental Championship",
        promotion: "WWE",
        won: "2010-12-19",
        lost: "2011-03-28",
        days: 99,
        defenses: 3
      }
    ]
  },
  {
    name: "Pete Dunne",
    nickname: "The Bruiserweight", 
    birthday: "1993-11-09",
    height: 175,
    weight: 91,
    hometown: "Birmingham, England",
    debut: "2008-09-01",
    retired: false,
    description: "British wrestling sensation known for joint manipulation and aggressive style.",
    era: "Modern",
    promotions: ["WWE", "RevPro"],
    championships: [
      {
        title: "WWE United Kingdom Championship",
        promotion: "WWE",
        won: "2017-05-20",
        lost: "2019-08-31",
        days: 833,
        defenses: 18
      }
    ]
  },
  {
    name: "Tyler Bate",
    nickname: "Big Strong Boy", 
    birthday: "1997-03-07",
    height: 175,
    weight: 88,
    hometown: "Dudley, England",
    debut: "2013-04-27",
    retired: false,
    description: "Youngest champion in WWE history and leader of British Strong Style.",
    era: "Modern",
    promotions: ["WWE", "RevPro"],
    championships: [
      {
        title: "WWE United Kingdom Championship",
        promotion: "WWE",
        won: "2017-01-15",
        lost: "2017-05-20", 
        days: 125,
        defenses: 4
      }
    ]
  },

  // Additional Modern International Stars
  {
    name: "Tomohiro Ishii",
    nickname: "The Stone Pitbull", 
    birthday: "1975-12-10",
    height: 175,
    weight: 104,
    hometown: "Kawasaki, Kanagawa, Japan",
    debut: "1996-09-30",
    retired: false,
    description: "CHAOS member known for his incredible toughness and ability to steal the show.",
    era: "Modern", 
    promotions: ["NJPW"],
    championships: [
      {
        title: "NEVER Openweight Championship",
        promotion: "NJPW",
        won: "2014-05-03",
        lost: "2014-08-10",
        days: 99,
        defenses: 2
      }
    ]
  },
  {
    name: "Hirooki Goto",
    nickname: "The Fierce Warrior",
    birthday: "1979-06-25",
    height: 178,
    weight: 100,
    hometown: "Kuwana, Mie, Japan", 
    debut: "2003-01-04",
    retired: false,
    description: "Samurai-inspired wrestler known for never winning the top title despite many attempts.",
    era: "Modern",
    promotions: ["NJPW"],
    championships: [
      {
        title: "NEVER Openweight Championship",
        promotion: "NJPW",
        won: "2016-08-14",
        lost: "2017-01-04",
        days: 143,
        defenses: 3
      }
    ]
  },
  {
    name: "Katsuyori Shibata",
    nickname: "The Wrestler", 
    birthday: "1979-11-17",
    height: 178,
    weight: 94,
    hometown: "Kuwana, Mie, Japan",
    debut: "2000-08-29",
    retired: true,
    description: "Hard-hitting shooter who had to retire due to injury after a legendary match with Okada.",
    era: "Modern",
    promotions: ["NJPW"],
    championships: [
      {
        title: "NEVER Openweight Championship", 
        promotion: "NJPW",
        won: "2017-02-11",
        lost: "2017-04-09",
        days: 57,
        defenses: 1
      }
    ]
  },
  {
    name: "Shinsuke Nakamura",
    nickname: "The King of Strong Style",
    birthday: "1980-02-24",
    height: 188, 
    weight: 104,
    hometown: "Kyoto, Japan",
    debut: "2002-08-29",
    retired: false,
    description: "Charismatic striker who became NJPW's ace before moving to WWE.",
    era: "Modern",
    promotions: ["NJPW", "WWE"],
    championships: [
      {
        title: "IWGP Heavyweight Championship",
        promotion: "NJPW",
        won: "2008-01-04",
        lost: "2009-01-04",
        days: 365,
        defenses: 5
      },
      {
        title: "WWE United States Championship", 
        promotion: "WWE", 
        won: "2017-08-20",
        lost: "2018-01-28",
        days: 161,
        defenses: 4
      }
    ]
  }
];

async function importInternationalWrestlers() {
  console.log('🌍 Importing International Wrestling Stars...\n');
  
  let imported = 0;
  let skipped = 0;
  
  for (const wrestler of internationalWrestlers) {
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
          where: { name: promotionName }
        });
        
        if (!promotion) {
          promotion = await prisma.promotion.create({
            data: {
              name: promotionName,
              slug: toSlug(promotionName)
            }
          });
        }
        promotionIds.push(promotion.id);
      }

      // Create wrestler profile
      const profile = await prisma.profile.create({
        data: {
          name: wrestler.name,
          slug: toSlug(wrestler.name),
          nickname: wrestler.nickname,
          type: 'wrestler',
          hometown: wrestler.hometown,
          height: wrestler.height?.toString(),
          weight: wrestler.weight?.toString(),
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
            where: { name: championship.promotion }
          });
          
          if (!promotion) {
            promotion = await prisma.promotion.create({
              data: {
                name: championship.promotion,
                slug: toSlug(championship.promotion)
              }
            });
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
  console.log(`   📊 Total processed: ${internationalWrestlers.length} wrestlers`);
}

importInternationalWrestlers()
  .catch(console.error)
  .finally(() => prisma.$disconnect());