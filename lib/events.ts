import { TitleChangeEvent } from './types/on-this-day';
import { MajorEvent } from './types';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { getISOWeek, getISOWeekYear, startOfISOWeek, endOfISOWeek, addWeeks, parseISO } from 'date-fns';

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

export function getCurrentIsoWeekRange(date: Date = new Date()) {
  const start = startOfISOWeek(date);
  const end = endOfISOWeek(date);
  const isoWeek = getISOWeek(date);
  const isoYear = getISOWeekYear(date);
  return { start, end, isoWeek, isoYear };
}

export async function getEventsForIsoWeek(
  sport: 'wwe' | 'ufc' | 'boxing',
  _isoYear: number,
  isoWeek: number
): Promise<MajorEvent[]> {
  const root = process.cwd();
  const filename = `${sport}_events.json`;
  const filePath = path.join(root, 'public', 'data', filename);
  let events: MajorEvent[] = [];
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) events = arr as MajorEvent[];
  } catch {
    // file may not exist yet (e.g., boxing) — return empty list
    return [];
  }

  return events.filter((ev) => {
    if (!ev?.date) return false;
    const d = parseISO(ev.date);
    return getISOWeek(d) === isoWeek; // across all years
  });
}
