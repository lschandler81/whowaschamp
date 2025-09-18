import { PrismaClient } from '@prisma/client';
import { toSlug } from '../lib/slug';

const prisma = new PrismaClient();

const internationalWrestlers = [
  // NJPW (New Japan Pro Wrestling) Legends
  {
    name: "Hiroshi Tanahashi",
    nickname: "The Ace",
    birthDate: "1976-11-13",
    birthPlace: "Ogaki, Gifu, Japan",
    height: "5'10\"",
    weight: "221 lbs",
    debut: "1999-10-10",
    retired: undefined,
    promotion: "NJPW",
    biography: "Hiroshi Tanahashi is widely regarded as the ace of New Japan Pro Wrestling and one of the greatest wrestlers of the modern era. Known for his charismatic personality, technical wrestling ability, and guitar-playing entrances, Tanahashi has been the face of NJPW for over a decade and helped revitalize the company.",
    championships: [
      {
        title: "IWGP Heavyweight Championship",
        reigns: 8,
        firstWon: "2006-10-09",
        lastWon: "2014-06-21",
        totalDays: 1358,
        notes: "Most reigns in title history, led NJPW resurgence"
      },
      {
        title: "IWGP Intercontinental Championship",
        reigns: 2,
        firstWon: "2010-05-03",
        lastWon: "2018-06-09",
        totalDays: 174,
        notes: "Elevated prestige of IC title"
      },
      {
        title: "IWGP United States Championship",
        reigns: 1,
        firstWon: "2018-03-25",
        lastWon: "2018-06-09",
        totalDays: 76,
        notes: "First Japanese wrestler to hold US title"
      }
    ],
    finisher: "High Fly Flow",
    era: "Modern Era",
    worldTitleReigns: 8,
    firstReignDate: "2006-10-09",
    lastReignDate: "2014-06-21"
  },
  {
    name: "Kazuchika Okada",
    nickname: "The Rainmaker",
    birthDate: "1987-11-08",
    birthPlace: "Anjo, Aichi, Japan",
    height: "6'3\"",
    weight: "236 lbs",
    debut: "2007-02-02",
    retired: undefined,
    promotion: "NJPW",
    biography: "Kazuchika Okada is the current ace of New Japan Pro Wrestling and one of the most acclaimed wrestlers in the world. Known for his incredible matches, charismatic presence, and record-breaking title reigns, Okada has main-evented multiple Tokyo Dome shows and is considered one of the greatest wrestlers of all time.",
    championships: [
      {
        title: "IWGP Heavyweight Championship",
        reigns: 5,
        firstWon: "2012-02-12",
        lastWon: "2019-04-06",
        totalDays: 1635,
        notes: "Longest single reign in modern era (720 days)"
      },
      {
        title: "IWGP World Heavyweight Championship",
        reigns: 1,
        firstWon: "2021-10-21",
        lastWon: "2022-06-12",
        totalDays: 234,
        notes: "First unified world champion"
      }
    ],
    finisher: "Rainmaker Clothesline",
    era: "Modern Era",
    worldTitleReigns: 6,
    firstReignDate: "2012-02-12",
    lastReignDate: "2022-06-12"
  },
  {
    name: "Will Ospreay",
    nickname: "The Aerial Assassin",
    birthDate: "1993-05-07",
    birthPlace: "Rainham, London, England",
    height: "6'0\"",
    weight: "205 lbs",
    debut: "2012-04-01",
    retired: undefined,
    promotion: "NJPW",
    biography: "Will Ospreay is one of the most athletic and innovative wrestlers in the world today. Known for his incredible aerial ability and hard-hitting style, the British wrestler has become a top star in NJPW and is widely regarded as one of the best wrestlers of his generation.",
    championships: [
      {
        title: "IWGP World Heavyweight Championship",
        reigns: 1,
        firstWon: "2024-04-06",
        lastWon: undefined,
        totalDays: 165,
        notes: "Current champion, first British IWGP World Champion"
      },
      {
        title: "IWGP United States Championship",
        reigns: 2,
        firstWon: "2019-05-04",
        lastWon: "2022-01-04",
        totalDays: 245,
        notes: "Elevated US title with incredible matches"
      }
    ],
    finisher: "Stormbreaker",
    era: "Modern Era",
    worldTitleReigns: 1,
    firstReignDate: "2024-04-06",
    lastReignDate: undefined
  },
  {
    name: "Tetsuya Naito",
    nickname: "El Ingobernable",
    birthDate: "1982-06-22",
    birthPlace: "Ota, Tokyo, Japan",
    height: "5'11\"",
    weight: "222 lbs",
    debut: "2004-10-18",
    retired: undefined,
    promotion: "NJPW",
    biography: "Tetsuya Naito transformed himself from a bland babyface into one of the most charismatic and popular wrestlers in Japan. As the leader of Los Ingobernables de Japon, Naito's tranquilo character and anti-establishment attitude made him a fan favorite and eventual double champion.",
    championships: [
      {
        title: "IWGP Heavyweight Championship",
        reigns: 2,
        firstWon: "2020-01-05",
        lastWon: "2020-07-12",
        totalDays: 284,
        notes: "Double champion with IC title"
      },
      {
        title: "IWGP Intercontinental Championship",
        reigns: 2,
        firstWon: "2017-08-12",
        lastWon: "2020-07-12",
        totalDays: 387,
        notes: "Unified with heavyweight title"
      }
    ],
    finisher: "Destino",
    era: "Modern Era",
    worldTitleReigns: 2,
    firstReignDate: "2020-01-05",
    lastReignDate: "2020-07-12"
  },
  {
    name: "Kenta Kobashi",
    nickname: "The Iron Man",
    birthDate: "1967-03-27",
    birthPlace: "Fukuchiyama, Kyoto, Japan",
    height: "6'1\"",
    weight: "253 lbs",
    debut: "1988-07-07",
    retired: "2013-05-11",
    promotion: "AJPW",
    biography: "Kenta Kobashi is widely regarded as one of the greatest wrestlers of all time. Known for his incredible toughness, fighting spirit, and legendary matches, Kobashi was the ace of All Japan Pro Wrestling and later NOAH. His matches are considered among the greatest in wrestling history.",
    championships: [
      {
        title: "Triple Crown Heavyweight Championship",
        reigns: 1,
        firstWon: "2003-07-10",
        lastWon: "2004-07-10",
        totalDays: 366,
        notes: "Historic reign, defeated Genichiro Tenryu"
      },
      {
        title: "GHC Heavyweight Championship",
        reigns: 3,
        firstWon: "2003-04-25",
        lastWon: "2005-07-18",
        totalDays: 735,
        notes: "NOAH's first major star, incredible title defenses"
      }
    ],
    finisher: "Burning Hammer",
    era: "Attitude Era",
    worldTitleReigns: 4,
    firstReignDate: "2003-04-25",
    lastReignDate: "2005-07-18"
  },
  {
    name: "Mitsuharu Misawa",
    nickname: "The Emerald Emperor",
    birthDate: "1962-06-18",
    birthPlace: "Koshigaya, Saitama, Japan",
    height: "6'1\"",
    weight: "243 lbs",
    debut: "1981-08-21",
    retired: "2009-06-13",
    promotion: "AJPW",
    biography: "Mitsuharu Misawa is considered one of the greatest wrestlers who ever lived. Originally wrestling as Tiger Mask II, he revealed his identity in one of wrestling's greatest moments. Misawa's matches with Kenta Kobashi, Jun Akiyama, and Toshiaki Kawada are legendary. He tragically died in the ring in 2009.",
    championships: [
      {
        title: "Triple Crown Heavyweight Championship",
        reigns: 5,
        firstWon: "1990-06-08",
        lastWon: "2000-10-21",
        totalDays: 1179,
        notes: "Longest combined reign, legendary title defenses"
      },
      {
        title: "GHC Heavyweight Championship",
        reigns: 4,
        firstWon: "2000-08-05",
        lastWon: "2006-12-10",
        totalDays: 868,
        notes: "Founded NOAH, became its first champion"
      }
    ],
    finisher: "Emerald Flowsion",
    era: "Golden Era",
    worldTitleReigns: 9,
    firstReignDate: "1990-06-08",
    lastReignDate: "2006-12-10"
  },
  {
    name: "Jun Akiyama",
    nickname: "Mr. Wrist Clutch",
    birthDate: "1969-10-09",
    birthPlace: "Kawasaki, Kanagawa, Japan",
    height: "6'0\"",
    weight: "242 lbs",
    debut: "1992-10-10",
    retired: undefined,
    promotion: "AJPW",
    biography: "Jun Akiyama was one of the most technically gifted wrestlers of his generation and a key figure in All Japan's golden era. Known for his innovative Wrist Clutch Exploder suplex, Akiyama had legendary feuds with Mitsuharu Misawa and Kenta Kobashi and helped define puroresu in the 1990s and 2000s.",
    championships: [
      {
        title: "Triple Crown Heavyweight Championship",
        reigns: 2,
        firstWon: "2009-02-28",
        lastWon: "2014-02-23",
        totalDays: 189,
        notes: "Veteran champion, incredible technical matches"
      },
      {
        title: "GHC Heavyweight Championship",
        reigns: 1,
        firstWon: "2001-05-01",
        lastWon: "2001-11-10",
        totalDays: 193,
        notes: "NOAH's second champion"
      }
    ],
    finisher: "Wrist Clutch Exploder",
    era: "Attitude Era",
    worldTitleReigns: 3,
    firstReignDate: "2001-05-01",
    lastReignDate: "2014-02-23"
  },
  // Lucha Libre Legends (AAA/CMLL)
  {
    name: "El Santo",
    nickname: "The Saint of Wrestling",
    birthDate: "1917-09-23",
    birthPlace: "Tulancingo, Hidalgo, Mexico",
    height: "5'9\"",
    weight: "215 lbs",
    debut: "1942-07-26",
    retired: "1982-09-12",
    promotion: "CMLL",
    biography: "El Santo is the most famous luchador of all time and a cultural icon in Mexico. Known for his silver mask, he never removed it in public and became a symbol of Mexican wrestling. Santo starred in over 50 films and was instrumental in making lucha libre a mainstream phenomenon worldwide.",
    championships: [
      {
        title: "NWA World Welterweight Championship",
        reigns: 1,
        firstWon: "1942-07-26",
        lastWon: "1947-09-19",
        totalDays: 1881,
        notes: "Career-defining championship, established his legend"
      },
      {
        title: "Mexican National Light Heavyweight Championship",
        reigns: 2,
        firstWon: "1952-03-21",
        lastWon: "1976-12-23",
        totalDays: 2847,
        notes: "Most prestigious Mexican title at the time"
      }
    ],
    finisher: "La Quebrada",
    era: "Golden Era",
    worldTitleReigns: 3,
    firstReignDate: "1942-07-26",
    lastReignDate: "1976-12-23"
  },
  {
    name: "Blue Demon",
    nickname: "The Blue Demon",
    birthDate: "1922-04-24",
    birthPlace: "García, Nuevo León, Mexico",
    height: "5'10\"",
    weight: "220 lbs",
    debut: "1948-04-30",
    retired: "1989-12-16",
    promotion: "CMLL",
    biography: "Blue Demon was one of the greatest luchadores of all time and El Santo's most famous rival and occasional partner. Known for his blue mask and incredible athleticism, Blue Demon also had a successful film career and helped popularize lucha libre around the world.",
    championships: [
      {
        title: "Mexican National Heavyweight Championship",
        reigns: 1,
        firstWon: "1953-07-31",
        lastWon: "1956-04-20",
        totalDays: 994,
        notes: "Defeated El Santo for the title"
      },
      {
        title: "NWA World Middleweight Championship",
        reigns: 2,
        firstWon: "1954-06-11",
        lastWon: "1975-08-29",
        totalDays: 1205,
        notes: "International recognition of his abilities"
      }
    ],
    finisher: "Blue Demon Special",
    era: "Golden Era",
    worldTitleReigns: 3,
    firstReignDate: "1953-07-31",
    lastReignDate: "1975-08-29"
  },
  {
    name: "Mil Mascaras",
    nickname: "Man of a Thousand Masks",
    birthDate: "1942-07-15",
    birthPlace: "San Luis Potosí, Mexico",
    height: "5'10\"",
    weight: "240 lbs",
    debut: "1965-07-07",
    retired: undefined,
    promotion: "CMLL",
    biography: "Mil Mascaras is a legendary luchador known for his incredible collection of masks and his role in popularizing lucha libre internationally. He was one of the first Mexican wrestlers to have major success in Japan and the United States, helping bridge different wrestling cultures.",
    championships: [
      {
        title: "IWA World Heavyweight Championship",
        reigns: 1,
        firstWon: "1975-12-06",
        lastWon: "1977-03-19",
        totalDays: 468,
        notes: "International wrestling champion"
      },
      {
        title: "Mexican National Tag Team Championship",
        reigns: 3,
        firstWon: "1970-08-21",
        lastWon: "1978-06-02",
        totalDays: 412,
        notes: "Various partners, showcasing versatility"
      }
    ],
    finisher: "Flying Cross Body",
    era: "Golden Era",
    worldTitleReigns: 4,
    firstReignDate: "1970-08-21",
    lastReignDate: "1978-06-02"
  },
  {
    name: "Dr. Wagner Jr.",
    nickname: "El Galeno del Mal",
    birthDate: "1965-08-12",
    birthPlace: "Torreón, Coahuila, Mexico",
    height: "6'1\"",
    weight: "215 lbs",
    debut: "1986-08-15",
    retired: undefined,
    promotion: "AAA",
    biography: "Dr. Wagner Jr. is one of the most charismatic and successful luchadores of the modern era. Following in his father's footsteps, Wagner Jr. became a major star in both Mexico and Japan, known for his incredible mic skills, technical ability, and memorable feuds.",
    championships: [
      {
        title: "AAA Mega Championship",
        reigns: 1,
        firstWon: "2007-12-02",
        lastWon: "2008-06-01",
        totalDays: 181,
        notes: "Top championship in AAA"
      },
      {
        title: "IWGP Intercontinental Championship",
        reigns: 1,
        firstWon: "2020-01-05",
        lastWon: "2020-08-29",
        totalDays: 237,
        notes: "First Mexican to hold this NJPW title"
      }
    ],
    finisher: "Wagner Driver",
    era: "Modern Era",
    worldTitleReigns: 2,
    firstReignDate: "2007-12-02",
    lastReignDate: "2020-08-29"
  },
  // British Wrestling Legends
  {
    name: "William Regal",
    nickname: "The Gentleman Villain",
    birthDate: "1968-05-10",
    birthPlace: "Codsall, Staffordshire, England",
    height: "6'3\"",
    weight: "243 lbs",
    debut: "1983-12-22",
    retired: "2013-04-07",
    promotion: "WWE",
    biography: "William Regal is one of the most respected wrestlers and trainers in the business. Known for his technical wrestling ability, old-school heel work, and later his role as a mentor and trainer, Regal bridged British wrestling traditions with American sports entertainment.",
    championships: [
      {
        title: "WWE Intercontinental Championship",
        reigns: 5,
        firstWon: "2001-06-19",
        lastWon: "2008-11-10",
        totalDays: 107,
        notes: "Classic heel champion, elevated title prestige"
      },
      {
        title: "King of the Ring",
        reigns: 1,
        firstWon: "2008-04-27",
        lastWon: undefined,
        totalDays: 1,
        notes: "Tournament victory, memorable coronation"
      }
    ],
    finisher: "Regal Stretch",
    era: "Attitude Era",
    worldTitleReigns: 0,
    firstReignDate: undefined,
    lastReignDate: undefined
  },
  {
    name: "Drew McIntyre",
    nickname: "The Scottish Warrior",
    birthDate: "1985-06-06",
    birthPlace: "Ayr, Scotland",
    height: "6'5\"",
    weight: "265 lbs",
    debut: "2001-07-12",
    retired: undefined,
    promotion: "WWE",
    biography: "Drew McIntyre is the first British WWE Champion and one of the most successful wrestlers from the United Kingdom. After initially struggling in WWE, he rebuilt himself on the independent scene and returned to become a main event star and world champion.",
    championships: [
      {
        title: "WWE Championship",
        reigns: 2,
        firstWon: "2020-04-05",
        lastWon: "2021-02-21",
        totalDays: 202,
        notes: "First British WWE Champion, pandemic era champion"
      },
      {
        title: "WWE Intercontinental Championship",
        reigns: 1,
        firstWon: "2009-08-24",
        lastWon: "2010-05-07",
        totalDays: 256,
        notes: "Early career championship run"
      }
    ],
    finisher: "Claymore Kick",
    era: "Modern Era",
    worldTitleReigns: 2,
    firstReignDate: "2020-04-05",
    lastReignDate: "2021-02-21"
  },
  // European Wrestling Stars
  {
    name: "WALTER",
    nickname: "The Ring General",
    birthDate: "1987-08-20",
    birthPlace: "Vienna, Austria",
    height: "6'4\"",
    weight: "270 lbs",
    debut: "2005-01-01",
    retired: undefined,
    promotion: "WWE",
    biography: "WALTER (now known as Gunther) is one of the most dominant champions in modern wrestling history. The Austrian powerhouse is known for his hard-hitting style, incredible conditioning, and record-breaking championship reigns that have redefined what it means to be a dominant champion.",
    championships: [
      {
        title: "WWE Intercontinental Championship",
        reigns: 1,
        firstWon: "2022-09-03",
        lastWon: undefined,
        totalDays: 745,
        notes: "Current champion, longest reign in decades"
      },
      {
        title: "NXT UK Championship",
        reigns: 1,
        firstWon: "2019-01-12",
        lastWon: "2022-04-02",
        totalDays: 870,
        notes: "Longest NXT UK Championship reign"
      }
    ],
    finisher: "Powerbomb",
    era: "Modern Era",
    worldTitleReigns: 0,
    firstReignDate: undefined,
    lastReignDate: undefined
  },
  // Canadian Wrestling Legends
  {
    name: "Kenny Omega",
    nickname: "The Best Bout Machine",
    birthDate: "1983-10-16",
    birthPlace: "Sarnia, Ontario, Canada",
    height: "6'0\"",
    weight: "203 lbs",
    debut: "2000-10-14",
    retired: undefined,
    promotion: "AEW",
    biography: "Kenny Omega is widely regarded as one of the greatest wrestlers of his generation. Known for his incredible athleticism, storytelling ability, and video game-inspired character, Omega became a major star in Japan before helping found All Elite Wrestling.",
    championships: [
      {
        title: "IWGP Heavyweight Championship",
        reigns: 1,
        firstWon: "2018-06-09",
        lastWon: "2019-01-04",
        totalDays: 209,
        notes: "First non-Japanese Bullet Club leader to win title"
      },
      {
        title: "AEW World Championship",
        reigns: 1,
        firstWon: "2020-12-02",
        lastWon: "2021-11-13",
        totalDays: 346,
        notes: "Inaugural champion of AEW's top title"
      }
    ],
    finisher: "One-Winged Angel",
    era: "Modern Era",
    worldTitleReigns: 2,
    firstReignDate: "2018-06-09",
    lastReignDate: "2021-11-13"
  }
];

