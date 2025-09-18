import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Comprehensive WWE Champions data
const WWE_CHAMPIONS = [
  {
    name: 'John Cena',
    nickname: 'The Cenation Leader',
    hometown: 'West Newbury, Massachusetts',
    nationality: 'USA',
    height: "6'1\"",
    weight: '251 lbs',
    debut: '2002-06-27',
    finisher: 'Attitude Adjustment',
    era: 'Ruthless Aggression',
    bio: 'John Felix Anthony Cena Jr. is an American professional wrestler, actor, and former rapper currently signed to WWE.',
    tagline: '16-time World Champion',
    championships: [
      { titleName: 'WWE Championship', reigns: 13, firstWon: '2005-04-03', lastWon: '2017-01-29' },
      { titleName: 'World Heavyweight Championship', reigns: 3, firstWon: '2008-11-23', lastWon: '2013-12-15' }
    ]
  },
  {
    name: 'The Rock',
    nickname: 'The People\'s Champion',
    hometown: 'Hayward, California', 
    nationality: 'USA',
    height: "6'5\"",
    weight: '260 lbs',
    debut: '1996-11-04',
    retired: '2019-04-07',
    finisher: 'Rock Bottom',
    era: 'Attitude',
    bio: 'Dwayne "The Rock" Johnson is an American actor, businessman, and former professional wrestler.',
    tagline: '10-time World Champion',
    championships: [
      { titleName: 'WWE Championship', reigns: 8, firstWon: '1998-11-15', lastWon: '2013-04-07' },
      { titleName: 'WCW/World Championship', reigns: 2, firstWon: '2001-07-21', lastWon: '2001-11-05' }
    ]
  },
  {
    name: 'Stone Cold Steve Austin',
    nickname: 'The Texas Rattlesnake',
    hometown: 'Austin, Texas',
    nationality: 'USA', 
    height: "6'2\"",
    weight: '252 lbs',
    debut: '1989-09-30',
    retired: '2003-03-30',
    finisher: 'Stone Cold Stunner',
    era: 'Attitude',
    bio: 'Steve Austin is an American retired professional wrestler, actor, producer, and television host.',
    tagline: '6-time WWE Champion',
    championships: [
      { titleName: 'WWE Championship', reigns: 6, firstWon: '1998-03-29', lastWon: '2001-10-08' }
    ]
  },
  {
    name: 'Hulk Hogan',
    nickname: 'The Hulkster',
    hometown: 'Venice Beach, California',
    nationality: 'USA',
    height: "6'7\"",
    weight: '302 lbs', 
    debut: '1977-08-10',
    retired: '2012-10-27',
    finisher: 'Leg Drop',
    era: 'Golden',
    bio: 'Terry Eugene Bollea, better known by his ring name Hulk Hogan, is an American retired professional wrestler.',
    tagline: '12-time World Champion',
    championships: [
      { titleName: 'WWE Championship', reigns: 6, firstWon: '1984-01-23', lastWon: '2002-07-21' },
      { titleName: 'WCW World Heavyweight Championship', reigns: 6, firstWon: '1994-07-17', lastWon: '1999-07-11' }
    ]
  },
  {
    name: 'Triple H',
    nickname: 'The Game',
    hometown: 'Greenwich, Connecticut',
    nationality: 'USA',
    height: "6'4\"",
    weight: '255 lbs',
    debut: '1995-04-30',
    retired: '2022-03-28',
    finisher: 'Pedigree',
    era: 'Attitude',
    bio: 'Paul Michael Levesque, better known by the ring name Triple H, is an American business executive, actor, and retired professional wrestler.',
    tagline: '14-time World Champion',
    championships: [
      { titleName: 'WWE Championship', reigns: 9, firstWon: '1999-08-23', lastWon: '2016-01-24' },
      { titleName: 'World Heavyweight Championship', reigns: 5, firstWon: '2002-09-02', lastWon: '2008-04-27' }
    ]
  }
];

