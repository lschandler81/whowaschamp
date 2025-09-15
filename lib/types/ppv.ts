// PPV Event types for the new flashback feature
export interface PPVEvent {
  id: string;
  promotionId: string;
  promotion: {
    id: string;
    name: string;
    slug: string;
    logoUrl?: string;
    color?: string;
  };
  name: string;
  brand?: string;
  date: Date;
  venue?: string;
  city?: string;
  country?: string;
  isPpv: boolean;
  buyrate?: number; // in thousands
  attendance?: number;
  posterUrl?: string;
  sourceUrl?: string;
  headliners: PPVHeadliner[];
  titleChanges: PPVTitleChange[];
}

export interface PPVHeadliner {
  id: string;
  eventId: string;
  side: 'main' | 'co-main' | 'featured';
  name: string;
  role: 'challenger' | 'champion' | 'participant';
  result?: 'win' | 'loss' | 'draw' | 'no-contest';
}

export interface PPVTitleChange {
  id: string;
  eventId: string;
  titleName: string;
  changedHands: boolean;
  newChampion?: string;
  oldChampion?: string;
}

export interface OnThisDayEvent {
  id: string;
  promotion: string;
  name: string;
  date: Date;
  venue?: string;
  city?: string;
  country?: string;
  buyrate?: number;
  attendance?: number;
  isPpv: boolean;
  headliners: string[];
  titleChanges: string[];
}

export interface PPVFlashbackEvent {
  id: string;
  promotion: string;
  name: string;
  date: Date;
  venue?: string;
  city?: string;
  country?: string;
  buyrate?: number;
  attendance?: number;
  headliners: string[];
  titleChanges: string[];
  score?: number; // Made optional since we don't need it anymore
}

// For PPV selection heuristic
export interface PPVScore {
  event: PPVEvent;
  score: number;
  factors: {
    isPpv: boolean;
    buyrate?: number;
    attendance?: number;
    titleMatches: number;
    mainEventPrestige: number;
  };
}
