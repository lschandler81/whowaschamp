import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🧹 Cleaning up duplicate career highlights...')

  // Strategy: for each profile, group highlights and delete duplicates.
  // - For milestone/special_match/debut/retirement: unique by (title, category)
  // - For championship: unique by (title, date)
  const profiles = await prisma.profile.findMany({ select: { id: true, name: true } })
  let deleted = 0

  for (const p of profiles) {
    const highlights = await prisma.careerHighlight.findMany({
      where: { profileId: p.id },
      orderBy: { createdAt: 'asc' }
    })

    const seen = new Set<string>()
    for (const h of highlights) {
      const isChamp = h.category === 'championship'
      const key = isChamp
        ? `${h.title}::${new Date(h.date).toISOString()}::championship`
        : `${h.title}::${h.category || ''}`
      if (seen.has(key)) {
        await prisma.careerHighlight.delete({ where: { id: h.id } })
        deleted++
      } else {
        seen.add(key)
      }
    }
  }

  console.log(`✅ Cleanup complete. Removed ${deleted} duplicate highlights.`)
}

main().catch((e) => {
  console.error('Cleanup failed:', e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})
