export interface BaseProfile {
  id: string;
  slug: string;
  name: string;
  nickname?: string;
  type: 'wrestler' | 'fighter';
  thumbnail?: string;
  tagline: string;
  promotions: string[];
  activeYears: {
    start: number;
    end?: number; // undefined means still active
  };
  hometown?: string;
  nationality?: string;
  height?: string;
  weight?: string;
  debut?: string;
  bio?: string;
  careerHighlights?: CareerHighlight[];
  rivalries?: Rivalry[];
}

export interface CareerHighlight {
  id: string;
  title: string;
  description?: string;
  date: string;
  category: 'debut' | 'championship' | 'retirement' | 'milestone' | 'feud' | 'special_match';
  importance: number; // 1-10 scale
  venue?: string;
  opponent?: string;
}

export interface Rivalry {
  id: string;
  opponentId: string;
  opponentName: string;
  opponentSlug: string;
  rivalryName: string;
  description: string;
  notableMatches: string; // Stored as string in database
  feudIntensity: number; // 1-10 scale
  startDate?: string;
  endDate?: string;
}

export interface WrestlerProfile extends BaseProfile {
  type: 'wrestler';
  finisher?: string;
  era?: 'Golden' | 'New Generation' | 'Attitude' | 'Ruthless Aggression' | 'PG' | 'Modern';
  worldTitleReigns: number;
  combinedDaysAsChampion: number;
  firstReign?: string;
  lastReign?: string;
}

export interface FighterProfile extends BaseProfile {
  type: 'fighter';
  divisions: string[];
  record?: {
    wins: number;
    losses: number;
    draws?: number;
  };
  stance?: 'Orthodox' | 'Southpaw' | 'Switch';
  reach?: string;
  titleReigns: number;
}

export type Profile = WrestlerProfile | FighterProfile;

export interface Championship {
  id: string;
  titleName: string;
  reigns: number;
  combinedDays: number;
  longestReign: number;
  firstWon: string;
  lastWon?: string;
}

export interface CareerMilestone {
  date: string;
  event: string;
  result: string;
  opponent?: string;
  titleStakes?: string;
  location?: string;
  type: 'title_match' | 'ppv_main' | 'debut' | 'retirement' | 'other';
}

export interface ProfilesFilter {
  search: string;
  type: 'all' | 'wrestler' | 'fighter';
  promotions: string[];
  eras: string[];
  divisions: string[];
  activeYears: [number, number];
}