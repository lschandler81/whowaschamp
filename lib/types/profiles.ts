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

export interface Rivalry {
  opponentSlug: string;
  opponentName: string;
  matchesFaced: number;
  record?: string; // e.g., "3-2-1"
  notableMatches: string[];
}

export interface ProfilesFilter {
  search: string;
  type: 'all' | 'wrestlers' | 'fighters';
  promotions: string[];
  eras: string[];
  divisions: string[];
  activeYears: [number, number];
}