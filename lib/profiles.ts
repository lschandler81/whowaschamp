import { Profile, WrestlerProfile, FighterProfile, ProfilesFilter } from '@/lib/types/profiles';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

/**
 * Convert name to URL-safe slug
 */
export function toProfileSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/['']/g, '') // Remove apostrophes
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

/**
 * Get profile URL from name
 */
export function getProfileUrl(name: string, type?: 'wrestler' | 'fighter'): string {
  const slug = toProfileSlug(name);
  return `/profiles/${slug}`;
}

/**
 * Convert database profile to our Profile type
 */
function transformDatabaseProfile(dbProfile: any): Profile {
  // Transform career highlights
  const careerHighlights = dbProfile.careerHighlights?.map((highlight: any) => ({
    id: highlight.id,
    title: highlight.title,
    description: highlight.description,
    date: highlight.date instanceof Date ? highlight.date.toISOString().split('T')[0] : highlight.date,
    category: highlight.category,
    importance: highlight.importance,
    venue: highlight.venue,
    opponent: highlight.opponent
  })) || [];

  // Transform rivalries
  const rivalries = dbProfile.rivalries?.map((rivalry: any) => ({
    id: rivalry.id,
    opponentId: rivalry.wrestler2Id || rivalry.wrestler1Id,
    opponentName: rivalry.opponentName,
    opponentSlug: rivalry.opponentSlug,
    rivalryName: rivalry.rivalryName,
    description: rivalry.description,
    notableMatches: rivalry.notableMatches,
    feudIntensity: rivalry.feudIntensity,
    startDate: rivalry.startDate instanceof Date ? rivalry.startDate.toISOString().split('T')[0] : rivalry.startDate,
    endDate: rivalry.endDate instanceof Date ? rivalry.endDate.toISOString().split('T')[0] : rivalry.endDate
  })) || [];

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
    bio: dbProfile.bio || '',
    careerHighlights,
    rivalries
  };

  if (dbProfile.type === 'wrestler' && dbProfile.wrestler) {
    return {
      ...baseProfile,
      type: 'wrestler',
      finisher: dbProfile.wrestler.finisher,
      era: dbProfile.wrestler.era,
      worldTitleReigns: dbProfile.wrestler.worldTitleReigns,
      combinedDaysAsChampion: dbProfile.wrestler.combinedDaysAsChampion,
      firstReign: dbProfile.wrestler.firstReignDate?.toISOString().split('T')[0],
      lastReign: dbProfile.wrestler.lastReignDate?.toISOString().split('T')[0]
    } as WrestlerProfile;
  } else if (dbProfile.type === 'fighter' && dbProfile.fighter) {
    return {
      ...baseProfile,
      type: 'fighter',
      divisions: dbProfile.fighter.divisions?.map((d: any) => d.divisionName) || [],
      record: {
        wins: dbProfile.fighter.wins,
        losses: dbProfile.fighter.losses,
        draws: dbProfile.fighter.draws > 0 ? dbProfile.fighter.draws : undefined
      },
      stance: dbProfile.fighter.stance,
      reach: dbProfile.fighter.reach,
      titleReigns: dbProfile.fighter.titleReigns
    } as FighterProfile;
  }

  return baseProfile as Profile;
}

/**
 * Get all profiles from database with JSON fallback
 */
export async function getAllProfiles(): Promise<Profile[]> {
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
      console.log(`Loaded ${dbProfiles.length} profiles from database`);
      return dbProfiles.map(transformDatabaseProfile);
    }
  } catch (error) {
    console.warn('Database unavailable, trying JSON fallback:', error);
  }

  // Fallback to JSON file
  try {
    const jsonPath = path.join(process.cwd(), 'public', 'data', 'profiles.json');
    
    if (fs.existsSync(jsonPath)) {
      const jsonData = fs.readFileSync(jsonPath, 'utf8');
      const profiles = JSON.parse(jsonData) as Profile[];
      console.log(`Loaded ${profiles.length} profiles from JSON fallback`);
      return profiles;
    }
  } catch (error) {
    console.error('JSON fallback failed:', error);
  }

  console.error('No profiles available from database or JSON fallback');
  return [];
}

