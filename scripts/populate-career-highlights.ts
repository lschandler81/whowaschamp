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
  'the-rock': [
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
      title: 'Hollywood Career Launch',
      description: 'Transitioned to become one of the highest-paid actors in Hollywood',
      category: 'milestone',
      importance: 9
    }
  ],
  'hulk-hogan': [
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
      description: 'Main evented the first WrestleMania alongside Mr. T',
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
  ],
  'john-cena': [
    {
      title: 'Never Give Up Debut',
      description: 'Debuted his "Never Give Up" character and catchphrase',
      category: 'milestone',
      importance: 9,
      venue: 'WWE'
    },
    {
      title: 'First WWE Championship',
      description: 'Won his first WWE Championship at WrestleMania 21',
      category: 'championship',
      importance: 10,
      venue: 'WrestleMania 21',
      opponent: 'JBL'
    },
    {
      title: '16-Time World Champion',
      description: 'Tied Ric Flair\'s record of 16 World Championship reigns',
      category: 'milestone',
      importance: 10
    }
  ],
  'triple-h': [
    {
      title: 'DX Formation',
      description: 'Co-founded D-Generation X with Shawn Michaels',
      category: 'milestone',
      importance: 9,
      venue: 'WWE'
    },
    {
      title: 'First WWE Championship',
      description: 'Won his first WWE Championship in a six-pack challenge',
      category: 'championship',
      importance: 10,
      venue: 'Unforgiven 1999'
    },
    {
      title: 'Evolution Leader',
      description: 'Led the dominant Evolution stable',
      category: 'milestone',
      importance: 9
    }
  ],
  'shawn-michaels': [
    {
      title: 'The Rockers Breakup',
      description: 'Betrayed Marty Jannetty by throwing him through Brutus Beefcake\'s Barber Shop window',
      category: 'milestone',
      importance: 9,
      venue: 'The Barber Shop'
    },
    {
      title: 'Iron Man Match Victory',
      description: 'Won the WWE Championship in a 60-minute Iron Man match',
      category: 'championship',
      importance: 10,
      venue: 'WrestleMania XII',
      opponent: 'Bret Hart'
    },
    {
      title: 'Lost My Smile Controversy',
      description: 'Vacated the WWE Championship claiming he "lost his smile"',
      category: 'milestone',
      importance: 8
    }
  ],
  'bret-hart': [
    {
      title: 'Hart Foundation Success',
      description: 'Dominated tag team wrestling as part of the Hart Foundation',
      category: 'championship',
      importance: 9,
      venue: 'WWE'
    },
    {
      title: 'Excellence of Execution',
      description: 'Established himself as "The Excellence of Execution"',
      category: 'milestone',
      importance: 9
    },
    {
      title: 'Montreal Screwjob',
      description: 'Victim of the infamous Montreal Screwjob at Survivor Series',
      category: 'milestone',
      importance: 10,
      venue: 'Survivor Series 1997'
    }
  ],
  'ric-flair': [
    {
      title: 'Nature Boy Persona',
      description: 'Developed the legendary "Nature Boy" character and lifestyle',
      category: 'milestone',
      importance: 10
    },
    {
      title: '16-Time World Champion',
      description: 'Won 16 World Championships across multiple promotions',
      category: 'championship',
      importance: 10
    },
    {
      title: 'Four Horsemen Leader',
      description: 'Led the legendary Four Horsemen stable',
      category: 'milestone',
      importance: 10,
      venue: 'NWA/WCW'
    }
  ],
  'mick-foley': [
    {
      title: 'Hell in a Cell Fall',
      description: 'Survived being thrown off and through Hell in a Cell by The Undertaker',
      category: 'special_match',
      importance: 10,
      venue: 'King of the Ring 1998',
      opponent: 'The Undertaker'
    },
    {
      title: 'Three Faces of Foley',
      description: 'Created multiple personas: Mankind, Cactus Jack, and Dude Love',
      category: 'milestone',
      importance: 9
    },
    {
      title: 'WWE Championship Victory',
      description: 'Won the WWE Championship on Raw, creating one of the biggest pops ever',
      category: 'championship',
      importance: 10,
      venue: 'WWE Raw'
    }
  ],
  'kane': [
    {
      title: 'Debut and Undertaker Attack',
      description: 'Made shocking debut by attacking The Undertaker at Hell in a Cell',
      category: 'debut',
      importance: 10,
      venue: 'Badd Blood 1997'
    },
    {
      title: 'Unmasking',
      description: 'Removed his iconic mask after years of mystery',
      category: 'milestone',
      importance: 9
    }
  ],
  'eddie-guerrero': [
    {
      title: 'Latino Heat Persona',
      description: 'Developed the beloved "Latino Heat" character',
      category: 'milestone',
      importance: 9
    },
    {
      title: 'WWE Championship Victory',
      description: 'Won the WWE Championship from Brock Lesnar at No Way Out',
      category: 'championship',
      importance: 10,
      venue: 'No Way Out 2004',
      opponent: 'Brock Lesnar'
    }
  ],
  'randy-savage': [
    {
      title: 'Macho Man Character',
      description: 'Created the iconic "Macho Man" persona with colorful attire',
      category: 'milestone',
      importance: 10
    },
    {
      title: 'Miss Elizabeth Partnership',
      description: 'Formed legendary partnership with manager Miss Elizabeth',
      category: 'milestone',
      importance: 9
    }
  ],
  'andre-the-giant': [
    {
      title: 'Eighth Wonder Status',
      description: 'Became known as "The Eighth Wonder of the World"',
      category: 'milestone',
      importance: 10
    },
    {
      title: 'WrestleMania III Body Slam',
      description: 'Was body slammed by Hulk Hogan in front of 93,000 fans',
      category: 'special_match',
      importance: 10,
      venue: 'WrestleMania III',
      opponent: 'Hulk Hogan'
    }
  ],
  'goldberg': [
    {
      title: 'WCW Winning Streak',
      description: 'Built an incredible 173-match winning streak in WCW',
      category: 'milestone',
      importance: 10,
      venue: 'WCW'
    },
    {
      title: 'Spear and Jackhammer',
      description: 'Perfected the devastating Spear and Jackhammer combination',
      category: 'milestone',
      importance: 9
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
    
    // Add predefined highlights for famous wrestlers
    for (const [slug, highlights] of Object.entries(wrestlerHighlights)) {
      const profile = profiles.find(p => p.slug === slug)
      if (profile) {
        console.log(`Adding predefined highlights for ${profile.name}...`)
        
        for (const highlight of highlights) {
          await prisma.careerHighlight.create({
            data: {
              id: uuidv4(),
              profileId: profile.id,
              title: highlight.title,
              description: highlight.description,
              date: new Date(), // Use current date for predefined highlights
              category: highlight.category,
              importance: highlight.importance,
              venue: highlight.venue || null,
              opponent: highlight.opponent || null
            }
          })
        }
      }
    }
    
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
        await prisma.careerHighlight.create({
          data: {
            id: uuidv4(),
            profileId: profile.id,
            title: 'Professional Debut',
            description: `${profile.name} began their professional ${profile.type === 'wrestler' ? 'wrestling' : 'fighting'} career`,
            date: profile.debut,
            category: 'debut',
            importance: 7
          }
        })
      }
      
      // Add championship highlights
      for (const championship of profile.championships) {
        if (championship.wonDate) {
          await prisma.careerHighlight.create({
            data: {
              id: uuidv4(),
              profileId: profile.id,
              title: `${championship.titleName} Victory`,
              description: `Won the ${championship.titleName} championship`,
              date: championship.wonDate,
              category: 'championship',
              importance: championship.titleName.includes('World') || championship.titleName.includes('WWE') ? 9 : 7,
              venue: typeof championship.promotion === 'string' ? championship.promotion : championship.promotion?.name || null
            }
          })
        }
      }
      
      // Add retirement highlight if applicable
      if (profile.retired) {
        await prisma.careerHighlight.create({
          data: {
            id: uuidv4(),
            profileId: profile.id,
            title: 'Retirement',
            description: `${profile.name} retired from active competition`,
            date: profile.retired,
            category: 'retirement',
            importance: 8
          }
        })
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