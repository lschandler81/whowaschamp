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
  date?: string // ISO date (YYYY-MM-DD) when known
}

// Common career highlights for famous wrestlers
const wrestlerHighlights: Record<string, CareerHighlightTemplate[]> = {
  'stone-cold-steve-austin': [
    {
      title: 'Austin 3:16 Promo',
      description: 'Delivered the iconic "Austin 3:16" promo after winning King of the Ring',
      category: 'milestone',
      importance: 10,
      venue: 'King of the Ring 1996',
      date: '1996-06-23'
    },
    {
      title: 'First WWE Championship',
      description: 'Won his first WWE Championship at WrestleMania XIV',
      category: 'championship',
      importance: 10,
      venue: 'WrestleMania XIV',
      opponent: 'Shawn Michaels',
      date: '1998-03-29'
    },
    {
      title: 'Beer Truck Incident',
      description: 'Drove a beer truck to the ring and sprayed The Corporation',
      category: 'special_match',
      importance: 9,
      venue: 'WWE Raw',
      date: '1999-03-22'
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
      opponent: 'The Iron Sheik',
      date: '1984-01-23'
    },
    {
      title: 'WrestleMania Main Event',
      description: 'Main evented the first WrestleMania alongside Mr. T',
      category: 'special_match',
      importance: 10,
      venue: 'WrestleMania I',
      date: '1985-03-31'
    },
    {
      title: 'NWO Formation',
      description: 'Shocked the wrestling world by turning heel and forming the NWO',
      category: 'milestone',
      importance: 10,
      venue: 'WCW Bash at the Beach 1996',
      date: '1996-07-07'
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
      venue: 'The Barber Shop',
      date: '1992-01-12'
    },
    {
      title: 'Iron Man Match Victory',
      description: 'Won the WWE Championship in a 60-minute Iron Man match',
      category: 'championship',
      importance: 10,
      venue: 'WrestleMania XII',
      opponent: 'Bret Hart',
      date: '1996-03-31'
    },
    {
      title: 'Lost My Smile Controversy',
      description: 'Vacated the WWE Championship claiming he "lost his smile"',
      category: 'milestone',
      importance: 8,
      date: '1997-02-13'
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
      venue: 'Survivor Series 1997',
      date: '1997-11-09'
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
      opponent: 'The Undertaker',
      date: '1998-06-28'
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
      venue: 'WWE Raw',
      date: '1999-01-04'
    }
  ],
  'kane': [
    {
      title: 'Debut and Undertaker Attack',
      description: 'Made shocking debut by attacking The Undertaker at Hell in a Cell',
      category: 'debut',
      importance: 10,
      venue: 'Badd Blood 1997',
      date: '1997-10-05'
    },
    {
      title: 'Unmasking',
      description: 'Removed his iconic mask after years of mystery',
      category: 'milestone',
      importance: 9,
      date: '2003-06-23'
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
      opponent: 'Brock Lesnar',
      date: '2004-02-15'
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
      opponent: 'Hulk Hogan',
      date: '1987-03-29'
    }
  ],
  'goldberg': [
    {
      title: 'WCW Winning Streak',
      description: 'Built an incredible 173-match winning streak in WCW',
      category: 'milestone',
      importance: 10,
      venue: 'WCW',
      date: '1998-07-06'
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
  // Deceased profiles: do not create 'Retirement'; add a memorial highlight instead
  const MEMORIALS_BY_NAME: Record<string, { date: string; title?: string; description?: string; category?: 'milestone' | 'special_match' }> = {
    'Eddie Guerrero': { date: '2005-11-13', title: 'In Memoriam', description: 'Remembering the life and legacy of Eddie Guerrero (Latino Heat)', category: 'milestone' },
    'Owen Hart': { date: '1999-05-23', title: 'In Memoriam', description: 'Remembering Owen Hart and his enduring legacy', category: 'milestone' },
    'Andre the Giant': { date: '1993-01-27', title: 'In Memoriam', description: 'Remembering The Eighth Wonder of the World', category: 'milestone' },
    'Randy Savage': { date: '2011-05-20', title: 'In Memoriam', description: 'Remembering “Macho Man” Randy Savage', category: 'milestone' },
    'Ultimate Warrior': { date: '2014-04-08', title: 'In Memoriam', description: 'Remembering The Ultimate Warrior', category: 'milestone' },
    'Yokozuna': { date: '2000-10-23', title: 'In Memoriam', description: 'Remembering Yokozuna', category: 'milestone' },
    'Mr. Perfect': { date: '2003-02-10', title: 'In Memoriam', description: 'Remembering Mr. Perfect (Curt Hennig)', category: 'milestone' },
    'Curt Hennig': { date: '2003-02-10', title: 'In Memoriam', description: 'Remembering Curt Hennig (Mr. Perfect)', category: 'milestone' },
    'Rick Rude': { date: '1999-04-20', title: 'In Memoriam', description: 'Remembering “Ravishing” Rick Rude', category: 'milestone' },
    'British Bulldog': { date: '2002-05-18', title: 'In Memoriam', description: 'Remembering The British Bulldog (Davey Boy Smith)', category: 'milestone' },
    'Dynamite Kid': { date: '2018-12-05', title: 'In Memoriam', description: 'Remembering The Dynamite Kid', category: 'milestone' },
    'Vader': { date: '2018-06-18', title: 'In Memoriam', description: 'Remembering Big Van Vader', category: 'milestone' },
    'Chyna': { date: '2016-04-20', title: 'In Memoriam', description: 'Remembering Chyna, the Ninth Wonder of the World', category: 'milestone' },
    'Test': { date: '2009-03-13', title: 'In Memoriam', description: 'Remembering Test (Andrew Martin)', category: 'milestone' },
    'Big Boss Man': { date: '2004-09-22', title: 'In Memoriam', description: 'Remembering Big Boss Man', category: 'milestone' },
    'Kamala': { date: '2020-08-09', title: 'In Memoriam', description: 'Remembering Kamala', category: 'milestone' },
    'King Kong Bundy': { date: '2019-03-04', title: 'In Memoriam', description: 'Remembering King Kong Bundy', category: 'milestone' },
    'Road Warrior Hawk': { date: '2003-10-19', title: 'In Memoriam', description: 'Remembering Road Warrior Hawk', category: 'milestone' },
    'Bruno Sammartino': { date: '2018-04-18', title: 'In Memoriam', description: 'Remembering Bruno Sammartino', category: 'milestone' },
    'Buddy Rogers': { date: '1992-06-26', title: 'In Memoriam', description: 'Remembering Buddy Rogers', category: 'milestone' },
    'Pedro Morales': { date: '2019-02-12', title: 'In Memoriam', description: 'Remembering Pedro Morales', category: 'milestone' },
    'Ivan Koloff': { date: '2017-02-18', title: 'In Memoriam', description: 'Remembering Ivan Koloff', category: 'milestone' },
    'Superstar Billy Graham': { date: '2023-05-17', title: 'In Memoriam', description: 'Remembering “Superstar” Billy Graham', category: 'milestone' },
    'The Iron Sheik': { date: '2023-06-07', title: 'In Memoriam', description: 'Remembering The Iron Sheik', category: 'milestone' },
    'Dusty Rhodes': { date: '2015-06-11', title: 'In Memoriam', description: 'Remembering The American Dream, Dusty Rhodes', category: 'milestone' },
    'Roddy Piper': { date: '2015-07-31', title: 'In Memoriam', description: 'Remembering “Rowdy” Roddy Piper', category: 'milestone' },
    'Scott Hall': { date: '2022-03-14', title: 'In Memoriam', description: 'Remembering Scott Hall', category: 'milestone' },
    'Razor Ramon': { date: '2022-03-14', title: 'In Memoriam', description: 'Remembering Razor Ramon (Scott Hall)', category: 'milestone' },
    'Bam Bam Bigelow': { date: '2007-01-19', title: 'In Memoriam', description: 'Remembering Bam Bam Bigelow', category: 'milestone' },
    'Chris Benoit': { date: '2007-06-24', title: 'In Memoriam', description: 'Remembering Chris Benoit', category: 'milestone' },
    'Mitsuharu Misawa': { date: '2009-06-13', title: 'In Memoriam', description: 'Remembering Mitsuharu Misawa', category: 'milestone' }
  }
  
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
    
    // Add predefined highlights for famous wrestlers (idempotent by profileId+title)
    for (const [slug, highlights] of Object.entries(wrestlerHighlights)) {
      const profile = profiles.find(p => p.slug === slug)
      if (profile) {
        console.log(`Adding predefined highlights for ${profile.name}...`)
        
        for (const highlight of highlights) {
          const existing = await prisma.careerHighlight.findFirst({
            where: {
              profileId: profile.id,
              title: highlight.title,
              category: highlight.category
            }
          })

          if (!existing) {
            const when = highlight.date ? new Date(highlight.date) : new Date('2000-01-01')
            await prisma.careerHighlight.create({
              data: {
                id: uuidv4(),
                profileId: profile.id,
                title: highlight.title,
                description: highlight.description,
                // Prefer factual date when provided; otherwise a stable placeholder
                date: when,
                category: highlight.category,
                importance: highlight.importance,
                venue: highlight.venue || null,
                opponent: highlight.opponent || null
              }
            })
          }
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
      
      // Add debut highlight (idempotent by profileId+title)
      if (profile.debut) {
        const existingDebut = await prisma.careerHighlight.findFirst({
          where: { profileId: profile.id, title: 'Professional Debut' }
        })
        if (!existingDebut) {
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
      }
      
      // Add championship highlights (idempotent by profileId+title+date)
      for (const championship of profile.championships) {
        if (championship.wonDate) {
          const title = `${championship.titleName} Victory`
          const existingChamp = await prisma.careerHighlight.findFirst({
            where: { profileId: profile.id, title, date: championship.wonDate }
          })
          if (!existingChamp) {
            await prisma.careerHighlight.create({
              data: {
                id: uuidv4(),
                profileId: profile.id,
                title,
                description: `Won the ${championship.titleName} championship`,
                date: championship.wonDate,
                category: 'championship',
                importance: championship.titleName.includes('World') || championship.titleName.includes('WWE') ? 9 : 7,
                venue: typeof championship.promotion === 'string' ? championship.promotion : championship.promotion?.name || null
              }
            })
          }
        }
      }
      
      // Add retirement highlight or memorial if applicable
      if (profile.retired) {
        const memo = MEMORIALS_BY_NAME[profile.name]
        if (memo) {
          if (memo) {
            const existingMemorial = await prisma.careerHighlight.findFirst({
              where: { profileId: profile.id, title: memo.title || 'In Memoriam' }
            })
            if (!existingMemorial) {
              await prisma.careerHighlight.create({
                data: {
                  id: uuidv4(),
                  profileId: profile.id,
                  title: memo.title || 'In Memoriam',
                  description: memo.description || `${profile.name} is remembered for an incredible career`,
                  date: new Date(memo.date),
                  category: memo.category || 'milestone',
                  importance: 9
                }
              })
            }
          }
        } else {
          const existingRetired = await prisma.careerHighlight.findFirst({
            where: { profileId: profile.id, title: 'Retirement' }
          })
          if (!existingRetired) {
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
