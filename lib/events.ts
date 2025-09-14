import { TitleChangeEvent } from './types/on-this-day';

// Deduplicate events by (date, belt_key, previous_champion, new_champion).
// If duplicates exist, prefer entries where promotion !== 'Unknown'.
export function uniqueEvents(events: TitleChangeEvent[]): TitleChangeEvent[] {
  const map = new Map<string, TitleChangeEvent>();
  for (const e of events) {
    const key = `${e.date}|${e.belt_key}|${e.previous_champion ?? ''}|${e.new_champion}`;
    const existing = map.get(key);
    if (!existing) {
      map.set(key, e);
      continue;
    }
    // Prefer non-Unknown promotion
    const existingUnknown = (existing.promotion || 'Unknown') === 'Unknown';
    const currentUnknown = (e.promotion || 'Unknown') === 'Unknown';
    if (existingUnknown && !currentUnknown) {
      map.set(key, e);
    }
    // else keep existing for stability
  }
  return Array.from(map.values());
}

