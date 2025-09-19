import { NextResponse } from 'next/server';
import { getAllProfiles } from '@/lib/profiles';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';

export async function GET() {
  try {
    console.log('API: Testing database configuration...');
    
    // Check database file existence
    const dbPath = './dev.db';
    const dbExists = fs.existsSync(dbPath);
    console.log(`API: Database file exists at ${dbPath}: ${dbExists}`);
    
    if (dbExists) {
      const stats = fs.statSync(dbPath);
      console.log(`API: Database file size: ${stats.size} bytes`);
    }
    
    // Try to connect to database directly
    // Use explicit database path for Netlify functions
    const databaseUrl = process.env.NETLIFY ? 'file:/opt/build/repo/dev.db' : process.env.DATABASE_URL || 'file:./dev.db';
    const prisma = new PrismaClient({
      datasourceUrl: databaseUrl
    });
    console.log('API: Testing Prisma connection...');
    
    try {
      const profileCount = await prisma.profile.count();
      console.log(`API: Direct Prisma count: ${profileCount} profiles`);
    } catch (prismaError) {
      console.error('API: Prisma error:', prismaError);
    }
    
    // Test getAllProfiles function
    console.log('API: Testing getAllProfiles function...');
    const profiles = await getAllProfiles();
    console.log(`API: getAllProfiles returned ${profiles.length} profiles`);
    
    return NextResponse.json({
      databaseExists: dbExists,
      databaseSize: dbExists ? fs.statSync(dbPath).size : 0,
      directCount: await prisma.profile.count().catch(() => 0),
      getAllProfilesCount: profiles.length,
      environment: process.env.NODE_ENV,
      databaseUrl: process.env.DATABASE_URL,
      sampleProfiles: profiles.slice(0, 3).map(p => ({ 
        name: p.name, 
        type: p.type, 
        slug: p.slug 
      }))
    });
  } catch (error) {
    console.error('API: Error in debug endpoint:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch profiles',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}