/**
 * Filter profiles based on search and filters
 */
export function filterProfiles(profiles: Profile[], filters: Partial<ProfilesFilter>): Profile[] {
  return profiles.filter(profile => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesName = profile.name.toLowerCase().includes(searchLower);
      const matchesNickname = profile.nickname?.toLowerCase().includes(searchLower);
      const matchesPromotion = profile.promotions.some(p => p.toLowerCase().includes(searchLower));
      
      if (!matchesName && !matchesNickname && !matchesPromotion) {
        return false;
      }
    }

    // Type filter
    if (filters.type && filters.type !== 'all' && profile.type !== filters.type) {
      return false;
    }

    // Promotions filter
    if (filters.promotions && filters.promotions.length > 0) {
      const hasMatchingPromotion = profile.promotions.some(p => 
        filters.promotions!.includes(p)
      );
      if (!hasMatchingPromotion) {
        return false;
      }
    }

    // Era filter (wrestlers only)
    if (filters.eras && filters.eras.length > 0 && profile.type === 'wrestler') {
      const wrestler = profile as WrestlerProfile;
      if (!wrestler.era || !filters.eras.includes(wrestler.era)) {
        return false;
      }
    }

    // Divisions filter (fighters only)
    if (filters.divisions && filters.divisions.length > 0 && profile.type === 'fighter') {
      const fighter = profile as FighterProfile;
      const hasMatchingDivision = fighter.divisions.some(d => 
        filters.divisions!.includes(d)
      );
      if (!hasMatchingDivision) {
        return false;
      }
    }

    // Active years filter
    if (filters.activeYears) {
      const [minYear, maxYear] = filters.activeYears;
      const profileStart = profile.activeYears.start;
      const profileEnd = profile.activeYears.end || new Date().getFullYear();
      
      // Check if there's any overlap
      if (profileEnd < minYear || profileStart > maxYear) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Get profile by slug from database with JSON fallback
 */
export async function getProfileBySlug(slug: string): Promise<Profile | null> {
  try {
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
        }
      }
    });

    if (dbProfile) {
      // Get career highlights and rivalries separately 
      const careerHighlights = await prisma.$queryRaw`
        SELECT * FROM career_highlights 
        WHERE profileId = ${dbProfile.id} 
        ORDER BY importance DESC, date DESC
      ` as any[];

      const rivalries1 = await prisma.$queryRaw`
        SELECT r.*, p.name as opponentName, p.slug as opponentSlug
        FROM rivalries r
        JOIN profiles p ON r.wrestler2Id = p.id
        WHERE r.wrestler1Id = ${dbProfile.id}
      ` as any[];

      const rivalries2 = await prisma.$queryRaw`
        SELECT r.*, p.name as opponentName, p.slug as opponentSlug
        FROM rivalries r
        JOIN profiles p ON r.wrestler1Id = p.id
        WHERE r.wrestler2Id = ${dbProfile.id}
      ` as any[];

      const allRivalries = [...rivalries1, ...rivalries2];

      return transformDatabaseProfile({
        ...dbProfile,
        careerHighlights,
        rivalries: allRivalries
      });
    }
  } catch (error) {
    console.warn(`Database unavailable for profile ${slug}, trying JSON fallback:`, error);
  }

  // Fallback to JSON file
  try {
    const jsonPath = path.join(process.cwd(), 'public', 'data', 'profiles.json');
    
    if (fs.existsSync(jsonPath)) {
      const jsonData = fs.readFileSync(jsonPath, 'utf8');
      const profiles = JSON.parse(jsonData) as Profile[];
      const profile = profiles.find(p => p.slug === slug);
      
      if (profile) {
        console.log(`Found profile ${slug} in JSON fallback`);
        return profile;
      }
    }
  } catch (error) {
    console.error(`JSON fallback failed for profile ${slug}:`, error);
  }

  console.error(`Profile ${slug} not found in database or JSON fallback`);
  return null;
}