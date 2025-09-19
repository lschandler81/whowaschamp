import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

// Use explicit database path for Netlify functions
const databaseUrl = process.env.NETLIFY ? 'file:/opt/build/repo/dev.db' : process.env.DATABASE_URL || 'file:./dev.db';
const prisma = new PrismaClient({
  datasourceUrl: databaseUrl
});

/**
 * Transform database profile to simple format for client
 */
function transformProfile(dbProfile: any) {
  return {
    id: dbProfile.id,
    slug: dbProfile.slug,
    name: dbProfile.name,
    nickname: dbProfile.nickname,
    type: dbProfile.type,
    hometown: dbProfile.hometown,
    tagline: dbProfile.tagline,
    promotions: dbProfile.promotions?.map((p: any) => p.promotion.name) || [],
    wrestler: dbProfile.wrestler ? {
      era: dbProfile.wrestler.era,
      worldTitleReigns: dbProfile.wrestler.worldTitleReigns || 0
    } : undefined,
    fighter: dbProfile.fighter ? {
      division: dbProfile.fighter.divisions?.[0]?.name,
      wins: dbProfile.fighter.wins,
      losses: dbProfile.fighter.losses
    } : undefined
  };
}

export async function GET() {
  try {
    // Try database first
    const dbProfiles = await prisma.profile.findMany({
      include: {
        wrestler: true,
        fighter: {
          include: {
            divisions: true
          }
        },
        promotions: {
          include: {
            promotion: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    if (dbProfiles.length > 0) {
      console.log(`API: Loaded ${dbProfiles.length} profiles from database`);
      return NextResponse.json(dbProfiles.map(transformProfile));
    }
  } catch (error) {
    console.warn('Database unavailable, trying JSON fallback:', error);
  }

  // Fallback to JSON file
  try {
    const jsonPath = path.join(process.cwd(), 'public', 'data', 'profiles.json');
    
    if (fs.existsSync(jsonPath)) {
      const jsonData = fs.readFileSync(jsonPath, 'utf8');
      const profiles = JSON.parse(jsonData);
      console.log(`API: Loaded ${profiles.length} profiles from JSON fallback`);
      return NextResponse.json(profiles);
    }
  } catch (error) {
    console.error('JSON fallback failed:', error);
  }

  console.error('No profiles available from database or JSON fallback');
  return NextResponse.json([]);
}