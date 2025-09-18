import { PrismaClient } from '@prisma/client';
import { toSlug } from '../lib/slug';

const prisma = new PrismaClient();

const MODERN_INDIE_AEW_WRESTLERS = [
  // AEW World Champions & Main Event Stars
  {
    name: "Kenny Omega",
    nickname: "The Cleaner",
    hometown: "Winnipeg, Manitoba",
    height: "6'0\"",
    weight: "203 lbs",
    debut: new Date("2000-08-12"),
    tagline: "The Best Bout Machine",
    bio: "Former AEW World Heavyweight Champion and leader of The Elite. Considered by many as the best wrestler in the world.",
    era: "Modern",
    finisher: "One Winged Angel",
    promotions: ["AEW", "NJPW", "PWG"],
    championships: [
      { title: "AEW World Heavyweight Championship", promotionSlug: "aew", wonDate: "2020-12-02", lostDate: "2021-11-13", daysHeld: 346, wonFrom: "Jon Moxley", lostTo: "Hangman Page" },
      { title: "IWGP Heavyweight Championship", promotionSlug: "njpw", wonDate: "2018-06-09", lostDate: "2018-08-12", daysHeld: 64, wonFrom: "Kazuchika Okada", lostTo: "Hiroshi Tanahashi" }
    ]
  },
  {
    name: "Jon Moxley",
    nickname: "The Purveyor of Violence",
    hometown: "Cincinnati, Ohio",
    height: "6'4\"",
    weight: "234 lbs",
    debut: new Date("2004-05-01"),
    tagline: "Unscripted Violence",
    bio: "AEW World Heavyweight Champion and hardcore legend who left WWE to become the face of AEW.",
    era: "Modern",
    finisher: "Paradigm Shift",
    promotions: ["AEW", "WWE", "CZW"],
    championships: [
      { title: "AEW World Heavyweight Championship", promotionSlug: "aew", wonDate: "2020-02-29", lostDate: "2020-12-02", daysHeld: 277, wonFrom: "Chris Jericho", lostTo: "Kenny Omega" },
      { title: "AEW World Heavyweight Championship", promotionSlug: "aew", wonDate: "2022-05-29", lostDate: "2022-09-04", daysHeld: 98, wonFrom: "CM Punk", lostTo: "CM Punk" }
    ]
  },
  {
    name: "Hangman Adam Page",
    nickname: "The Anxious Millennial Cowboy",
    hometown: "Halifax, Virginia",
    height: "6'1\"",
    weight: "226 lbs",
    debut: new Date("2008-01-01"),
    tagline: "Buckshot Lariat",
    bio: "Former AEW World Heavyweight Champion who completed the greatest character arc in modern wrestling.",
    era: "Modern",
    finisher: "Buckshot Lariat",
    promotions: ["AEW", "ROH", "NJPW"],
    championships: [
      { title: "AEW World Heavyweight Championship", promotionSlug: "aew", wonDate: "2021-11-13", lostDate: "2022-05-29", daysHeld: 197, wonFrom: "Kenny Omega", lostTo: "CM Punk" }
    ]
  },
  {
    name: "CM Punk",
    nickname: "The Best in the World",
    hometown: "Chicago, Illinois", 
    height: "6'2\"",
    weight: "218 lbs",
    debut: new Date("1999-01-01"),
    retired: new Date("2023-09-04"),
    tagline: "Straight Edge",
    bio: "AEW World Heavyweight Champion whose return to wrestling after 7 years captivated the industry.",
    era: "Modern",
    finisher: "GTS (Go To Sleep)",
    promotions: ["AEW", "WWE", "ROH"],
    championships: [
      { title: "AEW World Heavyweight Championship", promotionSlug: "aew", wonDate: "2022-09-04", lostDate: "2022-09-04", daysHeld: 1, wonFrom: "Jon Moxley", lostTo: "Jon Moxley" },
      { title: "WWE Championship", promotionSlug: "wwe", wonDate: "2011-07-17", lostDate: "2013-01-27", daysHeld: 434, wonFrom: "John Cena", lostTo: "The Rock" }
    ]
  },
  {
    name: "MJF",
    nickname: "The Devil", 
    hometown: "Plainview, New York",
    height: "5'11\"",
    weight: "226 lbs",
    debut: new Date("2015-01-01"),
    tagline: "Better Than You",
    bio: "AEW World Heavyweight Champion and generational heel who represents the future of professional wrestling.",
    era: "Modern",
    finisher: "Heat Seeker",
    promotions: ["AEW", "MLW"],
    championships: [
      { title: "AEW World Heavyweight Championship", promotionSlug: "aew", wonDate: "2023-05-28", lostDate: "2023-12-30", daysHeld: 216, wonFrom: "Samoa Joe", lostTo: "Samoa Joe" }
    ]
  },
  
  // The Young Bucks
  {
    name: "The Young Bucks",
    nickname: "The Elite",
    hometown: "Southern California",
    height: "5'10\" & 6'0\"",
    weight: "415 lbs (Combined)",
    debut: new Date("2004-01-01"),
    tagline: "Superkick Party",
    bio: "Matt and Nick Jackson, AEW Tag Team Champions and founding members of The Elite who revolutionized independent wrestling.",
    era: "Modern",
    finisher: "BTE Trigger",
    promotions: ["AEW", "NJPW", "PWG"],
    championships: [
      { title: "AEW Tag Team Championship", promotionSlug: "aew", wonDate: "2019-10-02", lostDate: "2020-01-01", daysHeld: 91, wonFrom: "SCU", lostTo: "SCU" },
      { title: "AEW Tag Team Championship", promotionSlug: "aew", wonDate: "2021-01-06", lostDate: "2021-05-30", daysHeld: 144, wonFrom: "FTR", lostTo: "FTR" }
    ]
  },
  
  // AEW Women's Division
  {
    name: "Dr. Britt Baker",
    nickname: "D.M.D.",
    hometown: "Pittsburgh, Pennsylvania",
    height: "5'4\"",
    weight: "130 lbs",
    debut: new Date("2015-01-01"),
    tagline: "Role Model",
    bio: "Former AEW Women's World Champion who transformed from face to heel and became the ace of AEW's women's division.",
    era: "Modern",
    finisher: "Lockjaw",
    promotions: ["AEW"],
    championships: [
      { title: "AEW Women's World Championship", promotionSlug: "aew", wonDate: "2021-05-30", lostDate: "2022-03-06", daysHeld: 280, wonFrom: "Hikaru Shida", lostTo: "Thunder Rosa" }
    ]
  },
  {
    name: "Thunder Rosa",
    nickname: "La Mera Mera",
    hometown: "Mission, Texas",
    height: "5'3\"",
    weight: "125 lbs",
    debut: new Date("2014-01-01"),
    tagline: "Mexican Thunder",
    bio: "Former AEW Women's World Champion and hardcore wrestling innovator who helped establish AEW's women's division.",
    era: "Modern",
    finisher: "Thunder Driver",
    promotions: ["AEW", "NWA"],
    championships: [
      { title: "AEW Women's World Championship", promotionSlug: "aew", wonDate: "2022-03-06", lostDate: "2022-08-24", daysHeld: 171, wonFrom: "Britt Baker", lostTo: "Toni Storm" },
      { title: "NWA Women's Championship", promotionSlug: "nwa", wonDate: "2020-12-06", lostDate: "2021-06-06", daysHeld: 182, wonFrom: "Serena Deeb", lostTo: "Kamille" }
    ]
  },
  
  // NJPW Stars
  {
    name: "Kazuchika Okada",
    nickname: "The Rainmaker",
    hometown: "Tokyo, Japan",
    height: "6'3\"",
    weight: "236 lbs",
    debut: new Date("2007-09-30"),
    tagline: "Money Rain",
    bio: "Seven-time IWGP Heavyweight Champion and the ace of New Japan Pro Wrestling with legendary matches.",
    era: "Modern",
    finisher: "Rainmaker",
    promotions: ["NJPW", "AEW"],
    championships: [
      { title: "IWGP Heavyweight Championship", promotionSlug: "njpw", wonDate: "2012-02-12", lostDate: "2012-10-08", daysHeld: 239, wonFrom: "Hiroshi Tanahashi", lostTo: "Hiroshi Tanahashi" },
      { title: "IWGP Heavyweight Championship", promotionSlug: "njpw", wonDate: "2013-04-07", lostDate: "2014-05-03", daysHeld: 391, wonFrom: "Hiroshi Tanahashi", lostTo: "AJ Styles" }
    ]
  },
  {
    name: "Hiroshi Tanahashi", 
    nickname: "The Ace",
    hometown: "Ogaki, Gifu",
    height: "5'10\"",
    weight: "227 lbs",
    debut: new Date("1999-10-10"),
    tagline: "Once in a Century Talent",
    bio: "Eight-time IWGP Heavyweight Champion and New Japan legend who carried the company during its rebuilding years.",
    era: "Modern",
    finisher: "High Fly Flow",
    promotions: ["NJPW", "AEW"],
    championships: [
      { title: "IWGP Heavyweight Championship", promotionSlug: "njpw", wonDate: "2006-10-09", lostDate: "2007-02-18", daysHeld: 132, wonFrom: "Satoshi Kojima", lostTo: "Yuji Nagata" },
      { title: "IWGP Heavyweight Championship", promotionSlug: "njpw", wonDate: "2009-10-12", lostDate: "2010-01-04", daysHeld: 84, wonFrom: "Shinsuke Nakamura", lostTo: "Togi Makabe" }
    ]
  },
  
  // ROH Legends
  {
    name: "CM Punk (ROH)",
    nickname: "The Second City Saint",
    hometown: "Chicago, Illinois",
    height: "6'2\"",
    weight: "218 lbs",
    debut: new Date("1999-01-01"),
    tagline: "Straight Edge Means Better Than You",
    bio: "ROH World Champion who built his legendary career in Ring of Honor before conquering WWE and AEW.",
    era: "Modern",
    finisher: "Anaconda Vise",
    promotions: ["ROH", "WWE", "AEW"],
    championships: [
      { title: "ROH World Championship", promotionSlug: "roh", wonDate: "2005-06-18", lostDate: "2005-12-17", daysHeld: 182, wonFrom: "Austin Aries", lostTo: "James Gibson" }
    ]
  },
  {
    name: "Daniel Bryan (ROH)",
    nickname: "American Dragon",
    hometown: "Aberdeen, Washington",
    height: "5'10\"",
    weight: "210 lbs",
    debut: new Date("1999-12-04"),
    tagline: "Technical Wrestling",
    bio: "ROH World Champion and WWE legend who showcased pure wrestling excellence in Ring of Honor.",
    era: "Modern",
    finisher: "Cattle Mutilation",
    promotions: ["ROH", "WWE", "AEW"],
    championships: [
      { title: "ROH World Championship", promotionSlug: "roh", wonDate: "2005-12-17", lostDate: "2006-06-17", daysHeld: 182, wonFrom: "CM Punk", lostTo: "Homicide" }
    ]
  },
  {
    name: "Samoa Joe",
    nickname: "The Samoan Submission Machine",
    hometown: "Orange County, California", 
    height: "6'2\"",
    weight: "282 lbs",
    debut: new Date("1999-01-01"),
    tagline: "Joe's Gonna Kill You",
    bio: "ROH World Champion and submission specialist who dominated independent wrestling before WWE and AEW success.",
    era: "Modern",
    finisher: "Coquina Clutch",
    promotions: ["ROH", "TNA", "WWE", "AEW"],
    championships: [
      { title: "ROH World Championship", promotionSlug: "roh", wonDate: "2003-03-22", lostDate: "2004-07-24", daysHeld: 490, wonFrom: "Xavier", lostTo: "CM Punk" },
      { title: "AEW World Heavyweight Championship", promotionSlug: "aew", wonDate: "2023-04-01", lostDate: "2023-05-28", daysHeld: 57, wonFrom: "MJF", lostTo: "MJF" }
    ]
  },
  
  // PWG/Independent Wrestling Stars  
  {
    name: "Adam Cole",
    nickname: "The Panama City Playboy",
    hometown: "Panama City, Florida",
    height: "6'0\"",
    weight: "210 lbs",
    debut: new Date("2008-01-01"),
    tagline: "Bay Bay",
    bio: "Former leader of The Elite and multi-time champion across ROH, NXT, and AEW who defines modern wrestling.",
    era: "Modern",
    finisher: "Panama Sunrise",
    promotions: ["ROH", "PWG", "WWE", "AEW"],
    championships: [
      { title: "ROH World Championship", promotionSlug: "roh", wonDate: "2012-05-12", lostDate: "2013-06-22", daysHeld: 406, wonFrom: "Kevin Steen", lostTo: "Jay Briscoe" },
      { title: "NXT Championship", promotionSlug: "wwe", wonDate: "2017-08-19", lostDate: "2018-04-07", daysHeld: 231, wonFrom: "Drew McIntyre", lostTo: "Aleister Black" }
    ]
  },
  {
    name: "Kevin Owens",
    nickname: "The Prizefighter", 
    hometown: "Marieville, Quebec",
    height: "6'0\"",
    weight: "266 lbs",
    debut: new Date("2000-01-01"),
    tagline: "Fight Anyone",
    bio: "Former ROH and WWE champion who built his reputation in independent wrestling as Kevin Steen.",
    era: "Modern",
    finisher: "Stunner",
    promotions: ["ROH", "PWG", "WWE"],
    championships: [
      { title: "ROH World Championship", promotionSlug: "roh", wonDate: "2010-05-08", lostDate: "2012-05-12", daysHeld: 735, wonFrom: "Tyler Black", lostTo: "Adam Cole" },
      { title: "WWE Universal Championship", promotionSlug: "wwe", wonDate: "2016-08-29", lostDate: "2017-03-05", daysHeld: 188, wonFrom: "Finn Balor", lostTo: "Goldberg" }
    ]
  },
  {
    name: "Sami Zayn",
    nickname: "The Underdog from the Underground",
    hometown: "Montreal, Quebec",
    height: "6'1\"",
    weight: "212 lbs", 
    debut: new Date("2002-01-01"),
    tagline: "Olé",
    bio: "PWG and ROH legend who became WWE Intercontinental Champion, known for his incredible matches as El Generico.",
    era: "Modern",
    finisher: "Helluva Kick",
    promotions: ["ROH", "PWG", "WWE"],
    championships: [
      { title: "PWG World Championship", promotionSlug: "pwg", wonDate: "2011-01-29", lostDate: "2011-07-23", daysHeld: 175, wonFrom: "Joey Ryan", lostTo: "Kevin Steen" }
    ]
  },
  
  // Modern Lucha/International Stars
  {
    name: "Rey Fenix",
    nickname: "The King of Flight",
    hometown: "Anáhuac, Mexico",
    height: "5'6\"",
    weight: "165 lbs",
    debut: new Date("2005-01-01"),
    tagline: "Animo",
    bio: "AEW Tag Team Champion and lucha libre legend known for incredible high-flying moves and innovative offense.",
    era: "Modern",
    finisher: "Fire Driver",
    promotions: ["AEW", "AAA", "Lucha Underground"],
    championships: [
      { title: "AEW Tag Team Championship", promotionSlug: "aew", wonDate: "2020-02-29", lostDate: "2020-05-23", daysHeld: 84, wonFrom: "Kenny Omega & Hangman Page", lostTo: "Kenny Omega & Hangman Page" }
    ]
  },
  {
    name: "Pentagon Jr.",
    nickname: "Pentagon Dark", 
    hometown: "Boyle Heights, California",
    height: "5'9\"",
    weight: "190 lbs",
    debut: new Date("2007-01-01"),
    tagline: "Cero Miedo",
    bio: "Lucha Underground legend and AEW star known for his incredible character work and arm-breaking prowess.",
    era: "Modern",
    finisher: "Pentagon Driver",
    promotions: ["AEW", "AAA", "Lucha Underground"],
    championships: [
      { title: "AEW Tag Team Championship", promotionSlug: "aew", wonDate: "2020-02-29", lostDate: "2020-05-23", daysHeld: 84, wonFrom: "Kenny Omega & Hangman Page", lostTo: "Kenny Omega & Hangman Page" }
    ]
  },
  
  // Modern Technical Wrestlers
  {
    name: "Zack Sabre Jr.",
    nickname: "The Submission Master",
    hometown: "Sheffield, England",
    height: "6'0\"",
    weight: "161 lbs",
    debut: new Date("2004-01-01"),
    tagline: "Technical Wizard",
    bio: "NJPW New Japan Cup winner and submission specialist who represents the pinnacle of technical wrestling.",
    era: "Modern",
    finisher: "Zack Driver",
    promotions: ["NJPW", "PWG", "wXw"],
    championships: [
      { title: "IWGP World Heavyweight Championship", promotionSlug: "njpw", wonDate: "2024-04-06", lostDate: "2024-10-14", daysHeld: 191, wonFrom: "Sanada", lostTo: "Jon Moxley" }
    ]
  },
  {
    name: "Will Ospreay",
    nickname: "The Aerial Assassin",
    hometown: "Rainham, London",
    height: "6'0\"",
    weight: "202 lbs",
    debut: new Date("2012-01-01"),
    tagline: "Elevated",
    bio: "IWGP World Heavyweight Champion and high-flying specialist who revolutionized modern wrestling with aerial innovation.",
    era: "Modern", 
    finisher: "Stormbreaker",
    promotions: ["NJPW", "AEW", "RevPro"],
    championships: [
      { title: "IWGP World Heavyweight Championship", promotionSlug: "njpw", wonDate: "2024-01-04", lostDate: "2024-04-06", daysHeld: 93, wonFrom: "Sanada", lostTo: "Zack Sabre Jr." }
    ]
  },
  
  // Women's Wrestling Pioneers
  {
    name: "Mercedes Mone",
    nickname: "The CEO",
    hometown: "Boston, Massachusetts",
    height: "5'5\"",
    weight: "114 lbs",
    debut: new Date("2010-01-01"),
    tagline: "Legit Boss",
    bio: "Former WWE Women's Champion who became NJPW Strong Women's Champion, revolutionizing women's wrestling worldwide.",
    era: "Modern",
    finisher: "Bank Statement",
    promotions: ["WWE", "NJPW", "AEW"],
    championships: [
      { title: "WWE Raw Women's Championship", promotionSlug: "wwe", wonDate: "2016-07-25", lostDate: "2016-08-21", daysHeld: 27, wonFrom: "Charlotte Flair", lostTo: "Charlotte Flair" },
      { title: "NJPW Strong Women's Championship", promotionSlug: "njpw", wonDate: "2023-08-20", lostDate: "2024-04-06", daysHeld: 230, wonFrom: "Giulia", lostTo: "Giulia" }
    ]
  },
  
  // Additional Modern Stars
  {
    name: "Orange Cassidy",
    nickname: "Freshly Squeezed",
    hometown: "Wherever",
    height: "5'10\"",
    weight: "170 lbs",
    debut: new Date("2006-01-01"),
    tagline: "Lazy but Talented",
    bio: "AEW International Champion who revolutionized wrestling with his unique comedy-based character and surprising athleticism.",
    era: "Modern",
    finisher: "Orange Punch",
    promotions: ["AEW", "PWG", "CHIKARA"],
    championships: [
      { title: "AEW International Championship", promotionSlug: "aew", wonDate: "2023-04-05", lostDate: "2023-10-14", daysHeld: 192, wonFrom: "Jon Moxley", lostTo: "Jon Moxley" }
    ]
  }
];

