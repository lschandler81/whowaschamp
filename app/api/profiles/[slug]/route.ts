import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import fs from 'fs';
import path from 'path';
export const runtime = 'nodejs';

/**
 * Convert database profile to our Profile type
 */
function transformProfile(dbProfile: any) {
  const baseProfile = {
    id: dbProfile.id,
    slug: dbProfile.slug,
    name: dbProfile.name,
    nickname: dbProfile.nickname,
    type: dbProfile.type as 'wrestler' | 'fighter',
    thumbnail: dbProfile.thumbnail,
    tagline: dbProfile.tagline,
    promotions: dbProfile.promotions?.map((p: any) => p.promotion.name) || [],
    activeYears: {
      start: dbProfile.debut ? new Date(dbProfile.debut).getFullYear() : 1980,
      end: dbProfile.retired ? new Date(dbProfile.retired).getFullYear() : undefined
    },
    hometown: dbProfile.hometown || '',
    nationality: dbProfile.nationality || '',
    height: dbProfile.height || '',
    weight: dbProfile.weight || '',
    debut: dbProfile.debut ? dbProfile.debut.toISOString().split('T')[0] : undefined,
    retired: dbProfile.retired ? dbProfile.retired.toISOString().split('T')[0] : undefined,
    bio: dbProfile.bio || '',
    
    // Championships
    championships: dbProfile.championships?.map((champ: any) => ({
      id: champ.id,
      title: champ.title,
      promotion: champ.promotion.name,
      wonDate: champ.wonDate ? champ.wonDate.toISOString().split('T')[0] : '',
      lostDate: champ.lostDate ? champ.lostDate.toISOString().split('T')[0] : null,
      daysHeld: champ.daysHeld || 0,
      defenses: champ.defenses || 0
    })) || [],

    // Career Highlights
    careerHighlights: dbProfile.careerHighlights?.map((highlight: any) => ({
      id: highlight.id,
      title: highlight.title,
      description: highlight.description,
      date: highlight.date ? highlight.date.toISOString().split('T')[0] : null,
      category: highlight.category,
      importance: highlight.importance,
      venue: highlight.venue,
      opponent: highlight.opponent
    })) || [],

    // Rivalries (combine both relationships)
    rivalries: [
      ...(dbProfile.rivalriesAsWrestler1?.map((rivalry: any) => ({
        id: rivalry.id,
        rivalryName: rivalry.rivalryName,
        description: rivalry.description,
        notableMatches: rivalry.notableMatches,
        feudIntensity: rivalry.feudIntensity,
        startDate: rivalry.startDate ? rivalry.startDate.toISOString().split('T')[0] : null,
        endDate: rivalry.endDate ? rivalry.endDate.toISOString().split('T')[0] : null,
        opponent: {
          id: rivalry.wrestler2.id,
          slug: rivalry.wrestler2.slug,
          name: rivalry.wrestler2.name,
          thumbnail: rivalry.wrestler2.thumbnail
        }
      })) || []),
      ...(dbProfile.rivalriesAsWrestler2?.map((rivalry: any) => ({
        id: rivalry.id,
        rivalryName: rivalry.rivalryName,
        description: rivalry.description,
        notableMatches: rivalry.notableMatches,
        feudIntensity: rivalry.feudIntensity,
        startDate: rivalry.startDate ? rivalry.startDate.toISOString().split('T')[0] : null,
        endDate: rivalry.endDate ? rivalry.endDate.toISOString().split('T')[0] : null,
        opponent: {
          id: rivalry.wrestler1.id,
          slug: rivalry.wrestler1.slug,
          name: rivalry.wrestler1.name,
          thumbnail: rivalry.wrestler1.thumbnail
        }
      })) || [])
    ]
  };

  // Add type-specific data
  if (dbProfile.type === 'wrestler' && dbProfile.wrestler) {
    return {
      ...baseProfile,
      finisher: dbProfile.wrestler.finisher,
      signature: dbProfile.wrestler.signature,
      worldTitleReigns: dbProfile.wrestler.worldTitleReigns || 0,
      totalTitleReigns: dbProfile.wrestler.totalTitleReigns || 0,
      longestReign: dbProfile.wrestler.longestReign || 0,
      era: dbProfile.wrestler.era,
      accolades: dbProfile.wrestler.accolades || []
    };
  } else if (dbProfile.type === 'fighter' && dbProfile.fighter) {
    return {
      ...baseProfile,
      wins: dbProfile.fighter.wins || 0,
      losses: dbProfile.fighter.losses || 0,
      draws: dbProfile.fighter.draws || 0,
      titleDefenses: dbProfile.fighter.titleDefenses || 0,
      divisions: dbProfile.fighter.divisions?.map((d: any) => d.name) || [],
      reach: dbProfile.fighter.reach,
      stance: dbProfile.fighter.stance
    };
  }

  return baseProfile;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  try {
    // Try database first
    const dbProfile = await prisma.profile.findUnique({
      where: { slug },
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
        },
        championships: {
          include: {
            promotion: true
          },
          orderBy: {
            wonDate: 'asc'
          }
        },
        careerHighlights: {
          orderBy: [
            { importance: 'desc' },
            { date: 'asc' }
          ]
        },
        rivalriesAsWrestler1: {
          include: {
            wrestler2: {
              select: {
                id: true,
                slug: true,
                name: true,
                thumbnail: true
              }
            }
          }
        },
        rivalriesAsWrestler2: {
          include: {
            wrestler1: {
              select: {
                id: true,
                slug: true,
                name: true,
                thumbnail: true
              }
            }
          }
        }
      } as any
    });

    if (dbProfile) {
      const profile = transformProfile(dbProfile);
      return NextResponse.json(profile);
    }

    // Fallback to JSON file
    const profilesPath = path.join(process.cwd(), 'public', 'data', 'profiles.json');
    if (fs.existsSync(profilesPath)) {
      const profilesData = fs.readFileSync(profilesPath, 'utf8');
      const profiles = JSON.parse(profilesData);
      const profile = profiles.find((p: any) => p.slug === slug);
      
      if (profile) {
        return NextResponse.json(profile);
      }
    }

    return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
