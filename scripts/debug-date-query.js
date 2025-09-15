const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function debugDateQuery() {
  console.log('🔍 Debug: Date query...');
  
  try {
    // First, let's see all events with their dates
    console.log('\n📅 All events in database:');
    const allEvents = await prisma.event.findMany({
      include: { promotion: true },
      orderBy: { date: 'asc' }
    });
    
    allEvents.forEach(event => {
      const date = new Date(event.date);
      console.log(`- ${event.name}: ${date.toISOString()} (Month: ${date.getMonth() + 1}, Day: ${date.getDate()})`);
    });
    
    // Test different approaches to September 15 query
    console.log('\n🧪 Testing September 15 queries...');
    
    // Approach 1: Raw SQL with strftime
    console.log('\n1️⃣ Raw SQL with strftime:');
    const rawQuery = await prisma.$queryRaw`
      SELECT 
        e.name,
        e.date,
        strftime('%m', e.date) as month,
        strftime('%d', e.date) as day
      FROM events e
      WHERE CAST(strftime('%m', e.date) AS INTEGER) = 9
        AND CAST(strftime('%d', e.date) AS INTEGER) = 15
    `;
    console.log('Raw query results:', rawQuery);
    
    // Approach 2: Using JavaScript date filtering
    console.log('\n2️⃣ JavaScript date filtering:');
    const allEventsForFilter = await prisma.event.findMany({
      include: { promotion: true }
    });
    
    const sep15Events = allEventsForFilter.filter(event => {
      const date = new Date(event.date);
      return date.getMonth() === 8 && date.getDate() === 15; // September is month 8 (0-indexed)
    });
    
    console.log(`Found ${sep15Events.length} events for September 15:`, sep15Events.map(e => e.name));
    
    // Approach 3: Date range query
    console.log('\n3️⃣ Date range query (2023):');
    const dateRangeEvents2023 = await prisma.event.findMany({
      where: {
        date: {
          gte: new Date('2023-09-15T00:00:00Z'),
          lt: new Date('2023-09-16T00:00:00Z')
        }
      },
      include: { promotion: true }
    });
    console.log(`2023 Sep 15 events:`, dateRangeEvents2023.map(e => e.name));
    
    // Approach 4: Date range query (2024)
    console.log('\n4️⃣ Date range query (2024):');
    const dateRangeEvents2024 = await prisma.event.findMany({
      where: {
        date: {
          gte: new Date('2024-09-15T00:00:00Z'),
          lt: new Date('2024-09-16T00:00:00Z')
        }
      },
      include: { promotion: true }
    });
    console.log(`2024 Sep 15 events:`, dateRangeEvents2024.map(e => e.name));
    
  } catch (error) {
    console.error('❌ Debug failed:', error);
  }
}

debugDateQuery()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
