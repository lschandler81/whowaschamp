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
  {
    wrestler1Name: 'Ric Flair',
    wrestler2Name: 'Bret Hart',
    rivalryName: 'The Nature Boy vs. The Best There Is',
    description: 'Two technical wrestling legends from different eras and styles. Flair\'s flamboyant personality clashed with Hart\'s no-nonsense approach, creating compelling matches.',
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
    wrestler1Name: 'CM Punk',
    wrestler2Name: 'Jeff Hardy',
    rivalryName: 'Straight Edge vs. Charismatic Enigma',
    description: 'CM Punk\'s straight edge lifestyle directly opposed Jeff Hardy\'s perceived reckless behavior, creating a compelling storyline about different life philosophies.',
    notableMatches: [
      'SummerSlam 2009 - TLC Match',
      'Night of Champions 2009',
      'SmackDown encounters and promos'
    ],
    feudIntensity: 8,
    startDate: new Date('2009-06-01'),
    endDate: new Date('2009-09-01')
  },
  {
    wrestler1Name: 'Christian',
    wrestler2Name: 'Jeff Jarrett',
    rivalryName: 'Captain Charisma vs. The King of the Mountain',
    description: 'Two talented performers who often found themselves in similar positions, competing for mid-card and main event opportunities across different promotions.',
    notableMatches: [
      'TNA Impact Wrestling encounters',
      'Various championship matches',
      'Multi-man ladder matches'
    ],
    feudIntensity: 6,
    startDate: new Date('2005-01-01'),
    endDate: new Date('2007-01-01')
  },
  {
    wrestler1Name: 'Matt Hardy',
    wrestler2Name: 'CM Punk',
    rivalryName: 'Version 1 vs. The Voice of the Voiceless',
    description: 'Both wrestlers evolved their characters significantly, with Hardy\'s "Version 1" persona clashing with Punk\'s straight edge movement in various encounters.',
    notableMatches: [
      'SmackDown encounters',
      'Pay-per-view matches',
      'Championship contender matches'
    ],
    feudIntensity: 6,
    startDate: new Date('2006-01-01'),
    endDate: new Date('2009-01-01')
  },
  {
    wrestler1Name: 'Charlotte Flair',
    wrestler2Name: 'Bret Hart',
    rivalryName: 'Legacy Feud - Flair Family vs. Hart Family',
    description: 'Representing the legendary wrestling families, this rivalry spans generations with respect for tradition and technical excellence.',
    notableMatches: [
      'Cross-promotional encounters',
      'Hall of Fame interactions',
      'Family legacy matches'
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