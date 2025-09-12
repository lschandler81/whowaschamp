#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';

/** Infer promotion from filename prefix */
function inferPromotion(filename) {
  const base = path.basename(filename);
  if (base.startsWith('wwe_')) return 'WWE';
  if (base.startsWith('wcw_')) return 'WCW';
  if (base.startsWith('aew_')) return 'AEW';
  if (base.startsWith('nxt_')) return 'NXT';
  if (base.startsWith('tna_') || base.startsWith('impact_')) return 'TNA/Impact';
  if (base.startsWith('nwa_')) return 'NWA';
  if (base.startsWith('ecw_') || base.includes('ecw')) return 'ECW';
  if (base.startsWith('iwgp_')) return 'NJPW';
  return 'Unknown';
}

function normalizeDate(d) {
  // Expect YYYY-MM-DD
  if (!d) return undefined;
  return String(d).slice(0, 10);
}

function toSlug(str) {
  return String(str || '')
    .toLowerCase()
    .replace(/['’`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function main() {
  const root = process.cwd();
  const dataDir = path.join(root, 'public', 'data');
  const files = (await fs.readdir(dataDir))
    .filter((f) => f.endsWith('_reigns.json'))
    .map((f) => path.join(dataDir, f))
    .sort();

  /** @type {any[]} */
  const allEvents = [];

  for (const file of files) {
    const promotion = inferPromotion(file);
    const raw = await fs.readFile(file, 'utf8');
    /** @type {Array<any>} */
    let reigns;
    try {
      reigns = JSON.parse(raw);
      if (!Array.isArray(reigns)) continue;
    } catch {
      continue;
    }

    // Build quick lookup by end_date within same title_key to find previous champion.
    const byEndDate = new Map();
    for (const r of reigns) {
      const end = normalizeDate(r.end_date);
      if (end) {
        const key = `${r.title_key}__${end}`;
        byEndDate.set(key, r);
      }
    }

    for (const r of reigns) {
      const start = normalizeDate(r.start_date);
      if (!start) continue;
      const champion = (r.champion || '').trim();
      if (!champion || champion.toLowerCase() === 'vacated') {
        // Skip vacated reigns as title_change events
        continue;
      }

      const prev = byEndDate.get(`${r.title_key}__${start}`);
      const previousChampion = prev && prev.champion && prev.champion.toLowerCase() !== 'vacated' ? prev.champion : undefined;

      const beltKey = r.title_key;
      const beltName = r.title_name || beltKey;
      const sources = [];
      if (typeof r.source === 'string' && /^https?:\/\//i.test(r.source)) {
        sources.push(r.source);
      }

      const event = {
        date: start,
        type: 'title_change',
        promotion,
        belt_key: beltKey,
        belt_name: beltName,
        new_champion: champion,
        previous_champion: previousChampion,
        event: r.won_event || undefined,
        location: r.won_location || undefined,
        notes: r.notes || undefined,
        sources: sources.length ? sources : undefined,
        slug: toSlug(`${start}-${beltKey}-${champion}`),
      };
      allEvents.push(event);
    }
  }

  // Stable ordering: won_event present first on same date, then by new_champion
  allEvents.sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? -1 : 1;
    const aHas = a.event ? 1 : 0;
    const bHas = b.event ? 1 : 0;
    if (aHas !== bHas) return bHas - aHas; // won_event first
    return String(a.new_champion).localeCompare(String(b.new_champion));
  });

  const outPath = path.join(dataDir, 'on_this_day_events.min.json');
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, JSON.stringify(allEvents));
  console.log(`Generated ${allEvents.length} events -> ${path.relative(root, outPath)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

