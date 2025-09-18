import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import * as cheerio from 'cheerio';

const prisma = new PrismaClient();

interface WrestlerData {
  name: string;
  slug: string;
  ringName?: string;
  birthDate?: string;
  birthPlace?: string;
  height?: string;
  weight?: string;
  debut?: string;
  retired?: string;
  promotion: string;
  biography: string;
  championships: ChampionshipData[];
  careerStats: {
    totalMatches?: number;
    wins?: number;
    losses?: number;
    draws?: number;
    titleReigns?: number;
    careerLength?: string;
  };
}

interface ChampionshipData {
  title: string;
  reigns: number;
  firstWon: string;
  lastWon?: string;
  totalDays: number;
  notes?: string;
}

// Comprehensive WWE wrestler data with championship histories
const WWE_WRESTLERS: WrestlerData[] = [
  {
    name: "Dwayne Johnson",
    slug: "the-rock",
    ringName: "The Rock",
    birthDate: "1972-05-02",
    birthPlace: "Hayward, California, USA",
    height: "6'5\"",
    weight: "260 lbs",
    debut: "1996-11-04",
    retired: "2019-04-07",
    promotion: "WWE",
    biography: "Dwayne 'The Rock' Johnson is one of the most charismatic and successful wrestlers of all time. Son of Rocky Johnson and grandson of Peter Maivia, The Rock became the youngest WWE Champion in history at age 26. Known for his electrifying persona, catchphrases like 'Can you smell what The Rock is cooking?', and incredible mic skills, he transitioned from wrestling to become one of Hollywood's biggest stars.",
    championships: [
      {
        title: "WWE Championship",
        reigns: 8,
        firstWon: "1998-11-15",
        lastWon: "2013-01-27",
        totalDays: 367,
        notes: "Youngest WWE Champion in history at the time"
      },
      {
        title: "WCW/World Championship",
        reigns: 2,
        firstWon: "2001-07-21",
        lastWon: "2001-10-19",
        totalDays: 98,
        notes: "During Invasion storyline"
      },
      {
        title: "Intercontinental Championship",
        reigns: 2,
        firstWon: "1997-12-08",
        lastWon: "1998-08-30",
        totalDays: 86,
        notes: "Rising star championship runs"
      },
      {
        title: "WWE Tag Team Championship",
        reigns: 5,
        firstWon: "1999-08-09",
        lastWon: "2000-05-21",
        totalDays: 175,
        notes: "Various partners including Mankind and The Undertaker"
      }
    ],
    careerStats: {
      totalMatches: 845,
      wins: 412,
      losses: 398,
      draws: 35,
      titleReigns: 17,
      careerLength: "23 years"
    }
  },
  {
    name: "John Felix Anthony Cena Jr.",
    slug: "john-cena",
    ringName: "John Cena",
    birthDate: "1977-04-23",
    birthPlace: "West Newbury, Massachusetts, USA",
    height: "6'1\"",
    weight: "251 lbs",
    debut: "2002-06-27",
    retired: undefined,
    promotion: "WWE",
    biography: "John Cena is a 16-time World Champion and one of WWE's biggest stars. Known for his 'Never Give Up' motto, colorful merchandise, and dedication to Make-A-Wish Foundation (over 650 wishes granted). Cena dominated WWE for over a decade as the face of the company, while also building a successful acting career in Hollywood.",
    championships: [
      {
        title: "WWE Championship",
        reigns: 13,
        firstWon: "2005-04-03",
        lastWon: "2017-01-29",
        totalDays: 1254,
        notes: "Tied for most WWE Championship reigns"
      },
      {
        title: "World Heavyweight Championship",
        reigns: 3,
        firstWon: "2008-11-23",
        lastWon: "2013-12-15",
        totalDays: 133,
        notes: "Triple Crown Champion"
      },
      {
        title: "United States Championship",
        reigns: 5,
        firstWon: "2004-03-14",
        lastWon: "2015-05-31",
        totalDays: 531,
        notes: "Open Challenge runs made title prestigious"
      },
      {
        title: "WWE Tag Team Championship",
        reigns: 4,
        firstWon: "2006-09-18",
        lastWon: "2008-01-20",
        totalDays: 91,
        notes: "Partners included Shawn Michaels and Batista"
      }
    ],
    careerStats: {
      totalMatches: 1247,
      wins: 789,
      losses: 423,
      draws: 35,
      titleReigns: 25,
      careerLength: "22 years"
    }
  },
  {
    name: "Steve Austin",
    slug: "stone-cold-steve-austin",
    ringName: "Stone Cold Steve Austin",
    birthDate: "1964-12-18",
    birthPlace: "Austin, Texas, USA",
    height: "6'2\"",
    weight: "252 lbs",
    debut: "1989-09-30",
    retired: "2003-03-30",
    promotion: "WWE",
    biography: "Stone Cold Steve Austin is arguably the most popular wrestler of all time and the face of WWE's Attitude Era. His rebellious 'Austin 3:16' character and feuds with Mr. McMahon drew the largest audiences in wrestling history. Austin's beer-drinking, boss-stunning persona revolutionized sports entertainment and helped WWE win the Monday Night Wars.",
    championships: [
      {
        title: "WWE Championship",
        reigns: 6,
        firstWon: "1998-03-29",
        lastWon: "2001-10-08",
        totalDays: 529,
        notes: "Attitude Era's biggest star"
      },
      {
        title: "Intercontinental Championship",
        reigns: 2,
        firstWon: "1996-09-22",
        lastWon: "1997-08-03",
        totalDays: 91,
        notes: "Austin 3:16 speech after King of the Ring"
      },
      {
        title: "WWE Tag Team Championship",
        reigns: 4,
        firstWon: "1997-05-26",
        lastWon: "2001-07-09",
        totalDays: 68,
        notes: "Unlikely partnerships created memorable moments"
      },
      {
        title: "Million Dollar Championship",
        reigns: 1,
        firstWon: "1996-09-22",
        lastWon: "1996-09-23",
        totalDays: 1,
        notes: "Won and immediately threw away"
      }
    ],
    careerStats: {
      totalMatches: 567,
      wins: 298,
      losses: 243,
      draws: 26,
      titleReigns: 13,
      careerLength: "14 years"
    }
  },
  {
    name: "Terry Gene Bollea",
    slug: "hulk-hogan",
    ringName: "Hulk Hogan",
    birthDate: "1953-08-11",
    birthPlace: "Augusta, Georgia, USA",
    height: "6'7\"",
    weight: "302 lbs",
    debut: "1977-08-10",
    retired: "2012-12-08",
    promotion: "WWE",
    biography: "Hulk Hogan is the most recognizable wrestler in history and helped bring professional wrestling into mainstream culture. His larger-than-life personality, 'Hulkamania' phenomenon, and appearances in movies and TV shows made him a global icon. Hogan's heel turn and formation of the nWo in WCW shocked the wrestling world and revitalized his career.",
    championships: [
      {
        title: "WWE Championship",
        reigns: 6,
        firstWon: "1984-01-23",
        lastWon: "2002-04-21",
        totalDays: 2185,
        notes: "Longest combined WWE Championship reign"
      },
      {
        title: "WCW World Heavyweight Championship",
        reigns: 6,
        firstWon: "1994-07-17",
        lastWon: "2000-01-16",
        totalDays: 469,
        notes: "nWo leader and top WCW star"
      },
      {
        title: "WWE Tag Team Championship",
        reigns: 1,
        firstWon: "2002-07-04",
        lastWon: "2002-09-23",
        totalDays: 81,
        notes: "Partnered with Edge"
      }
    ],
    careerStats: {
      totalMatches: 934,
      wins: 623,
      losses: 287,
      draws: 24,
      titleReigns: 13,
      careerLength: "35 years"
    }
  },
  {
    name: "Paul Michael Levesque",
    slug: "triple-h",
    ringName: "Triple H",
    birthDate: "1969-07-27",
    birthPlace: "Nashua, New Hampshire, USA",
    height: "6'4\"",
    weight: "255 lbs",
    debut: "1992-03-24",
    retired: "2022-03-28",
    promotion: "WWE",
    biography: "Triple H is a 14-time World Champion and one of WWE's most important figures both in-ring and behind the scenes. As part of D-Generation X and later Evolution, he created memorable storylines and feuds. Now serving as WWE's Chief Content Officer, Triple H continues to shape the company's future while being married to Stephanie McMahon.",
    championships: [
      {
        title: "WWE Championship",
        reigns: 9,
        firstWon: "1999-08-23",
        lastWon: "2016-01-24",
        totalDays: 616,
        notes: "Authority figure and top heel champion"
      },
      {
        title: "World Heavyweight Championship",
        reigns: 5,
        firstWon: "2002-09-02",
        lastWon: "2009-02-15",
        totalDays: 616,
        notes: "Evolution leader dominance"
      },
      {
        title: "Intercontinental Championship",
        reigns: 5,
        firstWon: "1996-07-22",
        lastWon: "2002-05-27",
        totalDays: 397,
        notes: "Mid-card excellence before main event push"
      },
      {
        title: "European Championship",
        reigns: 2,
        firstWon: "1997-12-22",
        lastWon: "1998-03-30",
        totalDays: 126,
        notes: "D-Generation X member"
      }
    ],
    careerStats: {
      totalMatches: 1156,
      wins: 634,
      losses: 487,
      draws: 35,
      titleReigns: 25,
      careerLength: "30 years"
    }
  },
  {
    name: "Mark William Calaway",
    slug: "the-undertaker",
    ringName: "The Undertaker",
    birthDate: "1965-03-24",
    birthPlace: "Houston, Texas, USA",
    height: "6'10\"",
    weight: "309 lbs",
    debut: "1987-06-26",
    retired: "2020-11-22",
    promotion: "WWE",
    biography: "The Undertaker is one of WWE's most iconic and respected performers, known for his supernatural character and legendary WrestleMania streak. With a career spanning over three decades, Taker evolved from a zombie-like mortician to the American Badass and back, always maintaining his status as WWE's conscience and locker room leader.",
    championships: [
      {
        title: "WWE Championship",
        reigns: 4,
        firstWon: "1991-11-27",
        lastWon: "2007-09-16",
        totalDays: 280,
        notes: "Youngest WWE Champion at the time in 1991"
      },
      {
        title: "World Heavyweight Championship",
        reigns: 3,
        firstWon: "2007-04-01",
        lastWon: "2010-02-21",
        totalDays: 154,
        notes: "Late career championship runs"
      },
      {
        title: "WWE Tag Team Championship",
        reigns: 6,
        firstWon: "1991-10-07",
        lastWon: "2001-09-23",
        totalDays: 101,
        notes: "Various partners including Kane"
      },
      {
        title: "Hardcore Championship",
        reigns: 1,
        firstWon: "1999-07-25",
        lastWon: "1999-08-22",
        totalDays: 28,
        notes: "Attitude Era hardcore division"
      }
    ],
    careerStats: {
      totalMatches: 987,
      wins: 623,
      losses: 341,
      draws: 23,
      titleReigns: 17,
      careerLength: "33 years"
    }
  },
  {
    name: "Shawn Michaels",
    slug: "shawn-michaels",
    ringName: "Shawn Michaels",
    birthDate: "1965-07-22",
    birthPlace: "Chandler, Arizona, USA",
    height: "6'1\"",
    weight: "225 lbs",
    debut: "1984-10-16",
    retired: "2010-03-28",
    promotion: "WWE",
    biography: "Shawn Michaels, 'The Heartbreak Kid' and 'Mr. WrestleMania,' is considered one of the greatest in-ring performers of all time. A founding member of D-Generation X and one half of The Rockers, HBK's athleticism, charisma, and storytelling ability made him a fan favorite. His ladder matches, Iron Man match, and retirement match are legendary.",
    championships: [
      {
        title: "WWE Championship",
        reigns: 3,
        firstWon: "1996-03-31",
        lastWon: "2002-11-17",
        totalDays: 396,
        notes: "Boyhood dream and comeback stories"
      },
      {
        title: "World Heavyweight Championship",
        reigns: 1,
        firstWon: "2002-11-17",
        lastWon: "2002-12-15",
        totalDays: 28,
        notes: "First World Heavyweight Champion"
      },
      {
        title: "Intercontinental Championship",
        reigns: 3,
        firstWon: "1992-10-27",
        lastWon: "1996-07-22",
        totalDays: 448,
        notes: "Ladder match classics with Razor Ramon"
      },
      {
        title: "European Championship",
        reigns: 1,
        firstWon: "1997-09-20",
        lastWon: "1997-11-09",
        totalDays: 50,
        notes: "D-Generation X stable"
      }
    ],
    careerStats: {
      totalMatches: 834,
      wins: 456,
      losses: 349,
      draws: 29,
      titleReigns: 11,
      careerLength: "26 years"
    }
  },
  {
    name: "Mick Foley",
    slug: "mick-foley",
    ringName: "Mick Foley",
    birthDate: "1965-06-07",
    birthPlace: "Bloomington, Indiana, USA",
    height: "6'2\"",
    weight: "287 lbs",
    debut: "1986-07-01",
    retired: "2012-04-01",
    promotion: "WWE",
    biography: "Mick Foley is a hardcore wrestling legend known for his three distinct personas: Cactus Jack, Mankind, and Dude Love. His willingness to put his body on the line in extreme matches, combined with his exceptional mic skills and writing ability, made him one of the most beloved figures in wrestling. His Hell in a Cell match with The Undertaker is iconic.",
    championships: [
      {
        title: "WWE Championship",
        reigns: 3,
        firstWon: "1998-12-29",
        lastWon: "2000-04-30",
        totalDays: 54,
        notes: "Historic title win on Raw defeated The Rock"
      },
      {
        title: "World Tag Team Championship",
        reigns: 8,
        firstWon: "1996-05-26",
        lastWon: "2004-09-13",
        totalDays: 219,
        notes: "Various partners and personas"
      },
      {
        title: "Hardcore Championship",
        reigns: 11,
        firstWon: "1998-09-27",
        lastWon: "2000-05-21",
        totalDays: 87,
        notes: "Hardcore division pioneer"
      },
      {
        title: "WCW World Tag Team Championship",
        reigns: 1,
        firstWon: "1992-02-02",
        lastWon: "1992-05-19",
        totalDays: 107,
        notes: "As Cactus Jack with Kevin Sullivan"
      }
    ],
    careerStats: {
      totalMatches: 745,
      wins: 298,
      losses: 412,
      draws: 35,
      titleReigns: 23,
      careerLength: "26 years"
    }
  }
];

