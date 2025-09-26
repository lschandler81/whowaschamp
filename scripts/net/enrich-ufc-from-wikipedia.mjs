#!/usr/bin/env node
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fetchSummary(title) {
  const enc = encodeURIComponent(title.replace(/\s+/g, '_'));
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${enc}`;
  const res = await fetch(url, { headers: { 'accept': 'application/json' } });
  if (!res.ok) return null;
  return await res.json();
}

async function bestSummaryForName(name) {
  // Try direct, then name + (fighter), then name + (mixed martial artist)
  const tries = [
    name,
    `${name} (fighter)`,
    `${name} (mixed martial artist)`
  ];
  for (const t of tries) {
    const s = await fetchSummary(t);
    if (s && s.extract && !s.title?.includes('Disambiguation')) return s;
  }
  return null;
}

async function main() {
  // Pull a batch of fighters missing bios first (limit 50 to be polite)
  const fighters = await prisma.profile.findMany({
    where: { type: 'fighter', OR: [ { bio: null }, { bio: '' } ] },
    select: { id: true, name: true, slug: true },
    take: 50
  });

  console.log(`Enriching bios for ${fighters.length} fighters via Wikipedia summary...`);

  let updated = 0, skipped = 0;
  for (const f of fighters) {
    try {
      const summary = await bestSummaryForName(f.name);
      if (summary && summary.extract) {
        const bio = summary.extract.length > 2000 ? summary.extract.slice(0, 2000) : summary.extract;
        await prisma.profile.update({ where: { id: f.id }, data: { bio } });
        updated++;
        console.log(`✅ ${f.name} — bio updated (${bio.length} chars)`);
      } else {
        skipped++;
        console.log(`⏭️  ${f.name} — no suitable Wikipedia summary`);
      }
      await sleep(250); // small delay
    } catch (e) {
      skipped++;
      console.log(`❌ ${f.name} — ${e.message}`);
    }
  }

  console.log(`\n🎯 Wikipedia enrichment complete. Updated bios: ${updated}, Skipped: ${skipped}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });

