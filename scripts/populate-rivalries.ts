import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface RivalryData {
  wrestler1Name: string
  wrestler2Name: string
  rivalryName: string
  description: string
  notableMatches: string[]
  feudIntensity: number
  startDate?: Date
  endDate?: Date
}

const famousRivalries: RivalryData[] = [
  // Classic WWE/WWF Rivalries
  {
    wrestler1Name: 'Hulk Hogan',
    wrestler2Name: 'Andre the Giant',
    rivalryName: 'The Mega Powers vs. The Eighth Wonder',
    description: 'One of wrestling\'s most iconic feuds culminating at WrestleMania III where Hogan slammed the 520-pound Andre in front of 93,000 fans.',
    notableMatches: [
      'WrestleMania III - WWE Championship',
      'The Main Event (NBC) - Championship rematch',
      'Various house show encounters'
    ],
    feudIntensity: 10,
    startDate: new Date('1987-01-01'),
    endDate: new Date('1988-06-01')
  },
  {
    wrestler1Name: 'Stone Cold Steve Austin',
    wrestler2Name: 'The Rock',
    rivalryName: 'Austin vs. Rock - Attitude Era Icons',
    description: 'Two of the biggest stars of the Attitude Era in multiple classic encounters that defined an entire generation of wrestling fans.',
    notableMatches: [
      'WrestleMania XV - WWE Championship',
      'WrestleMania XVII - WWE Championship',
      'WrestleMania XIX - Final encounter'
    ],
    feudIntensity: 10,
    startDate: new Date('1998-01-01'),
    endDate: new Date('2003-04-01')
  },
  {
    wrestler1Name: 'Stone Cold Steve Austin',
    wrestler2Name: 'Triple H',
    rivalryName: 'The Texas Rattlesnake vs. The Game',
    description: 'Austin and Triple H\'s rivalry spanned multiple championship reigns and featured some of the most intense storylines of the Attitude Era.',
    notableMatches: [
      'No Way Out 2001 - Three Stages of Hell',
      'SummerSlam 1999',
      'Raw encounters throughout 1999-2001'
    ],
    feudIntensity: 9,
    startDate: new Date('1999-01-01'),
    endDate: new Date('2001-12-01')
  },
  {
    wrestler1Name: 'The Rock',
    wrestler2Name: 'Triple H',
    rivalryName: 'The People\'s Champion vs. The Cerebral Assassin',
    description: 'The Rock and Triple H engaged in numerous classic battles for the WWE Championship during the peak of the Attitude Era.',
    notableMatches: [
      'Backlash 2000 - WWE Championship',
      'King of the Ring 2000',
      'Iron Man Match on Raw'
    ],
    feudIntensity: 9,
    startDate: new Date('1998-01-01'),
    endDate: new Date('2000-12-01')
  },
  {
    wrestler1Name: 'Shawn Michaels',
    wrestler2Name: 'Bret Hart',
    rivalryName: 'HBK vs. The Hitman',
    description: 'One of wrestling\'s most legitimate rivalries, culminating in the infamous Montreal Screwjob at Survivor Series 1997.',
    notableMatches: [
      'WrestleMania XII - Iron Man Match',
      'Survivor Series 1997 - Montreal Screwjob',
      'In Your House: Mind Games'
    ],
    feudIntensity: 10,
    startDate: new Date('1995-01-01'),
    endDate: new Date('1997-11-01')
  },
  {
    wrestler1Name: 'Ric Flair',
    wrestler2Name: 'Bret Hart',
    rivalryName: 'The Nature Boy vs. The Best There Is',
    description: 'Two technical wrestling legends from different eras and styles. Flair\'s flamboyant personality clashed with Hart\'s no-nonsense approach.',
    notableMatches: [
      'Monday Night Raw encounters',
      'Multiple championship contender matches',
      'Cross-promotional dream matches'
    ],
    feudIntensity: 7,
    startDate: new Date('1992-01-01'),
    endDate: new Date('1997-01-01')
  },
  {
    wrestler1Name: 'Hulk Hogan',
    wrestler2Name: 'Randy Savage',
    rivalryName: 'The Mega Powers Explode',
    description: 'Former best friends and tag team partners turned bitter enemies when jealousy and Miss Elizabeth came between them.',
    notableMatches: [
      'WrestleMania V - The Mega Powers Explode',
      'Saturday Night\'s Main Event encounters',
      'Various title matches'
    ],
    feudIntensity: 9,
    startDate: new Date('1988-01-01'),
    endDate: new Date('1989-12-01')
  },
  {
    wrestler1Name: 'Randy Savage',
    wrestler2Name: 'Hulk Hogan',
    rivalryName: 'Ooh Yeah vs. Hulkamania',
    description: 'The intense rivalry between two of wrestling\'s biggest stars that defined multiple eras.',
    notableMatches: [
      'WrestleMania V',
      'Various championship encounters',
      'The Main Event appearances'
    ],
    feudIntensity: 9,
    startDate: new Date('1985-01-01'),
    endDate: new Date('1991-12-01')
  },
  {
    wrestler1Name: 'Mick Foley',
    wrestler2Name: 'Triple H',
    rivalryName: 'Mankind vs. The Game',
    description: 'Brutal encounters that helped establish Triple H as a main event player and showcased Foley\'s incredible toughness.',
    notableMatches: [
      'Royal Rumble 2000 - Street Fight',
      'SummerSlam 1997',
      'King of the Ring 1997 - Hell in a Cell'
    ],
    feudIntensity: 8,
    startDate: new Date('1997-01-01'),
    endDate: new Date('2000-06-01')
  },
  {
    wrestler1Name: 'John Cena',
    wrestler2Name: 'Edge',
    rivalryName: 'The Cenation Leader vs. The Rated-R Superstar',
    description: 'A rivalry that defined the mid-2000s, mixing personal issues with championship gold and featuring multiple classic matches.',
    notableMatches: [
      'Unforgiven 2006 - TLC Match',
      'New Year\'s Revolution 2006 - First Money in the Bank cash-in',
      'Backlash 2009 - Last Man Standing'
    ],
    feudIntensity: 9,
    startDate: new Date('2006-01-01'),
    endDate: new Date('2009-12-01')
  },
  {
    wrestler1Name: 'John Cena',
    wrestler2Name: 'Randy Orton',
    rivalryName: 'Never Give Up vs. The Viper',
    description: 'One of WWE\'s longest-running rivalries spanning over a decade with countless championship matches and personal storylines.',
    notableMatches: [
      'SummerSlam 2007',
      'Breaking Point 2009 - I Quit Match',
      'Hell in a Cell 2009'
    ],
    feudIntensity: 8,
    startDate: new Date('2007-01-01'),
    endDate: new Date('2017-12-01')
  },
  {
    wrestler1Name: 'CM Punk',
    wrestler2Name: 'Jeff Hardy',
    rivalryName: 'Straight Edge vs. Charismatic Enigma',
    description: 'CM Punk\'s straight edge lifestyle directly opposed Jeff Hardy\'s perceived reckless behavior, creating compelling storylines.',
    notableMatches: [
      'SummerSlam 2009 - TLC Match',
      'Night of Champions 2009',
      'SmackDown ladder match for World Heavyweight Championship'
    ],
    feudIntensity: 8,
    startDate: new Date('2009-06-01'),
    endDate: new Date('2009-09-01')
  },
  {
    wrestler1Name: 'CM Punk',
    wrestler2Name: 'John Cena',
    rivalryName: 'The Voice of the Voiceless vs. The Face of WWE',
    description: 'A rivalry built on real frustrations with WWE management, featuring the famous pipe bomb promo and Money in the Bank 2011.',
    notableMatches: [
      'Money in the Bank 2011 - WWE Championship',
      'SummerSlam 2011',
      'Night of Champions 2012'
    ],
    feudIntensity: 10,
    startDate: new Date('2011-06-01'),
    endDate: new Date('2013-01-01')
  },
  
  // WCW Rivalries
  {
    wrestler1Name: 'Ric Flair',
    wrestler2Name: 'Sting',
    rivalryName: 'Nature Boy vs. The Icon',
    description: 'A rivalry that spanned multiple decades and promotions, with Sting often representing the everyman against Flair\'s elitist character.',
    notableMatches: [
      'The Great American Bash 1988',
      'Clash of the Champions I',
      'Various NWA/WCW Championship matches'
    ],
    feudIntensity: 9,
    startDate: new Date('1987-01-01'),
    endDate: new Date('1999-12-01')
  },
  {
    wrestler1Name: 'Hollywood Hogan',
    wrestler2Name: 'Sting',
    rivalryName: 'NWO Leader vs. The Franchise',
    description: 'The ultimate good vs. evil storyline that built for over a year to their WCW Starrcade 1997 encounter.',
    notableMatches: [
      'Starrcade 1997 - WCW Championship',
      'Various NWO beatdowns and standoffs',
      'SuperBrawl 1999'
    ],
    feudIntensity: 10,
    startDate: new Date('1996-07-01'),
    endDate: new Date('1999-01-01')
  },
  {
    wrestler1Name: 'Goldberg',
    wrestler2Name: 'Hollywood Hogan',
    rivalryName: 'The Streak vs. The NWO',
    description: 'Goldberg\'s meteoric rise culminated with ending Hogan\'s reign and the NWO\'s dominance.',
    notableMatches: [
      'Monday Nitro July 6, 1998 - WCW Championship',
      'Halloween Havoc 1998',
      'Various Nitro encounters'
    ],
    feudIntensity: 9,
    startDate: new Date('1998-01-01'),
    endDate: new Date('1999-01-01')
  },
  {
    wrestler1Name: 'Diamond Dallas Page',
    wrestler2Name: 'Randy Savage',
    rivalryName: 'DDP vs. Macho Man',
    description: 'A storyline involving DDP\'s real-life wife Kimberly that blurred the lines between reality and storyline.',
    notableMatches: [
      'Spring Stampede 1997',
      'The Great American Bash 1997',
      'Halloween Havoc 1997'
    ],
    feudIntensity: 8,
    startDate: new Date('1996-01-01'),
    endDate: new Date('1998-01-01')
  },
  
  // Modern Era Rivalries
  {
    wrestler1Name: 'Daniel Bryan',
    wrestler2Name: 'Triple H',
    rivalryName: 'The Yes Movement vs. The Authority',
    description: 'Daniel Bryan\'s struggle against The Authority culminated in one of WrestleMania\'s greatest underdog stories.',
    notableMatches: [
      'WrestleMania XXX - Opening match and main event',
      'SummerSlam 2013',
      'Various Authority vs. Bryan segments'
    ],
    feudIntensity: 9,
    startDate: new Date('2013-08-01'),
    endDate: new Date('2014-04-01')
  },
  {
    wrestler1Name: 'Roman Reigns',
    wrestler2Name: 'Brock Lesnar',
    rivalryName: 'The Tribal Chief vs. The Beast',
    description: 'Multiple encounters spanning several years with championship implications and personal animosity.',
    notableMatches: [
      'WrestleMania 31 - Main Event',
      'WrestleMania 34',
      'Crown Jewel 2022'
    ],
    feudIntensity: 8,
    startDate: new Date('2014-01-01'),
    endDate: new Date('2022-12-01')
  },
  
  // Women\'s Wrestling Rivalries
  {
    wrestler1Name: 'Trish Stratus',
    wrestler2Name: 'Lita',
    rivalryName: 'The Icons of Women\'s Wrestling',
    description: 'Two pioneers who elevated women\'s wrestling and had numerous classic encounters for championship gold.',
    notableMatches: [
      'Unforgiven 2006 - Trish\'s retirement match',
      'Raw main event encounters',
      'Various Women\'s Championship matches'
    ],
    feudIntensity: 8,
    startDate: new Date('2004-01-01'),
    endDate: new Date('2006-09-01')
  },
  {
    wrestler1Name: 'Charlotte Flair',
    wrestler2Name: 'Becky Lynch',
    rivalryName: 'The Queen vs. The Man',
    description: 'A rivalry that helped define the Women\'s Evolution and culminated in the main event of WrestleMania 35.',
    notableMatches: [
      'WrestleMania 35 - Triple Threat main event',
      'Hell in a Cell 2018',
      'Evolution 2018 - Last Woman Standing'
    ],
    feudIntensity: 9,
    startDate: new Date('2018-07-01'),
    endDate: new Date('2019-04-01')
  },
  {
    wrestler1Name: 'Sasha Banks',
    wrestler2Name: 'Bayley',
    rivalryName: 'The Boss vs. The Role Model',
    description: 'Former best friends turned bitter enemies in one of the most emotionally compelling storylines of recent years.',
    notableMatches: [
      'Hell in a Cell 2020',
      'SummerSlam 2020',
      'Various SmackDown encounters'
    ],
    feudIntensity: 8,
    startDate: new Date('2020-05-01'),
    endDate: new Date('2021-04-01')
  },
  
  // Tag Team and Stable Rivalries
  {
    wrestler1Name: 'The Hardy Boyz',
    wrestler2Name: 'Edge & Christian',
    rivalryName: 'TLC Pioneers',
    description: 'Revolutionary tag team matches that redefined what tag team wrestling could be with Tables, Ladders, and Chairs.',
    notableMatches: [
      'WrestleMania 2000 - Triangle Ladder Match',
      'WrestleMania X-Seven - TLC II',
      'SummerSlam 2000 - TLC I'
    ],
    feudIntensity: 9,
    startDate: new Date('1999-01-01'),
    endDate: new Date('2001-12-01')
  },
  
  // Cross-Promotional Rivalries
  {
    wrestler1Name: 'Christian',
    wrestler2Name: 'Jeff Jarrett',
    rivalryName: 'Captain Charisma vs. The King of the Mountain',
    description: 'Two talented performers competing across different promotions for main event opportunities.',
    notableMatches: [
      'TNA Impact Wrestling encounters',
      'Various championship matches',
      'King of the Mountain matches'
    ],
    feudIntensity: 6,
    startDate: new Date('2005-01-01'),
    endDate: new Date('2007-01-01')
  },
  {
    wrestler1Name: 'Matt Hardy',
    wrestler2Name: 'CM Punk',
    rivalryName: 'Version 1 vs. The Voice of the Voiceless',
    description: 'Both wrestlers evolved their characters significantly, with various encounters showcasing their different wrestling philosophies.',
    notableMatches: [
      'SmackDown encounters',
      'Pay-per-view matches',
      'Championship contender matches'
    ],
    feudIntensity: 6,
    startDate: new Date('2006-01-01'),
    endDate: new Date('2009-01-01')
  },
  
  // Legacy Rivalries
  {
    wrestler1Name: 'Charlotte Flair',
    wrestler2Name: 'Bret Hart',
    rivalryName: 'Legacy Feud - Flair Family vs. Hart Family',
    description: 'Representing legendary wrestling families, this rivalry spans generations with respect for tradition and technical excellence.',
    notableMatches: [
      'Cross-promotional encounters',
      'Hall of Fame interactions',
      'Family legacy storylines'
    ],
    feudIntensity: 5,
    startDate: new Date('2015-01-01'),
    endDate: new Date('2017-01-01')
  }
]