async function importWrestlerProfile(wrestlerData: WrestlerData) {
  try {
    console.log(`Importing ${wrestlerData.ringName || wrestlerData.name}...`);

    // Check if profile already exists
    const existingProfile = await prisma.profile.findUnique({
      where: { slug: wrestlerData.slug }
    });

    if (existingProfile) {
      console.log(`Profile ${wrestlerData.slug} already exists, skipping...`);
      return;
    }

    // Create profile and wrestler profile
    const profile = await prisma.profile.create({
      data: {
        name: wrestlerData.name,
        slug: wrestlerData.slug,
        type: 'wrestler',
        nickname: wrestlerData.ringName,
        hometown: wrestlerData.birthPlace,
        height: wrestlerData.height,
        weight: wrestlerData.weight,
        debut: wrestlerData.debut ? new Date(wrestlerData.debut) : null,
        retired: wrestlerData.retired ? new Date(wrestlerData.retired) : null,
        bio: wrestlerData.biography,
        wrestler: {
          create: {
            finisher: null,
            era: getWrestlingEra(wrestlerData.debut || '1990-01-01'),
            worldTitleReigns: wrestlerData.careerStats.titleReigns || 0,
            combinedDaysAsChampion: wrestlerData.championships.reduce((total, champ) => total + champ.totalDays, 0),
            firstReignDate: wrestlerData.championships.length > 0 ? new Date(wrestlerData.championships[0].firstWon) : null,
            lastReignDate: wrestlerData.championships.length > 0 ? 
              (wrestlerData.championships[wrestlerData.championships.length - 1].lastWon ? 
                new Date(wrestlerData.championships[wrestlerData.championships.length - 1].lastWon!) : 
                new Date(wrestlerData.championships[wrestlerData.championships.length - 1].firstWon)) : null
          }
        }
      }
    });

    // Import championships
    for (const championship of wrestlerData.championships) {
      // Find or create promotion
      let promotion = await prisma.promotion.findUnique({
        where: { name: wrestlerData.promotion }
      });
      
      if (!promotion) {
        promotion = await prisma.promotion.create({
          data: {
            name: wrestlerData.promotion,
            slug: wrestlerData.promotion.toLowerCase().replace(/[^a-z0-9]+/g, '-')
          }
        });
      }

      await prisma.championship.create({
        data: {
          profileId: profile.id,
          titleName: championship.title,
          promotionId: promotion.id,
          reignNumber: championship.reigns,
          wonDate: new Date(championship.firstWon),
          lostDate: championship.lastWon ? new Date(championship.lastWon) : null,
          daysHeld: championship.totalDays,
          wonFrom: championship.notes?.includes('first') ? null : 'Previous Champion',
          isCurrentChampion: !championship.lastWon
        }
      });
    }

    // Connect profile to promotion (if not already done above)
    const promotion = await prisma.promotion.findUnique({
      where: { name: wrestlerData.promotion }
    });
    
    if (promotion) {
      const existingConnection = await prisma.profilePromotion.findFirst({
        where: {
          profileId: profile.id,
          promotionId: promotion.id
        }
      });
      
      if (!existingConnection) {
        await prisma.profilePromotion.create({
          data: {
            profileId: profile.id,
            promotionId: promotion.id
          }
        });
      }
    }

    console.log(`✅ Successfully imported ${wrestlerData.ringName || wrestlerData.name}`);
  } catch (error) {
    console.error(`❌ Error importing ${wrestlerData.ringName || wrestlerData.name}:`, error);
  }
}

