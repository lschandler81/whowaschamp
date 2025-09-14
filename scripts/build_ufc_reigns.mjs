#!/usr/bin/env node
// Scrape UFC title reigns from Wikipedia into public/data/*_reigns.json
// Run locally, then commit the generated files.
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { load as loadCheerio } from 'cheerio';
import belts from './ufc_belts.mjs';

function clean(t) {
  return (t || '')
    .replace(/\[.*?\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseIso(dateText) {
  const s = clean(dateText).replace(/\u00a0/g, ' ');
  const d = new Date(s);
  if (!isNaN(d.getTime())) {
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
  return null;
}

async function fetchHtml(url) {
  const res = await fetch(url, { headers: { 'user-agent': 'who-was-champ-scraper/1.0' } });
  if (!res.ok) throw new Error(`Fetch failed ${url}: ${res.status}`);
  return await res.text();
}

function parseTitleHistory($) {
  // Heuristic: take the first wikitable that has both a champion cell and date columns
  const tables = $('table.wikitable');
  let seen = [];
  tables.each((_, tbl) => {
    const $tbl = $(tbl);
    $tbl.find('tr').each((i, tr) => {
      const $tr = $(tr);
      const tds = $tr.find('td');
      if (tds.length < 3) return;
      const rowText = clean($tr.text());
      // Try to pick champion (usually first or second cell)
      const champ = clean($(tds[0]).text()) || clean($(tds[1]).text());
      // Find date-like strings in the row (we'll pick the first two as start/end)
      const dates = [];
      tds.each((_, td) => {
        const txt = clean($(td).text());
        const iso = parseIso(txt);
        if (iso) dates.push(iso);
      });
      if (!champ) return;
      if (champ.toLowerCase().includes('interim')) return; // skip interim rows
      if (champ.length > 80) return; // likely not a name
      // Expect at least start date
      if (dates.length === 0) return;
      const start = dates[0];
      const end = dates[1] || null;
      seen.push({ champion: champ, start_date: start, end_date: end, rowText });
    });
  });
  return seen;
}

async function scrapeBelt({ key, name, url }) {
  const html = await fetchHtml(url);
  const $ = loadCheerio(html);
  const rows = parseTitleHistory($);
  // Normalize and build reign objects
  const reigns = rows.map(r => ({
    title_key: key,
    title_name: name,
    champion: r.champion,
    start_date: r.start_date,
    end_date: r.end_date,
    notes: undefined,
  }))
  // Filter obvious junk
  .filter(r => r.champion && r.start_date);

  // Basic sort by start_date ascending
  reigns.sort((a, b) => (a.start_date < b.start_date ? -1 : 1));

  const outFile = path.join(process.cwd(), 'public', 'data', `${key}_reigns.json`);
  await fs.mkdir(path.dirname(outFile), { recursive: true });
  await fs.writeFile(outFile, JSON.stringify(reigns, null, 2));
  return { key, name, file: `${key}_reigns.json`, active: true, count: reigns.length };
}

async function main() {
  const manifest = [];
  for (const b of belts) {
    try {
      const meta = await scrapeBelt(b);
      console.log(`Built ${meta.file} (${meta.count} reigns)`);
      manifest.push({ id: b.key, name: b.name, file: meta.file, active: true });
    } catch (e) {
      console.warn('Failed belt', b.key, e.message);
    }
  }
  const manifestPath = path.join(process.cwd(), 'public', 'data', 'ufc_titles.json');
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('Updated manifest', path.relative(process.cwd(), manifestPath));
}

main().catch((e) => { console.error(e); process.exit(1); });
