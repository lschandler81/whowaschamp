import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/health
 * Health check endpoint for production monitoring
 * Returns system status including database connectivity and basic metrics
 */
export async function GET() {
  const startTime = Date.now();
  
  try {
    // Check database connectivity
    const dbStart = Date.now();
    const promotionCount = await prisma.promotion.count();
    const eventCount = await prisma.event.count();
    const dbResponseTime = Date.now() - dbStart;
    
    // Check recent data updates
    const recentEvents = await prisma.event.count({
      where: {
        updatedAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
        }
      }
    });
    
    // Basic system info
    const systemInfo = {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      nodeVersion: process.version,
      environment: process.env.NODE_ENV,
      features: {
        ppvFlashback: process.env.FEATURES_PPV_FLASHBACK === 'true',
        enhancedOnThisDay: process.env.FEATURES_ENHANCED_ON_THIS_DAY === 'true'
      }
    };
    
    // Database health metrics
    const databaseHealth = {
      status: 'healthy',
      responseTime: dbResponseTime,
      promotions: promotionCount,
      totalEvents: eventCount,
      recentUpdates: recentEvents,
      provider: process.env.DATABASE_PROVIDER || 'sqlite'
    };
    
    // Calculate overall response time
    const responseTime = Date.now() - startTime;
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      responseTime,
      system: systemInfo,
      database: databaseHealth,
      version: process.env.npm_package_version || 'unknown'
    });
    
  } catch (error) {
    console.error('Health check failed:', error);
    
    const responseTime = Date.now() - startTime;
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      responseTime,
      error: error instanceof Error ? error.message : 'Unknown error',
      system: {
        environment: process.env.NODE_ENV,
        nodeVersion: process.version
      }
    }, { status: 503 });
    
  } finally {
    await prisma.$disconnect();
  }
}

// Enable for all HTTP methods to support various health check tools
export async function HEAD() {
  try {
    // Quick database ping
    await prisma.$queryRaw`SELECT 1`;
    await prisma.$disconnect();
    
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    return new NextResponse(null, { status: 503 });
  }
}
