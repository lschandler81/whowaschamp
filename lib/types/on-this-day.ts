export interface TitleChangeEvent {
  date: string; // YYYY-MM-DD
  type: 'title_change';
  promotion: string;
  belt_key: string;
  belt_name: string;
  new_champion: string;
  previous_champion?: string;
  event?: string;
  location?: string;
  notes?: string;
  sources?: string[];
  slug: string;
}

