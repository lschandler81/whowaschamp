#!/usr/bin/env node
/**
 * Import comprehensive Wikipedia UFC and WWE events into database
 * This script takes the scraped Wikipedia data and imports it into the database
 */

import { PrismaClient } from '@prisma/client';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const prisma = new PrismaClient();

async function importUFCEvents() {
  console.log('🥊 Importing UFC events from Wikipedia data...');
  
  const ufcDataPath = path.join(process.cwd(), 'public', 'data', 'ufc_events.json');
  const ufcData = JSON.parse(await fs.readFile(ufcDataPath, 'utf-8'));
  
  console.log(`Found ${ufcData.length} UFC events to import`);
  
  // Ensure UFC promotion exists
  const ufcPromotion = await prisma.promotion.upsert({
    where: { slug: 'ufc' },
    update: {},
    create: {
      slug: 'ufc',
      name: 'Ultimate Fighting Championship',
    },
  });

  let importedCount = 0;
  let skippedCount = 0;

  for (const event of ufcData) {
    try {
      // Parse the event date
      const eventDate = new Date(event.date);
      if (isNaN(eventDate.getTime())) {
        console.warn(`⚠️ Invalid date for event: ${event.name} (${event.date})`);
        skippedCount++;
        continue;
      }

      // Determine if it's a PPV (UFC numbered events are typically PPVs)
      const isPpv = /^UFC \d+/.test(event.name) || event.name.includes('UFC Fight Night') === false;

      // Check if event already exists
      const existingEvent = await prisma.event.findFirst({
        where: {
          name: event.name,
          date: eventDate,
          promotionId: ufcPromotion.id,
        }
      });

      if (existingEvent) {
        skippedCount++;
        continue;
      }

      // Create new event
      await prisma.event.create({
        data: {
          promotionId: ufcPromotion.id,
          name: event.name,
          date: eventDate,
          venue: event.venue || null,
          city: event.city || null,
          country: event.country || 'USA',
          attendance: event.attendance ? parseInt(event.attendance.toString()) : null,
          isPpv: isPpv,
        },
      });

      importedCount++;
      
      if (importedCount % 50 === 0) {
        console.log(`📈 Processed ${importedCount} UFC events...`);
      }

    } catch (error) {
      console.error(`❌ Error importing UFC event "${event.name}":`, error);
      skippedCount++;
    }
  }

  console.log(`✅ UFC import complete: ${importedCount} imported, ${skippedCount} skipped`);
  return importedCount;
}

