import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

async function main() {
  console.log('🧹 Cleaning up duplicate career highlights...')

  // Strategy: for each profile, group highlights and delete duplicates.
  // - For milestone/special_match/debut/retirement: unique by (title, category)
  // - For championship: unique by (title, date)
  const profiles = await prisma.profile.findMany({ select: { id: true, name: true } })
  let deleted = 0

  // Deceased set with dates to ensure memorials exist and retirements removed
  const DECEASED: Record<string, string> = {
    'Eddie Guerrero': '2005-11-13',
    'Owen Hart': '1999-05-23',
    'Andre the Giant': '1993-01-27',
    'Randy Savage': '2011-05-20',
    'Ultimate Warrior': '2014-04-08',
    'Yokozuna': '2000-10-23',
    'Mr. Perfect': '2003-02-10',
    'Curt Hennig': '2003-02-10',
    'Rick Rude': '1999-04-20',
    'British Bulldog': '2002-05-18',
    'Dynamite Kid': '2018-12-05',
    'Vader': '2018-06-18',
    'Chyna': '2016-04-20',
    'Test': '2009-03-13',
    'Big Boss Man': '2004-09-22',
    'Kamala': '2020-08-09',
    'King Kong Bundy': '2019-03-04',
    'Road Warrior Hawk': '2003-10-19',
    'Bruno Sammartino': '2018-04-18',
    'Buddy Rogers': '1992-06-26',
    'Pedro Morales': '2019-02-12',
    'Ivan Koloff': '2017-02-18',
    'Superstar Billy Graham': '2023-05-17',
    'The Iron Sheik': '2023-06-07',
    'Dusty Rhodes': '2015-06-11',
    'Roddy Piper': '2015-07-31',
    'Scott Hall': '2022-03-14',
    'Razor Ramon': '2022-03-14',
    'Bam Bam Bigelow': '2007-01-19',
    'Chris Benoit': '2007-06-24',
    'Mitsuharu Misawa': '2009-06-13'
  }

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

    // Remove incorrect 'Retirement' and ensure 'In Memoriam' for all deceased
    if (DECEASED[p.name]) {
      const retirements = await prisma.careerHighlight.findMany({
        where: { profileId: p.id, title: 'Retirement' }
      })
      for (const r of retirements) {
        await prisma.careerHighlight.delete({ where: { id: r.id } })
        deleted++
      }
      const memorial = await prisma.careerHighlight.findFirst({
        where: { profileId: p.id, title: 'In Memoriam' }
      })
      if (!memorial) {
        await prisma.careerHighlight.create({
          data: {
            id: randomUUID(),
            profileId: p.id,
            title: 'In Memoriam',
            description: `Remembering the life and legacy of ${p.name}`,
            date: new Date(DECEASED[p.name]),
            category: 'milestone',
            importance: 9
          }
        })
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
