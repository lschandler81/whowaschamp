const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function test() {
  const count = await prisma.event.count();
  console.log('Events in DB:', count);
  
  const events = await prisma.event.findMany({
    include: { promotion: true }
  });
  
  console.log('Events:');
  events.forEach(event => {
    console.log(`- ${event.name} (${event.promotion.name}) - ${event.date.toISOString().split('T')[0]}`);
  });
  
  await prisma.$disconnect();
}

test().catch(console.error);
