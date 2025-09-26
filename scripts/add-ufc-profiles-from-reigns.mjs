#!/usr/bin/env node
import { PrismaClient } from '@prisma/client';
import fs from 'node:fs';
import path from 'node:path';

const prisma = new PrismaClient();

function toSlug(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/[\'’`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const DATA_DIR = path.resolve('public/data');

function divisionFromTitleId(id) {
  // id examples: ufc_mens_lightweight, ufc_womens_strawweight
  const p = id.split('_');
  const weight = p.slice(2).join(' ').replace(/\bmens\b|\bwomens\b/gi, '').trim();
  // Proper case
  return weight
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

async function ensurePromotion(name) {
  const slug = toSlug(name);
  let promotion = await prisma.promotion.findFirst({ where: { OR: [{ name }, { slug }] } });
  if (!promotion) {
    promotion = await prisma.promotion.create({ data: { name, slug } });
    console.log(`✅ Created promotion: ${name}`);
  }
  return promotion;
}

async function upsertFighterBasic(name, division, promotionName = 'UFC', tagline) {
  const existing = await prisma.profile.findFirst({ where: { OR: [{ name }, { slug: toSlug(name) }] } });
  if (existing) return { created: false, profileId: existing.id };
  const profile = await prisma.profile.create({
    data: {
      name,
      slug: toSlug(name),
      type: 'fighter',
      tagline: tagline || undefined,
      fighter: { create: {} },
    },
    include: { fighter: true },
  });

  const promotion = await ensurePromotion(promotionName);
  await prisma.profilePromotion.upsert({
    where: { profileId_promotionId: { profileId: profile.id, promotionId: promotion.id } },
    update: {},
    create: { profileId: profile.id, promotionId: promotion.id },
  });

  if (division) {
    await prisma.fighterDivision.create({
      data: { fighterProfileId: profile.fighter.id, divisionName: division, isActive: true },
    });
  }

  console.log(`✅ Created fighter: ${name} (${division})`);
  return { created: true, profileId: profile.id };
}

async function main() {
  const titlesPath = path.join(DATA_DIR, 'ufc_titles.json');
  const titles = JSON.parse(fs.readFileSync(titlesPath, 'utf8'));

  let created = 0;
  let skipped = 0;

  for (const t of titles) {
    const filePath = path.join(DATA_DIR, t.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ Missing reigns file: ${t.file}`);
      continue;
    }
    const reigns = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const division = divisionFromTitleId(t.id).replace(/^Men's\s+|^Women's\s+/i, '').trim();
    const uniqueNames = Array.from(new Set(reigns.map((r) => r.champion).filter(Boolean)));

    for (const name of uniqueNames) {
      // Build a safe tagline
      const tagline = `${t.name.replace("UFC ", '')} titleholder`;
      const res = await upsertFighterBasic(name, division, 'UFC', tagline);
      if (res.created) created++; else skipped++;
    }
  }

  console.log(`\n🎯 UFC profile backfill complete. Created: ${created}, Skipped: ${skipped}`);
}

main()
  .catch((e) => {
    console.error('❌ Backfill failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

