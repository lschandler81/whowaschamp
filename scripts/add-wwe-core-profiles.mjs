#!/usr/bin/env node
import { PrismaClient } from '@prisma/client';
import crypto from 'node:crypto';

const prisma = new PrismaClient();

const wrestlers = [
  {
    name: 'The Undertaker',
    nickname: 'The Phenom',
    hometown: 'Death Valley',
    type: 'wrestler'
  },
  {
    name: 'Kane',
    nickname: 'The Big Red Machine',
    hometown: 'Parts Unknown',
    type: 'wrestler'
  },
  {
    name: 'Mankind',
    nickname: 'The Deranged One',
    hometown: 'Truth or Consequences, New Mexico',
    type: 'wrestler'
  }
];

function toSlug(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/[\'’`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function upsertWrestler(w) {
  const existing = await prisma.profile.findFirst({ where: { OR: [ { name: w.name }, { slug: toSlug(w.name) } ] } });
  if (existing) return { created: false, id: existing.id };
  const profile = await prisma.profile.create({
    data: {
      name: w.name,
      slug: toSlug(w.name),
      nickname: w.nickname,
      type: 'wrestler',
      hometown: w.hometown,
      tagline: w.nickname || '',
      wrestler: {
        create: {
          finisher: null,
          era: 'Modern',
          worldTitleReigns: 0,
          combinedDaysAsChampion: 0
        }
      }
    },
    include: { wrestler: true }
  });
  return { created: true, id: profile.id };
}

async function main() {
  console.log('🧱 Ensuring core WWE profiles exist...');
  let created = 0, skipped = 0;
  for (const w of wrestlers) {
    const res = await upsertWrestler(w);
    if (res.created) { console.log(`✅ Created profile: ${w.name}`); created++; } else { console.log(`⏭️  Exists: ${w.name}`); skipped++; }
  }
  console.log(`\n🎯 Core WWE profiles: Created ${created}, Skipped ${skipped}`);
}

main().catch((e)=>{console.error(e);process.exit(1);}).finally(async()=>{await prisma.$disconnect();});