// UFC Champions data
const UFC_CHAMPIONS = [
  {
    name: 'Conor McGregor',
    nickname: 'The Notorious',
    hometown: 'Dublin, Ireland',
    nationality: 'Ireland',
    height: "5'9\"",
    weight: '155 lbs',
    debut: '2008-02-17',
    stance: 'Southpaw',
    reach: '74"',
    bio: 'Conor Anthony McGregor is an Irish professional mixed martial artist.',
    tagline: 'Former UFC Featherweight & Lightweight Champion',
    record: { wins: 22, losses: 6, draws: 0 },
    divisions: ['Featherweight', 'Lightweight'],
    championships: [
      { titleName: 'UFC Featherweight Championship', reigns: 1, firstWon: '2015-12-12', lastWon: '2015-12-12' },
      { titleName: 'UFC Lightweight Championship', reigns: 1, firstWon: '2016-11-12', lastWon: '2016-11-12' }
    ]
  },
  {
    name: 'Amanda Nunes',
    nickname: 'The Lioness',
    hometown: 'Salvador, Brazil',
    nationality: 'Brazil',
    height: "5'7\"", 
    weight: '135 lbs',
    debut: '2008-03-08',
    retired: '2023-06-10',
    stance: 'Orthodox',
    reach: '69"',
    bio: 'Amanda Lourenço Nunes is a Brazilian mixed martial artist.',
    tagline: 'Former UFC Bantamweight & Featherweight Champion',
    record: { wins: 22, losses: 5, draws: 0 },
    divisions: ['Bantamweight', 'Featherweight'],
    championships: [
      { titleName: 'UFC Women\'s Bantamweight Championship', reigns: 1, firstWon: '2016-07-09', lastWon: '2016-07-09' },
      { titleName: 'UFC Women\'s Featherweight Championship', reigns: 1, firstWon: '2018-12-29', lastWon: '2018-12-29' }
    ]
  },
  {
    name: 'Jon Jones',
    nickname: 'Bones',
    hometown: 'Rochester, New York',
    nationality: 'USA',
    height: "6'4\"",
    weight: '245 lbs',
    debut: '2008-04-12',
    stance: 'Orthodox',
    reach: '84.5"',
    bio: 'Jonathan Dwight Jones is an American professional mixed martial artist.',
    tagline: 'UFC Light Heavyweight & Heavyweight Champion',
    record: { wins: 27, losses: 1, draws: 1 },
    divisions: ['Light Heavyweight', 'Heavyweight'],
    championships: [
      { titleName: 'UFC Light Heavyweight Championship', reigns: 2, firstWon: '2011-03-19', lastWon: '2018-12-29' },
      { titleName: 'UFC Heavyweight Championship', reigns: 1, firstWon: '2023-03-04', lastWon: '2023-03-04' }
    ]
  }
];

async function importWrestlerProfile(wrestler: any) {
  console.log(`Importing wrestler: ${wrestler.name}`);
  
  try {
    // Create the base profile
    const profile = await prisma.profile.create({
      data: {
        slug: wrestler.name.toLowerCase().replace(/['']/g, '').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-'),
        name: wrestler.name,
        nickname: wrestler.nickname,
        type: 'wrestler',
        hometown: wrestler.hometown,
        nationality: wrestler.nationality,
        height: wrestler.height,
        weight: wrestler.weight,
        debut: wrestler.debut ? new Date(wrestler.debut) : null,
        retired: wrestler.retired ? new Date(wrestler.retired) : null,
        tagline: wrestler.tagline,
        bio: wrestler.bio,
      }
    });

    // Create wrestler-specific profile
    const wrestlerProfile = await prisma.wrestlerProfile.create({
      data: {
        profileId: profile.id,
        finisher: wrestler.finisher,
        era: wrestler.era,
        worldTitleReigns: wrestler.championships?.reduce((total: number, c: any) => total + c.reigns, 0) || 0,
        combinedDaysAsChampion: 0, // Would need to calculate from actual reign data
        firstReignDate: wrestler.championships?.[0]?.firstWon ? new Date(wrestler.championships[0].firstWon) : null,
        lastReignDate: wrestler.championships?.slice(-1)[0]?.lastWon ? new Date(wrestler.championships.slice(-1)[0].lastWon) : null,
      }
    });

    // Add promotion relationships
    const wwePromotion = await prisma.promotion.findFirst({ where: { slug: 'wwe' } });
    if (wwePromotion) {
      await prisma.profilePromotion.create({
        data: {
          profileId: profile.id,
          promotionId: wwePromotion.id,
          startDate: wrestler.debut ? new Date(wrestler.debut) : null,
          endDate: wrestler.retired ? new Date(wrestler.retired) : null,
          isActive: !wrestler.retired
        }
      });
    }

    // Add championships
    if (wrestler.championships) {
      for (const championship of wrestler.championships) {
        for (let reign = 1; reign <= championship.reigns; reign++) {
          await prisma.championship.create({
            data: {
              profileId: profile.id,
              titleName: championship.titleName,
              promotionId: wwePromotion?.id || '',
              reignNumber: reign,
              wonDate: new Date(championship.firstWon), // Simplified - would need actual dates per reign
              lostDate: championship.lastWon && reign === championship.reigns ? new Date(championship.lastWon) : null,
              isCurrentChampion: false // Would need to determine current status
            }
          });
        }
      }
    }

    console.log(`✅ Successfully imported ${wrestler.name}`);
    return profile;
  } catch (error) {
    console.error(`❌ Failed to import ${wrestler.name}:`, error);
    throw error;
  }
}

