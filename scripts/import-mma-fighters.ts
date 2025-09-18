import { PrismaClient } from '@prisma/client';
import { toSlug } from '../lib/slug';

const prisma = new PrismaClient();

const mmaFighters = [
  // UFC Legends & Champions
  {
    name: "Anderson Silva",
    nickname: "The Spider",
    birthDate: "1975-04-14",
    birthPlace: "São Paulo, Brazil",
    height: "6'2\"",
    weight: "185 lbs",
    reach: "77.5\"",
    stance: "Orthodox",
    debut: "1997-06-08",
    retired: "2020-10-31",
    promotion: "UFC",
    biography: "Anderson Silva is widely regarded as one of the greatest mixed martial artists of all time. The former UFC Middleweight Champion holds the longest title reign in UFC history at 2,457 days. Known for his precision striking, creativity, and incredible reflexes, Silva dominated the middleweight division for over 6 years.",
    championships: [
      {
        title: "UFC Middleweight Championship",
        reigns: 1,
        firstWon: "2006-10-14",
        lastWon: "2013-07-06",
        totalDays: 2457,
        notes: "Longest title reign in UFC history"
      }
    ],
    divisions: ["Middleweight", "Light Heavyweight"],
    careerStats: {
      wins: 34,
      losses: 11,
      draws: 0,
      knockouts: 23
    }
  },
  {
    name: "Georges St-Pierre",
    nickname: "GSP",
    birthDate: "1981-05-19",
    birthPlace: "Saint-Isidore, Quebec, Canada",
    height: "5'10\"",
    weight: "170 lbs",
    reach: "76\"",
    stance: "Southpaw",
    debut: "2002-01-25",
    retired: "2017-11-04",
    promotion: "UFC",
    biography: "Georges St-Pierre is considered one of the greatest welterweights and pound-for-pound fighters of all time. A two-division UFC champion, GSP was known for his incredible athleticism, game planning, and well-rounded skill set. He successfully defended the welterweight title 9 times.",
    championships: [
      {
        title: "UFC Welterweight Championship",
        reigns: 2,
        firstWon: "2006-11-18",
        lastWon: "2013-11-16",
        totalDays: 2204,
        notes: "9 successful title defenses"
      },
      {
        title: "UFC Middleweight Championship",
        reigns: 1,
        firstWon: "2017-11-04",
        lastWon: undefined,
        totalDays: 1,
        notes: "Won and immediately vacated"
      }
    ],
    divisions: ["Welterweight", "Middleweight"],
    careerStats: {
      wins: 26,
      losses: 2,
      draws: 0,
      knockouts: 8
    }
  },
  {
    name: "Khabib Nurmagomedov",
    nickname: "The Eagle",
    birthDate: "1988-09-20",
    birthPlace: "Sildi, Dagestan, Russia",
    height: "5'10\"",
    weight: "155 lbs",
    reach: "70\"",
    stance: "Orthodox",
    debut: "2008-09-20",
    retired: "2020-10-24",
    promotion: "UFC",
    biography: "Khabib Nurmagomedov retired as the undefeated UFC Lightweight Champion with a perfect 29-0 record. Known for his dominant wrestling, ground control, and incredible pressure, Khabib never lost a round in any of his UFC title fights. His rivalry with Conor McGregor was one of the biggest in UFC history.",
    championships: [
      {
        title: "UFC Lightweight Championship",
        reigns: 1,
        firstWon: "2018-04-07",
        lastWon: "2020-10-24",
        totalDays: 931,
        notes: "Retired undefeated 29-0"
      }
    ],
    divisions: ["Lightweight"],
    careerStats: {
      wins: 29,
      losses: 0,
      draws: 0,
      knockouts: 8
    }
  },
  {
    name: "Chuck Liddell",
    nickname: "The Iceman",
    birthDate: "1969-12-17",
    birthPlace: "Santa Barbara, California",
    height: "6'2\"",
    weight: "205 lbs",
    reach: "74\"",
    stance: "Orthodox",
    debut: "1998-04-07",
    retired: "2018-11-24",
    promotion: "UFC",
    biography: "Chuck Liddell was one of the first UFC superstars and helped bring mixed martial arts into the mainstream. Known for his knockout power, takedown defense, and exciting fighting style, Liddell was the face of the UFC during its explosive growth period in the mid-2000s.",
    championships: [
      {
        title: "UFC Light Heavyweight Championship",
        reigns: 1,
        firstWon: "2005-04-16",
        lastWon: "2007-05-26",
        totalDays: 770,
        notes: "4 successful title defenses"
      }
    ],
    divisions: ["Light Heavyweight"],
    careerStats: {
      wins: 21,
      losses: 9,
      draws: 0,
      knockouts: 13
    }
  },
  {
    name: "Tito Ortiz",
    nickname: "The Huntington Beach Bad Boy",
    birthDate: "1975-01-23",
    birthPlace: "Huntington Beach, California",
    height: "6'2\"",
    weight: "205 lbs",
    reach: "75\"",
    stance: "Orthodox",
    debut: "1997-05-17",
    retired: "2012-07-07",
    promotion: "UFC",
    biography: "Tito Ortiz was one of the biggest stars in early UFC history and helped establish the light heavyweight division. Known for his wrestling background, ground-and-pound style, and larger-than-life personality, Ortiz was instrumental in the UFC's rise to mainstream popularity.",
    championships: [
      {
        title: "UFC Light Heavyweight Championship",
        reigns: 1,
        firstWon: "2000-04-14",
        lastWon: "2002-09-27",
        totalDays: 896,
        notes: "5 successful title defenses"
      }
    ],
    divisions: ["Light Heavyweight"],
    careerStats: {
      wins: 21,
      losses: 12,
      draws: 1,
      knockouts: 11
    }
  },
  {
    name: "Randy Couture",
    nickname: "The Natural",
    birthDate: "1963-06-22",
    birthPlace: "Everett, Washington",
    height: "6'1\"",
    weight: "220 lbs",
    reach: "74\"",
    stance: "Orthodox",
    debut: "1997-05-17",
    retired: "2011-04-30",
    promotion: "UFC",
    biography: "Randy Couture is a UFC Hall of Famer and one of the few fighters to win titles in two weight classes. Known for his wrestling background, 'dirty boxing' in the clinch, and incredible longevity, Couture competed at the highest level well into his 40s and was a five-time UFC champion.",
    championships: [
      {
        title: "UFC Heavyweight Championship",
        reigns: 2,
        firstWon: "1997-05-17",
        lastWon: "2007-08-25",
        totalDays: 667,
        notes: "Oldest heavyweight champion at age 43"
      },
      {
        title: "UFC Light Heavyweight Championship",
        reigns: 3,
        firstWon: "2003-06-06",
        lastWon: "2005-04-16",
        totalDays: 679,
        notes: "First fighter to regain title in different weight class"
      }
    ],
    divisions: ["Light Heavyweight", "Heavyweight"],
    careerStats: {
      wins: 19,
      losses: 11,
      draws: 0,
      knockouts: 7
    }
  },
  {
    name: "Fedor Emelianenko",
    nickname: "The Last Emperor",
    birthDate: "1976-09-28",
    birthPlace: "Rubizhne, Ukraine",
    height: "6'0\"",
    weight: "230 lbs",
    reach: "73\"",
    stance: "Orthodox",
    debut: "2000-05-21",
    retired: undefined,
    promotion: "PRIDE FC",
    biography: "Fedor Emelianenko is widely considered the greatest heavyweight mixed martial artist of all time. Dominant in PRIDE FC for nearly a decade, Fedor was known for his calm demeanor, incredible hand speed for a heavyweight, and submission skills. He went undefeated for over 9 years.",
    championships: [
      {
        title: "PRIDE Heavyweight Championship",
        reigns: 1,
        firstWon: "2003-03-16",
        lastWon: "2007-12-31",
        totalDays: 1751,
        notes: "Defended title 3 times in PRIDE"
      },
      {
        title: "WAMMA Heavyweight Championship",
        reigns: 1,
        firstWon: "2008-07-19",
        lastWon: "2009-01-01",
        totalDays: 166,
        notes: "First WAMMA heavyweight champion"
      }
    ],
    divisions: ["Heavyweight"],
    careerStats: {
      wins: 40,
      losses: 6,
      draws: 1,
      knockouts: 16
    }
  },
  {
    name: "Royce Gracie",
    nickname: "The Gracies",
    birthDate: "1966-12-12",
    birthPlace: "Rio de Janeiro, Brazil",
    height: "6'0\"",
    weight: "180 lbs",
    reach: "73\"",
    stance: "Orthodox",
    debut: "1993-11-12",
    retired: "2007-05-26",
    promotion: "UFC",
    biography: "Royce Gracie revolutionized martial arts by winning the first, second, and fourth UFC tournaments despite being the smallest competitor. He introduced Brazilian Jiu-Jitsu to the world and proved that technique could overcome size and strength. Royce is a UFC Hall of Famer and MMA pioneer.",
    championships: [
      {
        title: "UFC 1 Tournament Winner",
        reigns: 1,
        firstWon: "1993-11-12",
        lastWon: undefined,
        totalDays: 1,
        notes: "First UFC champion"
      },
      {
        title: "UFC 2 Tournament Winner",
        reigns: 1,
        firstWon: "1994-03-11",
        lastWon: undefined,
        totalDays: 1,
        notes: "Back-to-back tournaments"
      },
      {
        title: "UFC 4 Tournament Winner",
        reigns: 1,
        firstWon: "1994-12-16",
        lastWon: undefined,
        totalDays: 1,
        notes: "Three tournament victories"
      }
    ],
    divisions: ["No Weight Class", "Middleweight", "Light Heavyweight"],
    careerStats: {
      wins: 15,
      losses: 2,
      draws: 3,
      knockouts: 0
    }
  },
  {
    name: "Matt Hughes",
    nickname: "The Country Boy",
    birthDate: "1973-10-13",
    birthPlace: "Hillsboro, Illinois",
    height: "5'9\"",
    weight: "170 lbs",
    reach: "73\"",
    stance: "Orthodox",
    debut: "1999-05-29",
    retired: "2013-05-25",
    promotion: "UFC",
    biography: "Matt Hughes was one of the most dominant welterweight champions in UFC history. Known for his incredible strength, wrestling ability, and ground-and-pound, Hughes successfully defended the welterweight title 7 times and was inducted into the UFC Hall of Fame in 2010.",
    championships: [
      {
        title: "UFC Welterweight Championship",
        reigns: 2,
        firstWon: "2001-11-02",
        lastWon: "2006-08-26",
        totalDays: 1398,
        notes: "7 successful title defenses"
      }
    ],
    divisions: ["Welterweight"],
    careerStats: {
      wins: 45,
      losses: 9,
      draws: 0,
      knockouts: 18
    }
  },
  {
    name: "BJ Penn",
    nickname: "The Prodigy",
    birthDate: "1979-12-13",
    birthPlace: "Kailua, Hawaii",
    height: "5'9\"",
    weight: "155 lbs",
    reach: "70\"",
    stance: "Orthodox",
    debut: "2001-05-04",
    retired: "2019-05-04",
    promotion: "UFC",
    biography: "BJ Penn was the first fighter to win UFC titles in two different weight classes. Known for his exceptional boxing, Brazilian Jiu-Jitsu skills, and natural fighting ability, Penn was dominant in both the lightweight and welterweight divisions. He was inducted into the UFC Hall of Fame in 2015.",
    championships: [
      {
        title: "UFC Welterweight Championship",
        reigns: 1,
        firstWon: "2004-01-31",
        lastWon: "2006-01-02",
        totalDays: 336,
        notes: "First two-weight UFC champion"
      },
      {
        title: "UFC Lightweight Championship",
        reigns: 2,
        firstWon: "2008-01-19",
        lastWon: "2010-08-28",
        totalDays: 587,
        notes: "3 successful title defenses"
      }
    ],
    divisions: ["Lightweight", "Welterweight"],
    careerStats: {
      wins: 16,
      losses: 14,
      draws: 2,
      knockouts: 4
    }
  },
  {
    name: "Quinton Jackson",
    nickname: "Rampage",
    birthDate: "1978-06-20",
    birthPlace: "Memphis, Tennessee",
    height: "6'1\"",
    weight: "205 lbs",
    reach: "73\"",
    stance: "Orthodox",
    debut: "1999-12-18",
    retired: "2019-12-29",
    promotion: "UFC",
    biography: "Quinton 'Rampage' Jackson was known for his explosive knockout power, entertaining personality, and successful crossover into acting. A former UFC and PRIDE champion, Rampage was one of the biggest stars in MMA and helped bring the sport to mainstream audiences.",
    championships: [
      {
        title: "UFC Light Heavyweight Championship",
        reigns: 1,
        firstWon: "2007-05-26",
        lastWon: "2008-12-27",
        totalDays: 580,
        notes: "Knocked out Chuck Liddell to win title"
      },
      {
        title: "PRIDE Middleweight Championship",
        reigns: 1,
        firstWon: "2005-04-23",
        lastWon: "2007-02-25",
        totalDays: 673,
        notes: "Won PRIDE Grand Prix"
      }
    ],
    divisions: ["Light Heavyweight"],
    careerStats: {
      wins: 38,
      losses: 14,
      draws: 0,
      knockouts: 30
    }
  },
  {
    name: "Lyoto Machida",
    nickname: "The Dragon",
    birthDate: "1978-05-30",
    birthPlace: "Salvador, Brazil",
    height: "6'1\"",
    weight: "185 lbs",
    reach: "74\"",
    stance: "Southpaw",
    debut: "2003-05-17",
    retired: "2020-12-26",
    promotion: "UFC",
    biography: "Lyoto Machida brought traditional karate to MMA with devastating effectiveness. Known for his elusive movement, counter-striking, and unique karate-based style, Machida was nearly unbeatable during his prime. His knockout of Rashad Evans is considered one of the greatest in UFC history.",
    championships: [
      {
        title: "UFC Light Heavyweight Championship",
        reigns: 1,
        firstWon: "2009-05-23",
        lastWon: "2010-05-29",
        totalDays: 371,
        notes: "Brought karate to championship level"
      }
    ],
    divisions: ["Light Heavyweight", "Middleweight"],
    careerStats: {
      wins: 26,
      losses: 10,
      draws: 0,
      knockouts: 16
    }
  },
  {
    name: "Forrest Griffin",
    nickname: "The Ultimate Fighter",
    birthDate: "1979-07-01",
    birthPlace: "Columbus, Ohio",
    height: "6'3\"",
    weight: "205 lbs",
    reach: "77\"",
    stance: "Orthodox",
    debut: "2001-11-02",
    retired: "2013-07-06",
    promotion: "UFC",
    biography: "Forrest Griffin was the winner of the first season of The Ultimate Fighter reality show, which helped launch the UFC into mainstream popularity. Known for his heart, determination, and fan-friendly fighting style, Griffin became a UFC champion and Hall of Famer.",
    championships: [
      {
        title: "UFC Light Heavyweight Championship",
        reigns: 1,
        firstWon: "2008-07-05",
        lastWon: "2008-12-27",
        totalDays: 175,
        notes: "The Ultimate Fighter season 1 winner"
      }
    ],
    divisions: ["Light Heavyweight"],
    careerStats: {
      wins: 19,
      losses: 7,
      draws: 0,
      knockouts: 6
    }
  }
];

