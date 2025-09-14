#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { load as loadCheerio } from 'cheerio';

const WIKI_URL = 'https://en.wikipedia.org/wiki/List_of_UFC_events';

function cleanText(t) {
  return t.replace(/\[.*?\]/g, '').replace(/\s+/g, ' ').trim();
}

function toIso(dateStr) {
  const cleaned = cleanText(dateStr).replace(/\u00a0/g, ' ');
  const d = new Date(cleaned);
  if (!isNaN(d.getTime())) {
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    return y + '-' + m + '-' + day;
  }
  return null;
}

async function fetchHtml(url) {
  const res = await fetch(url, { headers: { 'user-agent': 'who-was-champ-scraper/1.0' } });
  if (!res.ok) throw new Error('Failed to fetch ' + url + ': ' + res.status);
  return await res.text();
}

function extractEventsFromTable($, table) {
  const events = [];
  const $table = $(table);
  const headers = [];
  $table.find('tr').each((i, tr) => {
    const $tr = $(tr);
    const ths = $tr.find('th');
    if (ths.length && headers.length === 0) {
      ths.each((_, th) => headers.push(cleanText($(th).text()).toLowerCase()));
      return;
    }
    const tds = $tr.find('td');
    if (!tds.length) return;
    const row = {};
    tds.each((idx, td) => {
      const key = headers[idx] || String(idx);
      row[key] = cleanText($(td).text());
    });
    const name = row['event'] || row['name'] || row['event(s)'] || '';
    const dateIso = toIso(row['date'] || '');
    const venue = row['venue'] || '';
    const location = row['location'] || row['city'] || '';
    const mainEvent = row['main event'] || row['headliner'] || '';
    if (!name || !dateIso) return;
    events.push({
      sport: 'ufc',
      date: dateIso,
      name,
      venue: venue || undefined,
      city: location || undefined,
      promotion: 'UFC',
      main_event: mainEvent || undefined,
    });
  });
  return events;
}

async function main() {
  const html = await fetchHtml(WIKI_URL);
  const $ = loadCheerio(html);
  const tables = $('table.wikitable');
  let all = [];
  tables.each((_, tbl) => { all = all.concat(extractEventsFromTable($, tbl)); });
  const seen = new Set();
  const deduped = all.filter(ev => { const k = ev.date + '|' + ev.name; if (seen.has(k)) return false; seen.add(k); return true; });
  const outPath = path.join(process.cwd(), 'public', 'data', 'ufc_events.json');
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, JSON.stringify(deduped, null, 2));
  console.log('Wrote ' + deduped.length + ' UFC events to ' + path.relative(process.cwd(), outPath));
}

main().catch((err) => { console.error(err); process.exit(1); });
