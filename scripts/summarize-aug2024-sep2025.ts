import fs from 'fs';
import path from 'path';

type Reign = {
  title_key: string;
  title_name: string;
  champion: string;
  start_date: string; // ISO YYYY-MM-DD
  end_date: string | null;
  won_event?: string;
  won_location?: string;
  notes?: string;
};

type DivisionSummary = {
  promotion: string;
  title: string;
  changes: Array<{
    start_date: string;
    champion: string;
    event?: string;
    location?: string;
    notes?: string;
    first_time_for_this_title: boolean;
  }>;
};

const DATA_DIR = path.join(process.cwd(), 'public', 'data');

const WINDOW_START = new Date('2024-08-01');
const WINDOW_END = new Date('2025-09-30');

function inWindow(d?: string | null): boolean {
  if (!d) return false;
  const dt = new Date(d);
  return dt >= WINDOW_START && dt <= WINDOW_END;
}

async function readJson<T = unknown>(file: string): Promise<T> {
  const raw = await fs.promises.readFile(file, 'utf-8');
  return JSON.parse(raw) as T;
}

function firstTimeForThisTitle(reigns: Reign[], champion: string, index: number): boolean {
  for (let i = 0; i < index; i++) {
    if (reigns[i].champion === champion) return false;
  }
  return true;
}

function monthKey(dateStr: string): string {
  const d = new Date(dateStr);
  const y = d.getUTCFullYear();
  const m = (d.getUTCMonth() + 1).toString().padStart(2, '0');
  return `${y}-${m}`;
}

async function summarizeWrestling(): Promise<DivisionSummary[]> {
  const sources: Array<{ file: string; promotion: string; titleFilter?: (r: Reign) => boolean } & ({ title: string } | { titleFromData: true })> = [
    { file: 'wwe_world_heavyweight_2023_reigns.json', promotion: 'WWE', title: 'World Heavyweight Championship' },
    { file: 'wwe_universal_championship_reigns.json', promotion: 'WWE', title: 'Universal/Undisputed Championship' },
    { file: 'aew_championship_reigns.json', promotion: 'AEW', title: 'World Championship', titleFilter: (r) => r.title_key.includes('aew_world') },
    { file: 'iwgp_world_heavyweight_2021_reigns.json', promotion: 'NJPW', title: 'IWGP World Heavyweight Championship' },
    { file: 'tna_championship_reigns.json', promotion: 'TNA/Impact', titleFromData: true },
  ];

  const results: DivisionSummary[] = [];

  for (const src of sources) {
    const filePath = path.join(DATA_DIR, src.file);
    if (!fs.existsSync(filePath)) continue;
    const reigns = (await readJson<Reign[]>(filePath)).filter((r) => (src as any).titleFilter ? (src as any).titleFilter(r) : true);
    if (!reigns.length) continue;
    const title = 'title' in src ? (src as any).title as string : reigns[0].title_name;

    const changes: DivisionSummary['changes'] = [];
    reigns.forEach((r, idx) => {
      if (inWindow(r.start_date)) {
        changes.push({
          start_date: r.start_date,
          champion: r.champion,
          event: r.won_event,
          location: r.won_location,
          notes: r.notes,
          first_time_for_this_title: firstTimeForThisTitle(reigns, r.champion, idx),
        });
      }
    });

    if (changes.length) {
      results.push({ promotion: (src as any).promotion, title, changes });
    }
  }

  return results;
}

async function summarizeUFC(): Promise<DivisionSummary[]> {
  // Detect all UFC reign files by pattern
  const files = fs.readdirSync(DATA_DIR).filter((f) => /^ufc_.+_reigns\.json$/.test(f));
  const results: DivisionSummary[] = [];

  for (const file of files) {
    const filePath = path.join(DATA_DIR, file);
    const reigns = await readJson<Reign[]>(filePath);
    if (!reigns.length) continue;
    const title = reigns[0].title_name || file.replace(/_reigns\.json$/, '').replace(/_/g, ' ');
    const changes: DivisionSummary['changes'] = [];
    reigns.forEach((r, idx) => {
      if (inWindow(r.start_date)) {
        changes.push({
          start_date: r.start_date,
          champion: r.champion,
          event: r.won_event,
          location: r.won_location,
          notes: r.notes,
          first_time_for_this_title: firstTimeForThisTitle(reigns, r.champion, idx),
        });
      }
    });
    if (changes.length) {
      results.push({ promotion: 'UFC', title, changes });
    }
  }

  return results;
}

function renderText(sections: DivisionSummary[]): string {
  // Group by promotion, then by month within each title
  const byPromotion = new Map<string, DivisionSummary[]>();
  for (const s of sections) {
    if (!byPromotion.has(s.promotion)) byPromotion.set(s.promotion, []);
    byPromotion.get(s.promotion)!.push(s);
  }

  let out: string[] = [];
  out.push(`Significant Championship Changes (Aug 2024 – Sep 2025)`);
  out.push('');
  for (const [promotion, divs] of Array.from(byPromotion.entries()).sort()) {
    out.push(`${promotion}`);
    out.push('-'.repeat(promotion.length));
    for (const div of divs.sort((a, b) => a.title.localeCompare(b.title))) {
      out.push(`  ${div.title}`);
      const byMonth = new Map<string, typeof div.changes>();
      for (const c of div.changes) {
        const mk = monthKey(c.start_date);
        if (!byMonth.has(mk)) byMonth.set(mk, []);
        byMonth.get(mk)!.push(c);
      }
      const months = Array.from(byMonth.keys()).sort();
      for (const mk of months) {
        out.push(`    ${mk}`);
        for (const c of byMonth.get(mk)!.sort((a, b) => a.start_date.localeCompare(b.start_date))) {
          const ft = c.first_time_for_this_title ? ' (first-time champion)' : '';
          const event = c.event ? ` — ${c.event}` : '';
          const loc = c.location ? `, ${c.location}` : '';
          const notes = c.notes ? ` — ${c.notes}` : '';
          out.push(`      - ${c.start_date}: ${c.champion}${ft}${event}${loc}${notes}`);
        }
      }
    }
    out.push('');
  }
  return out.join('\n');
}

async function main() {
  const wrestling = await summarizeWrestling();
  const ufc = await summarizeUFC();
  const combined = [...wrestling, ...ufc];

  if (combined.length === 0) {
    console.log('No changes found in the window. Ensure data files are refreshed.');
    return;
  }

  const text = renderText(combined);
  console.log(text);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

