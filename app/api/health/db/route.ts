import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET() {
  try {
    console.log('DB Health Check: Starting...');
    
    // Test database connection
    await prisma.$connect();
    console.log('DB Health Check: Connection successful');
    
    // Count events
    const eventCount = await prisma.event.count();
    console.log('DB Health Check: Found', eventCount, 'events');
    
    // Count PPV events
    const ppvEventCount = await prisma.event.count({
      where: { isPpv: true }
    });
    console.log('DB Health Check: Found', ppvEventCount, 'PPV events');
    
    // Count promotions
    const promotionCount = await prisma.promotion.count();
    console.log('DB Health Check: Found', promotionCount, 'promotions');
    
    // Get sample events
    const sampleEvents = await prisma.event.findMany({
      take: 3,
      include: {
        promotion: true
      },
      orderBy: { date: 'desc' }
    });
    
    return NextResponse.json({
      status: 'healthy',
      database: {
        connected: true,
        eventCount,
        ppvEventCount,
        promotionCount,
        sampleEvents: sampleEvents.map(e => ({
          id: e.id,
          name: e.name,
          date: e.date.toISOString().split('T')[0],
          promotion: e.promotion.name,
          isPpv: e.isPpv
        }))
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('DB Health Check: Error:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error instanceof Error ? error.stack : 'No stack trace',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}