async function importModernIndieAEWWrestlers() {
  console.log('🌟 IMPORTING MODERN INDIE/AEW WRESTLERS (2010s-2020s)');
  console.log('════════════════════════════════════════════════════');
  
  let importedCount = 0;
  let skippedCount = 0;
  let championshipsImported = 0;

  for (const wrestler of MODERN_INDIE_AEW_WRESTLERS) {
    try {
      // Check if profile already exists
      const existingProfile = await prisma.profile.findUnique({
        where: { slug: toSlug(wrestler.name) }
      });

      if (existingProfile) {
        console.log(`⚠️  Skipping ${wrestler.name} - already exists`);
        skippedCount++;
        continue;
      }

      // Create the profile
      const profile = await prisma.profile.create({
        data: {
          slug: toSlug(wrestler.name),
          name: wrestler.name,
          nickname: wrestler.nickname,
          type: 'wrestler',
          hometown: wrestler.hometown,
          height: wrestler.height,
          weight: wrestler.weight,
          debut: wrestler.debut,
          retired: wrestler.retired,
          tagline: wrestler.tagline,
          bio: wrestler.bio,
        }
      });

      // Create wrestler-specific profile
      await prisma.wrestlerProfile.create({
        data: {
          profileId: profile.id,
          finisher: wrestler.finisher,
          era: wrestler.era,
          worldTitleReigns: wrestler.championships?.length || 0,
          combinedDaysAsChampion: wrestler.championships?.reduce((sum, title) => sum + (title.daysHeld || 0), 0) || 0,
          firstReignDate: wrestler.championships?.[0]?.wonDate ? new Date(wrestler.championships[0].wonDate) : null,
          lastReignDate: wrestler.championships?.[wrestler.championships.length - 1]?.wonDate ? new Date(wrestler.championships[wrestler.championships.length - 1].wonDate) : null,
        }
      });

      // Link to promotions
      if (wrestler.promotions && wrestler.promotions.length > 0) {
        for (const promotionName of wrestler.promotions) {
          // Find or create promotion
          let promotion = await prisma.promotion.findFirst({
            where: {
              OR: [
                { slug: toSlug(promotionName) },
                { name: promotionName }
              ]
            }
          });

          if (!promotion) {
            promotion = await prisma.promotion.create({
              data: {
                name: promotionName,
                slug: toSlug(promotionName),
              }
            });
          }

          // Create profile-promotion relationship
          await prisma.profilePromotion.create({
            data: {
              profileId: profile.id,
              promotionId: promotion.id,
              startDate: wrestler.debut,
              endDate: wrestler.retired,
              isActive: !wrestler.retired,
            }
          });
        }
      }

      // Import championships
      if (wrestler.championships && wrestler.championships.length > 0) {
        for (let i = 0; i < wrestler.championships.length; i++) {
          const championship = wrestler.championships[i];
          
          // Find promotion
          const promotion = await prisma.promotion.findFirst({
            where: {
              OR: [
                { slug: championship.promotionSlug },
                { slug: toSlug(championship.promotionSlug) }
              ]
            }
          });

          if (promotion) {
            await prisma.championship.create({
              data: {
                profileId: profile.id,
                titleName: championship.title,
                promotionId: promotion.id,
                reignNumber: i + 1,
                wonDate: new Date(championship.wonDate),
                lostDate: championship.lostDate ? new Date(championship.lostDate) : null,
                daysHeld: championship.daysHeld || 0,
                wonFrom: championship.wonFrom,
                lostTo: championship.lostTo,
                isCurrentChampion: false,
              }
            });
            championshipsImported++;
          }
        }
      }

      console.log(`✅ Imported ${wrestler.name} (${wrestler.nickname}) - ${wrestler.era} era`);
      importedCount++;

    } catch (error) {
      console.error(`❌ Error importing ${wrestler.name}:`, error);
    }
  }

  console.log('\n📊 MODERN INDIE/AEW IMPORT SUMMARY:');
  console.log(`✅ Successfully imported: ${importedCount} wrestlers`);
  console.log(`⚠️  Skipped (already exist): ${skippedCount} wrestlers`); 
  console.log(`🏆 Championships imported: ${championshipsImported}`);
  console.log(`📦 Total wrestlers in dataset: ${MODERN_INDIE_AEW_WRESTLERS.length}`);
}

// Run the import
importModernIndieAEWWrestlers()
  .catch(console.error)
  .finally(() => prisma.$disconnect());