async function importMMAFighters() {
  console.log('Starting MMA fighters import...');
  let successCount = 0;
  let errorCount = 0;

  for (const fighter of mmaFighters) {
    try {
      console.log(`\\n📦 Processing: ${fighter.name}...`);
      
      // Check if profile already exists
      const existingProfile = await prisma.profile.findFirst({
        where: {
          OR: [
            { name: fighter.name },
            { slug: toSlug(fighter.name) }
          ]
        }
      });
      
      if (existingProfile) {
        console.log(`⏭️ Skipping ${fighter.name} - already exists`);
        continue;
      }
      
      // Create fighter profile
      const profile = await prisma.profile.create({
        data: {
          name: fighter.name,
          slug: toSlug(fighter.name),
          nickname: fighter.nickname,
          type: 'fighter',
          hometown: fighter.birthPlace,
          height: fighter.height,
          weight: fighter.weight,
          debut: fighter.debut ? new Date(fighter.debut) : null,
          retired: fighter.retired ? new Date(fighter.retired) : null,
          bio: fighter.biography,
          fighter: {
            create: {
              wins: fighter.careerStats.wins,
              losses: fighter.careerStats.losses,
              draws: fighter.careerStats.draws || 0,
              stance: fighter.stance,
              reach: fighter.reach,
              titleReigns: fighter.championships.reduce((sum, c) => sum + c.reigns, 0)
            }
          }
        },
        include: {
          fighter: true
        }
      });

      console.log(`✅ Created profile for ${fighter.name} (ID: ${profile.id})`);

      // Create or find promotion
      const promotions = [fighter.promotion];
      
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

      // Import divisions
      for (const divisionName of fighter.divisions) {
        await prisma.fighterDivision.create({
          data: {
            fighterProfileId: profile.fighter!.id,
            divisionName: divisionName,
            isActive: !fighter.retired
          }
        });
      }

      // Import championships
      const promotion = await prisma.promotion.findFirst({
        where: { 
          OR: [
            { name: fighter.promotion },
            { slug: toSlug(fighter.promotion) }
          ]
        }
      });

      if (promotion) {
        for (let i = 0; i < fighter.championships.length; i++) {
          const championship = fighter.championships[i];
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
      console.log(`✅ Successfully imported ${fighter.name} with ${fighter.championships.length} championships`);
      
    } catch (error) {
      errorCount++;
      console.error(`❌ Error importing ${fighter.name}:`, error);
    }
  }

  console.log(`\\n🎯 MMA Fighters Import Complete!`);
  console.log(`✅ Successfully imported: ${successCount} fighters`);
  console.log(`❌ Failed imports: ${errorCount}`);
  console.log(`📊 Total MMA fighters: ${mmaFighters.length}`);
  
  await prisma.$disconnect();
}

importMMAFighters().catch(console.error);