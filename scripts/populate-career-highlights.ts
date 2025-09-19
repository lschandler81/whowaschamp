import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

interface CareerHighlightTemplate {
  title: string
  description: string
  category: 'debut' | 'championship' | 'retirement' | 'milestone' | 'feud' | 'special_match'
  importance: number
  venue?: string
  opponent?: string
}

// Common career highlights for famous wrestlers
const wrestlerHighlights: Record<string, CareerHighlightTemplate[]> = {
  'stone-cold-steve-austin': [
    {
      title: 'WWE Debut',
      description: 'Made his WWE debut as "The Ringmaster" before becoming Stone Cold Steve Austin',
      category: 'debut',
      importance: 7,
      venue: 'WWE'
    },
    {
      title: 'Austin 3:16 Promo',
      description: 'Delivered the iconic "Austin 3:16" promo after winning King of the Ring',
      category: 'milestone',
      importance: 10,
      venue: 'King of the Ring 1996'
    },
    {
      title: 'First WWE Championship',
      description: 'Won his first WWE Championship at WrestleMania XIV',
      category: 'championship',
      importance: 10,
      venue: 'WrestleMania XIV',
      opponent: 'Shawn Michaels'
    },
    {
      title: 'Beer Truck Incident',
      description: 'Drove a beer truck to the ring and sprayed The Corporation',
      category: 'special_match',
      importance: 9,
      venue: 'WWE Raw'
    }
  ],
  'the-undertaker': [
    {
      title: 'WWE Debut at Survivor Series',
      description: 'Made his shocking debut at Survivor Series 1990 as The Undertaker',
      category: 'debut',
      importance: 10,
      venue: 'Survivor Series 1990'
    },
    {
      title: 'WrestleMania Streak Begins',
      description: 'Started the legendary WrestleMania undefeated streak',
      category: 'milestone',
      importance: 10,
      venue: 'WrestleMania VII'
    },
    {
      title: 'First WWE Championship',
      description: 'Won his first WWE Championship from Hulk Hogan',
      category: 'championship',
      importance: 9,
      venue: 'Survivor Series 1991',
      opponent: 'Hulk Hogan'
    },
    {
      title: 'Hell in a Cell with Mankind',
      description: 'Threw Mankind off Hell in a Cell in one of the most brutal matches ever',
      category: 'special_match',
      importance: 10,
      venue: 'King of the Ring 1998',
      opponent: 'Mankind'
    }
  ],
  'the-rock': [
    {
      title: 'WWE Debut as Rocky Maivia',
      description: 'Debuted as Rocky Maivia, third-generation wrestler',
      category: 'debut',
      importance: 8,
      venue: 'Survivor Series 1996'
    },
    {
      title: 'Becomes The Rock',
      description: 'Transformed into The Rock character and joined The Nation of Domination',
      category: 'milestone',
      importance: 9,
      venue: 'WWE'
    },
    {
      title: 'First WWE Championship',
      description: 'Won his first WWE Championship at age 26',
      category: 'championship',
      importance: 10,
      venue: 'Survivor Series 1998',
      opponent: 'Mankind'
    },
    {
      title: 'Hollywood Career',
      description: 'Became one of the highest-paid actors in Hollywood',
      category: 'milestone',
      importance: 9
    }
  ],
  'hulk-hogan': [
    {
      title: 'WWWF/WWE Debut',
      description: 'Made his debut in the WWWF (later WWE) in 1977',
      category: 'debut',
      importance: 8,
      venue: 'WWWF'
    },
    {
      title: 'First WWE Championship',
      description: 'Won his first WWE Championship from The Iron Sheik, launching Hulkamania',
      category: 'championship',
      importance: 10,
      venue: 'Madison Square Garden',
      opponent: 'The Iron Sheik'
    },
    {
      title: 'WrestleMania Main Event',
      description: 'Main evented the first WrestleMania against Mr. T and Roddy Piper',
      category: 'special_match',
      importance: 10,
      venue: 'WrestleMania I'
    },
    {
      title: 'NWO Formation',
      description: 'Shocked the wrestling world by turning heel and forming the NWO',
      category: 'milestone',
      importance: 10,
      venue: 'WCW Bash at the Beach 1996'
    }
  ]
}

