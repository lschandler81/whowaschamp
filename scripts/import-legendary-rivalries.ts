import { PrismaClient } from '@prisma/client';
import { toSlug } from '../lib/slug';

const prisma = new PrismaClient();

const LEGENDARY_RIVALRIES = [
  // Attitude Era Rivalries
  {
    wrestler1Name: "Stone Cold Steve Austin",
    wrestler2Name: "The Rock", 
    rivalryName: "Austin vs Rock",
    startDate: new Date("1997-04-01"),
    endDate: new Date("2003-03-30"),
    description: "The defining rivalry of the Attitude Era between WWE's biggest stars. Three WrestleMania main events and countless classic matches.",
    notableMatches: [
      "WrestleMania XV (1999) - First WrestleMania main event",
      "WrestleMania X-Seven (2001) - Austin heel turn", 
      "WrestleMania XIX (2003) - Rock's farewell match"
    ],
    feudIntensity: 10,
    promotionName: "WWE"
  },
  {
    wrestler1Name: "Stone Cold Steve Austin",
    wrestler2Name: "Mr. McMahon",
    rivalryName: "Austin vs McMahon",
    startDate: new Date("1997-11-09"),
    endDate: new Date("2001-04-01"),
    description: "The anti-authority storyline that launched the Attitude Era. Austin vs the evil boss captured mainstream attention.",
    notableMatches: [
      "Survivor Series 1997 - Montreal Screwjob aftermath",
      "WrestleMania XIV (1998) - Mike Tyson as special enforcer",
      "St. Valentine's Day Massacre 1999 - Steel Cage"
    ],
    feudIntensity: 10,
    promotionName: "WWE"
  },
  {
    wrestler1Name: "The Undertaker", 
    wrestler2Name: "Kane",
    rivalryName: "Brothers of Destruction",
    startDate: new Date("1997-10-05"),
    endDate: new Date("2010-10-10"),
    description: "The supernatural sibling rivalry that spanned over a decade with multiple iterations and reunions.",
    notableMatches: [
      "Badd Blood 1997 - Kane debuts and costs Undertaker Hell in a Cell",
      "WrestleMania XIV (1998) - First singles match",
      "WrestleMania XX (2004) - Paul Bearer returns"
    ],
    feudIntensity: 9,
    promotionName: "WWE"
  },
  
  // Golden Era Rivalries
  {
    wrestler1Name: "Hulk Hogan",
    wrestler2Name: "Randy Savage",
    rivalryName: "The Mega Powers Explode", 
    startDate: new Date("1988-02-05"),
    endDate: new Date("1989-04-02"),
    description: "The friendship that turned into betrayal when Savage's jealousy over Elizabeth destroyed the Mega Powers.",
    notableMatches: [
      "The Main Event (1988) - Hogan accidentally eliminates Savage",
      "WrestleMania V (1989) - The Mega Powers Explode",
      "Saturday Night's Main Event - Multiple confrontations"
    ],
    feudIntensity: 8,
    promotionName: "WWE"
  },
  {
    wrestler1Name: "Hulk Hogan",
    wrestler2Name: "Andre the Giant",
    rivalryName: "Hogan vs Andre",
    startDate: new Date("1987-01-01"),
    endDate: new Date("1988-02-05"),
    description: "The bodyslam heard 'round the world. Andre's heel turn created the most iconic wrestling storyline of the 1980s.",
    notableMatches: [
      "WrestleMania III (1987) - The bodyslam and leg drop",
      "The Main Event (1988) - The controversial title change",
      "WrestleMania IV (1988) - Tournament implications"
    ],
    feudIntensity: 10,
    promotionName: "WWE"
  },
  
  // New Generation Era
  {
    wrestler1Name: "Bret Hart",
    wrestler2Name: "Shawn Michaels",
    rivalryName: "The Excellence vs The Showstopper",
    startDate: new Date("1992-01-01"),
    endDate: new Date("1997-11-09"),
    description: "Professional rivalry that became personal animosity, culminating in the Montreal Screwjob at Survivor Series 1997.",
    notableMatches: [
      "WrestleMania XII (1996) - Iron Man Match, HBK wins first WWF Title",
      "Survivor Series 1997 - The Montreal Screwjob",
      "In Your House: Ground Zero (1997) - DX vs Hart Foundation"
    ],
    feudIntensity: 9,
    promotionName: "WWE"
  },
  
  // Territory Era Rivalries  
  {
    wrestler1Name: "Ric Flair",
    wrestler2Name: "Dusty Rhodes",
    rivalryName: "Nature Boy vs American Dream",
    startDate: new Date("1978-01-01"),
    endDate: new Date("1989-12-31"),
    description: "Rich man vs common man. The ultimate territory era rivalry that defined the NWA for over a decade.",
    notableMatches: [
      "Starrcade 1985 - 'I Quit' Match in a Steel Cage",
      "The Great American Bash 1986 - Multiple encounters",
      "Starrcade 1984 - Flair wins NWA Title from Dusty"
    ],
    feudIntensity: 10,
    promotionName: "NWA"
  },
  {
    wrestler1Name: "Ric Flair",
    wrestler2Name: "Ricky Steamboat",
    rivalryName: "Flair vs Steamboat",
    startDate: new Date("1977-01-01"),
    endDate: new Date("1994-12-31"),
    description: "The greatest trilogy in wrestling history. Technical excellence and storytelling at its finest.",
    notableMatches: [
      "Chi-Town Rumble 1989 - Steamboat wins NWA Title",
      "Clash of the Champions VI - Steamboat retains",
      "WrestleWar 1989 - Flair regains title"
    ],
    feudIntensity: 10,
    promotionName: "NWA"
  },
  
  // Monday Night Wars Rivalries
  {
    wrestler1Name: "Hollywood Hogan",
    wrestler2Name: "Sting",
    rivalryName: "nWo vs WCW",
    startDate: new Date("1996-07-07"),
    endDate: new Date("1997-12-28"),
    description: "Sting's year-long quest for revenge against Hogan and the nWo. The Crow character transformation.",
    notableMatches: [
      "Starrcade 1997 - Sting ends Hogan's 469-day reign",
      "Spring Stampede 1999 - Sting wins WCW Title", 
      "Halloween Havoc 1999 - Retirement match"
    ],
    feudIntensity: 9,
    promotionName: "WCW"
  },
  {
    wrestler1Name: "Goldberg", 
    wrestler2Name: "Kevin Nash",
    rivalryName: "The Streak vs Outsider",
    startDate: new Date("1998-11-01"),
    endDate: new Date("1999-01-04"),
    description: "Nash ends Goldberg's legendary undefeated streak with help from Scott Hall's taser.",
    notableMatches: [
      "Starrcade 1998 - Nash breaks the streak",
      "Souled Out 1999 - Rematch aftermath",
      "Monday Nitro - Multiple confrontations"
    ],
    feudIntensity: 8,
    promotionName: "WCW"
  },
  
  // Ruthless Aggression Era
  {
    wrestler1Name: "Triple H",
    wrestler2Name: "Mick Foley",
    rivalryName: "The Game vs Hardcore Legend",
    startDate: new Date("1997-09-01"),
    endDate: new Date("2000-06-25"),
    description: "Brutal hardcore matches that established Triple H as a main event player and pushed Foley to his limits.",
    notableMatches: [
      "Royal Rumble 2000 - Street Fight for WWF Championship",
      "No Way Out 2000 - Hell in a Cell",
      "WrestleMania 2000 - Fatal 4-Way"
    ],
    feudIntensity: 8,
    promotionName: "WWE" 
  },
  {
    wrestler1Name: "The Rock",
    wrestler2Name: "Triple H",
    rivalryName: "People's Champ vs The Game",
    startDate: new Date("1998-08-01"),
    endDate: new Date("2002-07-21"),
    description: "Two future legends battling for supremacy in the post-Austin era with championship gold on the line.",
    notableMatches: [
      "Backlash 2000 - Rock wins WWF Championship",
      "King of the Ring 2000 - Iron Man Match",
      "Judgment Day 2000 - 60-minute Iron Man Match"
    ],
    feudIntensity: 8,
    promotionName: "WWE"
  },
  
  // PG/Modern Era
  {
    wrestler1Name: "John Cena",
    wrestler2Name: "CM Punk",
    rivalryName: "Cenation vs Straight Edge",
    startDate: new Date("2011-06-27"),
    endDate: new Date("2013-02-17"), 
    description: "The pipe bomb promo launched a rivalry between WWE's face and the anti-establishment hero.",
    notableMatches: [
      "Money in the Bank 2011 - Punk wins in Chicago",
      "SummerSlam 2011 - Punk vs Cena II",
      "Royal Rumble 2013 - Rock screws Punk"
    ],
    feudIntensity: 9,
    promotionName: "WWE"
  },
  {
    wrestler1Name: "Daniel Bryan",
    wrestler2Name: "Triple H",
    rivalryName: "Yes Movement vs Authority",
    startDate: new Date("2013-08-18"),
    endDate: new Date("2014-04-06"),
    description: "The ultimate underdog story as Daniel Bryan fought against The Authority to reach the top of WWE.",
    notableMatches: [
      "SummerSlam 2013 - Triple H screws Bryan",
      "WrestleMania XXX - Bryan beats HHH and wins WWE Title",
      "Extreme Rules 2014 - Bryan vs Kane"
    ],
    feudIntensity: 9,
    promotionName: "WWE"
  },
  
  // Modern AEW Era
  {
    wrestler1Name: "Kenny Omega",
    wrestler2Name: "Jon Moxley",
    rivalryName: "Best Bout Machine vs Purveyor of Violence",
    startDate: new Date("2020-12-02"),
    endDate: new Date("2021-02-03"),
    description: "AEW's first major world title feud featuring hardcore stipulations and incredible storytelling.",
    notableMatches: [
      "Winter Is Coming 2020 - Omega beats Moxley for AEW Title",
      "Revolution 2021 - Exploding Barbed Wire Death Match",
      "Beach Break 2021 - Contract signing segment"
    ],
    feudIntensity: 8,
    promotionName: "AEW"
  },
  {
    wrestler1Name: "CM Punk",
    wrestler2Name: "MJF",
    rivalryName: "Best in the World vs Better Than You",
    startDate: new Date("2022-05-29"),
    endDate: new Date("2023-09-04"),
    description: "The student vs teacher dynamic with MJF learning from his hero before betraying him.",
    notableMatches: [
      "Revolution 2022 - Dog Collar Match",
      "All Out 2022 - MJF wins with brass knuckles",
      "Double or Nothing 2023 - World Title match"
    ],
    feudIntensity: 9,
    promotionName: "AEW"
  },
  
  // Women's Wrestling Rivalries
  {
    wrestler1Name: "Trish Stratus",
    wrestler2Name: "Lita", 
    rivalryName: "Attitude Era Women's Icons",
    startDate: new Date("2000-04-02"),
    endDate: new Date("2006-12-04"),
    description: "The rivalry that elevated women's wrestling in WWE and created two Hall of Fame careers.",
    notableMatches: [
      "Unforgiven 2006 - Trish's retirement match",
      "Raw 2004 - Multiple title exchanges",
      "WrestleMania 22 - Women's Championship"
    ],
    feudIntensity: 8,
    promotionName: "WWE"
  },
  
  // International Rivalries
  {
    wrestler1Name: "Kazuchika Okada",
    wrestler2Name: "Kenny Omega",
    rivalryName: "Rainmaker vs Cleaner", 
    startDate: new Date("2017-01-04"),
    endDate: new Date("2018-06-09"),
    description: "The greatest modern wrestling rivalry featuring multiple 6-star matches and incredible storytelling.",
    notableMatches: [
      "Wrestle Kingdom 11 - Okada retains IWGP Title",
      "Wrestle Kingdom 12 - 2/3 Falls Classic", 
      "Dominion 2018 - Omega finally wins the big one"
    ],
    feudIntensity: 10,
    promotionName: "NJPW"
  }
];

