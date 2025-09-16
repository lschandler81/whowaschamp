import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addFinalWWEEvents() {
  console.log('🎯 Adding final 7+ WWE events to reach 544 target...');
  
  // Get WWE promotion
  const wwePromotion = await prisma.promotion.findFirst({
    where: { slug: 'wwe' }
  });

  if (!wwePromotion) {
    console.error('❌ WWE promotion not found!');
    return;
  }

  const finalEvents = [
    // Additional historical events and specials
    { name: 'WWE Bragging Rights 2009', date: new Date('2009-10-25'), venue: 'Mellon Arena', city: 'Pittsburgh', country: 'USA', type: 'ppv' },
    { name: 'WWE Bragging Rights 2010', date: new Date('2010-10-24'), venue: 'Target Center', city: 'Minneapolis', country: 'USA', type: 'ppv' },
    { name: 'WWE Capitol Punishment 2011', date: new Date('2011-06-19'), venue: 'Verizon Center', city: 'Washington D.C.', country: 'USA', type: 'ppv' },
    { name: 'WWE Over the Limit 2010', date: new Date('2010-05-23'), venue: 'Joe Louis Arena', city: 'Detroit', country: 'USA', type: 'ppv' },
    { name: 'WWE Over the Limit 2011', date: new Date('2011-05-22'), venue: 'KeyArena', city: 'Seattle', country: 'USA', type: 'ppv' },
    { name: 'WWE Over the Limit 2012', date: new Date('2012-05-20'), venue: 'PNC Arena', city: 'Raleigh', country: 'USA', type: 'ppv' },
    { name: 'WWE Fatal 4-Way 2010', date: new Date('2010-06-20'), venue: 'Nassau Coliseum', city: 'Uniondale', country: 'USA', type: 'ppv' },
    { name: 'WWE The Bash 2009', date: new Date('2009-06-28'), venue: 'ARCO Arena', city: 'Sacramento', country: 'USA', type: 'ppv' },
    { name: 'WWE Breaking Point 2009', date: new Date('2009-09-13'), venue: 'Bell Centre', city: 'Montreal', country: 'Canada', type: 'ppv' },
    { name: 'WWE Cyber Sunday 2006', date: new Date('2006-11-05'), venue: 'U.S. Bank Arena', city: 'Cincinnati', country: 'USA', type: 'ppv' },
    
    // Add a few more if needed
    { name: 'WWE Taboo Tuesday 2005', date: new Date('2005-11-01'), venue: 'iPayOne Center', city: 'San Diego', country: 'USA', type: 'ppv' },
    { name: 'WWE New Year\'s Revolution 2005', date: new Date('2005-01-09'), venue: 'Coliseo de Puerto Rico', city: 'San Juan', country: 'Puerto Rico', type: 'ppv' },
    { name: 'WWE New Year\'s Revolution 2006', date: new Date('2006-01-08'), venue: 'Pepsi Center', city: 'Denver', country: 'USA', type: 'ppv' },
  ];

  let imported = 0;
  let skipped = 0;

  for (const event of finalEvents) {
    try {
      // Check if event already exists
      const existing = await prisma.event.findFirst({
        where: {
          name: event.name,
          promotionId: wwePromotion.id
        }
      });

      if (existing) {
        skipped++;
        continue;
      }

      // Create the event
      await prisma.event.create({
        data: {
          promotionId: wwePromotion.id,
          name: event.name,
          date: event.date,
          venue: event.venue,
          city: event.city,
          country: event.country,
          isPpv: true
        }
      });

      imported++;
      console.log(`✅ Added: ${event.name}`);

    } catch (error) {
      console.error(`❌ Error importing ${event.name}:`, error);
    }
  }

  // Get final count
  const totalWWEEvents = await prisma.event.count({
    where: {
      promotion: { slug: 'wwe' },
      isPpv: true
    }
  });

  console.log(`🎉 Final import complete! Added ${imported} new events, skipped ${skipped} existing events.`);
  console.log(`🏆 Final WWE event count in database: ${totalWWEEvents}`);
  
  if (totalWWEEvents >= 544) {
    console.log('🎯 TARGET REACHED! WWE database now contains 544+ events as requested.');
  } else {
    console.log(`⚠️  Still need ${544 - totalWWEEvents} more events to reach 544 target.`);
  }

  return totalWWEEvents;
}

async function main() {
  try {
    await addFinalWWEEvents();
  } catch (error) {
    console.error('❌ Error in main process:', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main();
}