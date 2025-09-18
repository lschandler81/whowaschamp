import { PrismaClient } from '@prisma/client';
import { toSlug } from '../lib/slug';

const prisma = new PrismaClient();

const independentWrestlers = [
  // ROH Legends
  {
    name: "CM Punk",
    nickname: "The Second City Saint",
    birthDate: "1978-10-26",
    birthPlace: "Chicago, Illinois",
    height: "6'2\"",
    weight: "218 lbs",
    debut: "1999-08-01",
    retired: "2014-01-27",
    promotion: "ROH",
    biography: "CM Punk is one of the most influential wrestlers of the modern era, known for his straight edge lifestyle and incredible mic skills. Before becoming a WWE Champion, Punk was a cornerstone of Ring of Honor, where he had legendary feuds and helped establish the promotion as a premier independent wrestling company.",
    championships: [
      {
        title: "ROH World Championship",
        reigns: 1,
        firstWon: "2005-06-18",
        lastWon: "2005-12-17",
        totalDays: 182,
        notes: "Classic indie wrestling champion"
      },
      {
        title: "WWE Championship",
        reigns: 2,
        firstWon: "2011-06-27",
        lastWon: "2013-01-27",
        totalDays: 547,
        notes: "434-day reign, longest of modern era"
      }
    ],
    finisher: "GTS (Go To Sleep)",
    era: "Modern Era",
    worldTitleReigns: 3,
    firstReignDate: "2005-06-18",
    lastReignDate: "2013-01-27"
  },
  {
    name: "Samoa Joe",
    nickname: "The Samoan Submission Machine",
    birthDate: "1979-03-17",
    birthPlace: "Huntington Beach, California",
    height: "6'2\"",
    weight: "282 lbs",
    debut: "1999-12-11",
    retired: null,
    promotion: "ROH",
    biography: "Samoa Joe is one of the most dominant forces in independent wrestling history. Known for his hard-hitting style and submission expertise, Joe's 21-month reign as ROH World Champion is legendary. He successfully transitioned to TNA and WWE, becoming a multiple-time world champion.",
    championships: [
      {
        title: "ROH World Championship",
        reigns: 1,
        firstWon: "2003-03-22",
        lastWon: "2004-12-26",
        totalDays: 645,
        notes: "Record-setting 21-month reign"
      },
      {
        title: "TNA World Heavyweight Championship",
        reigns: 1,
        firstWon: "2008-04-13",
        lastWon: "2008-10-12",
        totalDays: 182,
        notes: "TNA's monster champion"
      }
    ],
    finisher: "Rear Naked Choke",
    era: "Modern Era",
    worldTitleReigns: 2,
    firstReignDate: "2003-03-22",
    lastReignDate: "2008-10-12"
  },
  {
    name: "Daniel Bryan",
    nickname: "The American Dragon",
    birthDate: "1981-05-22",
    birthPlace: "Aberdeen, Washington",
    height: "5'10\"",
    weight: "210 lbs",
    debut: "1999-12-04",
    retired: "2016-02-08",
    promotion: "ROH",
    biography: "Daniel Bryan (Bryan Danielson) is considered one of the greatest technical wrestlers of all time. Before his WWE success, he was the face of Ring of Honor and competed all over the world. His technical wrestling ability and underdog story made him a fan favorite and eventual WWE Champion.",
    championships: [
      {
        title: "ROH World Championship",
        reigns: 1,
        firstWon: "2005-12-17",
        lastWon: "2006-06-24",
        totalDays: 189,
        notes: "Technical wrestling masterpiece reign"
      },
      {
        title: "WWE Championship",
        reigns: 1,
        firstWon: "2014-04-06",
        lastWon: "2014-06-30",
        totalDays: 85,
        notes: "WrestleMania 30 victory"
      }
    ],
    finisher: "Yes! Lock / LeBell Lock",
    era: "Modern Era",
    worldTitleReigns: 2,
    firstReignDate: "2005-12-17",
    lastReignDate: "2014-06-30"
  },
  {
    name: "Kevin Owens",
    nickname: "The Prizefighter",
    birthDate: "1984-05-07",
    birthPlace: "Marieville, Quebec, Canada",
    height: "6'0\"",
    weight: "266 lbs",
    debut: "2000-08-12",
    retired: null,
    promotion: "ROH",
    biography: "Kevin Owens (Kevin Steen) was one of the most brutal and compelling wrestlers on the independent scene. Known for his intense feuds in ROH, PWG, and other promotions, Owens brought a unique mix of technical ability and hardcore wrestling to everything he did.",
    championships: [
      {
        title: "ROH World Championship",
        reigns: 1,
        firstWon: "2012-05-12",
        lastWon: "2013-06-22",
        totalDays: 406,
        notes: "Controversial and successful heel reign"
      },
      {
        title: "PWG World Championship",
        reigns: 2,
        firstWon: "2007-01-13",
        lastWon: "2011-07-30",
        totalDays: 287,
        notes: "Multiple reigns in PWG"
      }
    ],
    finisher: "Package Piledriver",
    era: "Modern Era",
    worldTitleReigns: 3,
    firstReignDate: "2007-01-13",
    lastReignDate: "2013-06-22"
  },
  {
    name: "Adam Cole",
    nickname: "The Panama City Playboy",
    birthDate: "1989-07-05",
    birthPlace: "Panama City, Florida",
    height: "6'0\"",
    weight: "210 lbs",
    debut: "2008-02-15",
    retired: null,
    promotion: "ROH",
    biography: "Adam Cole is a charismatic wrestler who became the face of Ring of Honor in the 2010s. Known for his cocky persona and ability to back up his boasts, Cole had memorable feuds and championship reigns across multiple independent promotions before joining NXT and AEW.",
    championships: [
      {
        title: "ROH World Championship",
        reigns: 3,
        firstWon: "2013-06-22",
        lastWon: "2016-03-04",
        totalDays: 401,
        notes: "Three-time champion, face of ROH"
      },
      {
        title: "PWG World Championship",
        reigns: 1,
        firstWon: "2016-01-29",
        lastWon: "2016-05-27",
        totalDays: 118,
        notes: "PWG champion"
      }
    ],
    finisher: "Panama Sunrise",
    era: "Modern Era",
    worldTitleReigns: 4,
    firstReignDate: "2013-06-22",
    lastReignDate: "2016-05-27"
  },
  // PWG Stars
  {
    name: "Super Dragon",
    nickname: "Super Dragon",
    birthDate: "1975-09-12",
    birthPlace: "Los Angeles, California",
    height: "5'10\"",
    weight: "180 lbs",
    debut: "1997-03-01",
    retired: "2009-12-11",
    promotion: "PWG",
    biography: "Super Dragon was one of the founding figures of Pro Wrestling Guerrilla and helped establish Southern California's independent wrestling scene. Known for his high-flying moves mixed with hardcore elements, Super Dragon was both a wrestler and booker who helped create PWG's unique atmosphere.",
    championships: [
      {
        title: "PWG World Championship",
        reigns: 2,
        firstWon: "2003-07-26",
        lastWon: "2006-08-19",
        totalDays: 421,
        notes: "Founding PWG champion, multiple reigns"
      }
    ],
    finisher: "Psycho Driver",
    era: "Modern Era",
    worldTitleReigns: 2,
    firstReignDate: "2003-07-26",
    lastReignDate: "2006-08-19"
  },
  {
    name: "Human Tornado",
    nickname: "Human Tornado",
    birthDate: "1976-04-12",
    birthPlace: "Los Angeles, California",
    height: "5'11\"",
    weight: "195 lbs",
    debut: "2000-01-01",
    retired: "2012-12-31",
    promotion: "PWG",
    biography: "Human Tornado was one of the most unique and entertaining wrestlers in PWG history. Known for his flamboyant character, incredible athleticism, and ability to get the crowd involved, Tornado was a multiple-time PWG World Champion and helped define the promotion's fun atmosphere.",
    championships: [
      {
        title: "PWG World Championship",
        reigns: 2,
        firstWon: "2006-08-19",
        lastWon: "2008-12-13",
        totalDays: 298,
        notes: "Entertaining champion, crowd favorite"
      }
    ],
    finisher: "DSD (Dat Shit Devastating)",
    era: "Modern Era",
    worldTitleReigns: 2,
    firstReignDate: "2006-08-19",
    lastReignDate: "2008-12-13"
  },
  // Other Independent Legends
  {
    name: "Low Ki",
    nickname: "The Professional",
    birthDate: "1979-09-25",
    birthPlace: "Brooklyn, New York",
    height: "5'8\"",
    weight: "180 lbs",
    debut: "1998-10-01",
    retired: null,
    promotion: "ROH",
    biography: "Low Ki is one of the most intense and technically gifted wrestlers in the world. Known for his martial arts background and hard-hitting style, he was part of Ring of Honor's first main event and held championships in multiple promotions including TNA and New Japan Pro Wrestling.",
    championships: [
      {
        title: "ROH World Championship",
        reigns: 1,
        firstWon: "2002-02-23",
        lastWon: "2003-03-22",
        totalDays: 392,
        notes: "First ROH World Champion"
      },
      {
        title: "TNA X-Division Championship",
        reigns: 3,
        firstWon: "2002-06-19",
        lastWon: "2015-01-07",
        totalDays: 194,
        notes: "Multiple X-Division reigns"
      }
    ],
    finisher: "Ki Crusher",
    era: "Modern Era",
    worldTitleReigns: 4,
    firstReignDate: "2002-02-23",
    lastReignDate: "2015-01-07"
  },
  {
    name: "AJ Styles",
    nickname: "The Phenomenal One",
    birthDate: "1977-06-02",
    birthPlace: "Jacksonville, North Carolina",
    height: "5'11\"",
    weight: "218 lbs",
    debut: "1998-09-01",
    retired: null,
    promotion: "TNA",
    biography: "AJ Styles is widely considered one of the greatest wrestlers of all time. Starting in independent promotions in the South, Styles became the face of TNA Wrestling for over a decade before successful runs in New Japan Pro Wrestling and WWE. His athletic ability and longevity are unmatched.",
    championships: [
      {
        title: "TNA World Heavyweight Championship",
        reigns: 3,
        firstWon: "2009-04-19",
        lastWon: "2013-10-20",
        totalDays: 371,
        notes: "Face of TNA Wrestling"
      },
      {
        title: "IWGP Heavyweight Championship",
        reigns: 2,
        firstWon: "2014-05-03",
        lastWon: "2015-02-11",
        totalDays: 210,
        notes: "Leader of Bullet Club in NJPW"
      }
    ],
    finisher: "Styles Clash",
    era: "Modern Era",
    worldTitleReigns: 7,
    firstReignDate: "2009-04-19",
    lastReignDate: "2017-01-29"
  },
  {
    name: "Christopher Daniels",
    nickname: "The Fallen Angel",
    birthDate: "1970-03-24",
    birthPlace: "Kalamazoo, Michigan",
    height: "6'0\"",
    weight: "215 lbs",
    debut: "1993-01-01",
    retired: null,
    promotion: "ROH",
    biography: "Christopher Daniels is one of the most respected veterans of independent wrestling. Known for his longevity, professionalism, and incredible work ethic, Daniels has been a cornerstone of promotions like ROH, TNA, and AEW. His feuds with AJ Styles and Samoa Joe are legendary.",
    championships: [
      {
        title: "ROH World Championship",
        reigns: 1,
        firstWon: "2006-12-23",
        lastWon: "2007-05-12",
        totalDays: 140,
        notes: "Veteran champion, respected leader"
      },
      {
        title: "TNA X-Division Championship",
        reigns: 6,
        firstWon: "2005-01-16",
        lastWon: "2012-07-08",
        totalDays: 287,
        notes: "Multiple X-Division reigns"
      }
    ],
    finisher: "Angel's Wings",
    era: "Modern Era",
    worldTitleReigns: 7,
    firstReignDate: "2005-01-16",
    lastReignDate: "2012-07-08"
  },
  {
    name: "Frankie Kazarian",
    nickname: "The Addiction",
    birthDate: "1977-08-04",
    birthPlace: "Anaheim, California",
    height: "6'1\"",
    weight: "215 lbs",
    debut: "1998-01-01",
    retired: null,
    promotion: "TNA",
    biography: "Frankie Kazarian is a versatile wrestler who has been a mainstay of independent wrestling for over two decades. Known for his technical ability and tag team success with Christopher Daniels, Kazarian has held championships in multiple promotions and is respected as a veteran leader.",
    championships: [
      {
        title: "TNA X-Division Championship",
        reigns: 2,
        firstWon: "2007-10-14",
        lastWon: "2012-01-08",
        totalDays: 158,
        notes: "Two X-Division reigns"
      },
      {
        title: "ROH World Tag Team Championship",
        reigns: 2,
        firstWon: "2018-04-06",
        lastWon: "2019-04-05",
        totalDays: 203,
        notes: "Multiple tag team success"
      }
    ],
    finisher: "Fade to Black",
    era: "Modern Era",
    worldTitleReigns: 4,
    firstReignDate: "2007-10-14",
    lastReignDate: "2019-04-05"
  },
  {
    name: "Matt Sydal",
    nickname: "The Zen Warrior",
    birthDate: "1983-07-14",
    birthPlace: "St. Louis, Missouri",
    height: "5'9\"",
    weight: "175 lbs",
    debut: "2000-01-01",
    retired: null,
    promotion: "ROH",
    biography: "Matt Sydal (Evan Bourne) is known for his high-flying style and spiritual approach to wrestling. A veteran of the independent scene who found success in WWE, ROH, and internationally, Sydal is respected for his athletic ability and unique character work.",
    championships: [
      {
        title: "ROH World Championship",
        reigns: 1,
        firstWon: "2021-12-11",
        lastWon: "2022-07-23",
        totalDays: 224,
        notes: "Recent ROH champion"
      },
      {
        title: "PWG World Championship",
        reigns: 1,
        firstWon: "2009-07-31",
        lastWon: "2009-12-11",
        totalDays: 133,
        notes: "PWG champion"
      }
    ],
    finisher: "Shooting Star Press",
    era: "Modern Era",
    worldTitleReigns: 2,
    firstReignDate: "2009-07-31",
    lastReignDate: "2022-07-23"
  },
  {
    name: "Roderick Strong",
    nickname: "The Messiah of the Backbreaker",
    birthDate: "1983-07-26",
    birthPlace: "Milwaukee, Wisconsin",
    height: "5'10\"",
    weight: "200 lbs",
    debut: "2000-09-01",
    retired: null,
    promotion: "ROH",
    biography: "Roderick Strong is one of the most technically sound wrestlers in the world, known for his devastating backbreakers and incredible conditioning. A longtime staple of Ring of Honor and other independent promotions, Strong later found success in NXT and is respected for his in-ring excellence.",
    championships: [
      {
        title: "ROH World Championship",
        reigns: 1,
        firstWon: "2007-09-15",
        lastWon: "2007-12-30",
        totalDays: 106,
        notes: "Technical wrestling champion"
      },
      {
        title: "PWG World Championship",
        reigns: 1,
        firstWon: "2008-05-24",
        lastWon: "2008-07-26",
        totalDays: 63,
        notes: "PWG champion"
      }
    ],
    finisher: "End of Heartache",
    era: "Modern Era",
    worldTitleReigns: 2,
    firstReignDate: "2007-09-15",
    lastReignDate: "2008-07-26"
  },
  {
    name: "Austin Aries",
    nickname: "The Greatest Man That Ever Lived",
    birthDate: "1978-04-15",
    birthPlace: "Milwaukee, Wisconsin",
    height: "5'9\"",
    weight: "202 lbs",
    debut: "2000-01-01",
    retired: null,
    promotion: "ROH",
    biography: "Austin Aries is known for his arrogant persona and exceptional in-ring ability. A former ROH World Champion who later found success in TNA and WWE's cruiserweight division, Aries is respected for his mic skills and athletic ability despite his controversial personality.",
    championships: [
      {
        title: "ROH World Championship",
        reigns: 1,
        firstWon: "2009-12-19",
        lastWon: "2011-05-21",
        totalDays: 518,
        notes: "Longest reign in ROH history at the time"
      },
      {
        title: "TNA World Heavyweight Championship",
        reigns: 1,
        firstWon: "2012-08-12",
        lastWon: "2012-10-14",
        totalDays: 63,
        notes: "TNA champion"
      }
    ],
    finisher: "Brainbuster",
    era: "Modern Era",
    worldTitleReigns: 2,
    firstReignDate: "2009-12-19",
    lastReignDate: "2012-10-14"
  }
];

async function importIndependentWrestlers() {
  console.log('Starting Independent Wrestling Circuit import...');
  let successCount = 0;
  let errorCount = 0;

  for (const wrestler of independentWrestlers) {
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

  console.log(`\n🎯 Independent Wrestling Circuit Import Complete!`);
  console.log(`✅ Successfully imported: ${successCount} wrestlers`);
  console.log(`❌ Failed imports: ${errorCount}`);
  console.log(`📊 Total independent wrestlers: ${independentWrestlers.length}`);
  
  await prisma.$disconnect();
}

importIndependentWrestlers().catch(console.error);