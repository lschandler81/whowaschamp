import { PrismaClient } from '@prisma/client';
import { toSlug } from '../lib/slug';

const prisma = new PrismaClient();

const womensFighters = [
  // Women's MMA Pioneers & Champions
  {
    name: "Ronda Rousey",
    nickname: "Rowdy",
    birthDate: "1987-02-01",
    birthPlace: "Riverside, California",
    height: "5'7\"",
    weight: "135 lbs",
    reach: "68\"",
    stance: "Orthodox",
    debut: "2010-08-06",
    retired: "2016-12-30",
    promotion: "UFC",
    biography: "Ronda Rousey is widely credited with revolutionizing women's mixed martial arts and bringing it to the mainstream. A former Olympic judoka, she became the first UFC Women's Bantamweight Champion and defended her title six times. Known for her devastating armbar submissions, Rousey was undefeated for the first six years of her MMA career.",
    championships: [
      {
        title: "UFC Women's Bantamweight Championship",
        reigns: 1,
        firstWon: "2012-12-29",
        lastWon: "2015-11-14",
        totalDays: 1086,
        notes: "First UFC Women's Bantamweight Champion, 6 title defenses"
      },
      {
        title: "Strikeforce Women's Bantamweight Championship",
        reigns: 1,
        firstWon: "2012-03-03",
        lastWon: "2012-12-29",
        totalDays: 301,
        notes: "Last Strikeforce champion before UFC merger"
      }
    ],
    divisions: ["Bantamweight"],
    careerStats: {
      wins: 12,
      losses: 2,
      draws: 0,
      knockouts: 3
    }
  },
  {
    name: "Amanda Nunes",
    nickname: "The Lioness",
    birthDate: "1988-05-30",
    birthPlace: "Bahia, Brazil",
    height: "5'8\"",
    weight: "135 lbs",
    reach: "69\"",
    stance: "Orthodox",
    debut: "2008-03-08",
    retired: undefined,
    promotion: "UFC",
    biography: "Amanda Nunes is widely regarded as the greatest women's mixed martial artist of all time. The first fighter to simultaneously hold UFC titles in two weight classes, she defeated Ronda Rousey, Miesha Tate, Holly Holm, and Cris Cyborg. Known for her knockout power and well-rounded skills.",
    championships: [
      {
        title: "UFC Women's Bantamweight Championship",
        reigns: 1,
        firstWon: "2016-07-09",
        lastWon: "2021-12-11",
        totalDays: 1981,
        notes: "5 successful title defenses, defeated Rousey and Tate"
      },
      {
        title: "UFC Women's Featherweight Championship",
        reigns: 1,
        firstWon: "2018-12-29",
        lastWon: "2021-12-11",
        totalDays: 1078,
        notes: "2 successful title defenses, defeated Cyborg"
      }
    ],
    divisions: ["Bantamweight", "Featherweight"],
    careerStats: {
      wins: 22,
      losses: 5,
      draws: 0,
      knockouts: 14
    }
  },
  {
    name: "Miesha Tate",
    nickname: "Cupcake",
    birthDate: "1986-08-18",
    birthPlace: "Tacoma, Washington",
    height: "5'6\"",
    weight: "135 lbs",
    reach: "66\"",
    stance: "Orthodox",
    debut: "2007-01-12",
    retired: "2022-07-16",
    promotion: "UFC",
    biography: "Miesha Tate was a pioneer of women's MMA and played a crucial role in the sport's growth. A former UFC and Strikeforce champion, she was known for her wrestling background, heart, and never-give-up attitude. Her rivalries with Ronda Rousey helped bring women's MMA to the mainstream.",
    championships: [
      {
        title: "UFC Women's Bantamweight Championship",
        reigns: 1,
        firstWon: "2016-03-05",
        lastWon: "2016-07-09",
        totalDays: 126,
        notes: "Defeated Holly Holm with comeback submission"
      },
      {
        title: "Strikeforce Women's Bantamweight Championship",
        reigns: 1,
        firstWon: "2011-03-05",
        lastWon: "2012-03-03",
        totalDays: 364,
        notes: "Defended title twice before Strikeforce closure"
      }
    ],
    divisions: ["Bantamweight"],
    careerStats: {
      wins: 19,
      losses: 8,
      draws: 0,
      knockouts: 2
    }
  },
  {
    name: "Holly Holm",
    nickname: "The Preacher's Daughter",
    birthDate: "1981-10-17",
    birthPlace: "Albuquerque, New Mexico",
    height: "5'8\"",
    weight: "135 lbs",
    reach: "70\"",
    stance: "Southpaw",
    debut: "2011-02-04",
    retired: undefined,
    promotion: "UFC",
    biography: "Holly Holm shocked the world by ending Ronda Rousey's undefeated streak with a devastating head kick knockout. A former professional boxer with an 18-fight winning streak, Holm brought elite striking to women's MMA. She's one of the few fighters to hold titles in both boxing and MMA.",
    championships: [
      {
        title: "UFC Women's Bantamweight Championship",
        reigns: 1,
        firstWon: "2015-11-14",
        lastWon: "2016-03-05",
        totalDays: 112,
        notes: "Shocked the world by knocking out Rousey"
      }
    ],
    divisions: ["Bantamweight", "Featherweight"],
    careerStats: {
      wins: 15,
      losses: 6,
      draws: 0,
      knockouts: 3
    }
  },
  {
    name: "Valentina Shevchenko",
    nickname: "Bullet",
    birthDate: "1988-03-07",
    birthPlace: "Frunze, Kyrgyzstan",
    height: "5'5\"",
    weight: "125 lbs",
    reach: "67\"",
    stance: "Southpaw",
    debut: "2003-02-07",
    retired: undefined,
    promotion: "UFC",
    biography: "Valentina Shevchenko is one of the most dominant champions in UFC history, with exceptional Muay Thai skills and fight IQ. The longtime UFC Women's Flyweight Champion has defended her title multiple times with precision striking and tactical brilliance. She's considered one of the pound-for-pound best.",
    championships: [
      {
        title: "UFC Women's Flyweight Championship",
        reigns: 1,
        firstWon: "2018-12-08",
        lastWon: "2023-03-04",
        totalDays: 1548,
        notes: "7 successful title defenses, most dominant flyweight"
      }
    ],
    divisions: ["Flyweight", "Bantamweight"],
    careerStats: {
      wins: 23,
      losses: 4,
      draws: 0,
      knockouts: 8
    }
  },
  {
    name: "Cris Cyborg",
    nickname: "Cyborg",
    birthDate: "1985-07-09",
    birthPlace: "Curitiba, Brazil",
    height: "5'8\"",
    weight: "145 lbs",
    reach: "69\"",
    stance: "Orthodox",
    debut: "2005-05-21",
    retired: undefined,
    promotion: "UFC",
    biography: "Cris Cyborg is widely considered one of the greatest women's featherweights of all time. Known for her aggressive striking and knockout power, she held titles in Strikeforce, Invicta FC, UFC, and Bellator. Her 13-year unbeaten streak established her as one of the most feared fighters in women's MMA.",
    championships: [
      {
        title: "UFC Women's Featherweight Championship",
        reigns: 1,
        firstWon: "2017-07-29",
        lastWon: "2018-12-29",
        totalDays: 518,
        notes: "First UFC Women's Featherweight Champion"
      },
      {
        title: "Strikeforce Women's Featherweight Championship",
        reigns: 1,
        firstWon: "2009-08-15",
        lastWon: "2011-01-29",
        totalDays: 532,
        notes: "Defended title 3 times"
      },
      {
        title: "Invicta FC Featherweight Championship",
        reigns: 1,
        firstWon: "2013-07-13",
        lastWon: "2017-07-29",
        totalDays: 1477,
        notes: "4 title defenses in Invicta FC"
      }
    ],
    divisions: ["Featherweight"],
    careerStats: {
      wins: 26,
      losses: 2,
      draws: 1,
      knockouts: 19
    }
  },
  {
    name: "Joanna Jedrzejczyk",
    nickname: "Joanna Champion",
    birthDate: "1987-08-18",
    birthPlace: "Olsztyn, Poland",
    height: "5'6\"",
    weight: "115 lbs",
    reach: "66\"",
    stance: "Orthodox",
    debut: "2012-05-19",
    retired: "2022-07-30",
    promotion: "UFC",
    biography: "Joanna Jedrzejczyk was one of the most dominant UFC Women's Strawweight Champions, known for her elite Muay Thai striking and volume. The former champion defended her title five times and was involved in some of the greatest women's fights in UFC history, including her wars with Zhang Weili.",
    championships: [
      {
        title: "UFC Women's Strawweight Championship",
        reigns: 1,
        firstWon: "2015-03-14",
        lastWon: "2017-11-04",
        totalDays: 965,
        notes: "5 successful title defenses, most in strawweight history"
      }
    ],
    divisions: ["Strawweight", "Flyweight"],
    careerStats: {
      wins: 16,
      losses: 4,
      draws: 0,
      knockouts: 3
    }
  },
  {
    name: "Rose Namajunas",
    nickname: "Thug Rose",
    birthDate: "1992-06-29",
    birthPlace: "Milwaukee, Wisconsin",
    height: "5'5\"",
    weight: "115 lbs",
    reach: "65\"",
    stance: "Orthodox",
    debut: "2013-04-13",
    retired: undefined,
    promotion: "UFC",
    biography: "Rose Namajunas is a two-time UFC Women's Strawweight Champion known for her well-rounded skills and mental toughness. She shocked the world by knocking out Joanna Jedrzejczyk to win her first title and has been involved in some of the most technical women's fights in UFC history.",
    championships: [
      {
        title: "UFC Women's Strawweight Championship",
        reigns: 2,
        firstWon: "2017-11-04",
        lastWon: "2021-11-06",
        totalDays: 1100,
        notes: "2 title reigns, 4 total title defenses"
      }
    ],
    divisions: ["Strawweight"],
    careerStats: {
      wins: 12,
      losses: 5,
      draws: 0,
      knockouts: 5
    }
  },
  {
    name: "Zhang Weili",
    nickname: "Magnum",
    birthDate: "1989-08-13",
    birthPlace: "Handan, China",
    height: "5'4\"",
    weight: "115 lbs",
    reach: "63\"",
    stance: "Orthodox",
    debut: "2013-01-19",
    retired: undefined,
    promotion: "UFC",
    biography: "Zhang Weili was the first Chinese champion in UFC history and has been involved in some of the greatest women's fights ever. Known for her powerful striking and cardio, her fights with Joanna Jedrzejczyk and Rose Namajunas are considered classics in women's MMA.",
    championships: [
      {
        title: "UFC Women's Strawweight Championship",
        reigns: 2,
        firstWon: "2019-08-31",
        lastWon: "2023-08-19",
        totalDays: 950,
        notes: "First Chinese UFC champion, 3 total title defenses"
      }
    ],
    divisions: ["Strawweight"],
    careerStats: {
      wins: 24,
      losses: 3,
      draws: 0,
      knockouts: 9
    }
  },
  {
    name: "Jessica Andrade",
    nickname: "Bate Estaca",
    birthDate: "1991-09-25",
    birthPlace: "Niterói, Brazil",
    height: "5'2\"",
    weight: "115 lbs",
    reach: "62\"",
    stance: "Orthodox",
    debut: "2011-11-05",
    retired: undefined,
    promotion: "UFC",
    biography: "Jessica Andrade is known for her incredible power and relentless pressure despite her smaller stature. A former UFC Women's Strawweight Champion, she's competed successfully across multiple weight classes and is known for her devastating knockout power and granite chin.",
    championships: [
      {
        title: "UFC Women's Strawweight Championship",
        reigns: 1,
        firstWon: "2019-05-11",
        lastWon: "2019-08-31",
        totalDays: 112,
        notes: "Spectacular slam knockout of Rose Namajunas"
      }
    ],
    divisions: ["Strawweight", "Flyweight", "Bantamweight"],
    careerStats: {
      wins: 25,
      losses: 11,
      draws: 0,
      knockouts: 16
    }
  },
  {
    name: "Carla Esparza",
    nickname: "Cookie Monster",
    birthDate: "1987-10-10",
    birthPlace: "Torrance, California",
    height: "5'1\"",
    weight: "115 lbs",
    reach: "63\"",
    stance: "Orthodox",
    debut: "2010-05-14",
    retired: undefined,
    promotion: "UFC",
    biography: "Carla Esparza was the first-ever UFC Women's Strawweight Champion, winning the inaugural title on The Ultimate Fighter. Known for her wrestling and grappling skills, she reclaimed the title years later, becoming a two-time champion and one of the division's most accomplished fighters.",
    championships: [
      {
        title: "UFC Women's Strawweight Championship",
        reigns: 2,
        firstWon: "2014-12-12",
        lastWon: "2022-11-12",
        totalDays: 480,
        notes: "First strawweight champion, reclaimed title 8 years later"
      }
    ],
    divisions: ["Strawweight"],
    careerStats: {
      wins: 20,
      losses: 6,
      draws: 0,
      knockouts: 1
    }
  },
  {
    name: "Germaine de Randamie",
    nickname: "The Iron Lady",
    birthDate: "1984-04-24",
    birthPlace: "Utrecht, Netherlands",
    height: "5'9\"",
    weight: "145 lbs",
    reach: "68\"",
    stance: "Orthodox",
    debut: "2008-12-06",
    retired: "2019-12-14",
    promotion: "UFC",
    biography: "Germaine de Randamie was the inaugural UFC Women's Featherweight Champion, known for her elite kickboxing background. A former kickboxing world champion, she brought high-level striking to women's MMA and was one of the pioneers of the featherweight division.",
    championships: [
      {
        title: "UFC Women's Featherweight Championship",
        reigns: 1,
        firstWon: "2017-02-11",
        lastWon: "2017-07-29",
        totalDays: 168,
        notes: "Inaugural UFC Women's Featherweight Champion"
      }
    ],
    divisions: ["Featherweight", "Bantamweight"],
    careerStats: {
      wins: 10,
      losses: 5,
      draws: 0,
      knockouts: 5
    }
  },
  {
    name: "Nicco Montano",
    nickname: "Sudden Impact",
    birthDate: "1988-12-16",
    birthPlace: "Albuquerque, New Mexico",
    height: "5'4\"",
    weight: "125 lbs",
    reach: "65\"",
    stance: "Orthodox",
    debut: "2015-02-14",
    retired: undefined,
    promotion: "UFC",
    biography: "Nicco Montano was the inaugural UFC Women's Flyweight Champion, winning the title on The Ultimate Fighter reality show. Though her championship reign was brief, she made history as the first flyweight champion and helped establish the 125-pound division in women's MMA.",
    championships: [
      {
        title: "UFC Women's Flyweight Championship",
        reigns: 1,
        firstWon: "2017-12-01",
        lastWon: "2018-09-08",
        totalDays: 281,
        notes: "Inaugural UFC Women's Flyweight Champion, won on TUF"
      }
    ],
    divisions: ["Flyweight", "Bantamweight"],
    careerStats: {
      wins: 4,
      losses: 3,
      draws: 0,
      knockouts: 1
    }
  },
  {
    name: "Marloes Coenen",
    nickname: "Rumina",
    birthDate: "1981-03-31",
    birthPlace: "Olst, Netherlands",
    height: "5'7\"",
    weight: "135 lbs",
    reach: "68\"",
    stance: "Orthodox",
    debut: "2000-12-02",
    retired: "2017-04-21",
    promotion: "Strikeforce",
    biography: "Marloes Coenen was a pioneer of women's MMA and former Strikeforce Women's Bantamweight Champion. With a career spanning over 16 years, she was one of the most experienced women fighters and helped pave the way for the current generation of female athletes in MMA.",
    championships: [
      {
        title: "Strikeforce Women's Bantamweight Championship",
        reigns: 1,
        firstWon: "2010-10-09",
        lastWon: "2011-03-05",
        totalDays: 147,
        notes: "Defeated Sarah Kaufman for Strikeforce title"
      }
    ],
    divisions: ["Bantamweight", "Featherweight"],
    careerStats: {
      wins: 23,
      losses: 8,
      draws: 1,
      knockouts: 6
    }
  },
  {
    name: "Sarah Kaufman",
    nickname: "Stitch",
    birthDate: "1985-09-20",
    birthPlace: "Victoria, British Columbia",
    height: "5'5\"",
    weight: "135 lbs",
    reach: "67\"",
    stance: "Orthodox",
    debut: "2006-06-02",
    retired: "2019-02-15",
    promotion: "Strikeforce",
    biography: "Sarah Kaufman was one of the early stars of women's MMA and a former Strikeforce Women's Bantamweight Champion. Known for her boxing skills and professionalism, she was a consistent top contender who helped establish credibility for women's MMA during its early growth period.",
    championships: [
      {
        title: "Strikeforce Women's Bantamweight Championship",
        reigns: 1,
        firstWon: "2009-08-15",
        lastWon: "2010-10-09",
        totalDays: 420,
        notes: "Unified title, defended twice"
      }
    ],
    divisions: ["Bantamweight"],
    careerStats: {
      wins: 20,
      losses: 5,
      draws: 1,
      knockouts: 7
    }
  }
];

async function importWomensMMA() {
  console.log('Starting Women\'s MMA fighters import...');
  let successCount = 0;
  let errorCount = 0;

  for (const fighter of womensFighters) {
    try {
      console.log(`\n📦 Processing: ${fighter.name}...`);
      
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

  console.log(`\n🎯 Women's MMA Import Complete!`);
  console.log(`✅ Successfully imported: ${successCount} fighters`);
  console.log(`❌ Failed imports: ${errorCount}`);
  console.log(`📊 Total women fighters: ${womensFighters.length}`);
  
  await prisma.$disconnect();
}

importWomensMMA().catch(console.error);