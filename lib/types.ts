export type MajorEvent = {
  sport: 'wwe' | 'ufc' | 'boxing';
  date: string; // ISO YYYY-MM-DD
  name: string;
  city?: string;
  venue?: string;
  promotion?: string; // WWE/UFC/etc
  slug?: string;
  main_event?: string;
  title_bouts_count?: number;
};