async function populateRivalries() {
  console.log('Starting to populate wrestling rivalries...')
  
  try {
    // Get all profiles for name matching
    const profiles = await prisma.profile.findMany({
      select: {
        id: true,
        name: true,
        slug: true
      }
    })
    
    console.log(`Found ${profiles.length} profiles`)
    
    let rivalriesCreated = 0
    let rivalriesSkipped = 0
    
    for (const rivalry of famousRivalries) {
      // Find the wrestlers by exact name match first, then fallback to partial
      let wrestler1 = profiles.find(p => p.name === rivalry.wrestler1Name)
      if (!wrestler1) {
        wrestler1 = profiles.find(p => 
          p.name.toLowerCase().includes(rivalry.wrestler1Name.toLowerCase()) ||
          rivalry.wrestler1Name.toLowerCase().includes(p.name.toLowerCase())
        )
      }
      
      let wrestler2 = profiles.find(p => p.name === rivalry.wrestler2Name)
      if (!wrestler2) {
        wrestler2 = profiles.find(p => 
          p.name.toLowerCase().includes(rivalry.wrestler2Name.toLowerCase()) ||
          rivalry.wrestler2Name.toLowerCase().includes(p.name.toLowerCase())
        )
      }
      
      if (!wrestler1) {
        console.log(`⚠️  Could not find wrestler: ${rivalry.wrestler1Name}`)
        console.log(`Available names containing "${rivalry.wrestler1Name}":`, 
          profiles.filter(p => p.name.toLowerCase().includes(rivalry.wrestler1Name.toLowerCase())).map(p => p.name))
        rivalriesSkipped++
        continue
      }
      
      if (!wrestler2) {
        console.log(`⚠️  Could not find wrestler: ${rivalry.wrestler2Name}`)
        console.log(`Available names containing "${rivalry.wrestler2Name}":`, 
          profiles.filter(p => p.name.toLowerCase().includes(rivalry.wrestler2Name.toLowerCase())).map(p => p.name))
        rivalriesSkipped++
        continue
      }
      
      // Check if rivalry already exists
      const existingRivalry = await prisma.rivalry.findFirst({
        where: {
          OR: [
            { wrestler1Id: wrestler1.id, wrestler2Id: wrestler2.id },
            { wrestler1Id: wrestler2.id, wrestler2Id: wrestler1.id }
          ]
        }
      })
      
      if (existingRivalry) {
        console.log(`⏭️  Rivalry already exists: ${wrestler1.name} vs ${wrestler2.name}`)
        rivalriesSkipped++
        continue
      }
      
      // Create the rivalry
      await prisma.rivalry.create({
        data: {
          wrestler1Id: wrestler1.id,
          wrestler2Id: wrestler2.id,
          rivalryName: rivalry.rivalryName,
          description: rivalry.description,
          notableMatches: rivalry.notableMatches.join(' • '),
          feudIntensity: rivalry.feudIntensity,
          startDate: rivalry.startDate,
          endDate: rivalry.endDate
        }
      })
      
      console.log(`✅ Created rivalry: ${wrestler1.name} vs ${wrestler2.name}`)
      rivalriesCreated++
    }
    
    console.log(`\n🎉 Rivalry population complete!`)
    console.log(`✅ Rivalries created: ${rivalriesCreated}`)
    console.log(`⏭️  Rivalries skipped: ${rivalriesSkipped}`)
    
  } catch (error) {
    console.error('Error populating rivalries:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the script
populateRivalries()