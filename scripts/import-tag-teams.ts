import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const TAG_TEAM_SPECIALISTS = [
  {
    name: "The Hardy Boyz",
    realName: "Matt Hardy & Jeff Hardy",
    nickname: "Team Xtreme",
    hometown: "Cameron, North Carolina",
    height: "6'1\" & 6'1\"",
    weight: "225 lbs & 215 lbs",
    debut: "1993-01-01",
    retirement: null,
    finisher: "Swanton Bomb / Twist of Fate",
    era: "Attitude",
    promotions: ["WWE", "TNA", "AEW"],
    championships: [
      { title: "WWE Tag Team Championship", reigns: 6, days: 483, year: 1999 },
      { title: "WCW Tag Team Championship", reigns: 1, days: 139, year: 2001 },
      { title: "TNA World Tag Team Championship", reigns: 2, days: 168, year: 2011 }
    ],
    bio: "High-flying daredevil brothers who revolutionized tag team wrestling with extreme stunts."
  },
  {
    name: "Edge & Christian",
    realName: "Adam Copeland & Jason Reso",
    nickname: "The Brood / E&C",
    hometown: "Toronto, Ontario, Canada",
    height: "6'5\" & 6'2\"",
    weight: "241 lbs & 212 lbs",
    debut: "1998-06-14",
    retirement: "2011-04-11",
    finisher: "Spear / Unprettier",
    era: "Attitude",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Tag Team Championship", reigns: 7, days: 389, year: 1999 }
    ],
    bio: "Childhood friends who became 7-time Tag Team Champions in WWE's golden era of tag teams."
  },
  {
    name: "The Dudley Boyz",
    realName: "Bubba Ray & D-Von Dudley",
    nickname: "Team 3D",
    hometown: "Dudleyville",
    height: "6'4\" & 6'2\"",
    weight: "280 lbs & 240 lbs",
    debut: "1995-01-01",
    retirement: "2016-01-01",
    finisher: "3D",
    era: "Attitude",
    promotions: ["WWE", "ECW", "TNA"],
    championships: [
      { title: "WWE Tag Team Championship", reigns: 8, days: 469, year: 1999 },
      { title: "ECW World Tag Team Championship", reigns: 8, days: 732, year: 1995 },
      { title: "TNA World Tag Team Championship", reigns: 23, days: 1247, year: 2005 }
    ],
    bio: "The most successful tag team in wrestling history with over 20 different championship reigns."
  },
  {
    name: "The New Age Outlaws",
    realName: "Billy Gunn & Road Dogg",
    nickname: "D-Generation X",
    hometown: "Austin, Texas & Marietta, Georgia",
    height: "6'3\" & 6'1\"",
    weight: "260 lbs & 243 lbs",
    debut: "1997-07-14",
    retirement: "2014-01-01",
    finisher: "Fame-Ass-Er / Pumphandle Slam",
    era: "Attitude",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Tag Team Championship", reigns: 5, days: 283, year: 1997 }
    ],
    bio: "Oh you didn't know? Your ass better call somebody! D-X's most popular tag team."
  },
  {
    name: "The Legion of Doom",
    realName: "Road Warrior Hawk & Animal",
    nickname: "The Road Warriors",
    hometown: "Chicago, Illinois",
    height: "6'2\" & 6'2\"",
    weight: "275 lbs & 285 lbs",
    debut: "1983-01-01",
    retirement: "2003-10-19",
    finisher: "Doomsday Device",
    era: "Golden",
    promotions: ["WWE", "WCW", "AWA", "NWA"],
    championships: [
      { title: "WWE Tag Team Championship", reigns: 1, days: 478, year: 1991 },
      { title: "NWA World Tag Team Championship", reigns: 3, days: 685, year: 1984 }
    ],
    bio: "The most dominant and influential tag team of all time with spiked shoulder pads and face paint."
  },
  {
    name: "The Rockers",
    realName: "Shawn Michaels & Marty Jannetty",
    nickname: "The Midnight Rockers",
    hometown: "San Antonio, Texas",
    height: "6'1\" & 6'0\"",
    weight: "225 lbs & 234 lbs",
    debut: "1985-01-01",
    retirement: "1992-01-01",
    finisher: "Double Superkick",
    era: "Golden",
    promotions: ["WWE", "AWA"],
    championships: [
      { title: "AWA World Tag Team Championship", reigns: 2, days: 291, year: 1986 }
    ],
    bio: "High-flying pretty boys whose breakup launched Shawn Michaels into superstardom."
  },
  {
    name: "The Outsiders",
    realName: "Scott Hall & Kevin Nash",
    nickname: "The nWo",
    hometown: "Detroit, Michigan & Detroit, Michigan",
    height: "6'7\" & 7'0\"",
    weight: "287 lbs & 356 lbs",
    debut: "1996-05-27",
    retirement: "1999-01-01",
    finisher: "Jackknife Powerbomb / Outsider's Edge",
    era: "Monday Night Wars",
    promotions: ["WCW", "WWE"],
    championships: [
      { title: "WCW World Tag Team Championship", reigns: 6, days: 358, year: 1996 }
    ],
    bio: "The original nWo members who invaded WCW and changed wrestling forever."
  },
  {
    name: "The Steiner Brothers",
    realName: "Rick Steiner & Scott Steiner",
    nickname: "The Dog-Faced Gremlin & Big Poppa Pump",
    hometown: "Bay City, Michigan",
    height: "5'11\" & 6'1\"",
    weight: "235 lbs & 276 lbs",
    debut: "1986-01-01",
    retirement: "2002-01-01",
    finisher: "Steiner Screwdriver",
    era: "Golden",
    promotions: ["WWE", "WCW", "NJPW"],
    championships: [
      { title: "WCW World Tag Team Championship", reigns: 7, days: 483, year: 1989 },
      { title: "WWE Tag Team Championship", reigns: 2, days: 133, year: 1993 }
    ],
    bio: "Suplex-machine brothers who dominated tag team wrestling in the late 80s and 90s."
  },
  {
    name: "The Usos",
    realName: "Jimmy Uso & Jey Uso",
    nickname: "The Bloodline",
    hometown: "San Francisco, California",
    height: "6'2\" & 6'2\"",
    weight: "251 lbs & 251 lbs",
    debut: "2009-05-24",
    retirement: null,
    finisher: "1D / Double Superkick",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Tag Team Championship", reigns: 6, days: 622, year: 2014 },
      { title: "WWE SmackDown Tag Team Championship", reigns: 2, days: 504, year: 2022 }
    ],
    bio: "Twin brothers and Roman Reigns' cousins who represent Samoan wrestling excellence."
  },
  {
    name: "The New Day",
    realName: "Kofi Kingston, Big E & Xavier Woods",
    nickname: "The Power of Positivity",
    hometown: "Ghana, Florida & Georgia",
    height: "6'0\", 5'11\" & 5'11\"",
    weight: "212 lbs, 290 lbs & 205 lbs",
    debut: "2014-11-28",
    retirement: null,
    finisher: "Midnight Hour",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Tag Team Championship", reigns: 11, days: 1582, year: 2015 }
    ],
    bio: "Longest-reigning Tag Team Champions in WWE history with the power of positivity."
  }
];

