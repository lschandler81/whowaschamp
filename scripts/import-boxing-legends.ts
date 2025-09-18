import { PrismaClient } from '@prisma/client';
import { toSlug } from '../lib/slug';

const prisma = new PrismaClient();

const boxingLegends = [
  // All-Time Greatest Boxers
  {
    name: "Muhammad Ali",
    nickname: "The Greatest",
    birthDate: "1942-01-17",
    birthPlace: "Louisville, Kentucky",
    height: "6'3\"",
    weight: "210 lbs",
    reach: "78\"",
    stance: "Orthodox", 
    debut: "1960-10-29",
    retired: "1981-12-11",
    promotion: "Boxing",
    biography: "Muhammad Ali is widely regarded as the greatest heavyweight boxer of all time. Known for his lightning-fast footwork, powerful jab, and psychological warfare, Ali was a three-time heavyweight champion who transcended sports to become a global icon. His fights with Joe Frazier, George Foreman, and Sonny Liston are legendary.",
    championships: [
      {
        title: "WBA Heavyweight Championship",
        reigns: 2,
        firstWon: "1964-02-25",
        lastWon: "1978-09-15",
        totalDays: 2697,
        notes: "Beat Sonny Liston, stripped for Vietnam War stance, regained from Spinks"
      },
      {
        title: "WBC Heavyweight Championship", 
        reigns: 2,
        firstWon: "1964-02-25",
        lastWon: "1978-09-15",
        totalDays: 2697,
        notes: "Unified heavyweight titles multiple times"
      }
    ],
    divisions: ["Heavyweight"],
    careerStats: {
      wins: 56,
      losses: 5,
      draws: 0,
      knockouts: 37
    }
  },
  {
    name: "Mike Tyson",
    nickname: "Iron Mike",
    birthDate: "1966-06-30",
    birthPlace: "Brooklyn, New York",
    height: "5'10\"",
    weight: "220 lbs", 
    reach: "71\"",
    stance: "Orthodox",
    debut: "1985-03-06",
    retired: "2005-06-11",
    promotion: "Boxing",
    biography: "Mike Tyson became the youngest heavyweight champion in history at age 20. Known for his ferocious power, intimidating presence, and explosive knockout ability, Tyson dominated the late 1980s heavyweight division. His personal troubles and prison sentence interrupted what could have been an even more dominant career.",
    championships: [
      {
        title: "WBC Heavyweight Championship",
        reigns: 1,
        firstWon: "1986-11-22",
        lastWon: "1990-02-11",
        totalDays: 1176,
        notes: "Youngest heavyweight champion ever at 20 years old"
      },
      {
        title: "WBA Heavyweight Championship",
        reigns: 1, 
        firstWon: "1987-03-07",
        lastWon: "1990-02-11",
        totalDays: 1071,
        notes: "Unified heavyweight titles"
      },
      {
        title: "IBF Heavyweight Championship",
        reigns: 1,
        firstWon: "1987-08-01", 
        lastWon: "1990-02-11",
        totalDays: 924,
        notes: "First undisputed heavyweight champion since 1978"
      }
    ],
    divisions: ["Heavyweight"],
    careerStats: {
      wins: 50,
      losses: 6,
      draws: 0,
      knockouts: 44
    }
  },
  {
    name: "Sugar Ray Robinson", 
    nickname: "Sugar",
    birthDate: "1921-05-03",
    birthPlace: "Ailey, Georgia",
    height: "5'11\"",
    weight: "160 lbs",
    reach: "73\"", 
    stance: "Orthodox",
    debut: "1940-10-04",
    retired: "1965-12-10",
    promotion: "Boxing",
    biography: "Sugar Ray Robinson is often considered pound-for-pound the greatest boxer of all time. He held the world middleweight title five times and had a professional record of 173-19-6. Robinson was known for his hand speed, footwork, and ability to throw combinations from any angle.",
    championships: [
      {
        title: "World Welterweight Championship",
        reigns: 1,
        firstWon: "1946-12-20",
        lastWon: "1951-02-14",
        totalDays: 1517, 
        notes: "Undefeated as welterweight champion"
      },
      {
        title: "World Middleweight Championship",
        reigns: 5,
        firstWon: "1951-02-14",
        lastWon: "1958-03-25",
        totalDays: 2049,
        notes: "Won and lost the title multiple times in epic battles"
      }
    ],
    divisions: ["Welterweight", "Middleweight"],
    careerStats: {
      wins: 173,
      losses: 19, 
      draws: 6,
      knockouts: 108
    }
  },
  {
    name: "Joe Frazier",
    nickname: "Smokin' Joe",
    birthDate: "1944-01-12",
    birthPlace: "Beaufort, South Carolina", 
    height: "5'11\"",
    weight: "210 lbs",
    reach: "73\"",
    stance: "Orthodox",
    debut: "1965-08-16",
    retired: "1981-12-03",
    promotion: "Boxing",
    biography: "Joe Frazier was the first man to defeat Muhammad Ali and held the undisputed heavyweight championship from 1970-1973. Known for his relentless pressure, devastating left hook, and incredible heart, Frazier engaged in one of boxing's greatest rivalries with Ali.",
    championships: [
      {
        title: "WBA Heavyweight Championship",
        reigns: 1,
        firstWon: "1970-02-16", 
        lastWon: "1973-01-22",
        totalDays: 1071,
        notes: "Beat Ali in Fight of the Century"
      },
      {
        title: "WBC Heavyweight Championship",
        reigns: 1,
        firstWon: "1970-02-16",
        lastWon: "1973-01-22", 
        totalDays: 1071,
        notes: "Undisputed heavyweight champion"
      }
    ],
    divisions: ["Heavyweight"],
    careerStats: {
      wins: 32,
      losses: 4,
      draws: 1,
      knockouts: 27
    }
  },
  {
    name: "George Foreman",
    nickname: "Big George",
    birthDate: "1949-01-10",
    birthPlace: "Marshall, Texas",
    height: "6'3\"",
    weight: "220 lbs",
    reach: "78\"",
    stance: "Orthodox",
    debut: "1969-06-23", 
    retired: "1997-11-22",
    promotion: "Boxing",
    biography: "George Foreman had two distinct careers - dominating the 1970s as a feared puncher, then making an incredible comeback in the 1990s to become the oldest heavyweight champion ever at age 45. His knockout power was legendary, and his grilling empire made him a household name.",
    championships: [
      {
        title: "WBA Heavyweight Championship",
        reigns: 2,
        firstWon: "1973-01-22",
        lastWon: "1994-11-05",
        totalDays: 855,
        notes: "20-year gap between title reigns"
      },
      {
        title: "WBC Heavyweight Championship", 
        reigns: 1,
        firstWon: "1973-01-22",
        lastWon: "1974-10-30",
        totalDays: 646,
        notes: "Lost to Ali in Rumble in the Jungle"
      },
      {
        title: "IBF Heavyweight Championship",
        reigns: 1,
        firstWon: "1994-11-05",
        lastWon: "1995-03-04",
        totalDays: 119,
        notes: "Oldest heavyweight champion at age 45"
      }
    ],
    divisions: ["Heavyweight"],
    careerStats: {
      wins: 76,
      losses: 5,
      draws: 0, 
      knockouts: 68
    }
  },
  {
    name: "Floyd Mayweather Jr.",
    nickname: "Money",
    birthDate: "1977-02-24",
    birthPlace: "Grand Rapids, Michigan",
    height: "5'8\"",
    weight: "150 lbs",
    reach: "72\"",
    stance: "Orthodox",
    debut: "1996-10-11",
    retired: "2017-08-26",
    promotion: "Boxing", 
    biography: "Floyd Mayweather Jr. retired undefeated with a perfect 50-0 record. Known for his defensive genius, precise counter-punching, and business acumen, Mayweather won world titles in five weight divisions and became the highest-paid athlete in sports history.",
    championships: [
      {
        title: "WBC Super Featherweight Championship",
        reigns: 1,
        firstWon: "1998-10-03",
        lastWon: "2002-04-20",
        totalDays: 1295,
        notes: "First world title"
      },
      {
        title: "WBC Lightweight Championship",
        reigns: 1,
        firstWon: "2002-04-20", 
        lastWon: "2005-01-08",
        totalDays: 993,
        notes: "Dominated lightweight division"
      },
      {
        title: "WBC Welterweight Championship",
        reigns: 2,
        firstWon: "2006-04-08",
        lastWon: "2015-09-12",
        totalDays: 2537,
        notes: "Most successful welterweight reign"
      }
    ],
    divisions: ["Super Featherweight", "Lightweight", "Super Lightweight", "Welterweight", "Super Welterweight"],
    careerStats: {
      wins: 50,
      losses: 0,
      draws: 0,
      knockouts: 27
    }
  },
  {
    name: "Manny Pacquiao",
    nickname: "Pac-Man", 
    birthDate: "1978-12-17",
    birthPlace: "Kibawe, Philippines",
    height: "5'5\"",
    weight: "147 lbs",
    reach: "67\"",
    stance: "Southpaw",
    debut: "1995-01-22",
    retired: "2021-08-21",
    promotion: "Boxing",
    biography: "Manny Pacquiao is the only boxer to win world titles in eight different weight divisions. Known for his explosive power, relentless pace, and incredible heart, Pacquiao became a global icon and national hero in the Philippines. His rivalry with Floyd Mayweather captivated the boxing world.",
    championships: [
      {
        title: "WBC Flyweight Championship",
        reigns: 1,
        firstWon: "1998-12-04",
        lastWon: "1999-09-17",
        totalDays: 287,
        notes: "First world title"
      },
      {
        title: "IBF Super Bantamweight Championship",
        reigns: 1,
        firstWon: "2001-06-23",
        lastWon: "2003-11-15", 
        totalDays: 875,
        notes: "Knocked out Lehlohonolo Ledwaba"
      },
      {
        title: "WBC Super Welterweight Championship",
        reigns: 1,
        firstWon: "2019-07-20",
        lastWon: "2021-08-21",
        totalDays: 762,
        notes: "Won title at age 40"
      }
    ],
    divisions: ["Flyweight", "Super Bantamweight", "Featherweight", "Super Featherweight", "Lightweight", "Super Lightweight", "Welterweight", "Super Welterweight"],
    careerStats: {
      wins: 62,
      losses: 8,
      draws: 2,
      knockouts: 39
    }
  },
  {
    name: "Evander Holyfield",
    nickname: "The Real Deal", 
    birthDate: "1962-10-19",
    birthPlace: "Atmore, Alabama",
    height: "6'2\"",
    weight: "215 lbs",
    reach: "77\"",
    stance: "Orthodox",
    debut: "1984-11-15",
    retired: "2011-05-07",
    promotion: "Boxing",
    biography: "Evander Holyfield is the only four-time heavyweight champion in history. He successfully moved up from cruiserweight to heavyweight and defeated Mike Tyson twice, including the infamous 'Bite Fight.' Known for his heart, determination, and warrior spirit.",
    championships: [
      {
        title: "WBA Cruiserweight Championship",
        reigns: 1,
        firstWon: "1986-07-12",
        lastWon: "1988-04-09", 
        totalDays: 636,
        notes: "Unified cruiserweight titles"
      },
      {
        title: "WBA Heavyweight Championship",
        reigns: 3,
        firstWon: "1990-10-25",
        lastWon: "2000-08-12",
        totalDays: 1173,
        notes: "Four-time heavyweight champion"
      },
      {
        title: "WBC Heavyweight Championship",
        reigns: 1,
        firstWon: "1993-11-06",
        lastWon: "1994-04-22",
        totalDays: 137,
        notes: "Beat Riddick Bowe"
      }
    ],
    divisions: ["Cruiserweight", "Heavyweight"],
    careerStats: {
      wins: 44,
      losses: 10,
      draws: 2,
      knockouts: 29
    }
  },
  {
    name: "Roberto Duran", 
    nickname: "Hands of Stone",
    birthDate: "1951-06-16",
    birthPlace: "Guarare, Panama",
    height: "5'7\"",
    weight: "135 lbs",
    reach: "67\"",
    stance: "Orthodox",
    debut: "1968-02-23",
    retired: "2001-07-14",
    promotion: "Boxing",
    biography: "Roberto Duran was a ferocious fighter who won world titles in four weight divisions during a career that spanned five decades. Known for his granite chin, devastating body shots, and intimidating persona, Duran's rivalry with Sugar Ray Leonard produced some of boxing's greatest fights.",
    championships: [
      {
        title: "WBA Lightweight Championship",
        reigns: 1,
        firstWon: "1972-06-26",
        lastWon: "1979-02-02",
        totalDays: 2413,
        notes: "Dominated lightweight division for 6+ years"
      },
      {
        title: "WBC Welterweight Championship", 
        reigns: 1,
        firstWon: "1980-06-20",
        lastWon: "1980-11-25",
        totalDays: 158,
        notes: "Beat Sugar Ray Leonard in famous upset"
      },
      {
        title: "WBA Super Welterweight Championship",
        reigns: 1,
        firstWon: "1989-02-24",
        lastWon: "1989-07-16",
        totalDays: 142,
        notes: "Won title at age 37"
      }
    ],
    divisions: ["Lightweight", "Welterweight", "Super Welterweight", "Middleweight"],
    careerStats: {
      wins: 103,
      losses: 16,
      draws: 0,
      knockouts: 70
    }
  },
  {
    name: "Sugar Ray Leonard",
    nickname: "Sugar Ray",
    birthDate: "1956-05-17",
    birthPlace: "Wilmington, North Carolina",
    height: "5'10\"", 
    weight: "147 lbs",
    reach: "74\"",
    stance: "Orthodox",
    debut: "1977-02-05",
    retired: "1997-03-01",
    promotion: "Boxing",
    biography: "Sugar Ray Leonard was the face of boxing in the 1980s, combining exceptional skill with charisma and showmanship. He won world titles in five weight divisions and engaged in legendary rivalries with Roberto Duran, Thomas Hearns, and Marvin Hagler.",
    championships: [
      {
        title: "WBC Welterweight Championship",
        reigns: 2,
        firstWon: "1979-11-30",
        lastWon: "1989-11-07",
        totalDays: 1205,
        notes: "Beat Wilfred Benitez for first title"
      },
      {
        title: "WBA Super Welterweight Championship",
        reigns: 1,
        firstWon: "1988-11-07",
        lastWon: "1989-06-12",
        totalDays: 217,
        notes: "Beat Donny Lalonde"
      },
      {
        title: "WBC Middleweight Championship", 
        reigns: 1,
        firstWon: "1987-04-06",
        lastWon: "1987-04-06",
        totalDays: 1,
        notes: "Beat Marvin Hagler in epic fight"
      }
    ],
    divisions: ["Welterweight", "Super Welterweight", "Middleweight", "Super Middleweight", "Light Heavyweight"],
    careerStats: {
      wins: 36,
      losses: 3,
      draws: 1,
      knockouts: 25
    }
  }
];

