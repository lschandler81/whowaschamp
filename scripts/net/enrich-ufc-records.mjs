#!/usr/bin/env node
import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';

const prisma = new PrismaClient();

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function toTitleName(name) { return name.replace(/\s+/g, '_'); }

async function fetchHtml(title) {
  const enc = encodeURIComponent(toTitleName(title));
  const url = `https://en.wikipedia.org/w/api.php?action=parse&page=${enc}&prop=text&formatversion=2&format=json`;
  const res = await fetch(url, { headers: { 'accept': 'application/json' } });
  if (!res.ok) return null;
  const json = await res.json();
  return json?.parse?.text || null;
}

async function searchTitle(name) {
  const url = `https://en.wikipedia.org/w/rest.php/v1/search/title?q=${encodeURIComponent(name)}&limit=1`;
  const res = await fetch(url, { headers: { 'accept': 'application/json' } });
  if (!res.ok) return null;
  const json = await res.json();
  const title = json?.pages?.[0]?.title;
  return title || null;
}

async function bestHtml(name) {
  for (const candidate of [name, `${name} (fighter)`, `${name} (mixed martial artist)`]) {
    const html = await fetchHtml(candidate);
    if (html) return html;
  }
  const found = await searchTitle(name);
  if (found) {
    const html = await fetchHtml(found);
    if (html) return html;
  }
  return null;
}

function clean(s) { return (s||'').replace(/\[[^\]]*\]/g, '').replace(/\s+/g, ' ').trim(); }

function extractRecord(html) {
  const $ = cheerio.load(html);
  let wins, losses, draws;

  // Strategy 1: Look for infobox rows labeled Wins/Losses/Draws
  $('table.infobox tr').each((_, tr) => {
    const th = $(tr).find('th').first();
    const td = $(tr).find('td').first();
    if (!th.length || !td.length) return;
    const key = clean(th.text()).toLowerCase();
    const val = clean(td.text());
    if (key === 'wins' && /^\d+$/.test(val)) wins = parseInt(val, 10);
    if (key === 'losses' && /^\d+$/.test(val)) losses = parseInt(val, 10);
    if (key === 'draws' && /^\d+$/.test(val)) draws = parseInt(val, 10);
  });

  // Strategy 2: Look for a record pattern near "Mixed martial arts record" table
  if (wins === undefined || losses === undefined) {
    const text = clean($.root().text());
    // Naive but guarded: search for patterns like "MMA record ... 24–3", prefer where around the word record
    const recRegex = /record[^\d]*(\d+)\s*[–-]\s*(\d+)(?:\s*[–-]\s*(\d+))?/i;
    const m = recRegex.exec(text);
    if (m) {
      wins = wins ?? parseInt(m[1], 10);
      losses = losses ?? parseInt(m[2], 10);
      if (m[3] !== undefined) draws = draws ?? parseInt(m[3], 10);
    }
  }

  const out = {};
  if (typeof wins === 'number') out.wins = wins;
  if (typeof losses === 'number') out.losses = losses;
  if (typeof draws === 'number') out.draws = draws;
  return out;
}

async function main() {
  // Only update fighters with empty stats (0/0/0) to avoid overwriting future curated data
  const targets = await prisma.profile.findMany({
    where: {
      type: 'fighter',
      fighter: { is: { wins: 0, losses: 0, draws: 0 } },
      NOT: { name: 'VACANT' }
    },
    include: { fighter: true },
    take: 20
  });

  console.log(`Enriching basic records for ${targets.length} fighters...`);
  let updated = 0, skipped = 0;
  for (const f of targets) {
    try {
      const html = await bestHtml(f.name);
      if (!html) { skipped++; console.log(`⏭️  ${f.name} — no HTML`); continue; }
      const rec = extractRecord(html);
      if (rec.wins !== undefined && rec.losses !== undefined) {
        await prisma.fighterProfile.update({ where: { id: f.fighter.id }, data: {
          wins: rec.wins,
          losses: rec.losses,
          draws: rec.draws ?? 0
        }});
        updated++;
        console.log(`✅ ${f.name} — ${rec.wins}-${rec.losses}${rec.draws?`-${rec.draws}`:''}`);
      } else {
        skipped++;
        console.log(`⏭️  ${f.name} — no record found`);
      }
      await sleep(300);
    } catch (e) {
      skipped++;
      console.log(`❌ ${f.name} — ${e.message}`);
    }
  }

  console.log(`\n🎯 Records enrichment complete. Updated: ${updated}, Skipped: ${skipped}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