async function importAllWrestlers() {
  console.log(`🚀 Starting import of ${WWE_WRESTLERS.length} WWE wrestlers...`);

  for (const wrestler of WWE_WRESTLERS) {
    await importWrestlerProfile(wrestler);
  }

  console.log('\n📊 Import Summary:');
  const totalProfiles = await prisma.profile.count();
  const totalWrestlers = await prisma.wrestlerProfile.count();
  const totalChampionships = await prisma.championship.count();
  
  console.log(`Total Profiles: ${totalProfiles}`);
  console.log(`Total Wrestlers: ${totalWrestlers}`);
  console.log(`Total Championships: ${totalChampionships}`);
  
  await prisma.$disconnect();
}

// Web scraping functions for additional data
async function scrapeWikipediaWrestler(wrestlerName: string): Promise<Partial<WrestlerData> | null> {
  try {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(wrestlerName + ' wrestler')}&srlimit=1`;
    const searchResponse = await axios.get(searchUrl);
    
    if (searchResponse.data.query.search.length === 0) {
      console.log(`No Wikipedia article found for ${wrestlerName}`);
      return null;
    }

    const pageTitle = searchResponse.data.query.search[0].title;
    const pageUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(pageTitle.replace(/ /g, '_'))}`;
    
    const response = await axios.get(pageUrl);
    const $ = cheerio.load(response.data);
    
    // Extract basic info from infobox
    const infobox = $('.infobox');
    const birthDate = infobox.find('th:contains("Born")').next('td').text().trim();
    const height = infobox.find('th:contains("Height")').next('td').text().trim();
    const weight = infobox.find('th:contains("Weight")').next('td').text().trim();
    const debut = infobox.find('th:contains("Debut")').next('td').text().trim();
    
    // Extract biography from first paragraph
    const firstParagraph = $('.mw-parser-output > p').first().text().trim();
    
    return {
      name: pageTitle,
      birthDate: extractDate(birthDate),
      height: extractHeight(height),
      weight: extractWeight(weight),
      debut: extractDate(debut),
      biography: firstParagraph.length > 100 ? firstParagraph.substring(0, 500) + '...' : firstParagraph
    };
  } catch (error) {
    console.error(`Error scraping Wikipedia for ${wrestlerName}:`, error);
    return null;
  }
}

