#!/usr/bin/env node
// Scrape UFC title reigns from Wikipedia into public/data/*_reigns.json
// Run locally, then commit the generated files.
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { load as loadCheerio } from 'cheerio';
import belts from './ufc_belts.mjs';
import { fileURLToPath } from 'node:url';

function clean(t) {
  return (t || '')
    .replace(/\[[^\]]*\]/g, '')
    .replace(/\([^)]*\)/g, '')
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Strictly extract a Month D, YYYY (or YYYY-MM-DD) from text and return ISO YYYY-MM-DD
function parseIso(dateText) {
  const s = clean(dateText);
  // Direct ISO
  const isoMatch = s.match(/\b(\d{4})-(\d{2})-(\d{2})\b/);
  if (isoMatch) return `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`;

  // Month name formats
  const monthNames = {
    january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
    july: 7, august: 8, september: 9, october: 10, november: 11, december: 12
  };
  const m = s.match(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),\s*(\d{4})\b/i);
  if (m) {
    const month = String(monthNames[m[1].toLowerCase()]).padStart(2, '0');
    const day = String(parseInt(m[2], 10)).padStart(2, '0');
    const year = m[3];
    return `${year}-${month}-${day}`;
  }
  return null;
}

async function fetchHtml(url) {
  const res = await fetch(url, { headers: { 'user-agent': 'who-was-champ-scraper/1.0' }, timeout: 60000 });
  if (!res.ok) throw new Error(`Fetch failed ${url}: ${res.status}`);
  return await res.text();
}

function pickTitleTable($) {
  // Try to find the 'Title history' section table
  const headlines = $('.mw-headline');
  for (let i = 0; i < headlines.length; i++) {
    const $h = $(headlines[i]);
    const txt = clean($h.text()).toLowerCase();
    if (/title history|championship history/.test(txt)) {
      const $section = $h.closest('h2, h3, h4');
      if ($section && $section.length) {
        const $tbl = $section.nextAll('table.wikitable').first();
        if ($tbl && $tbl.length) return $tbl;
      }
    }
  }
  // Fallback: prefer tables with caption including 'Title history'
  const tables = $('table.wikitable');
  // First, try a direct match for classic title history headers
  for (let i = 0; i < tables.length; i++) {
    const $tbl = $(tables[i]);
    const headers = $tbl.find('tr').first().find('th').map((i, th) => clean($(th).text()).toLowerCase()).get();
    const hasChampion = headers.some(h => /champion/.test(h));
    const hasWon = headers.some(h => /\bwon\b/.test(h) || /date won/.test(h));
    const hasLost = headers.some(h => /\blost\b/.test(h) || /date lost/.test(h) || /reign ended/.test(h));
    if (hasChampion && hasWon && hasLost) {
      return $(tables[i]);
    }
  }
  let best = null;
  let bestScore = -1;
  tables.each((_, tbl) => {
    const $tbl = $(tbl);
    const caption = clean($tbl.find('caption').first().text()).toLowerCase();
    const headers = $tbl.find('tr').first().find('th').map((i, th) => clean($(th).text()).toLowerCase()).get();
    if (!headers.length) return;
    const hasChampion = headers.some(h => /champion/.test(h));
    const hasWon = headers.some(h => /\bwon\b/.test(h) || /date won/.test(h));
    const hasLost = headers.some(h => /\blost\b/.test(h) || /date lost/.test(h) || /reign ended/.test(h));
    const hasDate = headers.some(h => /\bdate\b/.test(h));
    const hasNo = headers.some(h => /^no\.?$/.test(h));
    const hasDivisionSince = headers.some(h => /division/.test(h)) && headers.some(h => /since/.test(h));
    const looksLikeEventList = headers.some(h => /name/.test(h)) && headers.some(h => /event/.test(h)) && headers.some(h => /date/.test(h)) && !hasWon && !hasLost;
    const captionHit = /title history|championship history/.test(caption) ? 10 : 0;
    let score = captionHit + (hasChampion ? 2 : 0) + (hasWon ? 3 : 0) + (hasLost ? 3 : 0) + (hasDate ? 1 : 0) + (hasNo ? 1 : 0);
    if (hasWon && hasLost) score += 3; // strong signal
    if (hasDivisionSince && !hasWon && !hasLost) score -= 5; // current champions table
    if (looksLikeEventList) score -= 2;
    if (headers.length < 5) score -= 2;
    if (score > bestScore) { bestScore = score; best = $tbl; }
  });
  return best;
}

function mapColumns($, $tbl) {
  const headers = $tbl.find('tr').first().find('th').map((i, th) => clean($(th).text()).toLowerCase()).get();
  const idx = (candidates) => {
    for (const term of candidates) {
      const i = headers.findIndex(h => h.includes(term));
      if (i >= 0) return i;
    }
    return -1;
  };
  const iChampion = idx(['champion']);
  const iWon = idx(['date won', 'won', 'date']);
  const iLost = idx(['date lost', 'lost', 'reign ended', 'end']);
  const iEvent = idx(['event']);
  const iLoc = idx(['location', 'site', 'venue', 'city']);
  const iNotes = idx(['notes']);
  return { iChampion, iWon, iLost, iEvent, iLoc, iNotes };
}

