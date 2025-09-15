#!/usr/bin/env node
/**
 * API Test Script
 * Tests the On This Day and PPV Flashback APIs
 */

const { PrismaClient } = require('@prisma/client');

async function testAPIs() {
  console.log('🧪 Testing PPV Flashback APIs...\n');
  
  const prisma = new PrismaClient();
  
  try {
    // Test database connectivity
    console.log('📊 Database Status:');
    const promotionCount = await prisma.promotion.count();
    const eventCount = await prisma.event.count();
    const ppvCount = await prisma.event.count({ where: { isPpv: true } });
    
    console.log(`  - Promotions: ${promotionCount}`);
    console.log(`  - Total Events: ${eventCount}`);
    console.log(`  - PPV Events: ${ppvCount}`);
    
    if (eventCount === 0) {
      console.log('❌ No events in database. Run the sample data script first:');
      console.log('   node scripts/debug-db.js');
      return;
    }
    
    // Test "On This Day" logic
    console.log('\n📅 Testing "On This Day" logic:');
    const sept15Events = await prisma.$queryRaw`
      SELECT 
        e.id, e.name, e.date, p.name as promotion
      FROM events e
      JOIN promotions p ON e.promotionId = p.id
      WHERE CAST(strftime('%m', e.date) AS INTEGER) = 9
        AND CAST(strftime('%d', e.date) AS INTEGER) = 15
    `;
    
    console.log(`  - September 15 events: ${sept15Events.length}`);
    sept15Events.forEach((event, i) => {
      console.log(`    ${i + 1}. ${event.name} (${event.promotion}) - ${event.date}`);
    });
    
    // Test PPV selection logic
    console.log('\n🎪 Testing PPV Selection logic:');
    const ppvEvents = await prisma.event.findMany({
      where: { isPpv: true },
      include: {
        promotion: true,
        headliners: true,
        titleChanges: true
      }
    });
    
    console.log(`  - Available PPV events: ${ppvEvents.length}`);
    
    if (ppvEvents.length > 0) {
      // Score the events
      const scoredEvents = ppvEvents.map(event => {
        let score = 0;
        if (event.isPpv) score += 10;
        if (event.buyrate >= 1000) score += 5;
        else if (event.buyrate >= 500) score += 3;
        if (event.attendance >= 80000) score += 5;
        else if (event.attendance >= 50000) score += 3;
        else if (event.attendance >= 20000) score += 1;
        score += event.titleChanges.length * 2;
        
        return { event, score };
      });
      
      scoredEvents.sort((a, b) => b.score - a.score);
      
      console.log('  - Top scoring PPVs:');
      scoredEvents.slice(0, 3).forEach((scored, i) => {
        const e = scored.event;
        console.log(`    ${i + 1}. ${e.name} (${e.promotion.name}) - Score: ${scored.score}`);
        console.log(`       Buyrate: ${e.buyrate || 'N/A'}, Attendance: ${e.attendance || 'N/A'}`);
      });
    }
    
    console.log('\n✅ Database tests completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('  1. Start the development server: npm run dev');
    console.log('  2. Test API endpoints:');
    console.log('     curl "http://localhost:3000/api/events/on-this-day?month=9&day=15"');
    console.log('     curl "http://localhost:3000/api/events/ppv-flashback"');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAPIs();
