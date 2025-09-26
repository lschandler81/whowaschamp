import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import fs from 'fs';
import path from 'path';
export const runtime = 'nodejs';

/**
 * Transform database profile to simple format for client
 */
function transformProfile(dbProfile: any) {
  const promotions = dbProfile.promotions?.map((p: any) => p.promotion.name) || [];
  const era = dbProfile.wrestler?.era;
  const divisions = dbProfile.fighter?.divisions
    ? dbProfile.fighter.divisions.map((d: any) => d.divisionName || d.name).filter(Boolean)
    : [];

  return {
    id: dbProfile.id,
    slug: dbProfile.slug,
    name: dbProfile.name,
    nickname: dbProfile.nickname,
    type: dbProfile.type,
    hometown: dbProfile.hometown,
    tagline: dbProfile.tagline,
    promotions,
    // Flatten commonly-used fields for client filtering
    era,
    divisions,
    // Keep nested bits for potential future UI needs
    wrestler: dbProfile.wrestler
      ? {
          era: dbProfile.wrestler.era,
          worldTitleReigns: dbProfile.wrestler.worldTitleReigns || 0,
        }
      : undefined,
    fighter: dbProfile.fighter
      ? {
          divisions,
          wins: dbProfile.fighter.wins,
          losses: dbProfile.fighter.losses,
          draws: dbProfile.fighter.draws,
          stance: dbProfile.fighter.stance,
          reach: dbProfile.fighter.reach,
        }
      : undefined,
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
      // If DB looks complete, return it; otherwise consider JSON fallback
      if (dbProfiles.length >= 50) {
        console.log(`API: Loaded ${dbProfiles.length} profiles from database`);
        return NextResponse.json(dbProfiles.map(transformProfile));
      }
    }
  } catch (error) {
    console.warn('Database unavailable, trying JSON fallback:', error);
  }

  // Fallback to JSON file
  try {
    const jsonPath = path.join(process.cwd(), 'public', 'data', 'profiles.json');
    let profiles: any[] = [];
    if (fs.existsSync(jsonPath)) {
      const jsonData = fs.readFileSync(jsonPath, 'utf8');
      const parsed = JSON.parse(jsonData);
      profiles = Array.isArray(parsed) ? parsed : [];
      console.log(`API: Loaded ${profiles.length} profiles from JSON fallback (filesystem)`);
    } else {
      const baseUrl = process.env.URL || process.env.NETLIFY_URL || process.env.NEXT_PUBLIC_APP_URL;
      if (baseUrl) {
        const res = await fetch(`${baseUrl.replace(/\/$/, '')}/data/profiles.json`);
        if (res.ok) {
          const parsed = await res.json();
          profiles = Array.isArray(parsed) ? parsed : [];
          console.log(`API: Loaded ${profiles.length} profiles from JSON fallback (remote ${baseUrl})`);
        }
      }
    }

    if (profiles.length > 0) {
      return NextResponse.json(profiles);
    }
  } catch (error) {
    console.error('JSON fallback failed:', error);
  }

  console.error('No profiles available from database or JSON fallback');
  return NextResponse.json([]);
}