async function importTagTeamSpecialists() {
  console.log('👥 Starting tag team specialists import...\n');

  let importedProfiles = 0;
  let importedChampionships = 0;
  let skipped = 0;

  for (const teamData of TAG_TEAM_SPECIALISTS) {
    try {
      console.log(`📝 Processing ${teamData.name}...`);

      // Check if profile already exists
      const existingProfile = await prisma.profile.findFirst({
        where: { 
          OR: [
            { name: teamData.name },
            { slug: teamData.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-') }
          ]
        }
      });

      if (existingProfile) {
        console.log(`   ⚠️  ${teamData.name} already exists, skipping...`);
        skipped++;
        continue;
      }

      // Create profile
      const profile = await prisma.profile.create({
        data: {
          name: teamData.name,
          slug: teamData.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
          type: 'wrestler',
          nickname: teamData.nickname,
          hometown: teamData.hometown,
          height: teamData.height,
          weight: teamData.weight,
          debut: teamData.debut ? new Date(teamData.debut) : null,
          retired: teamData.retirement ? new Date(teamData.retirement) : null,
          bio: teamData.bio,
          tagline: `${teamData.championships?.reduce((total, c) => total + c.reigns, 0) || 0}-time Tag Team Champions`
        }
      });

      // Create wrestler-specific profile
      await prisma.wrestlerProfile.create({
        data: {
          profileId: profile.id,
          finisher: teamData.finisher,
          era: teamData.era,
          worldTitleReigns: teamData.championships?.reduce((total, c) => total + c.reigns, 0) || 0,
          combinedDaysAsChampion: teamData.championships?.reduce((total, c) => total + c.days, 0) || 0,
          firstReignDate: teamData.championships?.length ? new Date(`${teamData.championships[0].year}-01-01`) : null,
          lastReignDate: teamData.championships?.length ? new Date(`${teamData.championships[teamData.championships.length - 1].year}-01-01`) : null
        }
      });

      importedProfiles++;

      // Handle promotions and championships
      if (teamData.promotions && teamData.championships) {
        for (const promotionName of teamData.promotions) {
          // Find or create promotion
          let promotion = await prisma.promotion.findUnique({
            where: { name: promotionName }
          });
          
          if (!promotion) {
            promotion = await prisma.promotion.create({
              data: {
                name: promotionName,
                slug: promotionName.toLowerCase().replace(/[^a-z0-9]/g, '-')
              }
            });
          }

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

        // Import championships
        for (const championship of teamData.championships) {
          const promotion = await prisma.promotion.findFirst({
            where: { name: { in: teamData.promotions } }
          });

          await prisma.championship.create({
            data: {
              profileId: profile.id,
              titleName: championship.title,
              promotionId: promotion?.id || (await prisma.promotion.findFirst({ where: { name: 'WWE' } }))?.id!,
              reignNumber: championship.reigns,
              wonDate: new Date(`${championship.year}-01-01`),
              daysHeld: championship.days,
              isCurrentChampion: false
            }
          });
          importedChampionships++;
        }
      }

      console.log(`   ✅ ${teamData.name} imported successfully`);

    } catch (error) {
      console.error(`   ❌ Error importing ${teamData.name}:`, error);
    }
  }

  console.log('\n🎉 Tag team specialists import completed!');
  console.log(`📊 Total Profiles Imported: ${importedProfiles}`);
  console.log(`⚠️  Profiles Skipped: ${skipped}`);
  console.log(`🏆 Total Championships Imported: ${importedChampionships}`);

  await prisma.$disconnect();
}

if (require.main === module) {
  importTagTeamSpecialists().catch(console.error);
}

export { importTagTeamSpecialists };