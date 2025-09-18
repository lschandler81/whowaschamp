import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const MISSING_WWE_LEGENDS = [
  {
    name: "Mr. Perfect",
    realName: "Curt Michael Hennig",
    nickname: "The Excellence of Execution",
    hometown: "Robbinsdale, Minnesota",
    height: "6'3\"",
    weight: "257 lbs",
    debut: "1980-12-21",
    retirement: "2002-08-09",
    finisher: "Perfectplex",
    era: "Golden",
    promotions: ["WWE", "WCW", "AWA"],
    championships: [
      { title: "WWE Intercontinental Championship", reigns: 2, days: 545, year: 1990 },
      { title: "AWA World Heavyweight Championship", reigns: 1, days: 373, year: 1987 }
    ],
    bio: "Perfectionist wrestler who never lost his smile and was considered one of the best technical wrestlers ever."
  },
  {
    name: "Owen Hart",
    realName: "Owen James Hart",
    nickname: "The King of Harts",
    hometown: "Calgary, Alberta, Canada",
    height: "5'10\"",
    weight: "227 lbs",
    debut: "1986-01-01",
    retirement: "1999-05-23",
    finisher: "Sharpshooter",
    era: "New Generation",
    promotions: ["WWE", "WCW"],
    championships: [
      { title: "WWE Intercontinental Championship", reigns: 2, days: 154, year: 1994 },
      { title: "WWE European Championship", reigns: 1, days: 147, year: 1997 },
      { title: "WWE Tag Team Championship", reigns: 4, days: 202, year: 1994 }
    ],
    bio: "Technical wrestling genius and Hart family member who tragically died in a wrestling accident."
  },
  {
    name: "British Bulldog",
    realName: "David Smith",
    nickname: "The British Bulldog",
    hometown: "Golborne, England",
    height: "5'11\"",
    weight: "260 lbs",
    debut: "1978-01-01",
    retirement: "2000-01-01",
    finisher: "Running Powerslam",
    era: "Golden",
    promotions: ["WWE", "WCW"],
    championships: [
      { title: "WWE Intercontinental Championship", reigns: 1, days: 175, year: 1992 },
      { title: "WWE Tag Team Championship", reigns: 2, days: 175, year: 1985 },
      { title: "WWE European Championship", reigns: 1, days: 206, year: 1997 }
    ],
    bio: "Powerhouse from England who won the Intercontinental Title at SummerSlam 1992 in his home country."
  },
  {
    name: "Dynamite Kid",
    realName: "Thomas Billington",
    nickname: "Dynamite Kid",
    hometown: "Golborne, England",
    height: "5'8\"",
    weight: "228 lbs",
    debut: "1975-12-06",
    retirement: "1996-10-10",
    finisher: "Diving Headbutt",
    era: "Golden",
    promotions: ["WWE", "NJPW"],
    championships: [
      { title: "WWE Tag Team Championship", reigns: 2, days: 175, year: 1985 }
    ],
    bio: "Innovative high-flyer who formed the British Bulldogs and influenced modern wrestling style."
  },
  {
    name: "Rick Rude",
    realName: "Richard Erwin Rood",
    nickname: "Ravishing Rick Rude",
    hometown: "Robbinsdale, Minnesota",
    height: "6'3\"",
    weight: "251 lbs",
    debut: "1982-11-10",
    retirement: "1997-11-09",
    finisher: "Rude Awakening",
    era: "Golden",
    promotions: ["WWE", "WCW", "ECW"],
    championships: [
      { title: "WWE Intercontinental Championship", reigns: 1, days: 154, year: 1988 },
      { title: "WCW United States Heavyweight Championship", reigns: 2, days: 55, year: 1991 }
    ],
    bio: "Arrogant heel who insulted audiences and was part of historic Monday Night War controversy."
  },
  {
    name: "Jake Roberts",
    realName: "Aurelian Smith Jr.",
    nickname: "Jake The Snake",
    hometown: "Gainesville, Texas",
    height: "6'6\"",
    weight: "249 lbs",
    debut: "1974-08-17",
    retirement: "2014-01-01",
    finisher: "DDT",
    era: "Golden",
    promotions: ["WWE", "WCW"],
    championships: [],
    bio: "Master psychologist who never needed championships, brought snakes to the ring and invented the DDT."
  },
  {
    name: "Demolition",
    realName: "Ax & Smash",
    nickname: "Demolition",
    hometown: "Parts Unknown",
    height: "6'2\" & 6'4\"",
    weight: "278 lbs & 287 lbs",
    debut: "1987-01-07",
    retirement: "1991-01-01",
    finisher: "Demolition Decapitation",
    era: "Golden",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Tag Team Championship", reigns: 3, days: 698, year: 1988 }
    ],
    bio: "Face-painted powerhouse team that dominated WWE's tag division in the late 1980s."
  },
  {
    name: "Hart Foundation",
    realName: "Bret Hart & Jim Neidhart",
    nickname: "The Excellence of Execution & The Anvil",
    hometown: "Calgary, Alberta, Canada",
    height: "6'0\" & 6'2\"",
    weight: "234 lbs & 270 lbs",
    debut: "1985-08-01",
    retirement: "1997-01-01",
    finisher: "Hart Attack",
    era: "Golden",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Tag Team Championship", reigns: 2, days: 483, year: 1987 }
    ],
    bio: "Technical excellence combined with raw power made them one of the greatest tag teams ever."
  },
  {
    name: "Money Inc.",
    realName: "Ted DiBiase & IRS",
    nickname: "The Million Dollar Man & The Tax Man",
    hometown: "Greenwich, Connecticut",
    height: "6'1\" & 6'3\"",
    weight: "260 lbs & 248 lbs",
    debut: "1991-08-01",
    retirement: "1993-01-01",
    finisher: "Million Dollar Dream",
    era: "New Generation",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Tag Team Championship", reigns: 3, days: 432, year: 1992 }
    ],
    bio: "Corporate villains who combined wealth and tax expertise to dominate early 1990s WWE."
  },
  {
    name: "The Nasty Boys",
    realName: "Jerry Sags & Brian Knobbs",
    nickname: "Nasty Boys",
    hometown: "Allentown, Pennsylvania",
    height: "6'2\" & 6'4\"",
    weight: "267 lbs & 272 lbs",
    debut: "1985-01-01",
    retirement: "2007-01-01",
    finisher: "Pit Stop",
    era: "Golden",
    promotions: ["WWE", "WCW"],
    championships: [
      { title: "WWE Tag Team Championship", reigns: 1, days: 123, year: 1991 }
    ],
    bio: "Hardcore brawlers who brought street fight mentality to tag team wrestling."
  },
  {
    name: "Razor Ramon",
    realName: "Scott Hall",
    nickname: "The Bad Guy",
    hometown: "Miami, Florida", 
    height: "6'7\"",
    weight: "287 lbs",
    debut: "1984-01-01",
    retirement: "2016-01-01",
    finisher: "Razor's Edge",
    era: "New Generation",
    promotions: ["WWE", "WCW"],
    championships: [
      { title: "WWE Intercontinental Championship", reigns: 4, days: 371, year: 1993 }
    ],
    bio: "Cuban chain-wearing bad guy who created ladder match history and co-founded the nWo."
  },
  {
    name: "Diesel",
    realName: "Kevin Nash",
    nickname: "Big Daddy Cool",
    hometown: "Detroit, Michigan",
    height: "7'0\"",
    weight: "356 lbs",
    debut: "1990-01-01",
    retirement: "2018-01-01",
    finisher: "Jackknife Powerbomb",
    era: "New Generation",
    promotions: ["WWE", "WCW"],
    championships: [
      { title: "WWE Championship", reigns: 1, days: 358, year: 1994 }
    ],
    bio: "Seven-foot giant who dominated as WWE Champion before helping start the Monday Night Wars."
  },
  {
    name: "Sycho Sid",
    realName: "Sidney Raymond Eudy",
    nickname: "The Master and Ruler of the World",
    hometown: "West Memphis, Arkansas",
    height: "6'9\"",
    weight: "317 lbs",
    debut: "1987-01-01",
    retirement: "2017-01-01",
    finisher: "Powerbomb",
    era: "New Generation",
    promotions: ["WWE", "WCW"],
    championships: [
      { title: "WWE Championship", reigns: 2, days: 140, year: 1996 }
    ],
    bio: "Psychotic powerhouse who ruled the world as a two-time WWE Champion in the 1990s."
  },
  {
    name: "Papa Shango",
    realName: "Charles Wright",
    nickname: "The Voodoo Master",
    hometown: "Parts Unknown",
    height: "6'6\"",
    weight: "330 lbs",
    debut: "1991-01-01",
    retirement: "1993-01-01",
    finisher: "Shoulder Breaker",
    era: "New Generation", 
    promotions: ["WWE"],
    championships: [],
    bio: "Mystical voodoo practitioner who cast spells and curses on his opponents in early 1990s WWE."
  },
  {
    name: "Kamala",
    realName: "James Arthur Harris",
    nickname: "The Ugandan Giant",
    hometown: "Uganda, Africa",
    height: "6'7\"",
    weight: "380 lbs",
    debut: "1982-01-01",
    retirement: "2010-01-01",
    finisher: "Kamala Splash",
    era: "Golden",
    promotions: ["WWE", "WCW"],
    championships: [],
    bio: "Savage giant managed by classy Freddie Blassie who terrorized WWE in the 1980s and 1990s."
  },
  {
    name: "King Kong Bundy",
    realName: "Christopher Alan Pallies",
    nickname: "The Walking Condominium",
    hometown: "Atlantic City, New Jersey",
    height: "6'4\"",
    weight: "458 lbs",
    debut: "1981-01-01",
    retirement: "2006-01-01",
    finisher: "Avalanche",
    era: "Golden",
    promotions: ["WWE", "WCW"],
    championships: [],
    bio: "Massive heel who demanded five-count pins and headlined WrestleMania 2 against Hulk Hogan."
  },
  {
    name: "Big Boss Man",
    realName: "Ray Washington Traylor Jr.",
    nickname: "The Big Boss Man",
    hometown: "Cobb County, Georgia",
    height: "6'6\"",
    weight: "330 lbs",
    debut: "1985-01-01",
    retirement: "2002-08-27",
    finisher: "Boss Man Slam",
    era: "Golden",
    promotions: ["WWE", "WCW"],
    championships: [
      { title: "WWE Tag Team Championship", reigns: 1, days: 25, year: 1999 },
      { title: "WWE Hardcore Championship", reigns: 4, days: 28, year: 1999 }
    ],
    bio: "Prison guard turned wrestler who brought law enforcement attitude to sports entertainment."
  },
  {
    name: "Hacksaw Jim Duggan",
    realName: "James Edward Duggan",
    nickname: "Hacksaw",
    hometown: "Glens Falls, New York",
    height: "6'3\"",
    weight: "270 lbs",
    debut: "1979-01-01",
    retirement: "2019-01-01",
    finisher: "Three Point Stance Clothesline",
    era: "Golden",
    promotions: ["WWE", "WCW"],
    championships: [
      { title: "WWE King of the Ring", reigns: 1, days: 1, year: 1988 }
    ],
    bio: "Patriotic brawler who carried a 2x4 board and shouted 'USA!' while winning the first King of the Ring."
  },
  {
    name: "Greg Valentine",
    realName: "John Anthony Wisniski Jr.",
    nickname: "The Hammer",
    hometown: "Seattle, Washington",
    height: "6'0\"",
    weight: "243 lbs",
    debut: "1970-09-18",
    retirement: "2019-01-01",
    finisher: "Figure Four Leglock",
    era: "Golden",
    promotions: ["WWE", "WCW", "NWA"],
    championships: [
      { title: "WWE Intercontinental Championship", reigns: 1, days: 295, year: 1984 },
      { title: "WWE Tag Team Championship", reigns: 1, days: 8, year: 1991 }
    ],
    bio: "Technical submission specialist who mastered the Figure Four and was managed by Jimmy Hart."
  },
  {
    name: "Tito Santana",
    realName: "Merced Solis",
    nickname: "Chico Santana",
    hometown: "Tocula, Mexico",
    height: "6'2\"",
    weight: "234 lbs",
    debut: "1977-01-01",
    retirement: "1993-01-01",
    finisher: "Flying Forearm",
    era: "Golden",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Intercontinental Championship", reigns: 2, days: 567, year: 1979 },
      { title: "WWE Tag Team Championship", reigns: 1, days: 5, year: 1987 }
    ],
    bio: "Mexican-American hero who was a cornerstone of 1980s WWE and two-time IC Champion."
  },
  {
    name: "Junkyard Dog",
    realName: "Sylvester Ritter",
    nickname: "JYD",
    hometown: "Wadesboro, North Carolina",
    height: "6'3\"",
    weight: "280 lbs",
    debut: "1977-01-01",
    retirement: "1993-01-01",
    finisher: "Thump Powerslam",
    era: "Golden",
    promotions: ["WWE", "Mid-South"],
    championships: [],
    bio: "Beloved babyface who danced to 'Grab Them Cakes' and was the first major African-American star in WWE."
  },
  {
    name: "Koko B. Ware",
    realName: "James Ware",
    nickname: "The Birdman",
    hometown: "Union City, Tennessee",
    height: "5'7\"",
    weight: "229 lbs",
    debut: "1978-01-01",
    retirement: "2019-01-01",
    finisher: "Ghostbuster",
    era: "Golden",
    promotions: ["WWE", "WCW"],
    championships: [],
    bio: "High-flying entertainer who brought his pet bird Frankie to the ring and was inducted into WWE Hall of Fame."
  },
  {
    name: "Gorilla Monsoon",
    realName: "Robert James Marella",
    nickname: "The Living Legend",
    hometown: "Manchuria",
    height: "6'5\"",
    weight: "401 lbs",
    debut: "1959-07-12",
    retirement: "1981-01-01",
    finisher: "Gorilla Press Slam",
    era: "Golden",
    promotions: ["WWE"],
    championships: [],
    bio: "Legendary wrestler turned beloved commentator whose voice defined WWE for generations of fans."
  },
  {
    name: "Blackjack Mulligan",
    realName: "Robert Jack Windham",
    nickname: "Blackjack",
    hometown: "Eagle Pass, Texas",
    height: "6'6\"",
    weight: "320 lbs",
    debut: "1967-01-01",
    retirement: "1988-01-01",
    finisher: "Bear Hug",
    era: "Golden",
    promotions: ["WWE", "NWA"],
    championships: [],
    bio: "Texas cowboy and patriarch of the Windham wrestling family, including sons Barry and Kendall."
  },
  {
    name: "Superfly Jimmy Snuka",
    realName: "James Wiley Smith",
    nickname: "Superfly",
    hometown: "Fiji",
    height: "5'10\"",
    weight: "250 lbs",
    debut: "1970-01-01",
    retirement: "2010-01-01",
    finisher: "Superfly Splash",
    era: "Golden",
    promotions: ["WWE", "ECW", "WCW"],
    championships: [],
    bio: "High-flying pioneer who revolutionized wrestling with his diving attacks from the top rope."
  },
  {
    name: "High Chief Peter Maivia",
    realName: "Fanene Leifi Pita Maivia",
    nickname: "High Chief",
    hometown: "American Samoa",
    height: "5'11\"",
    weight: "275 lbs",
    debut: "1960-01-01",
    retirement: "1981-01-01",
    finisher: "Samoan Drop",
    era: "Golden",
    promotions: ["WWE", "NWA"],
    championships: [
      { title: "WWE Tag Team Championship", reigns: 1, days: 105, year: 1978 }
    ],
    bio: "Samoan wrestling royalty and The Rock's grandfather who brought Polynesian culture to American wrestling."
  },
  {
    name: "Chief Jay Strongbow",
    realName: "Joseph Luke Scarpa",
    nickname: "Chief",
    hometown: "Pawhuska, Oklahoma",
    height: "6'2\"",
    weight: "247 lbs",
    debut: "1947-01-01",
    retirement: "1985-01-01",
    finisher: "Indian Deathlock",
    era: "Golden",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Tag Team Championship", reigns: 4, days: 634, year: 1972 }
    ],
    bio: "Native American character who performed war dances and was a four-time WWE Tag Team Champion."
  },
  {
    name: "Tony Garea",
    realName: "Anthony Garcia",
    nickname: "Mr. New Zealand",
    hometown: "Auckland, New Zealand",
    height: "6'1\"",
    weight: "242 lbs",
    debut: "1967-01-01",
    retirement: "1986-01-01",
    finisher: "Sleeper Hold",
    era: "Golden",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Tag Team Championship", reigns: 5, days: 411, year: 1973 }
    ],
    bio: "New Zealand grappler who was a five-time WWE Tag Team Champion in multiple partnerships."
  },
  {
    name: "Ivan Putski",
    realName: "Józef Bednarski",
    nickname: "Polish Hammer",
    hometown: "Kraków, Poland",
    height: "5'8\"",
    weight: "242 lbs",
    debut: "1968-01-01",
    retirement: "1987-01-01",
    finisher: "Polish Hammer",
    era: "Golden",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Tag Team Championship", reigns: 1, days: 105, year: 1979 }
    ],
    bio: "Powerlifting strongman from Poland who brought European style to American wrestling in the 1970s-80s."
  },
  {
    name: "Ken Patera",
    realName: "Kenneth Wayne Patera",
    nickname: "The Olympic Strongman",
    hometown: "Portland, Oregon",
    height: "6'2\"",
    weight: "275 lbs",
    debut: "1973-01-01",
    retirement: "1988-01-01",
    finisher: "Bear Hug",
    era: "Golden",
    promotions: ["WWE", "AWA"],
    championships: [
      { title: "WWE Intercontinental Championship", reigns: 1, days: 392, year: 1979 }
    ],
    bio: "Olympic weightlifter who transitioned to pro wrestling and held the Intercontinental Title for over a year."
  }
];

