const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testOnThisDayAPI() {
  console.log('🧪 Testing "On This Day" API logic...');
  
  try {
    // Test September 15 query (same logic as updated API)
    const month = 9;
    const day = 15;
    
    // Get all events and filter by month/day in JavaScript
    const allEvents = await prisma.event.findMany({
      include: {
        promotion: true,
        headliners: {
          orderBy: { side: 'asc' }
        },
        titleChanges: {
          where: { changedHands: true }
        }
      },
      orderBy: { date: 'desc' }
    });

    // Filter events for the specific month/day across all years
    const matchingEvents = allEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === (month - 1) && eventDate.getDate() === day; // getMonth() is 0-indexed
    });

    console.log(`📅 Found ${matchingEvents.length} events for September 15:`);
    
    if (matchingEvents.length > 0) {
      // Format response (same as API)
      const apiEvents = matchingEvents.map(event => ({
        id: event.id,
        promotion: event.promotion.name,
        name: event.name,
        date: event.date,
        venue: event.venue || undefined,
        city: event.city || undefined,
        country: event.country || undefined,
        headliners: event.headliners.map(h => h.name),
        titleChanges: event.titleChanges.map(tc => 
          `${tc.titleName}: ${tc.newChampion} defeats ${tc.oldChampion}`
        )
      }));

      apiEvents.forEach(event => {
        console.log(`\n📺 ${event.name} (${event.promotion})`);
        console.log(`   Date: ${event.date.toISOString().split('T')[0]}`);
        console.log(`   Venue: ${event.venue || 'N/A'}, ${event.city || 'N/A'}`);
        console.log(`   Headliners: ${event.headliners.join(', ')}`);
        if (event.titleChanges.length > 0) {
          console.log(`   Title Changes: ${event.titleChanges.join(', ')}`);
        }
      });

      console.log('\n✅ "On This Day" API would return:', {
        date: '09-15',
        events: apiEvents,
        total: apiEvents.length
      });

    } else {
      console.log('❌ No events found for September 15');
    }

  } catch (error) {
    console.error('❌ API test failed:', error);
  }
}

async function testPPVFlashbackAPI() {
  console.log('\n🎪 Testing PPV Flashback API logic...');
  
  try {
    // Get all PPV events
    const ppvEvents = await prisma.event.findMany({
      where: { isPpv: true },
      include: {
        promotion: true,
        headliners: { orderBy: { side: 'asc' } },
        titleChanges: { where: { changedHands: true } }
      },
      orderBy: { date: 'desc' }
    });

    console.log(`🎭 Found ${ppvEvents.length} PPV events`);

    if (ppvEvents.length > 0) {
      // Score events
      const scoredEvents = ppvEvents.map(event => {
        let score = 0;
        
        if (event.buyrate) score += Math.min(10, (event.buyrate / 150));
        if (event.attendance) score += Math.min(10, (event.attendance / 10000));
        score += event.titleChanges.length * 2;
        if (event.headliners.some(h => h.side === 'main')) score += 1;
        
        const yearsDiff = new Date().getFullYear() - event.date.getFullYear();
        if (yearsDiff >= 10) score += 2;
        if (yearsDiff >= 20) score += 1;
        
        return { ...event, score };
      });

      // Sort and pick top event
      const topEvent = scoredEvents.sort((a, b) => b.score - a.score)[0];

      console.log(`\n🏆 Top scoring PPV: ${topEvent.name} (Score: ${topEvent.score.toFixed(1)})`);
      console.log(`   Promotion: ${topEvent.promotion.name}`);
      console.log(`   Date: ${topEvent.date.toISOString().split('T')[0]}`);
      console.log(`   Venue: ${topEvent.venue || 'N/A'}, ${topEvent.city || 'N/A'}`);
      console.log(`   Buyrate: ${topEvent.buyrate || 'N/A'}`);
      console.log(`   Attendance: ${topEvent.attendance || 'N/A'}`);
      console.log(`   Headliners: ${topEvent.headliners.map(h => h.name).join(', ')}`);
      
      if (topEvent.titleChanges.length > 0) {
        console.log(`   Title Changes:`);
        topEvent.titleChanges.forEach(tc => {
          console.log(`     - ${tc.titleName}: ${tc.newChampion} defeats ${tc.oldChampion}`);
        });
      }

      const flashbackEvent = {
        id: topEvent.id,
        promotion: topEvent.promotion.name,
        name: topEvent.name,
        date: topEvent.date,
        venue: topEvent.venue || undefined,
        city: topEvent.city || undefined,
        country: topEvent.country || undefined,
        buyrate: topEvent.buyrate || undefined,
        attendance: topEvent.attendance || undefined,
        headliners: topEvent.headliners.map(h => h.name),
        titleChanges: topEvent.titleChanges.map(tc => 
          `${tc.titleName}: ${tc.newChampion} defeats ${tc.oldChampion}`
        ),
        score: topEvent.score
      };

      console.log('\n✅ PPV Flashback API would return:', {
        event: flashbackEvent,
        total: ppvEvents.length
      });

    } else {
      console.log('❌ No PPV events found');
    }

  } catch (error) {
    console.error('❌ PPV Flashback API test failed:', error);
  }
}

async function main() {
  console.log('🧪 Testing PPV APIs...\n');
  
  await testOnThisDayAPI();
  await testPPVFlashbackAPI();
  
  console.log('\n🎉 API tests completed!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
