#!/usr/bin/env node
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rivalries = [
  {
    a: 'The Undertaker', b: 'Kane',
    name: 'Brothers of Destruction Collide',
    desc: 'A storied, supernatural rivalry between half-brothers that spanned decades with brutal stipulations and iconic moments.',
    matches: ['WrestleMania XIV','WrestleMania XX','Hell in a Cell 2010'],
    intensity: 9, start: '1997-10-05', end: '2010-10-24'
  },
  {
    a: 'Shawn Michaels', b: 'The Undertaker',
    name: 'Mr. WrestleMania vs. The Streak',
    desc: 'Two all-time greats delivered back-to-back WrestleMania classics culminating in Shawn Michaels\' retirement.',
    matches: ['WrestleMania 25','WrestleMania 26 - Career vs. Streak'],
    intensity: 10, start: '2009-04-05', end: '2010-03-28'
  },
  {
    a: 'Bret Hart', b: 'Stone Cold Steve Austin',
    name: 'The Hitman vs. The Rattlesnake',
    desc: 'A violent feud that helped launch the Attitude Era, highlighted by an iconic double-turn at WrestleMania 13.',
    matches: ['WrestleMania 13 - Submission Match','Survivor Series 1996','In Your House: Revenge of the Taker'],
    intensity: 10, start: '1996-11-17', end: '1997-04-20'
  },
  {
    a: 'Edge', b: 'Randy Orton',
    name: 'Rated-R Superstar vs. The Viper',
    desc: 'Former friends turned enemies in a bitter, physical rivalry spanning different eras, including a heated comeback program in 2020.',
    matches: ['WrestleMania 36 - Last Man Standing','Backlash 2020 - Greatest Wrestling Match Ever'],
    intensity: 8, start: '2007-01-01', end: '2020-06-14'
  },
  {
    a: 'The Rock', b: 'Mankind',
    name: 'The Rock n\' Sock Conflict',
    desc: 'From brutal battles to comedic gold, The Rock and Mankind clashed over the WWE Championship before later forming an unlikely team.',
    matches: ['Royal Rumble 1999 - I Quit Match','Halftime Heat 1999 - Empty Arena Match'],
    intensity: 9, start: '1998-12-01', end: '1999-02-14'
  },
  {
    a: 'Ric Flair', b: 'Dusty Rhodes',
    name: 'The Nature Boy vs. The American Dream',
    desc: 'The working-class hero against the limousine-riding champion, an NWA classic that defined the 1980s.',
    matches: ['The Great American Bash 1986','Starrcade 1985'],
    intensity: 9, start: '1985-01-01', end: '1987-12-01'
  },
  {
    a: 'Chris Jericho', b: 'Shawn Michaels',
    name: 'The Paragon vs. Mr. WrestleMania',
    desc: 'A personal, hard-hitting rivalry in 2008 known for masterclass storytelling and a blood-feud intensity.',
    matches: ['WrestleMania XIX','No Mercy 2008 - Ladder Match'],
    intensity: 9, start: '2003-03-30', end: '2008-10-05'
  },
  {
    a: 'Brock Lesnar', b: 'The Undertaker',
    name: 'The Beast vs. The Phenom',
    desc: 'Lesnar ended The Undertaker\'s WrestleMania streak, sparking a multi-match rivalry filled with brutality.',
    matches: ['WrestleMania 30','SummerSlam 2015','Hell in a Cell 2015'],
    intensity: 9, start: '2014-04-06', end: '2015-10-25'
  },
  {
    a: 'Kurt Angle', b: 'Brock Lesnar',
    name: 'Olympic Hero vs. The Next Big Thing',
    desc: 'Elite athletic battles over the WWE Championship, featuring one of WrestleMania\'s greatest main events.',
    matches: ['WrestleMania XIX','SmackDown Iron Man Match 2003'],
    intensity: 8, start: '2003-02-20', end: '2003-09-18'
  },
  {
    a: 'Becky Lynch', b: 'Ronda Rousey',
    name: 'The Man vs. Rowdy',
    desc: 'A cross-sport rivalry that helped headline WrestleMania 35 and elevate the women\'s division to new heights.',
    matches: ['WrestleMania 35 - Triple Threat main event'],
    intensity: 8, start: '2018-11-01', end: '2019-04-07'
  }
];

function normalizeName(n) {
  return (n || '').normalize('NFKD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}

const aliasMap = new Map([
  ['the undertaker', ['undertaker']],
  ['undertaker', ['the undertaker']],
  ['mankind', ['mick foley', 'dude love', 'cactus jack']],
  ['triple h', ['hunter hearst helmsley', 'h\n\nunter hearst helmsley']],
]);

function candidateNames(name) {
  const base = normalizeName(name);
  const alts = aliasMap.get(base) || [];
  return [base, ...alts.map(normalizeName)];
}

async function main() {
  console.log('👥 Populating WWE rivalries...');
  const profiles = await prisma.profile.findMany({ select: { id: true, name: true, slug: true } });
  let created = 0, skipped = 0;

  for (const r of rivalries) {
    const aCands = candidateNames(r.a);
    const bCands = candidateNames(r.b);
    const aSlugCands = [r.a, ...aCands].map(s => s.replace(/\s+/g, '-'));
    const bSlugCands = [r.b, ...bCands].map(s => s.replace(/\s+/g, '-'));
    const a = profiles.find(p => aCands.includes(normalizeName(p.name)) || aSlugCands.includes(p.slug))
          || profiles.find(p => aCands.some(c => normalizeName(p.name).includes(c) || c.includes(normalizeName(p.name))));
    const b = profiles.find(p => bCands.includes(normalizeName(p.name)) || bSlugCands.includes(p.slug))
          || profiles.find(p => bCands.some(c => normalizeName(p.name).includes(c) || c.includes(normalizeName(p.name))));
    if (!a || !b) { console.log(`⚠️  Missing profiles: ${!a ? r.a : ''} ${!b ? r.b : ''}`.trim()); skipped++; continue; }

    const exists = await prisma.rivalry.findFirst({
      where: { OR: [ { wrestler1Id: a.id, wrestler2Id: b.id }, { wrestler1Id: b.id, wrestler2Id: a.id } ] }
    });
    if (exists) { console.log(`⏭️  Exists: ${a.name} vs ${b.name}`); skipped++; continue; }

    await prisma.rivalry.create({ data: {
      wrestler1Id: a.id,
      wrestler2Id: b.id,
      rivalryName: r.name,
      description: r.desc,
      notableMatches: r.matches.join(' • '),
      feudIntensity: r.intensity,
      startDate: r.start ? new Date(r.start) : null,
      endDate: r.end ? new Date(r.end) : null
    }});
    console.log(`✅ Created rivalry: ${a.name} vs ${b.name}`);
    created++;
  }

  console.log(`\n🎯 WWE rivalries complete. Created: ${created}, Skipped: ${skipped}`);
}

main().catch((e)=>{console.error(e);process.exit(1);}).finally(async()=>{await prisma.$disconnect();});