async function populateCareerHighlights() {
  console.log('Starting to populate career highlights...')
  const now = new Date()
  
  try {
    // Get all profiles to see what we have
    const profiles = await prisma.profile.findMany({
      select: {
        id: true,
        slug: true,
        name: true,
        type: true,
        debut: true,
        retired: true,
        championships: {
          select: {
            titleName: true,
            wonDate: true,
            lostDate: true,
            promotion: true
          }
        }
      }
    })
    
    console.log(`Found ${profiles.length} profiles`)
    
    // Add predefined highlights for famous wrestlers (skip for now due to Prisma issues)
    // for (const [slug, highlights] of Object.entries(wrestlerHighlights)) {
    //   const profile = profiles.find(p => p.slug === slug)
    //   if (profile) {
    //     console.log(`Adding highlights for ${profile.name}...`)
        
    //     for (const highlight of highlights) {
    //       // Custom highlights implementation will be added later
    //     }
    //   }
    // }
    
    // Generate generic highlights for all profiles based on their data
    for (const profile of profiles) {
      console.log(`Processing ${profile.name}...`)
      
      // Skip if we already added custom highlights
      if (wrestlerHighlights[profile.slug]) {
        continue
      }
      
      // Skip existing check for now - just create highlights
      // const existingHighlights = await prisma.careerHighlight.count({
      //   where: { profileId: profile.id }
      // })
      
      // if (existingHighlights > 0) {
      //   console.log(`Skipping ${profile.name} - already has ${existingHighlights} highlights`)
      //   continue
      // }
      
      // Add debut highlight
      if (profile.debut) {
        await prisma.$executeRaw`
          INSERT INTO career_highlights (id, profileId, title, description, date, category, importance, createdAt, updatedAt)
          VALUES (${uuidv4()}, ${profile.id}, 'Professional Debut', 
                  ${`${profile.name} began their professional ${profile.type === 'wrestler' ? 'wrestling' : 'fighting'} career`},
                  ${profile.debut}, 'debut', 7, ${now}, ${now})
        `
      }
      
      // Add championship highlights
      for (const championship of profile.championships) {
        if (championship.wonDate) {
          await prisma.$executeRaw`
            INSERT INTO career_highlights (id, profileId, title, description, date, category, importance, venue, createdAt, updatedAt)
            VALUES (${uuidv4()}, ${profile.id}, 
                    ${`${championship.titleName} Victory`},
                    ${`Won the ${championship.titleName} championship`},
                    ${championship.wonDate}, 'championship', 
                    ${championship.titleName.includes('World') || championship.titleName.includes('WWE') ? 9 : 7},
                    ${typeof championship.promotion === 'string' ? championship.promotion : championship.promotion?.name || null},
                    ${now}, ${now})
          `
        }
      }
      
      // Add retirement highlight if applicable
      if (profile.retired) {
        await prisma.$executeRaw`
          INSERT INTO career_highlights (id, profileId, title, description, date, category, importance, createdAt, updatedAt)
          VALUES (${uuidv4()}, ${profile.id}, 'Retirement',
                  ${`${profile.name} retired from active competition`},
                  ${profile.retired}, 'retirement', 8, ${now}, ${now})
        `
      }
      
      // Add retirement highlight if applicable
      if (profile.retired) {
        await prisma.$executeRaw`
          INSERT INTO career_highlights (id, profileId, title, description, date, category, importance)
          VALUES (${uuidv4()}, ${profile.id}, 'Retirement',
                  ${`${profile.name} retired from active competition`},
                  ${profile.retired}, 'retirement', 8)
        `
      }
    }
    
    const totalHighlights = await prisma.$queryRaw`SELECT COUNT(*) as count FROM career_highlights` as { count: number }[]
    console.log(`✅ Successfully created career highlights! Total: ${totalHighlights[0]?.count || 0}`)
    
  } catch (error) {
    console.error('Error populating career highlights:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the script
populateCareerHighlights()