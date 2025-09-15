#!/usr/bin/env node
/**
 * Database diagnostic script
 * Checks database connection and creates sample data for PPV Flashback
 */

const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Checking database connection...');
    
    // Check if we can connect
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Check existing data
    const promotionCount = await prisma.promotion.count();
    const eventCount = await prisma.event.count();
    
    console.log(`📊 Current data: ${promotionCount} promotions, ${eventCount} events`);
    
    if (eventCount === 0) {
      console.log('💾 Creating sample data...');
      
      // Create promotions
      const wwe = await prisma.promotion.upsert({
        where: { slug: 'wwe' },
        update: {},
        create: {
          name: 'World Wrestling Entertainment',
          slug: 'wwe',
          color: '#FFD700'
        }
      });
      
      const ufc = await prisma.promotion.upsert({
        where: { slug: 'ufc' },
        update: {},
        create: {
          name: 'Ultimate Fighting Championship',
          slug: 'ufc',
          color: '#DC143C'
        }
      });
      
      console.log('✅ Created promotions');
      
      // Create some sample events for September 15 (today)
      const sept15Event = await prisma.event.create({
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
                name: 'Champion vs Challenger for WWE Championship',
                role: 'champion'
              }
            ]
          },
          titleChanges: {
            create: [
              {
                titleName: 'WWE Championship',
                changedHands: true,
                newChampion: 'New Champion',
                oldChampion: 'Old Champion'
              }
            ]
          }
        }
      });
      
      // Create a random PPV for flashback
      const randomPPV = await prisma.event.create({
        data: {
          promotionId: wwe.id,
          name: 'WrestleMania Test',
          date: new Date('2022-04-03'),
          venue: 'AT&T Stadium',
          city: 'Arlington',
          country: 'USA',
          isPpv: true,
          buyrate: 1200,
          attendance: 78453,
          headliners: {
            create: [
              {
                side: 'main',
                name: 'Roman Reigns vs Brock Lesnar for Universal Championship',
                role: 'champion'
              }
            ]
          }
        }
      });
      
      // Create a UFC event
      const ufcEvent = await prisma.event.create({
        data: {
          promotionId: ufc.id,
          name: 'UFC Test Event',
          date: new Date('2023-09-15'),
          venue: 'T-Mobile Arena',
          city: 'Las Vegas',
          country: 'USA',
          isPpv: true,
          attendance: 20000,
          headliners: {
            create: [
              {
                side: 'main',
                name: 'Fighter A vs Fighter B for UFC Championship',
                role: 'challenger'
              }
            ]
          }
        }
      });
      
      console.log('✅ Created sample events');
      
      // Verify data
      const finalEventCount = await prisma.event.count();
      console.log(`📈 Total events now: ${finalEventCount}`);
      
      // Test queries that our APIs will use
      console.log('🔍 Testing API queries...');
      
      // Test "On This Day" query (September 15)
      const onThisDayEvents = await prisma.event.findMany({
        where: {
          date: {
            gte: new Date('1900-09-15'),
            lte: new Date('2100-09-15')
          }
        },
        include: {
          promotion: true,
          headliners: true,
          titleChanges: true
        }
      });
      
      console.log(`📅 Events on 9/15: ${onThisDayEvents.length}`);
      onThisDayEvents.forEach(event => {
        console.log(`  - ${event.name} (${event.promotion.name}) - ${event.date.toDateString()}`);
      });
      
      // Test PPV Flashback query
      const ppvEvents = await prisma.event.findMany({
        where: {
          isPpv: true
        },
        include: {
          promotion: true,
          headliners: true,
          titleChanges: true
        }
      });
      
      console.log(`🎪 PPV events: ${ppvEvents.length}`);
      ppvEvents.forEach(event => {
        console.log(`  - ${event.name} (${event.promotion.name}) - Buyrate: ${event.buyrate}`);
      });
      
    } else {
      console.log('📊 Database already has data, skipping sample data creation');
      
      // Still test queries
      const sept15Query = await prisma.$queryRaw`
        SELECT e.*, p.name as promotion_name 
        FROM events e 
        JOIN promotions p ON e.promotionId = p.id 
        WHERE strftime('%m-%d', e.date) = '09-15'
      `;
      
      console.log('📅 September 15 events from raw query:', sept15Query);
    }
    
  } catch (error) {
    console.error('❌ Database error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(console.error);