async function importMissingWWELegends() {
  console.log('🏛️ Starting missing WWE legends import...\n');

  let importedProfiles = 0;
  let importedChampionships = 0;
  let skipped = 0;

  for (const legendData of MISSING_WWE_LEGENDS) {
    try {
      console.log(`📝 Processing ${legendData.name}...`);

      // Check if profile already exists
      const existingProfile = await prisma.profile.findFirst({
        where: { 
          OR: [
            { name: legendData.name },
            { slug: legendData.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-') }
          ]
        }
      });

      if (existingProfile) {
        console.log(`   ⚠️  ${legendData.name} already exists, skipping...`);
        skipped++;
        continue;
      }

      // Create profile
      const profile = await prisma.profile.create({
        data: {
          name: legendData.name,
          slug: legendData.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
          type: 'wrestler',
          nickname: legendData.nickname,
          hometown: legendData.hometown,
          height: legendData.height,
          weight: legendData.weight,
          debut: legendData.debut ? new Date(legendData.debut) : null,
          retired: legendData.retirement ? new Date(legendData.retirement) : null,
          bio: legendData.bio,
          tagline: `WWE Legend${legendData.championships?.length ? ` • ${legendData.championships?.reduce((total, c) => total + c.reigns, 0)}-time Champion` : ''}`
        }
      });

      // Create wrestler-specific profile
      await prisma.wrestlerProfile.create({
        data: {
          profileId: profile.id,
          finisher: legendData.finisher,
          era: legendData.era,
          worldTitleReigns: legendData.championships?.reduce((total, c) => total + c.reigns, 0) || 0,
          combinedDaysAsChampion: legendData.championships?.reduce((total, c) => total + c.days, 0) || 0,
          firstReignDate: legendData.championships?.length ? new Date(`${legendData.championships[0].year}-01-01`) : null,
          lastReignDate: legendData.championships?.length ? new Date(`${legendData.championships[legendData.championships.length - 1].year}-01-01`) : null
        }
      });

      importedProfiles++;

      // Handle promotions and championships
      if (legendData.promotions && legendData.championships?.length) {
        for (const promotionName of legendData.promotions) {
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
        for (const championship of legendData.championships) {
          const promotion = await prisma.promotion.findFirst({
            where: { 
              OR: [
                { name: { in: legendData.promotions } },
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
      } else if (legendData.promotions) {
        // Just connect to promotions without championships
        for (const promotionName of legendData.promotions) {
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

      console.log(`   ✅ ${legendData.name} imported successfully`);

    } catch (error) {
      console.error(`   ❌ Error importing ${legendData.name}:`, error);
    }
  }

  console.log('\n🏛️ Missing WWE legends import completed!');
  console.log(`📊 Total Profiles Imported: ${importedProfiles}`);
  console.log(`⚠️  Profiles Skipped: ${skipped}`);
  console.log(`🏆 Total Championships Imported: ${importedChampionships}`);

  await prisma.$disconnect();
}

if (require.main === module) {
  importMissingWWELegends().catch(console.error);
}

export { importMissingWWELegends };