async function importBoxingLegends() {
  console.log('Starting boxing legends import...');
  let successCount = 0;
  let errorCount = 0;

  for (const boxer of boxingLegends) {
    try {
      console.log(`\\n📦 Processing: ${boxer.name}...`);
      
      // Check if profile already exists
      const existingProfile = await prisma.profile.findFirst({
        where: {
          OR: [
            { name: boxer.name },
            { slug: toSlug(boxer.name) }
          ]
        }
      });
      
      if (existingProfile) {
        console.log(`⏭️ Skipping ${boxer.name} - already exists`);
        continue;
      }
      
      // Create fighter profile
      const profile = await prisma.profile.create({
        data: {
          name: boxer.name,
          slug: toSlug(boxer.name),
          nickname: boxer.nickname,
          type: 'fighter',
          hometown: boxer.birthPlace,
          height: boxer.height,
          weight: boxer.weight,
          debut: boxer.debut ? new Date(boxer.debut) : null,
          retired: boxer.retired ? new Date(boxer.retired) : null,
          bio: boxer.biography,
          fighter: {
            create: {
              wins: boxer.careerStats.wins,
              losses: boxer.careerStats.losses,
              draws: boxer.careerStats.draws || 0,
              stance: boxer.stance,
              reach: boxer.reach,
              titleReigns: boxer.championships.reduce((sum, c) => sum + c.reigns, 0)
            }
          }
        }
      });

      console.log(`✅ Created profile for ${boxer.name} (ID: ${profile.id})`);

      // Create promotion connection
      let promotion = await prisma.promotion.findFirst({
        where: { 
          OR: [
            { name: 'Boxing' },
            { slug: 'boxing' }
          ]
        }
      });

      if (!promotion) {
        promotion = await prisma.promotion.create({
          data: {
            name: 'Boxing',
            slug: 'boxing'
          }
        });
        console.log('✅ Created Boxing promotion');
      }

      // Create promotion relationship
      await prisma.profilePromotion.create({
        data: {
          profileId: profile.id,
          promotionId: promotion.id
        }
      });

      // Import divisions
      for (const divisionName of boxer.divisions) {
        await prisma.fighterDivision.create({
          data: {
            fighterProfileId: profile.id,
            divisionName: divisionName,
            isActive: !boxer.retired
          }
        });
      }

      // Import championships
      for (const championship of boxer.championships) {
        await prisma.championship.create({
          data: {
            title: championship.title,
            promotionId: promotion.id,
            profileId: profile.id,
            wonDate: new Date(championship.firstWon),
            lostDate: championship.lastWon ? new Date(championship.lastWon) : null,
            daysHeld: championship.totalDays,
            defenses: 0,
            notes: championship.notes
          }
        });
      }

      successCount++;
      console.log(`✅ Successfully imported ${boxer.name} with ${boxer.championships.length} championships`);
      
    } catch (error) {
      errorCount++;
      console.error(`❌ Error importing ${boxer.name}:`, error);
    }
  }

  console.log(`\\n🎯 Boxing Legends Import Complete!`);
  console.log(`✅ Successfully imported: ${successCount} boxers`);
  console.log(`❌ Failed imports: ${errorCount}`);
  console.log(`📊 Total boxing legends: ${boxingLegends.length}`);
  
  await prisma.$disconnect();
}

importBoxingLegends().catch(console.error);