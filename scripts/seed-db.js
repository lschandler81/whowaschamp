const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function main() {
  console.log('🌱 Starting database seed...');
  
  try {
    // Create promotions first
    console.log('Creating promotions...');
    
    const wwe = await prisma.promotion.upsert({
      where: { slug: 'wwe' },
      update: {},
      create: {
        name: 'World Wrestling Entertainment',
        slug: 'wwe',
        color: '#CE302C'
      }
    });
    
    const ufc = await prisma.promotion.upsert({
      where: { slug: 'ufc' },
      update: {},
      create: {
        name: 'Ultimate Fighting Championship',
        slug: 'ufc',
        color: '#FFD700'
      }
    });
    
    console.log('✅ Promotions created:', { wwe: wwe.id, ufc: ufc.id });
    
    // Create September 15 events
    console.log('Creating September 15 events...');
    
    const wweEvent = await prisma.event.create({
      data: {
        promotionId: wwe.id,
        name: 'WWE Test Event',
        date: new Date('2023-09-15'),
        venue: 'Test Arena',
        city: 'Test City',
        country: 'USA',
        isPpv: true,
        buyrate: 800,
        attendance: 15000,
        headliners: {
          create: [
            {
              side: 'main',
              name: 'John Cena',
              role: 'champion',
              result: 'win'
            },
            {
              side: 'main',
              name: 'Roman Reigns',
              role: 'challenger',
              result: 'loss'
            }
          ]
        },
        titleChanges: {
          create: [
            {
              titleName: 'WWE Championship',
              changedHands: false,
              newChampion: 'John Cena',
              oldChampion: 'John Cena'
            }
          ]
        }
      }
    });
    
    const ufcEvent = await prisma.event.create({
      data: {
        promotionId: ufc.id,
        name: 'UFC Test Event',
        date: new Date('2024-09-15'),
        venue: 'T-Mobile Arena',
        city: 'Las Vegas',
        country: 'USA',
        isPpv: true,
        attendance: 20000,
        headliners: {
          create: [
            {
              side: 'main',
              name: 'Jon Jones',
              role: 'champion',
              result: 'win'
            },
            {
              side: 'main',
              name: 'Stipe Miocic',
              role: 'challenger',
              result: 'loss'
            }
          ]
        }
      }
    });
    
    // Create a high-scoring PPV for flashback
    const wrestlemania = await prisma.event.create({
      data: {
        promotionId: wwe.id,
        name: 'WrestleMania Test',
        date: new Date('2024-04-07'),
        venue: 'MetLife Stadium',
        city: 'East Rutherford',
        country: 'USA',
        isPpv: true,
        buyrate: 1200,
        attendance: 78453,
        headliners: {
          create: [
            {
              side: 'main',
              name: 'The Rock',
              role: 'participant',
              result: 'win'
            },
            {
              side: 'main',
              name: 'Roman Reigns',
              role: 'champion',
              result: 'loss'
            },
            {
              side: 'co-main',
              name: 'Cody Rhodes',
              role: 'challenger',
              result: 'win'
            }
          ]
        },
        titleChanges: {
          create: [
            {
              titleName: 'Undisputed WWE Championship',
              changedHands: true,
              newChampion: 'Cody Rhodes',
              oldChampion: 'Roman Reigns'
            }
          ]
        }
      }
    });
    
    console.log('✅ Events created:', { 
      wweEvent: wweEvent.id, 
      ufcEvent: ufcEvent.id,
      wrestlemania: wrestlemania.id 
    });
    
    // Test query for September 15
    console.log('\n📅 Testing September 15 query...');
    const sep15Events = await prisma.event.findMany({
      where: {
        date: {
          gte: new Date('2023-09-15T00:00:00Z'),
          lt: new Date('2023-09-16T00:00:00Z')
        }
      },
      include: {
        promotion: true,
        headliners: true,
        titleChanges: true
      }
    });
    
    console.log(`Found ${sep15Events.length} events for September 15, 2023:`, sep15Events.map(e => e.name));
    
    // Test query for any September 15 events (any year)
    console.log('\n📅 Testing any September 15 query...');
    const anySep15Events = await prisma.event.findMany({
      where: {
        OR: [
          {
            date: {
              gte: new Date('2023-09-15T00:00:00Z'),
              lt: new Date('2023-09-16T00:00:00Z')
            }
          },
          {
            date: {
              gte: new Date('2024-09-15T00:00:00Z'),
              lt: new Date('2024-09-16T00:00:00Z')
            }
          }
        ]
      },
      include: {
        promotion: true,
        headliners: true,
        titleChanges: true
      }
    });
    
    console.log(`Found ${anySep15Events.length} events for September 15 (any year):`, anySep15Events.map(e => `${e.name} (${e.date.getFullYear()})`));
    
    console.log('\n🎉 Database seed completed successfully!');
    
  } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
