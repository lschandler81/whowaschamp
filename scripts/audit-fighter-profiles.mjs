#!/usr/bin/env node
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const fighters = await prisma.profile.findMany({
    where: { type: 'fighter' },
    include: { fighter: true }
  });

  const missingBio = fighters.filter(f => !f.bio || f.bio.trim() === '');
  const missingStats = fighters.filter(f => !f.fighter || ((f.fighter.wins ?? 0) === 0 && (f.fighter.losses ?? 0) === 0 && (f.fighter.draws ?? 0) === 0));
  const missingStanceReach = fighters.filter(f => !f.fighter || !f.fighter.stance || !f.fighter.reach);

  console.log(`Total fighter profiles: ${fighters.length}`);
  console.log(`Missing bio: ${missingBio.length}`);
  console.log(`Missing all basic stats (wins/losses/draws): ${missingStats.length}`);
  console.log(`Missing stance or reach: ${missingStanceReach.length}`);

  const sample = (arr) => arr.slice(0, 20).map(f => `- ${f.name} (${f.slug})`).join('\n');
  if (missingBio.length) {
    console.log('\nExamples missing bio:\n' + sample(missingBio));
  }
  if (missingStats.length) {
    console.log('\nExamples missing basic stats:\n' + sample(missingStats));
  }
  if (missingStanceReach.length) {
    console.log('\nExamples missing stance/reach:\n' + sample(missingStanceReach));
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });

