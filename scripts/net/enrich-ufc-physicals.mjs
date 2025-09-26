#!/usr/bin/env node
import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';

const prisma = new PrismaClient();

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fetchParseHtml(title) {
  const enc = encodeURIComponent(title.replace(/\s+/g, '_'));
  const url = `https://en.wikipedia.org/w/api.php?action=parse&page=${enc}&prop=text&formatversion=2&format=json`;
  const res = await fetch(url, { headers: { 'accept': 'application/json' } });
  if (!res.ok) return null;
  const json = await res.json();
  if (!json?.parse?.text) return null;
  return json.parse.text;
}

async function searchTitle(name) {
  const url = `https://en.wikipedia.org/w/rest.php/v1/search/title?q=${encodeURIComponent(name)}&limit=1`;
  const res = await fetch(url, { headers: { 'accept': 'application/json' } });
  if (!res.ok) return null;
  const json = await res.json();
  const title = json?.pages?.[0]?.title;
  return title || null;
}

async function bestHtmlForName(name) {
  const tries = [
    name,
    `${name} (fighter)`,
    `${name} (mixed martial artist)`
  ];
  for (const t of tries) {
    const html = await fetchParseHtml(t);
    if (html) return html;
  }
  // Fallback to search (handles diacritics and exact titles)
  const found = await searchTitle(name);
  if (found) {
    const html = await fetchParseHtml(found);
    if (html) return html;
  }
  return null;
}

function cleanText(str) {
  return (str || '')
    .replace(/\[[^\]]*\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractInfo(html) {
  const $ = cheerio.load(html);
  const info = {};
  const infobox = $('table.infobox, table.infobox.biography');
  if (!infobox.length) return info;

  infobox.find('tr').each((_, el) => {
    const th = $(el).find('th').first();
    const td = $(el).find('td').first();
    if (!th.length || !td.length) return;
    const key = cleanText(th.text()).toLowerCase();
    const val = cleanText(td.text());
    if (!key || !val) return;
    if (key.includes('height')) info.height = val;
    if (key.includes('weight')) info.weight = val;
    if (key.includes('reach')) info.reach = val;
    if (key.includes('stance')) info.stance = val;
    if (key.startsWith('born')) {
      // try last comma part as place
      const parts = val.split(';');
      const loc = parts[parts.length - 1];
      info.hometown = cleanText(loc);
    }
  });
  return info;
}

async function main() {
  const targets = await prisma.profile.findMany({
    where: {
      type: 'fighter',
      OR: [
        { height: null },
        { weight: null },
        { fighter: { is: { stance: null } } },
        { fighter: { is: { reach: null } } },
        { hometown: null }
      ]
    },
    include: { fighter: true },
    take: 25
  });

  console.log(`Enriching physicals for ${targets.length} fighters via Wikipedia infobox...`);
  let updated = 0, skipped = 0;

  for (const f of targets) {
    try {
      const html = await bestHtmlForName(f.name);
      if (!html) { skipped++; console.log(`⏭️  ${f.name} — no HTML`); continue; }
      const info = extractInfo(html);
      const profileUpdate = {};
      if (!f.height && info.height) profileUpdate.height = info.height;
      if (!f.weight && info.weight) profileUpdate.weight = info.weight;
      if (!f.hometown && info.hometown) profileUpdate.hometown = info.hometown;
      if (Object.keys(profileUpdate).length) {
        await prisma.profile.update({ where: { id: f.id }, data: profileUpdate });
      }
      if (f.fighter) {
        const fighterUpdate = {};
        if (!f.fighter.stance && info.stance) fighterUpdate.stance = info.stance;
        if (!f.fighter.reach && info.reach) fighterUpdate.reach = info.reach;
        if (Object.keys(fighterUpdate).length) {
          await prisma.fighterProfile.update({ where: { id: f.fighter.id }, data: fighterUpdate });
        }
      }
      if (Object.keys(profileUpdate).length || (f.fighter && (f.fighter.stance || f.fighter.reach))) updated++;
      console.log(`✅ ${f.name} — updated fields: ${Object.keys(info).join(', ') || 'none'}`);
      await sleep(300);
    } catch (e) {
      skipped++;
      console.log(`❌ ${f.name} — ${e.message}`);
    }
  }

  console.log(`\n🎯 Physcial enrichment complete. Updated: ${updated}, Skipped: ${skipped}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
