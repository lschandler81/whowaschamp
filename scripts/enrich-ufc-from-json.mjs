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

async function ensurePromotion(name) {
  const slug = toSlug(name);
  let p = await prisma.promotion.findFirst({ where: { OR: [{ name }, { slug }] } });
  if (!p) p = await prisma.promotion.create({ data: { name, slug } });
  return p;
}

async function addDivisionIfMissing(fighterProfileId, divisionName, isActive) {
  const exists = await prisma.fighterDivision.findFirst({
    where: { fighterProfileId, divisionName }
  });
  if (!exists) {
    await prisma.fighterDivision.create({ data: { fighterProfileId, divisionName, isActive } });
  }
}

async function addChampionshipIfMissing(profileId, promotionId, c) {
  const existing = await prisma.championship.findFirst({
    where: {
      profileId,
      promotionId,
      titleName: c.title,
      wonDate: c.firstWon ? new Date(c.firstWon) : undefined
    }
  });
  if (!existing) {
    await prisma.championship.create({
      data: {
        profileId,
        promotionId,
        titleName: c.title,
        reignNumber: c.reigns || 1,
        wonDate: c.firstWon ? new Date(c.firstWon) : new Date(),
        lostDate: c.lastWon ? new Date(c.lastWon) : null,
        daysHeld: c.totalDays || null,
        isCurrentChampion: !c.lastWon
      }
    });
  }
}

async function enrichOne(entry) {
  const slug = entry.slug || toSlug(entry.name);
  const profile = await prisma.profile.findFirst({ where: { OR: [{ slug }, { name: entry.name }] }, include: { fighter: true } });
  if (!profile) {
    // Create minimal profile then enrich
    const created = await prisma.profile.create({
      data: {
        name: entry.name,
        slug,
        type: 'fighter',
        nickname: entry.nickname,
        hometown: entry.birthPlace,
        height: entry.height,
        weight: entry.weight,
        debut: entry.debut ? new Date(entry.debut) : null,
        retired: entry.retired ? new Date(entry.retired) : null,
        bio: entry.biography,
        fighter: {
          create: {
            stance: entry.stance,
            reach: entry.reach,
            wins: entry.careerStats?.wins || 0,
            losses: entry.careerStats?.losses || 0,
            draws: entry.careerStats?.draws || 0,
            titleReigns: entry.careerStats?.titleReigns || 0
          }
        }
      },
      include: { fighter: true }
    });
    return created;
  }

  // Update sparse fields only (do not overwrite existing non-empty)
  const updates = {};
  if (!profile.nickname && entry.nickname) updates.nickname = entry.nickname;
  if (!profile.hometown && entry.birthPlace) updates.hometown = entry.birthPlace;
  if (!profile.height && entry.height) updates.height = entry.height;
  if (!profile.weight && entry.weight) updates.weight = entry.weight;
  if (!profile.debut && entry.debut) updates.debut = new Date(entry.debut);
  if (!profile.retired && entry.retired) updates.retired = new Date(entry.retired);
  if (!profile.bio && entry.biography) updates.bio = entry.biography;

  let updated = profile;
  if (Object.keys(updates).length > 0) {
    updated = await prisma.profile.update({ where: { id: profile.id }, data: updates, include: { fighter: true } });
  }

  // Fighter subfields
  if (updated.fighter) {
    const fu = {};
    if (!updated.fighter.stance && entry.stance) fu.stance = entry.stance;
    if (!updated.fighter.reach && entry.reach) fu.reach = entry.reach;
    if ((updated.fighter.wins || 0) === 0 && entry.careerStats?.wins) fu.wins = entry.careerStats.wins;
    if ((updated.fighter.losses || 0) === 0 && entry.careerStats?.losses) fu.losses = entry.careerStats.losses;
    if ((updated.fighter.draws || 0) === 0 && entry.careerStats?.draws !== undefined) fu.draws = entry.careerStats.draws;
    if ((updated.fighter.titleReigns || 0) === 0 && entry.careerStats?.titleReigns) fu.titleReigns = entry.careerStats.titleReigns;
    if (Object.keys(fu).length > 0) {
      await prisma.fighterProfile.update({ where: { id: updated.fighter.id }, data: fu });
    }
  }

  // Promotion link
  const promotionName = entry.promotion || 'UFC';
  const promotion = await ensurePromotion(promotionName);
  await prisma.profilePromotion.upsert({
    where: { profileId_promotionId: { profileId: profile.id, promotionId: promotion.id } },
    update: {},
    create: { profileId: profile.id, promotionId: promotion.id }
  });

  // Divisions
  const fighter = await prisma.fighterProfile.findUnique({ where: { profileId: profile.id } });
  if (fighter && Array.isArray(entry.divisions)) {
    for (const d of entry.divisions) {
      await addDivisionIfMissing(fighter.id, d, !Boolean(entry.retired));
    }
  }

  // Championships
  if (Array.isArray(entry.championships) && entry.championships.length > 0) {
    for (const c of entry.championships) {
      await addChampionshipIfMissing(profile.id, promotion.id, c);
    }
  }

  return updated;
}

async function main() {
  const file = path.resolve('data/ufc_enrichment.json');
  if (!fs.existsSync(file)) throw new Error('data/ufc_enrichment.json not found');
  const entries = JSON.parse(fs.readFileSync(file, 'utf8'));
  let created = 0, updated = 0;
  for (const e of entries) {
    const res = await enrichOne(e);
    if (res.createdAt && res.updatedAt && res.createdAt.getTime() === res.updatedAt.getTime()) created++; else updated++;
  }
  console.log(`\n🎯 Enrichment complete. Created: ${created}, Updated: ${updated}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });

