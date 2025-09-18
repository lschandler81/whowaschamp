import { Profile, WrestlerProfile, FighterProfile, ProfilesFilter } from '@/lib/types/profiles';

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
 * Mock data for development - replace with database queries
 */
export function getMockProfiles(): Profile[] {
  const wrestlers: WrestlerProfile[] = [
    {
      id: '1',
      slug: 'john-cena',
      name: 'John Cena',
      nickname: 'The Cenation Leader',
      type: 'wrestler',
      thumbnail: undefined,
      tagline: '16-time World Champion',
      promotions: ['WWE'],
      activeYears: { start: 2002, end: 2022 },
      hometown: 'West Newbury, Massachusetts',
      nationality: 'USA',
      height: '6\'1"',
      weight: '251 lbs',
      debut: '2002-06-27',
      bio: 'John Felix Anthony Cena Jr. is an American professional wrestler, actor, and former rapper currently signed to WWE.',
      finisher: 'Attitude Adjustment',
      era: 'Ruthless Aggression',
      worldTitleReigns: 16,
      combinedDaysAsChampion: 1254,
      firstReign: '2005-04-03',
      lastReign: '2017-01-29'
    },
    {
      id: '2',
      slug: 'the-rock',
      name: 'The Rock',
      nickname: 'The People\'s Champion',
      type: 'wrestler',
      thumbnail: undefined,
      tagline: '10-time World Champion',
      promotions: ['WWE', 'WWF'],
      activeYears: { start: 1996, end: 2019 },
      hometown: 'Hayward, California',
      nationality: 'USA',
      height: '6\'5"',
      weight: '260 lbs',
      debut: '1996-11-04',
      bio: 'Dwayne "The Rock" Johnson is an American actor, businessman, and former professional wrestler.',
      finisher: 'Rock Bottom',
      era: 'Attitude',
      worldTitleReigns: 10,
      combinedDaysAsChampion: 504,
      firstReign: '1998-11-15',
      lastReign: '2013-04-07'
    },
    {
      id: '3',
      slug: 'stone-cold-steve-austin',
      name: 'Stone Cold Steve Austin',
      nickname: 'The Texas Rattlesnake',
      type: 'wrestler',
      thumbnail: undefined,
      tagline: '6-time WWE Champion',
      promotions: ['WWE', 'WWF', 'WCW'],
      activeYears: { start: 1989, end: 2003 },
      hometown: 'Austin, Texas',
      nationality: 'USA',
      height: '6\'2"',
      weight: '252 lbs',
      debut: '1989-09-30',
      bio: 'Steve Austin is an American retired professional wrestler, actor, producer, and television host.',
      finisher: 'Stone Cold Stunner',
      era: 'Attitude',
      worldTitleReigns: 6,
      combinedDaysAsChampion: 529,
      firstReign: '1998-03-29',
      lastReign: '2001-10-08'
    }
  ];

  const fighters: FighterProfile[] = [
    {
      id: '4',
      slug: 'conor-mcgregor',
      name: 'Conor McGregor',
      nickname: 'The Notorious',
      type: 'fighter',
      thumbnail: undefined,
      tagline: 'Former UFC Featherweight & Lightweight Champion',
      promotions: ['UFC'],
      activeYears: { start: 2008 },
      hometown: 'Dublin, Ireland',
      nationality: 'Ireland',
      height: '5\'9"',
      weight: '155 lbs',
      debut: '2008-02-17',
      bio: 'Conor Anthony McGregor is an Irish professional mixed martial artist.',
      divisions: ['Featherweight', 'Lightweight'],
      record: { wins: 22, losses: 6 },
      stance: 'Southpaw',
      reach: '74"',
      titleReigns: 2
    },
    {
      id: '5',
      slug: 'amanda-nunes',
      name: 'Amanda Nunes',
      nickname: 'The Lioness',
      type: 'fighter',
      thumbnail: undefined,
      tagline: 'Former UFC Bantamweight & Featherweight Champion',
      promotions: ['UFC'],
      activeYears: { start: 2008, end: 2023 },
      hometown: 'Salvador, Brazil',
      nationality: 'Brazil',
      height: '5\'7"',
      weight: '135 lbs',
      debut: '2008-03-08',
      bio: 'Amanda Lourenço Nunes is a Brazilian mixed martial artist.',
      divisions: ['Bantamweight', 'Featherweight'],
      record: { wins: 22, losses: 5 },
      stance: 'Orthodox',
      reach: '69"',
      titleReigns: 2
    },
    {
      id: '6',
      slug: 'jon-jones',
      name: 'Jon Jones',
      nickname: 'Bones',
      type: 'fighter',
      thumbnail: undefined,
      tagline: 'UFC Light Heavyweight & Heavyweight Champion',
      promotions: ['UFC'],
      activeYears: { start: 2008 },
      hometown: 'Rochester, New York',
      nationality: 'USA',
      height: '6\'4"',
      weight: '245 lbs',
      debut: '2008-04-12',
      bio: 'Jonathan Dwight Jones is an American professional mixed martial artist.',
      divisions: ['Light Heavyweight', 'Heavyweight'],
      record: { wins: 27, losses: 1, draws: 1 },
      stance: 'Orthodox',
      reach: '84.5"',
      titleReigns: 3
    }
  ];

  return [...wrestlers, ...fighters];
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
 * Get profile by slug
 */
export function getProfileBySlug(slug: string): Profile | null {
  const profiles = getMockProfiles();
  return profiles.find(profile => profile.slug === slug) || null;
}