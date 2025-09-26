import { PrismaClient } from '@prisma/client';
import fs from 'node:fs';
import path from 'node:path';
import { toSlug } from '../lib/slug';

type InputFighter = {
  name: string;
  nickname?: string;
  promotion?: string; // defaults to UFC
  hometown?: string;
  height?: string;
  weight?: string;
  debut?: string;    // ISO date
  retired?: string;  // ISO date
  stance?: string;
  reach?: string;
  divisions: string[];
};

const prisma = new PrismaClient();

async function ensurePromotion(name: string) {
  const slug = toSlug(name);
  let promotion = await prisma.promotion.findFirst({
    where: { OR: [{ name }, { slug }] }
  });
  if (!promotion) {
    promotion = await prisma.promotion.create({ data: { name, slug } });
    console.log(`✅ Created promotion: ${name}`);
  }
  return promotion;
}

async function upsertFighter(f: InputFighter) {
  const promotionName = f.promotion || 'UFC';
  const divisions = Array.from(new Set((f.divisions || []).filter(Boolean)));
  if (!f.name || divisions.length === 0) {
    throw new Error(`Invalid fighter record: name and at least one division are required. Got: ${JSON.stringify(f)}`);
  }

  // Skip if exists by name or slug
  const existing = await prisma.profile.findFirst({
    where: { OR: [{ name: f.name }, { slug: toSlug(f.name) }] }
  });
  if (existing) {
    console.log(`⏭️  Skipping ${f.name} — already exists`);
    return { profileId: existing.id, created: false };
  }

  // Create base profile and fighter details
  const profile = await prisma.profile.create({
    data: {
      name: f.name,
      slug: toSlug(f.name),
      nickname: f.nickname,
      type: 'fighter',
      hometown: f.hometown,
      height: f.height,
      weight: f.weight,
      debut: f.debut ? new Date(f.debut) : null,
      retired: f.retired ? new Date(f.retired) : null,
      fighter: {
        create: {
          stance: f.stance,
          reach: f.reach,
          // Stats default to 0 in schema
        }
      }
    },
    include: { fighter: true }
  });

  const promotion = await ensurePromotion(promotionName);

  // Link promotion
  await prisma.profilePromotion.upsert({
    where: {
      profileId_promotionId: { profileId: profile.id, promotionId: promotion.id }
    },
    update: {},
    create: { profileId: profile.id, promotionId: promotion.id }
  });

  // Add divisions
  for (const divisionName of divisions) {
    await prisma.fighterDivision.create({
      data: {
        fighterProfileId: profile.fighter!.id,
        divisionName,
        isActive: !Boolean(f.retired)
      }
    });
  }

  console.log(`✅ Created fighter: ${f.name} (${divisions.join(', ')})`);
  return { profileId: profile.id, created: true };
}

async function main() {
  const file = path.resolve('data/ufc_fighters.json');
  if (!fs.existsSync(file)) {
    throw new Error(`data/ufc_fighters.json not found. Create it to proceed.`);
  }
  const raw = fs.readFileSync(file, 'utf8');
  const fighters: InputFighter[] = JSON.parse(raw);

  console.log(`🥋 Importing ${fighters.length} UFC fighters from JSON...`);
  let created = 0;
  let skipped = 0;
  for (const f of fighters) {
    try {
      const res = await upsertFighter(f);
      if (res.created) created++; else skipped++;
    } catch (e) {
      console.error(`❌ Failed ${f.name}:`, e);
    }
  }
  console.log(`\n🎯 Done. Created: ${created}, Skipped: ${skipped}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

