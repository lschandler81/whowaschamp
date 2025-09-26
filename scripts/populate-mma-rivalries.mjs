#!/usr/bin/env node
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rivalries = [
  {
    a: 'Jon Jones',
    b: 'Daniel Cormier',
    name: 'Bones vs. DC',
    desc: 'A heated two-fight rivalry for the UFC Light Heavyweight Championship, mixing elite skill with intense personal animosity.',
    matches: [
      'UFC 182 - Jones vs. Cormier',
      'UFC 214 - Jones vs. Cormier 2'
    ],
    intensity: 10,
    start: '2014-07-23', end: '2017-07-29'
  },
  {
    a: 'Conor McGregor',
    b: 'Nate Diaz',
    name: 'The Notorious vs. The Stockton Slugger',
    desc: 'A blockbuster pair of welterweight wars that split 1–1 and cemented both as massive stars.',
    matches: [
      'UFC 196 - Diaz vs. McGregor',
      'UFC 202 - McGregor vs. Diaz 2'
    ],
    intensity: 9,
    start: '2016-03-05', end: '2016-08-20'
  },
  {
    a: 'Khabib Nurmagomedov',
    b: 'Conor McGregor',
    name: 'The Eagle vs. The Notorious',
    desc: 'One of the most intense rivalries in UFC history, culminating in a dominant title defense by Khabib and a post-fight melee.',
    matches: [
      'UFC 229 - Khabib vs. McGregor'
    ],
    intensity: 10,
    start: '2018-04-07', end: '2018-10-06'
  },
  {
    a: 'Israel Adesanya',
    b: 'Robert Whittaker',
    name: 'Stylebender vs. The Reaper',
    desc: 'Middleweight supremacy across two championship fights showcasing elite striking and tactical battles.',
    matches: [
      'UFC 243 - Adesanya vs. Whittaker',
      'UFC 271 - Adesanya vs. Whittaker 2'
    ],
    intensity: 8,
    start: '2019-10-06', end: '2022-02-12'
  },
  {
    a: 'Max Holloway',
    b: 'Alexander Volkanovski',
    name: 'Blessed vs. The Great',
    desc: 'A technical featherweight trilogy that defined an era, with razor-close decisions and high pace.',
    matches: [
      'UFC 245 - Volkanovski vs. Holloway',
      'UFC 251 - Volkanovski vs. Holloway 2',
      'UFC 276 - Volkanovski vs. Holloway 3'
    ],
    intensity: 9,
    start: '2019-12-14', end: '2022-07-02'
  },
  {
    a: 'Stipe Miocic',
    b: 'Daniel Cormier',
    name: 'The Firefighter vs. DC',
    desc: 'A heavyweight trilogy for the ages, with momentum swings and legacy on the line.',
    matches: [
      'UFC 226 - Cormier vs. Miocic',
      'UFC 241 - Miocic vs. Cormier 2',
      'UFC 252 - Miocic vs. Cormier 3'
    ],
    intensity: 9,
    start: '2018-07-07', end: '2020-08-15'
  },
  {
    a: 'Jose Aldo',
    b: 'Conor McGregor',
    name: 'Scarface vs. The Notorious',
    desc: 'A heated build-up ending in a 13-second KO that shocked the world and reshaped featherweight history.',
    matches: [
      'UFC 194 - Aldo vs. McGregor'
    ],
    intensity: 8,
    start: '2015-07-11', end: '2015-12-12'
  },
  {
    a: 'Dustin Poirier',
    b: 'Justin Gaethje',
    name: 'The Diamond vs. The Highlight',
    desc: 'Two violent classics between elite lightweights, each delivering Fight of the Year caliber action.',
    matches: [
      'UFC on Fox 29 - Poirier vs. Gaethje',
      'UFC 291 - Poirier vs. Gaethje 2'
    ],
    intensity: 8,
    start: '2018-04-14', end: '2023-07-29'
  },
  {
    a: 'Dustin Poirier',
    b: 'Conor McGregor',
    name: 'The Diamond vs. The Notorious',
    desc: 'A high-profile trilogy across featherweight and lightweight with emphatic conclusions.',
    matches: [
      'UFC 178 - McGregor vs. Poirier',
      'UFC 257 - Poirier vs. McGregor 2',
      'UFC 264 - Poirier vs. McGregor 3'
    ],
    intensity: 8,
    start: '2014-09-27', end: '2021-07-10'
  },
  {
    a: 'Charles Oliveira',
    b: 'Islam Makhachev',
    name: 'Do Bronx vs. Islam',
    desc: 'Champion vs. surging contender stylistic clash at lightweight with a rematch in Abu Dhabi.',
    matches: [
      'UFC 280 - Makhachev vs. Oliveira',
      'UFC 294 - Makhachev vs. Volkanovski 2 (Oliveira withdrew)'
    ],
    intensity: 7,
    start: '2022-10-22', end: '2023-10-21'
  },
  {
    a: 'Amanda Nunes',
    b: 'Valentina Shevchenko',
    name: 'The Lioness vs. The Bullet',
    desc: 'Two razor-thin bantamweight decisions between all-time greats in women’s MMA.',
    matches: [
      'UFC 196 - Nunes vs. Shevchenko',
      'UFC 215 - Nunes vs. Shevchenko 2'
    ],
    intensity: 8,
    start: '2016-03-05', end: '2017-09-09'
  },
  {
    a: 'Zhang Weili',
    b: 'Joanna Jedrzejczyk',
    name: 'Weili vs. Joanna',
    desc: 'Perhaps the greatest women’s fight in UFC history, followed by a spectacular rematch.',
    matches: [
      'UFC 248 - Zhang vs. Joanna',
      'UFC 275 - Zhang vs. Joanna 2'
    ],
    intensity: 9,
    start: '2020-03-07', end: '2022-06-11'
  },
  {
    a: 'Kamaru Usman',
    b: 'Colby Covington',
    name: 'The Nigerian Nightmare vs. Chaos',
    desc: 'Five-round wars for welterweight gold featuring pace, pressure, and championship grit.',
    matches: [
      'UFC 245 - Usman vs. Covington',
      'UFC 268 - Usman vs. Covington 2'
    ],
    intensity: 8,
    start: '2019-12-14', end: '2021-11-06'
  },
  {
    a: 'Leon Edwards',
    b: 'Kamaru Usman',
    name: 'Rocky vs. The Nigerian Nightmare',
    desc: 'From early-career bout to stunning head-kick KO and a trilogy conclusion on home soil.',
    matches: [
      'UFC on Fox 17 - Usman vs. Edwards',
      'UFC 278 - Edwards vs. Usman 2',
      'UFC 286 - Edwards vs. Usman 3'
    ],
    intensity: 8,
    start: '2015-12-19', end: '2023-03-18'
  },
  // Additional MMA Rivalries (expanded set)
  {
    a: 'Anderson Silva',
    b: 'Chael Sonnen',
    name: 'The Spider vs. The Gangster',
    desc: 'Classic striker vs. wrestler duology with legendary comebacks and heated trash talk.',
    matches: [
      'UFC 117 - Silva vs. Sonnen',
      'UFC 148 - Silva vs. Sonnen 2'
    ],
    intensity: 9,
    start: '2010-08-07', end: '2012-07-07'
  },
  {
    a: 'Georges St-Pierre',
    b: 'Matt Hughes',
    name: 'GSP vs. Hughes',
    desc: 'A passing-of-the-torch trilogy at welterweight between an all-time great and the dominant champion who preceded him.',
    matches: [
      'UFC 50 - Hughes vs. GSP',
      'UFC 65 - GSP vs. Hughes 2',
      'UFC 79 - GSP vs. Hughes 3'
    ],
    intensity: 9,
    start: '2004-10-22', end: '2007-12-29'
  },
  {
    a: 'Jose Aldo',
    b: 'Chad Mendes',
    name: 'Aldo vs. Mendes',
    desc: 'Elite featherweights meet twice in championship bouts showcasing speed, timing, and takedown defense.',
    matches: [
      'UFC 142 - Aldo vs. Mendes',
      'UFC 179 - Aldo vs. Mendes 2'
    ],
    intensity: 8,
    start: '2012-01-14', end: '2014-10-25'
  },
  {
    a: 'Dominick Cruz',
    b: 'Urijah Faber',
    name: 'Cruz vs. Faber',
    desc: 'Bantamweight trilogy between rivals whose styles and history defined the early UFC/WEC bantamweight era.',
    matches: [
      'WEC 26 - Faber vs. Cruz',
      'UFC 132 - Cruz vs. Faber 2',
      'UFC 199 - Cruz vs. Faber 3'
    ],
    intensity: 8,
    start: '2007-03-24', end: '2016-06-04'
  },
  {
    a: 'Kamaru Usman',
    b: 'Jorge Masvidal',
    name: 'Usman vs. Masvidal',
    desc: 'Championship rivalry across two fights — short-notice grit followed by a definitive KO.',
    matches: [
      'UFC 251 - Usman vs. Masvidal',
      'UFC 261 - Usman vs. Masvidal 2'
    ],
    intensity: 7,
    start: '2020-07-12', end: '2021-04-24'
  },
  {
    a: 'Zhang Weili',
    b: 'Rose Namajunas',
    name: 'Weili vs. Thug Rose',
    desc: 'Two high-level strawweight title fights with knockouts, tactics, and championship heart.',
    matches: [
      'UFC 261 - Namajunas vs. Zhang',
      'UFC 268 - Namajunas vs. Zhang 2'
    ],
    intensity: 8,
    start: '2021-04-24', end: '2021-11-06'
  },
  {
    a: 'Valentina Shevchenko',
    b: 'Alexa Grasso',
    name: 'Bullet vs. Grasso',
    desc: 'Flyweight title rivalry producing dramatic swings and high-level adjustments across back-to-back bouts.',
    matches: [
      'UFC 285 - Grasso vs. Shevchenko',
      'Noche UFC 2023 - Grasso vs. Shevchenko 2'
    ],
    intensity: 8,
    start: '2023-03-04', end: '2023-09-16'
  }
];