async function importLegendaryRivalries() {
  console.log('⚔️  IMPORTING LEGENDARY WRESTLING RIVALRIES');
  console.log('═══════════════════════════════════════════');
  
  let importedCount = 0;
  let skippedCount = 0;

  for (const rivalry of LEGENDARY_RIVALRIES) {
    try {
      // Find both wrestlers
      const wrestler1 = await prisma.profile.findUnique({
        where: { slug: toSlug(rivalry.wrestler1Name) }
      });
      
      const wrestler2 = await prisma.profile.findUnique({
        where: { slug: toSlug(rivalry.wrestler2Name) }
      });

      if (!wrestler1) {
        console.log(`⚠️  Skipping ${rivalry.rivalryName} - ${rivalry.wrestler1Name} not found in database`);
        skippedCount++;
        continue;
      }

      if (!wrestler2) {
        console.log(`⚠️  Skipping ${rivalry.rivalryName} - ${rivalry.wrestler2Name} not found in database`);
        skippedCount++;
        continue;
      }

      // Check if rivalry already exists (either direction)
      const existingRivalry = await prisma.rivalry.findFirst({
        where: {
          OR: [
            { wrestler1Id: wrestler1.id, wrestler2Id: wrestler2.id },
            { wrestler1Id: wrestler2.id, wrestler2Id: wrestler1.id }
          ]
        }
      });

      if (existingRivalry) {
        console.log(`⚠️  Skipping ${rivalry.rivalryName} - already exists`);
        skippedCount++;
        continue;
      }

      // Find promotion
      let promotion = null;
      if (rivalry.promotionName) {
        promotion = await prisma.promotion.findFirst({
          where: {
            OR: [
              { slug: toSlug(rivalry.promotionName) },
              { name: rivalry.promotionName }
            ]
          }
        });
      }

      // Create the rivalry
      await prisma.rivalry.create({
        data: {
          wrestler1Id: wrestler1.id,
          wrestler2Id: wrestler2.id,
          rivalryName: rivalry.rivalryName,
          startDate: rivalry.startDate,
          endDate: rivalry.endDate,
          description: rivalry.description,
          notableMatches: JSON.stringify(rivalry.notableMatches),
          feudIntensity: rivalry.feudIntensity,
          promotionId: promotion?.id || null,
        }
      });

      console.log(`✅ Created rivalry: ${rivalry.rivalryName}`);
      console.log(`   └── ${rivalry.wrestler1Name} vs ${rivalry.wrestler2Name} (${rivalry.feudIntensity}/10 intensity)`);
      importedCount++;

    } catch (error) {
      console.error(`❌ Error creating rivalry ${rivalry.rivalryName}:`, error);
    }
  }

  console.log('\n📊 RIVALRY IMPORT SUMMARY:');
  console.log(`✅ Successfully imported: ${importedCount} rivalries`);
  console.log(`⚠️  Skipped: ${skippedCount} rivalries`); 
  console.log(`📦 Total rivalries in dataset: ${LEGENDARY_RIVALRIES.length}`);
}

// Run the import
importLegendaryRivalries()
  .catch(console.error)
  .finally(() => prisma.$disconnect());