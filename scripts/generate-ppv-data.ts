import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

interface StaticPPVEvent {
  id: string;
  name: string;
  date: string;
  promotion: string;
  venue?: string;
  city?: string;
  country?: string;
  attendance?: number;
  buyrate?: number;
  headliners: string[];
  titleChanges: string[];
  yearsAgo: number;
}

interface StaticPPVData {
  [weekNumber: string]: {
    event: StaticPPVEvent | null;
    alternativeEvents: Array<{
      name: string;
      promotion: string;
      date: string;
      attendance?: number;
      buyrate?: number;
    }>;
    totalEvents: number;
  };
}

// ISO week calculation (matching your existing lib)
function getISOWeekNumber(date: Date): number {
  const tempDate = new Date(date.getTime());
  tempDate.setHours(0, 0, 0, 0);
  tempDate.setDate(tempDate.getDate() + 3 - (tempDate.getDay() + 6) % 7);
  const week1 = new Date(tempDate.getFullYear(), 0, 4);
  return 1 + Math.round(((tempDate.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

async function generateStaticPPVData() {
  try {
    console.log('🚀 Generating static PPV data...');
    
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Get all PPV events from database
    const allPPVEvents = await prisma.event.findMany({
      where: { isPpv: true },
      include: {
        promotion: true,
        headliners: { orderBy: { side: 'asc' } },
        titleChanges: { where: { changedHands: true } }
      },
      orderBy: { date: 'desc' }
    });

    console.log(`📊 Found ${allPPVEvents.length} PPV events in database`);

    const staticData: StaticPPVData = {};
    const now = new Date();

    // Process each ISO week (1-53)
    for (let week = 1; week <= 53; week++) {
      // Filter events for this ISO week across all years
      const weekEvents = allPPVEvents.filter(event => {
        const eventDate = new Date(event.date);
        return getISOWeekNumber(eventDate) === week;
      });

      if (weekEvents.length === 0) {
        staticData[week] = {
          event: null,
          alternativeEvents: [],
          totalEvents: 0
        };
        continue;
      }

      // Sort by biggest: attendance > buyrate > recency
      const sortedEvents = weekEvents.sort((a, b) => {
        const attendanceA = a.attendance || 0;
        const attendanceB = b.attendance || 0;
        if (attendanceA !== attendanceB) return attendanceB - attendanceA;

        const buyrateA = a.buyrate || 0;
        const buyrateB = b.buyrate || 0;
        if (buyrateA !== buyrateB) return buyrateB - buyrateA;

        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      const selectedEvent = sortedEvents[0];
      const eventDate = new Date(selectedEvent.date);
      const yearsAgo = Math.floor((now.getTime() - eventDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

      // Create static event data
      const staticEvent: StaticPPVEvent = {
        id: selectedEvent.id,
        name: selectedEvent.name,
        date: selectedEvent.date.toISOString().split('T')[0],
        promotion: selectedEvent.promotion.name,
        venue: selectedEvent.venue || undefined,
        city: selectedEvent.city || undefined,
        country: selectedEvent.country || undefined,
        attendance: selectedEvent.attendance || undefined,
        buyrate: selectedEvent.buyrate || undefined,
        headliners: selectedEvent.headliners.map(h => h.name),
        titleChanges: selectedEvent.titleChanges
          .filter(tc => tc.newChampion && tc.oldChampion)
          .map(tc => `${tc.titleName}: ${tc.newChampion} defeats ${tc.oldChampion}`),
        yearsAgo
      };

      // Alternative events (up to 3)
      const alternativeEvents = sortedEvents.slice(1, 4).map(e => ({
        name: e.name,
        promotion: e.promotion.name,
        date: e.date.toISOString().split('T')[0],
        attendance: e.attendance || undefined,
        buyrate: e.buyrate || undefined
      }));

      staticData[week] = {
        event: staticEvent,
        alternativeEvents,
        totalEvents: weekEvents.length
      };

      console.log(`✅ Week ${week}: ${selectedEvent.name} (${selectedEvent.promotion.name})`);
    }

    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'public', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Write static data
    const outputPath = path.join(dataDir, 'ppv-flashback.json');
    fs.writeFileSync(outputPath, JSON.stringify(staticData, null, 2));

    // Generate summary
    const summary = {
      generatedAt: now.toISOString(),
      totalWeeks: 53,
      weeksWithEvents: Object.values(staticData).filter(week => week.event !== null).length,
      totalPPVEvents: allPPVEvents.length,
      sampleEvents: Object.entries(staticData)
        .filter(([_, data]) => data.event !== null)
        .slice(0, 5)
        .map(([week, data]) => ({
          week: parseInt(week),
          name: data.event!.name,
          promotion: data.event!.promotion,
          date: data.event!.date
        }))
    };

    const summaryPath = path.join(dataDir, 'ppv-flashback-summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));

    console.log(`🎉 Static PPV data generated successfully!`);
    console.log(`📁 Output: ${outputPath}`);
    console.log(`📊 Summary: ${summary.weeksWithEvents}/${summary.totalWeeks} weeks have PPV events`);
    console.log(`📋 Summary file: ${summaryPath}`);

  } catch (error) {
    console.error('❌ Error generating static PPV data:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  generateStaticPPVData();
}

export { generateStaticPPVData };