function normalizeName(n) {
  return n.normalize('NFKD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}

async function main() {
  console.log('🥊 Populating MMA rivalries...');
  const profiles = await prisma.profile.findMany({ select: { id: true, name: true, slug: true } });

  let created = 0, skipped = 0;
  for (const r of rivalries) {
    const a = profiles.find(p => p.name === r.a) || profiles.find(p => normalizeName(p.name).includes(normalizeName(r.a)) || normalizeName(r.a).includes(normalizeName(p.name)));
    const b = profiles.find(p => p.name === r.b) || profiles.find(p => normalizeName(p.name).includes(normalizeName(r.b)) || normalizeName(r.b).includes(normalizeName(p.name)));
    if (!a || !b) {
      console.log(`⚠️  Missing profiles: ${!a ? r.a : ''} ${!b ? r.b : ''}`.trim());
      skipped++;
      continue;
    }

    const exists = await prisma.rivalry.findFirst({
      where: {
        OR: [
          { wrestler1Id: a.id, wrestler2Id: b.id },
          { wrestler1Id: b.id, wrestler2Id: a.id }
        ]
      }
    });
    if (exists) {
      console.log(`⏭️  Exists: ${a.name} vs ${b.name}`);
      skipped++;
      continue;
    }

    await prisma.rivalry.create({
      data: {
        wrestler1Id: a.id,
        wrestler2Id: b.id,
        rivalryName: r.name,
        description: r.desc,
        notableMatches: r.matches.join(' • '),
        feudIntensity: r.intensity,
        startDate: r.start ? new Date(r.start) : null,
        endDate: r.end ? new Date(r.end) : null
      }
    });
    console.log(`✅ Created rivalry: ${a.name} vs ${b.name}`);
    created++;
  }

  console.log(`\n🎯 MMA rivalries complete. Created: ${created}, Skipped: ${skipped}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
