import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import * as cheerio from 'cheerio';

const prisma = new PrismaClient();

interface FighterData {
  name: string;
  slug: string;
  nickname?: string;
  birthDate?: string;
  birthPlace?: string;
  height?: string;
  weight?: string;
  reach?: string;
  stance?: string;
  debut?: string;
  retired?: string;
  promotion: string;
  biography: string;
  championships: ChampionshipData[];
  divisions: string[];
  careerStats: {
    totalFights?: number;
    wins?: number;
    losses?: number;
    draws?: number;
    titleReigns?: number;
    winsByKO?: number;
    winsBySubmission?: number;
    winsByDecision?: number;
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

// Comprehensive UFC fighter data with championship histories
const UFC_FIGHTERS: FighterData[] = [
  {
    name: "Conor Anthony McGregor",
    slug: "conor-mcgregor",
    nickname: "The Notorious",
    birthDate: "1988-07-14",
    birthPlace: "Dublin, Ireland",
    height: "5'9\"",
    weight: "155 lbs",
    reach: "74\"",
    stance: "Southpaw",
    debut: "2008-02-17",
    retired: null,
    promotion: "UFC",
    biography: "Conor McGregor is a former UFC Featherweight and Lightweight Champion who became the biggest star in MMA history. Known for his flashy lifestyle, trash-talking ability, and knockout power, McGregor was the first fighter to hold titles in two weight classes simultaneously. His fights regularly broke pay-per-view records and brought mainstream attention to UFC.",
    championships: [
      {
        title: "UFC Featherweight Championship",
        reigns: 1,
        firstWon: "2015-12-12",
        lastWon: "2016-11-26",
        totalDays: 350,
        notes: "Knocked out José Aldo in 13 seconds"
      },
      {
        title: "UFC Lightweight Championship",
        reigns: 1,
        firstWon: "2016-11-12",
        lastWon: "2018-04-07",
        totalDays: 511,
        notes: "First simultaneous two-division champion"
      }
    ],
    divisions: ["Featherweight", "Lightweight", "Welterweight"],
    careerStats: {
      totalFights: 28,
      wins: 22,
      losses: 6,
      draws: 0,
      titleReigns: 2,
      winsByKO: 19,
      winsBySubmission: 1,
      winsByDecision: 2
    }
  },
  {
    name: "Amanda Lourenço Nunes",
    slug: "amanda-nunes",
    nickname: "The Lioness",
    birthDate: "1988-05-30",
    birthPlace: "Pojuca, Brazil",
    height: "5'8\"",
    weight: "135 lbs",
    reach: "69\"",
    stance: "Orthodox",
    debut: "2008-03-08",
    retired: "2023-06-10",
    promotion: "UFC",
    biography: "Amanda Nunes is widely considered the greatest female fighter of all time. She simultaneously held the UFC Women's Bantamweight and Featherweight Championships, becoming the first woman to hold titles in two weight classes. Known for her devastating striking power, Nunes defeated every major name in women's MMA including Ronda Rousey, Cris Cyborg, and Miesha Tate.",
    championships: [
      {
        title: "UFC Women's Bantamweight Championship",
        reigns: 2,
        firstWon: "2016-07-09",
        lastWon: "2023-06-10",
        totalDays: 2189,
        notes: "Longest women's bantamweight title reign"
      },
      {
        title: "UFC Women's Featherweight Championship",
        reigns: 1,
        firstWon: "2018-12-29",
        lastWon: "2023-06-10",
        totalDays: 1624,
        notes: "Defeated Cris Cyborg for the title"
      }
    ],
    divisions: ["Bantamweight", "Featherweight"],
    careerStats: {
      totalFights: 26,
      wins: 22,
      losses: 5,
      draws: 0,
      titleReigns: 3,
      winsByKO: 14,
      winsBySubmission: 3,
      winsByDecision: 5
    }
  },
  {
    name: "Jonathan Dwight Jones",
    slug: "jon-jones",
    nickname: "Bones",
    birthDate: "1987-07-19",
    birthPlace: "Rochester, New York, USA",
    height: "6'4\"",
    weight: "265 lbs",
    reach: "84.5\"",
    stance: "Orthodox",
    debut: "2008-04-12",
    retired: null,
    promotion: "UFC",
    biography: "Jon Jones is widely regarded as one of the greatest mixed martial artists of all time. The youngest champion in UFC history at age 23, Jones dominated the light heavyweight division for over a decade. Known for his exceptional reach, creativity, and fight IQ, Jones recently moved to heavyweight and captured that title as well, cementing his legacy as a two-division champion.",
    championships: [
      {
        title: "UFC Light Heavyweight Championship",
        reigns: 2,
        firstWon: "2011-03-19",
        lastWon: "2020-02-08",
        totalDays: 2204,
        notes: "Longest light heavyweight title reign in UFC history"
      },
      {
        title: "UFC Heavyweight Championship",
        reigns: 1,
        firstWon: "2023-03-04",
        lastWon: null,
        totalDays: 563,
        notes: "Current heavyweight champion"
      }
    ],
    divisions: ["Light Heavyweight", "Heavyweight"],
    careerStats: {
      totalFights: 29,
      wins: 27,
      losses: 1,
      draws: 0,
      titleReigns: 3,
      winsByKO: 10,
      winsBySubmission: 6,
      winsByDecision: 11
    }
  },
  {
    name: "Daniel Cormier",
    slug: "daniel-cormier",
    nickname: "DC",
    birthDate: "1979-03-20",
    birthPlace: "Lafayette, Louisiana, USA",
    height: "5'11\"",
    weight: "265 lbs",
    reach: "72.5\"",
    stance: "Orthodox",
    debut: "2009-09-19",
    retired: "2020-08-15",
    promotion: "UFC",
    biography: "Daniel Cormier is a former two-division UFC champion and Olympic wrestler. Known for his incredible wrestling credentials and determination, DC captured both the light heavyweight and heavyweight titles. His rivalries with Jon Jones and Stipe Miocic produced some of the most memorable fights in UFC history. After retiring, he became a successful commentator for UFC events.",
    championships: [
      {
        title: "UFC Light Heavyweight Championship",
        reigns: 1,
        firstWon: "2015-05-23",
        lastWon: "2018-07-07",
        totalDays: 1141,
        notes: "Won vacant title, lost to Jon Jones"
      },
      {
        title: "UFC Heavyweight Championship",
        reigns: 1,
        firstWon: "2018-07-07",
        lastWon: "2019-08-17",
        totalDays: 406,
        notes: "Knocked out Stipe Miocic"
      }
    ],
    divisions: ["Light Heavyweight", "Heavyweight"],
    careerStats: {
      totalFights: 25,
      wins: 22,
      losses: 3,
      draws: 0,
      titleReigns: 2,
      winsByKO: 10,
      winsBySubmission: 5,
      winsByDecision: 7
    }
  },
  {
    name: "Alexander Volkanovski",
    slug: "alexander-volkanovski",
    nickname: "The Great",
    birthDate: "1988-09-29",
    birthPlace: "Wollongong, Australia",
    height: "5'6\"",
    weight: "145 lbs",
    reach: "71.5\"",
    stance: "Orthodox",
    debut: "2012-09-15",
    retired: null,
    promotion: "UFC",
    biography: "Alexander Volkanovski is a former UFC Featherweight Champion known for his exceptional cardio, boxing skills, and fight IQ. Despite being one of the shorter fighters in his division, Volkanovski's well-rounded skill set and relentless pressure made him nearly unbeatable. His trilogy with Max Holloway is considered one of the best in featherweight history.",
    championships: [
      {
        title: "UFC Featherweight Championship",
        reigns: 1,
        firstWon: "2019-12-14",
        lastWon: "2024-02-17",
        totalDays: 1526,
        notes: "Defeated Max Holloway to win title"
      }
    ],
    divisions: ["Featherweight", "Lightweight"],
    careerStats: {
      totalFights: 28,
      wins: 26,
      losses: 3,
      draws: 0,
      titleReigns: 1,
      winsByKO: 12,
      winsBySubmission: 1,
      winsByDecision: 13
    }
  },
  {
    name: "Islam Makhachev",
    slug: "islam-makhachev",
    nickname: "The King of Rio",
    birthDate: "1991-09-27",
    birthPlace: "Makhachkala, Russia",
    height: "5'10\"",
    weight: "155 lbs",
    reach: "70\"",
    stance: "Orthodox",
    debut: "2010-09-19",
    retired: null,
    promotion: "UFC",
    biography: "Islam Makhachev is the current UFC Lightweight Champion and a dominant wrestler from Dagestan. Training alongside Khabib Nurmagomedov, Islam combines elite wrestling with improved striking to control his opponents. His rise to the top of the lightweight division has been methodical and impressive, carrying on the legacy of Dagestani dominance in MMA.",
    championships: [
      {
        title: "UFC Lightweight Championship",
        reigns: 1,
        firstWon: "2022-10-22",
        lastWon: null,
        totalDays: 698,
        notes: "Current lightweight champion"
      }
    ],
    divisions: ["Lightweight"],
    careerStats: {
      totalFights: 26,
      wins: 25,
      losses: 1,
      draws: 0,
      titleReigns: 1,
      winsByKO: 4,
      winsBySubmission: 11,
      winsByDecision: 10
    }
  }
];

async function importFighterProfile(fighterData: FighterData) {
  try {
    console.log(`Importing ${fighterData.nickname ? fighterData.nickname : fighterData.name}...`);

    // Check if profile already exists
    const existingProfile = await prisma.profile.findUnique({
      where: { slug: fighterData.slug }
    });

    if (existingProfile) {
      console.log(`Profile ${fighterData.slug} already exists, skipping...`);
      return;
    }

    // Create profile and fighter profile
    const profile = await prisma.profile.create({
      data: {
        name: fighterData.name,
        slug: fighterData.slug,
        type: 'fighter',
        nickname: fighterData.nickname,
        hometown: fighterData.birthPlace,
        height: fighterData.height,
        weight: fighterData.weight,
        debut: fighterData.debut ? new Date(fighterData.debut) : null,
        retired: fighterData.retired ? new Date(fighterData.retired) : null,
        bio: fighterData.biography,
        fighter: {
          create: {
            stance: fighterData.stance,
            reach: fighterData.reach,
            wins: fighterData.careerStats.wins || 0,
            losses: fighterData.careerStats.losses || 0,
            draws: fighterData.careerStats.draws || 0,
            titleReigns: fighterData.careerStats.titleReigns || 0
          }
        }
      }
    });

    // Import championships
    for (const championship of fighterData.championships) {
      // Find or create promotion - check for existing slug
      let promotion = await prisma.promotion.findUnique({
        where: { name: fighterData.promotion }
      });
      
      if (!promotion) {
        // Try to find by slug first to avoid conflicts
        const baseSlug = fighterData.promotion.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const existingBySlug = await prisma.promotion.findUnique({
          where: { slug: baseSlug }
        });
        
        if (!existingBySlug) {
          promotion = await prisma.promotion.create({
            data: {
              name: fighterData.promotion,
              slug: baseSlug
            }
          });
        } else {
          // Use the existing promotion if slug matches (e.g., UFC already exists)
          promotion = existingBySlug;
        }
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
          wonFrom: championship.notes?.includes('vacant') ? null : 'Previous Champion',
          isCurrentChampion: !championship.lastWon
        }
      });
    }

    // Import divisions
    for (const divisionName of fighterData.divisions) {
      // Find or create division
      let division = await prisma.fighterDivision.findFirst({
        where: { 
          name: divisionName,
          fighterId: profile.id
        }
      });

      if (!division) {
        // Check if fighter profile exists (it should since we just created it)
        const fighterProfile = await prisma.fighterProfile.findUnique({
          where: { profileId: profile.id }
        });

        if (fighterProfile) {
          await prisma.fighterDivision.create({
            data: {
              fighterId: fighterProfile.id,
              name: divisionName,
              weightClass: getWeightClass(divisionName),
              isActive: !fighterData.retired
            }
          });
        }
      }
    }

    // Connect profile to promotion
    let promotion = await prisma.promotion.findUnique({
      where: { name: fighterData.promotion }
    });
    
    if (!promotion) {
      // Check by slug too
      const baseSlug = fighterData.promotion.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      promotion = await prisma.promotion.findUnique({
        where: { slug: baseSlug }
      });
    }
    
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

    console.log(`✅ Successfully imported ${fighterData.nickname || fighterData.name}`);
  } catch (error) {
    console.error(`❌ Error importing ${fighterData.nickname || fighterData.name}:`, error);
  }
}