function parseReigns($, $tbl) {
  const { iChampion, iWon, iLost, iEvent, iLoc, iNotes } = mapColumns($, $tbl);
  if (iChampion < 0 || iWon < 0) return [];
  const out = [];
  const weightWords = /(heavyweight|light heavyweight|middleweight|welterweight|lightweight|featherweight|bantamweight|flyweight|strawweight)/i;
  $tbl.find('tr').slice(1).each((_, tr) => {
    const $tr = $(tr);
    const tds = $tr.find('td');
    if (!tds.length) return;
    const champRaw = clean($(tds.get(iChampion)).text());
    const champ = champRaw
      .replace(/\bInterim\b/ig, '')
      .replace(/\b(def\.|vs\.|d\.?)\b.*$/i, '')
      .trim();
    const start = parseIso($(tds.get(iWon)).text());
    const end = iLost >= 0 ? parseIso($(tds.get(iLost)).text()) : null;
    const event = iEvent >= 0 ? clean($(tds.get(iEvent)).text()) : '';
    const loc = iLoc >= 0 ? clean($(tds.get(iLoc)).text()) : '';
    const notes = iNotes >= 0 ? clean($(tds.get(iNotes)).text()) : '';

    if (!champ || !start) return;
    if (/vacated/i.test(champ) || /interim/i.test(notes)) return;
    if (weightWords.test(champ)) return; // misparsed class instead of person
    if (/^ufc\s?\d+/i.test(champ)) return; // mis-parsed event name as champ
    if (champ.length > 60) return;
    // Sanity: years between 1993 and 2100
    const y = parseInt(start.slice(0, 4), 10);
    if (isNaN(y) || y < 1993 || y > 2100) return;

    out.push({ champion: champ, start_date: start, end_date: end || null, won_event: event || null, won_location: loc || null, notes: notes || null });
  });
  // Backfill end dates if missing, using next start
  out.sort((a, b) => a.start_date.localeCompare(b.start_date));
  for (let i = 0; i < out.length - 1; i++) {
    if (!out[i].end_date) out[i].end_date = out[i + 1].start_date;
  }
  if (out.length) out[out.length - 1].end_date = out[out.length - 1].end_date || null;
  return out;
}

async function scrapeBelt({ key, name, url }) {
  const html = await fetchHtml(url);
  const $ = loadCheerio(html);
  const $tbl = pickTitleTable($);
  let rows = [];
  if ($tbl && $tbl.length) {
    rows = parseReigns($, $tbl);
  }
  const reigns = rows.map(r => ({
    title_key: key,
    title_name: name,
    champion: r.champion,
    start_date: r.start_date,
    end_date: r.end_date,
    won_event: r.won_event,
    won_location: r.won_location,
    notes: r.notes,
  }));
  const outFile = path.join(process.cwd(), 'public', 'data', `${key}_reigns.json`);
  await fs.mkdir(path.dirname(outFile), { recursive: true });

  // Validation: require reasonable number of rows and plausible dates
  const valid = (arr) => Array.isArray(arr) && arr.length >= 5 && arr.every(r => r.champion && /\d{4}-\d{2}-\d{2}/.test(r.start_date));

  if (valid(reigns)) {
    await fs.writeFile(outFile, JSON.stringify(reigns, null, 2));
    return { key, name, file: `${key}_reigns.json`, active: true, count: reigns.length };
  }

  // Fallback 1: keep existing file if present and non-empty and not placeholder
  try {
    const existingRaw = await fs.readFile(outFile, 'utf-8');
    const existing = JSON.parse(existingRaw);
    const isPlaceholder = Array.isArray(existing) && existing.length === 1 && /placeholder/i.test(existing[0]?.champion || '');
    if (Array.isArray(existing) && existing.length > 0 && !isPlaceholder) {
      console.warn(`Using existing ${key} data (scrape yielded ${reigns.length})`);
      return { key, name, file: `${key}_reigns.json`, active: true, count: existing.length };
    }
  } catch {}

  // Fallback 2: use seed snapshot for current champion to avoid empty files
  const seedPath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'data', 'ufc_seed_reigns.json');
  let seedData = {};
  try { seedData = JSON.parse(await fs.readFile(seedPath, 'utf-8')); } catch {}
  const seedRows = ((seedData && seedData[key]) ? seedData[key] : []).map(s => ({
    title_key: key,
    title_name: name,
    champion: s.champion,
    start_date: s.start_date,
    end_date: null,
    won_event: s.won_event || null,
    won_location: s.won_location || null,
    notes: null,
  }));
  if (seedRows.length) {
    await fs.writeFile(outFile, JSON.stringify(seedRows, null, 2));
    console.warn(`Seeded ${key} with ${seedRows.length} entry`);
    return { key, name, file: `${key}_reigns.json`, active: true, count: seedRows.length };
  }

  // As a last resort, write empty array
  await fs.writeFile(outFile, JSON.stringify([], null, 2));
  console.warn(`Wrote empty array for ${key}`);
  return { key, name, file: `${key}_reigns.json`, active: true, count: 0 };
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