async function importInternationalWrestlers() {
  console.log('Starting International Wrestling Stars import...');
  let successCount = 0;
  let errorCount = 0;

  for (const wrestler of internationalWrestlers) {
    try {
      console.log(`\n📦 Processing: ${wrestler.name}...`);
      
      // Check if profile already exists
      const existingProfile = await prisma.profile.findFirst({
        where: {
          OR: [
            { name: wrestler.name },
            { slug: toSlug(wrestler.name) }
          ]
        }
      });
      
      if (existingProfile) {
        console.log(`⏭️ Skipping ${wrestler.name} - already exists`);
        continue;
      }
      
      // Create wrestler profile
      const profile = await prisma.profile.create({
        data: {
          name: wrestler.name,
          slug: toSlug(wrestler.name),
          nickname: wrestler.nickname,
          type: 'wrestler',
          hometown: wrestler.birthPlace,
          height: wrestler.height,
          weight: wrestler.weight,
          debut: wrestler.debut ? new Date(wrestler.debut) : null,
          retired: wrestler.retired ? new Date(wrestler.retired) : null,
          bio: wrestler.biography,
          wrestler: {
            create: {
              finisher: wrestler.finisher,
              era: wrestler.era,
              worldTitleReigns: wrestler.worldTitleReigns,
              combinedDaysAsChampion: wrestler.championships.reduce((sum, c) => sum + c.totalDays, 0),
              firstReignDate: wrestler.firstReignDate ? new Date(wrestler.firstReignDate) : null,
              lastReignDate: wrestler.lastReignDate ? new Date(wrestler.lastReignDate) : null
            }
          }
        },
        include: {
          wrestler: true
        }
      });

      console.log(`✅ Created profile for ${wrestler.name} (ID: ${profile.id})`);

      // Create or find promotion
      const promotions = [wrestler.promotion];
      
      for (const promotionName of promotions) {
        let promotion = await prisma.promotion.findFirst({
          where: { 
            OR: [
              { name: promotionName },
              { slug: toSlug(promotionName) }
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
            console.log(`✅ Created promotion: ${promotionName}`);
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
          // Create promotion relationship
          await prisma.profilePromotion.create({
            data: {
              profileId: profile.id,
              promotionId: promotion.id
            }
          });
        }
      }

      // Import championships
      const promotion = await prisma.promotion.findFirst({
        where: { 
          OR: [
            { name: wrestler.promotion },
            { slug: toSlug(wrestler.promotion) }
          ]
        }
      });

      if (promotion) {
        for (let i = 0; i < wrestler.championships.length; i++) {
          const championship = wrestler.championships[i];
          await prisma.championship.create({
            data: {
              titleName: championship.title,
              promotionId: promotion.id,
              profileId: profile.id,
              reignNumber: i + 1,
              wonDate: new Date(championship.firstWon),
              lostDate: championship.lastWon ? new Date(championship.lastWon) : null,
              daysHeld: championship.totalDays,
              isCurrentChampion: !championship.lastWon
            }
          });
        }
      }

      successCount++;
      console.log(`✅ Successfully imported ${wrestler.name} with ${wrestler.championships.length} championships`);
      
    } catch (error) {
      errorCount++;
      console.error(`❌ Error importing ${wrestler.name}:`, error);
    }
  }

  console.log(`\n🎯 International Wrestling Import Complete!`);
  console.log(`✅ Successfully imported: ${successCount} wrestlers`);
  console.log(`❌ Failed imports: ${errorCount}`);
  console.log(`📊 Total international wrestlers: ${internationalWrestlers.length}`);
  
  await prisma.$disconnect();
}

importInternationalWrestlers().catch(console.error);