function getWeightClass(divisionName: string): string {
  const weightClasses: { [key: string]: string } = {
    'Flyweight': '125 lbs',
    'Bantamweight': '135 lbs',
    'Featherweight': '145 lbs',
    'Lightweight': '155 lbs',
    'Welterweight': '170 lbs',
    'Middleweight': '185 lbs',
    'Light Heavyweight': '205 lbs',
    'Heavyweight': '265 lbs'
  };
  return weightClasses[divisionName] || 'Unknown';
}

async function importAllFighters() {
  console.log(`🥊 Starting import of ${UFC_FIGHTERS.length} UFC fighters...`);

  for (const fighter of UFC_FIGHTERS) {
    await importFighterProfile(fighter);
  }

  console.log('\n📊 Import Summary:');
  const totalProfiles = await prisma.profile.count();
  const totalFighters = await prisma.fighterProfile.count();
  const totalWrestlers = await prisma.wrestlerProfile.count();
  const totalChampionships = await prisma.championship.count();
  
  console.log(`Total Profiles: ${totalProfiles}`);
  console.log(`Total Fighters: ${totalFighters}`);
  console.log(`Total Wrestlers: ${totalWrestlers}`);
  console.log(`Total Championships: ${totalChampionships}`);
  
  await prisma.$disconnect();
}

if (require.main === module) {
  importAllFighters().catch(console.error);
}

export { importAllFighters, UFC_FIGHTERS };