async function importFighterProfile(fighter: any) {
  console.log(`Importing fighter: ${fighter.name}`);
  
  try {
    // Create the base profile
    const profile = await prisma.profile.create({
      data: {
        slug: fighter.name.toLowerCase().replace(/['']/g, '').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-'),
        name: fighter.name,
        nickname: fighter.nickname,
        type: 'fighter',
        hometown: fighter.hometown,
        nationality: fighter.nationality,
        height: fighter.height,
        weight: fighter.weight,
        debut: fighter.debut ? new Date(fighter.debut) : null,
        retired: fighter.retired ? new Date(fighter.retired) : null,
        tagline: fighter.tagline,
        bio: fighter.bio,
      }
    });

    // Create fighter-specific profile
    const fighterProfile = await prisma.fighterProfile.create({
      data: {
        profileId: profile.id,
        stance: fighter.stance,
        reach: fighter.reach,
        wins: fighter.record?.wins || 0,
        losses: fighter.record?.losses || 0,
        draws: fighter.record?.draws || 0,
        titleReigns: fighter.championships?.reduce((total: number, c: any) => total + c.reigns, 0) || 0,
      }
    });

    // Add divisions
    if (fighter.divisions) {
      for (const division of fighter.divisions) {
        await prisma.fighterDivision.create({
          data: {
            fighterProfileId: fighterProfile.id,
            divisionName: division,
            isActive: true
          }
        });
      }
    }

    // Add promotion relationships
    const ufcPromotion = await prisma.promotion.findFirst({ where: { slug: 'ufc' } });
    if (ufcPromotion) {
      await prisma.profilePromotion.create({
        data: {
          profileId: profile.id,
          promotionId: ufcPromotion.id,
          startDate: fighter.debut ? new Date(fighter.debut) : null,
          endDate: fighter.retired ? new Date(fighter.retired) : null,
          isActive: !fighter.retired
        }
      });
    }

    // Add championships
    if (fighter.championships) {
      for (const championship of fighter.championships) {
        for (let reign = 1; reign <= championship.reigns; reign++) {
          await prisma.championship.create({
            data: {
              profileId: profile.id,
              titleName: championship.titleName,
              promotionId: ufcPromotion?.id || '',
              reignNumber: reign,
              wonDate: new Date(championship.firstWon),
              lostDate: championship.lastWon && reign === championship.reigns ? new Date(championship.lastWon) : null,
              isCurrentChampion: false
            }
          });
        }
      }
    }

    console.log(`✅ Successfully imported ${fighter.name}`);
    return profile;
  } catch (error) {
    console.error(`❌ Failed to import ${fighter.name}:`, error);
    throw error;
  }
}

async function main() {
  console.log('🚀 Starting profile data import...\n');
  
  try {
    // Import WWE wrestlers
    console.log('📁 Importing WWE wrestlers...');
    for (const wrestler of WWE_CHAMPIONS) {
      await importWrestlerProfile(wrestler);
    }
    
    console.log('\n📁 Importing UFC fighters...');
    // Import UFC fighters  
    for (const fighter of UFC_CHAMPIONS) {
      await importFighterProfile(fighter);
    }
    
    console.log('\n✅ Profile import completed successfully!');
    
    // Show summary
    const profileCount = await prisma.profile.count();
    const wrestlerCount = await prisma.wrestlerProfile.count();
    const fighterCount = await prisma.fighterProfile.count();
    const championshipCount = await prisma.championship.count();
    
    console.log('\n📊 Import Summary:');
    console.log(`- Total Profiles: ${profileCount}`);
    console.log(`- Wrestlers: ${wrestlerCount}`);
    console.log(`- Fighters: ${fighterCount}`);
    console.log(`- Championship Records: ${championshipCount}`);
    
  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();