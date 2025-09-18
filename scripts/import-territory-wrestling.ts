import { PrismaClient } from '@prisma/client';
import { toSlug } from '../lib/slug';

const prisma = new PrismaClient();

const territoryWrestlers = [
  // NWA Territory Legends
  {
    name: "Dusty Rhodes",
    nickname: "The American Dream",
    birthDate: "1945-10-11",
    birthPlace: "Austin, Texas",
    height: "6'2\"",
    weight: "275 lbs",
    debut: "1968-09-01",
    retired: "2004-11-27",
    promotion: "NWA",
    biography: "Dusty Rhodes was one of the most charismatic wrestlers of all time and a true legend of the territorial era. Known for his 'common man' character and incredible mic skills, Rhodes was a three-time NWA World Heavyweight Champion and later became a successful booker and trainer.",
    championships: [
      {
        title: "NWA World Heavyweight Championship",
        reigns: 3,
        firstWon: "1979-08-21",
        lastWon: "1986-07-26",
        totalDays: 368,
        notes: "Three-time champion, legendary feuds with Flair"
      },
      {
        title: "NWA United States Heavyweight Championship",
        reigns: 2,
        firstWon: "1974-12-15",
        lastWon: "1980-01-27",
        totalDays: 287,
        notes: "Major regional champion"
      }
    ],
    finisher: "Bionic Elbow",
    era: "Golden Era",
    worldTitleReigns: 3,
    firstReignDate: "1979-08-21",
    lastReignDate: "1986-07-26"
  },
  {
    name: "Terry Funk",
    nickname: "The Funker",
    birthDate: "1944-06-30",
    birthPlace: "Hammond, Indiana",
    height: "6'1\"",
    weight: "247 lbs",
    debut: "1965-12-09",
    retired: "2017-09-03",
    promotion: "NWA",
    biography: "Terry Funk is a hardcore legend who wrestled for over 50 years across multiple generations. Known for his willingness to put his body on the line and his incredible longevity, Funk was a former NWA World Heavyweight Champion and helped pioneer hardcore wrestling.",
    championships: [
      {
        title: "NWA World Heavyweight Championship",
        reigns: 1,
        firstWon: "1975-12-10",
        lastWon: "1977-02-06",
        totalDays: 423,
        notes: "Long reign during territorial era"
      },
      {
        title: "ECW World Heavyweight Championship",
        reigns: 2,
        firstWon: "1994-09-17",
        lastWon: "1997-12-13",
        totalDays: 169,
        notes: "ECW legend, hardcore pioneer"
      }
    ],
    finisher: "Spinning Toehold",
    era: "Golden Era",
    worldTitleReigns: 3,
    firstReignDate: "1975-12-10",
    lastReignDate: "1997-12-13"
  },
  {
    name: "Harley Race",
    nickname: "The King of Wrestling",
    birthDate: "1943-04-11",
    birthPlace: "Quitman, Missouri",
    height: "6'1\"",
    weight: "253 lbs",
    debut: "1960-01-01",
    retired: "2002-07-07",
    promotion: "NWA",
    biography: "Harley Race was one of the toughest and most respected wrestlers of all time. An eight-time NWA World Heavyweight Champion, Race was known for his hard-hitting style and legitimate toughness. He helped train many future stars and was a true legend of the territorial era.",
    championships: [
      {
        title: "NWA World Heavyweight Championship",
        reigns: 8,
        firstWon: "1973-05-24",
        lastWon: "1984-06-21",
        totalDays: 1799,
        notes: "Eight-time champion, most reigns in NWA history"
      }
    ],
    finisher: "Piledriver",
    era: "Golden Era",
    worldTitleReigns: 8,
    firstReignDate: "1973-05-24",
    lastReignDate: "1984-06-21"
  },
  {
    name: "Jack Brisco",
    nickname: "The All-American Boy",
    birthDate: "1941-09-21",
    birthPlace: "Blackwell, Oklahoma",
    height: "6'1\"",
    weight: "232 lbs",
    debut: "1965-01-01",
    retired: "1985-12-31",
    promotion: "NWA",
    biography: "Jack Brisco was a legitimate amateur wrestling champion who became one of the top stars of professional wrestling. Known for his technical ability and athletic background, Brisco was a two-time NWA World Heavyweight Champion and one of the most respected wrestlers of his era.",
    championships: [
      {
        title: "NWA World Heavyweight Championship",
        reigns: 2,
        firstWon: "1973-07-20",
        lastWon: "1975-12-10",
        totalDays: 1176,
        notes: "Two lengthy reigns, technical excellence"
      }
    ],
    finisher: "Figure Four Leglock",
    era: "Golden Era",
    worldTitleReigns: 2,
    firstReignDate: "1973-07-20",
    lastReignDate: "1975-12-10"
  },
  {
    name: "Dory Funk Jr.",
    nickname: "The Funk Man",
    birthDate: "1941-02-03",
    birthPlace: "Hammond, Indiana",
    height: "6'2\"",
    weight: "242 lbs",
    debut: "1963-01-01",
    retired: "2009-05-16",
    promotion: "NWA",
    biography: "Dory Funk Jr. was one of the greatest technical wrestlers and longest-reigning NWA World Champions of all time. Part of the legendary Funk wrestling family, he was known for his submission holds and incredible conditioning. His 4+ year title reign is one of the longest in wrestling history.",
    championships: [
      {
        title: "NWA World Heavyweight Championship",
        reigns: 1,
        firstWon: "1969-02-11",
        lastWon: "1973-05-24",
        totalDays: 1563,
        notes: "4+ year reign, second longest in NWA history"
      }
    ],
    finisher: "Spinning Toehold",
    era: "Golden Era",
    worldTitleReigns: 1,
    firstReignDate: "1969-02-11",
    lastReignDate: "1973-05-24"
  },
  {
    name: "Gene Kiniski",
    nickname: "Big Thunder",
    birthDate: "1928-11-23",
    birthPlace: "Edmonton, Alberta, Canada",
    height: "6'0\"",
    weight: "265 lbs",
    debut: "1952-01-01",
    retired: "1992-12-31",
    promotion: "NWA",
    biography: "Gene Kiniski was one of the most hated heels of his era and a legitimate tough guy. Known for his intimidating presence and hard-hitting style, 'Big Thunder' was a former NWA World Heavyweight Champion who could get heat from any crowd and was respected throughout the wrestling world.",
    championships: [
      {
        title: "NWA World Heavyweight Championship",
        reigns: 1,
        firstWon: "1966-01-07",
        lastWon: "1969-02-11",
        totalDays: 1131,
        notes: "3+ year reign, dominant heel champion"
      }
    ],
    finisher: "Bearhug",
    era: "Golden Era",
    worldTitleReigns: 1,
    firstReignDate: "1966-01-07",
    lastReignDate: "1969-02-11"
  },
  // Regional Territory Stars
  {
    name: "The Iron Sheik",
    nickname: "The Iron Sheik",
    birthDate: "1942-03-15",
    birthPlace: "Damghan, Iran",
    height: "6'0\"",
    weight: "258 lbs",
    debut: "1972-01-01",
    retired: "2010-12-04",
    promotion: "WWF",
    biography: "The Iron Sheik was one of the most effective heels in wrestling history and played a crucial role in launching Hulk Hogan's career. A former bodyguard to the Shah of Iran and Olympic wrestler, Sheik's victory over Bob Backlund and subsequent loss to Hogan helped launch the WWF's national expansion.",
    championships: [
      {
        title: "WWF Championship",
        reigns: 1,
        firstWon: "1983-12-26",
        lastWon: "1984-01-23",
        totalDays: 28,
        notes: "Brief but historically significant reign"
      },
      {
        title: "WWF Tag Team Championship",
        reigns: 1,
        firstWon: "1985-03-31",
        lastWon: "1985-06-17",
        totalDays: 78,
        notes: "Partnered with Nikolai Volkoff"
      }
    ],
    finisher: "Camel Clutch",
    era: "Golden Era",
    worldTitleReigns: 1,
    firstReignDate: "1983-12-26",
    lastReignDate: "1984-01-23"
  },
  {
    name: "Bob Backlund",
    nickname: "The All-American Boy",
    birthDate: "1949-08-14",
    birthPlace: "Princeton, Minnesota",
    height: "6'1\"",
    weight: "241 lbs",
    debut: "1973-08-01",
    retired: "2007-11-18",
    promotion: "WWF",
    biography: "Bob Backlund was one of the most technically gifted wrestlers of all time and the face of the WWF during the late 1970s and early 1980s. Known for his amateur wrestling background and incredible conditioning, Backlund held the WWF Championship for over 5 years and later reinvented himself as an unhinged heel.",
    championships: [
      {
        title: "WWF Championship",
        reigns: 2,
        firstWon: "1978-02-20",
        lastWon: "1994-11-26",
        totalDays: 2138,
        notes: "5+ year first reign, second longest in WWF history"
      }
    ],
    finisher: "Crossface Chickenwing",
    era: "Golden Era",
    worldTitleReigns: 2,
    firstReignDate: "1978-02-20",
    lastReignDate: "1994-11-26"
  },
  {
    name: "Ivan Koloff",
    nickname: "The Russian Bear",
    birthDate: "1942-08-25",
    birthPlace: "Hamilton, Ontario, Canada",
    height: "5'10\"",
    weight: "298 lbs",
    debut: "1963-01-01",
    retired: "2006-12-31",
    promotion: "WWF",
    biography: "Ivan Koloff was one of the most convincing foreign heels in wrestling history despite being Canadian. Known for ending Bruno Sammartino's legendary WWF Championship reign, Koloff was a master of old-school heel psychology and had a successful career spanning over four decades.",
    championships: [
      {
        title: "WWF Championship",
        reigns: 1,
        firstWon: "1971-01-18",
        lastWon: "1971-12-01",
        totalDays: 317,
        notes: "Ended Bruno's legendary reign"
      },
      {
        title: "NWA Tag Team Championship",
        reigns: 3,
        firstWon: "1975-08-01",
        lastWon: "1986-04-26",
        totalDays: 456,
        notes: "Multiple reigns with different partners"
      }
    ],
    finisher: "Bearhug",
    era: "Golden Era",
    worldTitleReigns: 4,
    firstReignDate: "1971-01-18",
    lastReignDate: "1986-04-26"
  },
  {
    name: "Superstar Billy Graham",
    nickname: "Superstar",
    birthDate: "1943-06-07",
    birthPlace: "Phoenix, Arizona",
    height: "6'4\"",
    weight: "275 lbs",
    debut: "1970-01-01",
    retired: "1987-09-27",
    promotion: "WWF",
    biography: "Superstar Billy Graham revolutionized wrestling with his bodybuilder physique, colorful personality, and incredible charisma. A major influence on Hulk Hogan and Jesse Ventura, Graham's championship reign helped transition wrestling from the conservative Bruno Sammartino era to a more flamboyant style.",
    championships: [
      {
        title: "WWF Championship",
        reigns: 1,
        firstWon: "1977-04-30",
        lastWon: "1978-02-20",
        totalDays: 296,
        notes: "Revolutionary champion, influenced future superstars"
      }
    ],
    finisher: "Bear Hug",
    era: "Golden Era",
    worldTitleReigns: 1,
    firstReignDate: "1977-04-30",
    lastReignDate: "1978-02-20"
  },
  {
    name: "Stan Hansen",
    nickname: "The Unsinkable Battleship",
    birthDate: "1949-08-29",
    birthPlace: "Borger, Texas",
    height: "6'4\"",
    weight: "319 lbs",
    debut: "1973-08-04",
    retired: "2001-01-14",
    promotion: "AJPW",
    biography: "Stan Hansen was one of the most feared and respected wrestlers in both America and Japan. Known for his incredibly stiff wrestling style, legitimate toughness, and devastating lariat, Hansen was hugely successful in All Japan Pro Wrestling and is considered one of the greatest gaijin wrestlers ever.",
    championships: [
      {
        title: "AWA World Heavyweight Championship",
        reigns: 1,
        firstWon: "1986-12-29",
        lastWon: "1987-05-17",
        totalDays: 139,
        notes: "Brief but memorable AWA reign"
      },
      {
        title: "Triple Crown Heavyweight Championship",
        reigns: 1,
        firstWon: "1993-02-28",
        lastWon: "1993-07-29",
        totalDays: 151,
        notes: "AJPW's top championship"
      }
    ],
    finisher: "Western Lariat",
    era: "Golden Era",
    worldTitleReigns: 2,
    firstReignDate: "1986-12-29",
    lastReignDate: "1993-07-29"
  },
  {
    name: "Nick Bockwinkel",
    nickname: "The Handsome Half-Breed",
    birthDate: "1934-12-06",
    birthPlace: "St. Louis, Missouri",
    height: "6'1\"",
    weight: "236 lbs",
    debut: "1954-01-01",
    retired: "1987-12-31",
    promotion: "AWA",
    biography: "Nick Bockwinkel was one of the most articulate and technically gifted wrestlers of all time. Known for his intelligence, smooth wrestling style, and ability to cut promos without notes, Bockwinkel was a four-time AWA World Heavyweight Champion and represented the sophisticated heel archetype.",
    championships: [
      {
        title: "AWA World Heavyweight Championship",
        reigns: 4,
        firstWon: "1975-11-08",
        lastWon: "1987-05-17",
        totalDays: 1714,
        notes: "Four reigns, AWA's top heel for over a decade"
      }
    ],
    finisher: "Figure Four Leglock",
    era: "Golden Era",
    worldTitleReigns: 4,
    firstReignDate: "1975-11-08",
    lastReignDate: "1987-05-17"
  },
  {
    name: "Verne Gagne",
    nickname: "The Grappler",
    birthDate: "1926-02-26",
    birthPlace: "Corcoran, Minnesota",
    height: "5'11\"",
    weight: "218 lbs",
    debut: "1949-01-01",
    retired: "1981-09-23",
    promotion: "AWA",
    biography: "Verne Gagne was both a legendary wrestler and promoter who founded the AWA. A legitimate amateur wrestling champion and football player, Gagne was known for his technical wrestling ability and as a trainer who helped develop future stars like The Iron Sheik, Ric Flair, and many others.",
    championships: [
      {
        title: "AWA World Heavyweight Championship",
        reigns: 10,
        firstWon: "1958-08-09",
        lastWon: "1980-07-18",
        totalDays: 4677,
        notes: "Ten reigns as champion and promoter"
      }
    ],
    finisher: "Sleeper Hold",
    era: "Golden Era",
    worldTitleReigns: 10,
    firstReignDate: "1958-08-09",
    lastReignDate: "1980-07-18"
  },
  {
    name: "The Crusher",
    nickname: "The Crusher",
    birthDate: "1926-07-11",
    birthPlace: "Milwaukee, Wisconsin",
    height: "5'10\"",
    weight: "251 lbs",
    debut: "1949-01-01",
    retired: "1988-12-31",
    promotion: "AWA",
    biography: "The Crusher was a beloved babyface who became synonymous with Milwaukee wrestling. Known for his blue-collar character, bowling shirt attire, and incredible charisma, The Crusher was one of the most popular wrestlers in AWA history and a multiple-time world champion.",
    championships: [
      {
        title: "AWA World Heavyweight Championship",
        reigns: 2,
        firstWon: "1963-05-11",
        lastWon: "1965-08-28",
        totalDays: 189,
        notes: "Popular champion in AWA"
      }
    ],
    finisher: "The Crusher Bolo Punch",
    era: "Golden Era",
    worldTitleReigns: 2,
    firstReignDate: "1963-05-11",
    lastReignDate: "1965-08-28"
  },
  {
    name: "Rick Martel",
    nickname: "The Model",
    birthDate: "1956-03-18",
    birthPlace: "Quebec City, Quebec, Canada",
    height: "6'0\"",
    weight: "234 lbs",
    debut: "1973-01-01",
    retired: "1998-10-10",
    promotion: "AWA",
    biography: "Rick Martel was a talented wrestler who achieved success in multiple promotions. Starting as a technical babyface in the AWA where he won the world title, Martel later reinvented himself as 'The Model' in the WWF. He was known for his athletic ability and longevity in the business.",
    championships: [
      {
        title: "AWA World Heavyweight Championship",
        reigns: 1,
        firstWon: "1984-02-23",
        lastWon: "1985-06-29",
        totalDays: 491,
        notes: "Last major AWA champion"
      }
    ],
    finisher: "Quebec Crab",
    era: "Golden Era",
    worldTitleReigns: 1,
    firstReignDate: "1984-02-23",
    lastReignDate: "1985-06-29"
  }
];

async function importTerritoryWrestlers() {
  console.log('Starting Territory Wrestling Era import...');
  let successCount = 0;
  let errorCount = 0;

  for (const wrestler of territoryWrestlers) {
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

  console.log(`\n🎯 Territory Wrestling Import Complete!`);
  console.log(`✅ Successfully imported: ${successCount} wrestlers`);
  console.log(`❌ Failed imports: ${errorCount}`);
  console.log(`📊 Total territory wrestlers: ${territoryWrestlers.length}`);
  
  await prisma.$disconnect();
}

importTerritoryWrestlers().catch(console.error);