async function createWWEEvents() {
  console.log('🤼 Creating comprehensive WWE events dataset...');
  
  // Ensure WWE promotion exists
  const wwePromotion = await prisma.promotion.upsert({
    where: { slug: 'wwe' },
    update: {},
    create: {
      slug: 'wwe',
      name: 'World Wrestling Entertainment',
    },
  });

  // Comprehensive WWE events from major eras (this would ideally come from Wikipedia scraping)
  const wweEvents = [
    // Big Four PPVs - WrestleMania
    { name: 'WrestleMania', date: '1985-03-31', venue: 'Madison Square Garden', city: 'New York', isPpv: true },
    { name: 'WrestleMania 2', date: '1986-04-07', venue: 'Nassau Veterans Memorial Coliseum', city: 'Uniondale', isPpv: true },
    { name: 'WrestleMania III', date: '1987-03-29', venue: 'Pontiac Silverdome', city: 'Pontiac', isPpv: true },
    { name: 'WrestleMania IV', date: '1988-03-27', venue: 'Trump Plaza', city: 'Atlantic City', isPpv: true },
    { name: 'WrestleMania V', date: '1989-04-02', venue: 'Trump Plaza', city: 'Atlantic City', isPpv: true },
    { name: 'WrestleMania VI', date: '1990-04-01', venue: 'SkyDome', city: 'Toronto', isPpv: true },
    { name: 'WrestleMania VII', date: '1991-03-24', venue: 'Los Angeles Memorial Sports Arena', city: 'Los Angeles', isPpv: true },
    { name: 'WrestleMania VIII', date: '1992-04-05', venue: 'Hoosier Dome', city: 'Indianapolis', isPpv: true },
    { name: 'WrestleMania IX', date: '1993-04-04', venue: 'Caesar\'s Palace', city: 'Las Vegas', isPpv: true },
    { name: 'WrestleMania X', date: '1994-03-20', venue: 'Madison Square Garden', city: 'New York', isPpv: true },
    { name: 'WrestleMania XI', date: '1995-04-02', venue: 'Hartford Civic Center', city: 'Hartford', isPpv: true },
    { name: 'WrestleMania XII', date: '1996-03-31', venue: 'Arrowhead Pond', city: 'Anaheim', isPpv: true },
    { name: 'WrestleMania 13', date: '1997-03-23', venue: 'Rosemont Horizon', city: 'Rosemont', isPpv: true },
    { name: 'WrestleMania XIV', date: '1998-03-29', venue: 'FleetCenter', city: 'Boston', isPpv: true },
    { name: 'WrestleMania XV', date: '1999-03-28', venue: 'First Union Center', city: 'Philadelphia', isPpv: true },
    { name: 'WrestleMania 2000', date: '2000-04-02', venue: 'Arrowhead Pond', city: 'Anaheim', isPpv: true },
    { name: 'WrestleMania X-Seven', date: '2001-04-01', venue: 'Astrodome', city: 'Houston', isPpv: true },
    { name: 'WrestleMania X8', date: '2002-03-17', venue: 'SkyDome', city: 'Toronto', isPpv: true },
    { name: 'WrestleMania XIX', date: '2003-03-30', venue: 'Safeco Field', city: 'Seattle', isPpv: true },
    { name: 'WrestleMania XX', date: '2004-03-14', venue: 'Madison Square Garden', city: 'New York', isPpv: true },
    { name: 'WrestleMania 21', date: '2005-04-03', venue: 'Staples Center', city: 'Los Angeles', isPpv: true },
    { name: 'WrestleMania 22', date: '2006-04-02', venue: 'Allstate Arena', city: 'Rosemont', isPpv: true },
    { name: 'WrestleMania 23', date: '2007-04-01', venue: 'Ford Field', city: 'Detroit', isPpv: true },
    { name: 'WrestleMania XXIV', date: '2008-03-30', venue: 'Citrus Bowl', city: 'Orlando', isPpv: true },
    { name: 'WrestleMania 25', date: '2009-04-05', venue: 'Reliant Stadium', city: 'Houston', isPpv: true },
    { name: 'WrestleMania XXVI', date: '2010-03-28', venue: 'University of Phoenix Stadium', city: 'Glendale', isPpv: true },
    { name: 'WrestleMania XXVII', date: '2011-04-03', venue: 'Georgia Dome', city: 'Atlanta', isPpv: true },
    { name: 'WrestleMania XXVIII', date: '2012-04-01', venue: 'Sun Life Stadium', city: 'Miami Gardens', isPpv: true },
    { name: 'WrestleMania 29', date: '2013-04-07', venue: 'MetLife Stadium', city: 'East Rutherford', isPpv: true },
    { name: 'WrestleMania 30', date: '2014-04-06', venue: 'Mercedes-Benz Superdome', city: 'New Orleans', isPpv: true },
    { name: 'WrestleMania 31', date: '2015-03-29', venue: 'Levi\'s Stadium', city: 'Santa Clara', isPpv: true },
    { name: 'WrestleMania 32', date: '2016-04-03', venue: 'AT&T Stadium', city: 'Arlington', isPpv: true },
    { name: 'WrestleMania 33', date: '2017-04-02', venue: 'Camping World Stadium', city: 'Orlando', isPpv: true },
    { name: 'WrestleMania 34', date: '2018-04-08', venue: 'Mercedes-Benz Superdome', city: 'New Orleans', isPpv: true },
    { name: 'WrestleMania 35', date: '2019-04-07', venue: 'MetLife Stadium', city: 'East Rutherford', isPpv: true },
    { name: 'WrestleMania 36', date: '2020-04-04', venue: 'WWE Performance Center', city: 'Orlando', isPpv: true },
    { name: 'WrestleMania 37', date: '2021-04-10', venue: 'Raymond James Stadium', city: 'Tampa', isPpv: true },
    { name: 'WrestleMania 38', date: '2022-04-02', venue: 'AT&T Stadium', city: 'Arlington', isPpv: true },
    { name: 'WrestleMania 39', date: '2023-04-01', venue: 'SoFi Stadium', city: 'Inglewood', isPpv: true },
    { name: 'WrestleMania XL', date: '2024-04-06', venue: 'Lincoln Financial Field', city: 'Philadelphia', isPpv: true },

    // Royal Rumble
    { name: 'Royal Rumble (1988)', date: '1988-01-24', venue: 'Copps Coliseum', city: 'Hamilton', isPpv: true },
    { name: 'Royal Rumble (1989)', date: '1989-01-15', venue: 'The Summit', city: 'Houston', isPpv: true },
    { name: 'Royal Rumble (1990)', date: '1990-01-21', venue: 'Orlando Arena', city: 'Orlando', isPpv: true },
    { name: 'Royal Rumble (1991)', date: '1991-01-19', venue: 'Miami Arena', city: 'Miami', isPpv: true },
    { name: 'Royal Rumble (1992)', date: '1992-01-19', venue: 'Knickerbocker Arena', city: 'Albany', isPpv: true },
    { name: 'Royal Rumble (1993)', date: '1993-01-24', venue: 'ARCO Arena', city: 'Sacramento', isPpv: true },
    { name: 'Royal Rumble (1994)', date: '1994-01-22', venue: 'Providence Civic Center', city: 'Providence', isPpv: true },
    { name: 'Royal Rumble (1995)', date: '1995-01-22', venue: 'USF Sun Dome', city: 'Tampa', isPpv: true },
    { name: 'Royal Rumble (1996)', date: '1996-01-21', venue: 'Selland Arena', city: 'Fresno', isPpv: true },
    { name: 'Royal Rumble (1997)', date: '1997-01-19', venue: 'Alamodome', city: 'San Antonio', isPpv: true },
    { name: 'Royal Rumble (1998)', date: '1998-01-18', venue: 'San Jose Arena', city: 'San Jose', isPpv: true },
    { name: 'Royal Rumble (1999)', date: '1999-01-24', venue: 'Arrowhead Pond', city: 'Anaheim', isPpv: true },
    { name: 'Royal Rumble (2000)', date: '2000-01-23', venue: 'Madison Square Garden', city: 'New York', isPpv: true },
    { name: 'Royal Rumble (2024)', date: '2024-01-27', venue: 'Lucas Oil Stadium', city: 'Indianapolis', isPpv: true },

    // SummerSlam
    { name: 'The Main Event', date: '1988-02-05', venue: 'Market Square Arena', city: 'Indianapolis', isPpv: true },
    { name: 'SummerSlam (1988)', date: '1988-08-29', venue: 'Madison Square Garden', city: 'New York', isPpv: true },
    { name: 'SummerSlam (1989)', date: '1989-08-28', venue: 'Meadowlands Arena', city: 'East Rutherford', isPpv: true },
    { name: 'SummerSlam (1990)', date: '1990-08-27', venue: 'The Spectrum', city: 'Philadelphia', isPpv: true },
    { name: 'SummerSlam (1991)', date: '1991-08-26', venue: 'Madison Square Garden', city: 'New York', isPpv: true },
    { name: 'SummerSlam (1992)', date: '1992-08-29', venue: 'Wembley Stadium', city: 'London', isPpv: true },
    { name: 'SummerSlam (2023)', date: '2023-08-05', venue: 'Ford Field', city: 'Detroit', isPpv: true },
    { name: 'SummerSlam (2024)', date: '2024-08-03', venue: 'Cleveland Browns Stadium', city: 'Cleveland', isPpv: true },

    // Survivor Series
    { name: 'Survivor Series (1987)', date: '1987-11-26', venue: 'Richfield Coliseum', city: 'Richfield', isPpv: true },
    { name: 'Survivor Series (1988)', date: '1988-11-24', venue: 'Richfield Coliseum', city: 'Richfield', isPpv: true },
    { name: 'Survivor Series (1989)', date: '1989-11-23', venue: 'Rosemont Horizon', city: 'Rosemont', isPpv: true },
    { name: 'Survivor Series (1990)', date: '1990-11-22', venue: 'Hartford Civic Center', city: 'Hartford', isPpv: true },
    { name: 'Survivor Series (1991)', date: '1991-11-27', venue: 'Joe Louis Arena', city: 'Detroit', isPpv: true },
    { name: 'Survivor Series (1998)', date: '1998-11-15', venue: 'Kiel Center', city: 'St. Louis', isPpv: true },
    { name: 'Survivor Series (2023)', date: '2023-11-25', venue: 'Allstate Arena', city: 'Rosemont', isPpv: true },

    // Modern era events
    { name: 'Money in the Bank (2010)', date: '2010-07-18', venue: 'Sprint Center', city: 'Kansas City', isPpv: true },
    { name: 'Money in the Bank (2024)', date: '2024-07-06', venue: 'Scotiabank Arena', city: 'Toronto', isPpv: true },
    { name: 'Hell in a Cell (2009)', date: '2009-10-04', venue: 'Prudential Center', city: 'Newark', isPpv: true },
    { name: 'TLC: Tables, Ladders & Chairs (2009)', date: '2009-12-13', venue: 'AT&T Center', city: 'San Antonio', isPpv: true },
    { name: 'Elimination Chamber (2010)', date: '2010-02-21', venue: 'Scottrade Center', city: 'St. Louis', isPpv: true },
  ];

  let importedCount = 0;
  let skippedCount = 0;

  for (const event of wweEvents) {
    try {
      const eventDate = new Date(event.date);
      
      // Check if event already exists
      const existingEvent = await prisma.event.findFirst({
        where: {
          name: event.name,
          date: eventDate,
          promotionId: wwePromotion.id,
        }
      });

      if (existingEvent) {
        skippedCount++;
        continue;
      }

      // Create new event
      await prisma.event.create({
        data: {
          promotionId: wwePromotion.id,
          name: event.name,
          date: eventDate,
          venue: event.venue,
          city: event.city,
          country: 'USA',
          isPpv: event.isPpv,
        },
      });

      importedCount++;
      
    } catch (error) {
      console.error(`❌ Error importing WWE event "${event.name}":`, error);
      skippedCount++;
    }
  }

  console.log(`✅ WWE import complete: ${importedCount} imported, ${skippedCount} skipped`);
  return importedCount;
}

async function main() {
  try {
    console.log('🚀 Starting comprehensive Wikipedia data import...\n');

    const ufcCount = await importUFCEvents();
    const wweCount = await createWWEEvents();

    // Get final stats
    const stats = await prisma.event.groupBy({
      by: ['promotionId'],
      _count: { id: true }
    });

    const promotions = await prisma.promotion.findMany();
    const promotionMap = Object.fromEntries(
      promotions.map(p => [p.id, p.slug])
    );

    console.log('\n📊 Final Database Statistics:');
    for (const stat of stats) {
      const promotionSlug = promotionMap[stat.promotionId];
      console.log(`  • ${promotionSlug?.toUpperCase()}: ${stat._count.id} events`);
    }

    const totalEvents = await prisma.event.count();
    const ppvEvents = await prisma.event.count({ where: { isPpv: true } });
    
    console.log(`  • Total Events: ${totalEvents}`);
    console.log(`  • PPV Events: ${ppvEvents}`);

    console.log('\n🎉 Comprehensive data import completed successfully!');

  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}