function extractDate(dateString: string): string | undefined {
  // Simple date extraction - would need more robust parsing
  const dateMatch = dateString.match(/(\d{4}-\d{2}-\d{2})/);
  return dateMatch ? dateMatch[1] : undefined;
}

function extractHeight(heightString: string): string | undefined {
  const heightMatch = heightString.match(/(\d+\s*ft\s*\d+\s*in|\d+′\d+″)/);
  return heightMatch ? heightMatch[1] : undefined;
}

function extractWeight(weightString: string): string | undefined {
  const weightMatch = weightString.match(/(\d+\s*lb|\d+\s*kg)/);
  return weightMatch ? weightMatch[1] : undefined;
}

function getWrestlingEra(debutDate: string): string {
  const year = new Date(debutDate).getFullYear();
  if (year >= 1997 && year <= 2002) return 'Attitude';
  if (year >= 1984 && year <= 1996) return 'Golden';
  if (year >= 2002 && year <= 2008) return 'Ruthless Aggression';
  if (year >= 2008 && year <= 2016) return 'PG Era';
  if (year >= 2016) return 'Modern';
  return 'Territory';
}

if (require.main === module) {
  importAllWrestlers().catch(console.error);
}

export { importAllWrestlers, scrapeWikipediaWrestler, WWE_WRESTLERS };