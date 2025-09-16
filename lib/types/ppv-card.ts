export type PPVEvent = {
  org: 'UFC' | 'WWE';
  title: string;
  date: string; // ISO
  venue?: string | null;
  city?: string | null;
  country?: string | null;
  attendance?: number | null;
  buyrate?: number | null;
  mainEvent?: string | null;
  slug: string;
};