import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Canonical dates for known predefined highlights by profile slug
const CANONICAL: Record<string, { title: string; date: string }[]> = {
  'stone-cold-steve-austin': [
    { title: 'Austin 3:16 Promo', date: '1996-06-23' },
    { title: 'First WWE Championship', date: '1998-03-29' },
    { title: 'Beer Truck Incident', date: '1999-03-22' },
  ],
  'hulk-hogan': [
    { title: 'First WWE Championship', date: '1984-01-23' },
    { title: 'WrestleMania Main Event', date: '1985-03-31' },
    { title: 'NWO Formation', date: '1996-07-07' },
  ],
  'shawn-michaels': [
    { title: 'The Rockers Breakup', date: '1992-01-12' },
    { title: 'Iron Man Match Victory', date: '1996-03-31' },
    { title: 'Lost My Smile Controversy', date: '1997-02-13' },
  ],
  'bret-hart': [
    { title: 'Montreal Screwjob', date: '1997-11-09' },
  ],
  'mick-foley': [
    { title: 'Hell in a Cell Fall', date: '1998-06-28' },
    { title: 'WWE Championship Victory', date: '1999-01-04' },
  ],
  'kane': [
    { title: 'Debut and Undertaker Attack', date: '1997-10-05' },
    { title: 'Unmasking', date: '2003-06-23' },
  ],
  'eddie-guerrero': [
    { title: 'WWE Championship Victory', date: '2004-02-15' },
  ],
  'andre-the-giant': [
    { title: 'WrestleMania III Body Slam', date: '1987-03-29' },
  ],
  'goldberg': [
    { title: 'WCW Winning Streak', date: '1998-07-06' },
  ],
}

async function main() {
  console.log('🛠  Fixing highlight dates for known items...')

  for (const [slug, entries] of Object.entries(CANONICAL)) {
    const profile = await prisma.profile.findFirst({ where: { slug } })
    if (!profile) continue

    for (const { title, date } of entries) {
      const highlights = await prisma.careerHighlight.findMany({
        where: { profileId: profile.id, title },
        orderBy: { createdAt: 'asc' },
      })
      if (highlights.length === 0) continue

      // Update all to canonical date (idempotent)
      const when = new Date(date)
      for (const h of highlights) {
        if (h.date.toISOString().slice(0, 10) !== date) {
          await prisma.careerHighlight.update({ where: { id: h.id }, data: { date: when } })
        }
      }
      console.log(`✔ ${slug}: set ${title} => ${date}`)
    }
  }

  // Generic fix: replace obviously wrong "today" dates for non-champ highlights
  const todayISO = new Date().toISOString().slice(0, 10)
  const profiles = await prisma.profile.findMany({
    select: { id: true, slug: true, name: true, debut: true, retired: true }
  })
  for (const p of profiles) {
    const hs = await prisma.careerHighlight.findMany({ where: { profileId: p.id } })
    for (const h of hs) {
      const hISO = h.date.toISOString().slice(0, 10)
      if (hISO === todayISO && h.category !== 'championship') {
        let newDate: Date | null = null
        if (h.title === 'Professional Debut' && p.debut) newDate = p.debut
        if (h.title === 'Retirement' && p.retired) newDate = p.retired
        if (h.title === 'In Memoriam') {
          // try from CANONICAL deceased in cleanup script data? fallback leave as is
          newDate = null
        }
        if (!newDate) {
          // Stable placeholder to avoid drifting "today" values
          newDate = new Date('2000-01-01')
        }
        await prisma.careerHighlight.update({ where: { id: h.id }, data: { date: newDate } })
      }
    }
  }

  console.log('✅ Highlight date normalization complete')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})
