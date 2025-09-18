import { PrismaClient } from '@prisma/client';
import { toSlug } from '../lib/slug';

const prisma = new PrismaClient();

const WCW_MONDAY_NIGHT_WARS_WRESTLERS = [
  // WCW World Champions
  {
    name: "Goldberg",
    nickname: "Da Man",
    hometown: "Atlanta, Georgia",
    height: "6'4\"",
    weight: "285 lbs",
    debut: new Date("1997-09-22"),
    retired: new Date("2004-03-30"),
    tagline: "Who's Next?",
    bio: "WCW World Heavyweight Champion with an iconic undefeated streak. Former NFL player turned wrestling powerhouse.",
    era: "Monday Night Wars",
    finisher: "Jackhammer",
    promotions: ["WCW", "WWE"],
    championships: [
      { title: "WCW World Heavyweight Championship", promotionSlug: "wcw", wonDate: "1998-07-06", lostDate: "1998-12-27", daysHeld: 174, wonFrom: "Hollywood Hogan", lostTo: "Kevin Nash" },
      { title: "WWE World Heavyweight Championship", promotionSlug: "wwe", wonDate: "2003-09-21", lostDate: "2003-12-14", daysHeld: 84, wonFrom: "Triple H", lostTo: "Triple H" }
    ]
  },
  {
    name: "Diamond Dallas Page",
    nickname: "DDP",
    hometown: "The Jersey Shore",
    height: "6'5\"",
    weight: "248 lbs",
    debut: new Date("1988-01-01"),
    retired: new Date("2002-04-01"),
    tagline: "That's a Good Thing!",
    bio: "WCW World Heavyweight Champion who pioneered the Diamond Cutter and created DDP Yoga.",
    era: "Monday Night Wars",
    finisher: "Diamond Cutter",
    promotions: ["WCW", "WWE"],
    championships: [
      { title: "WCW World Heavyweight Championship", promotionSlug: "wcw", wonDate: "1999-04-11", lostDate: "1999-04-26", daysHeld: 15, wonFrom: "Ric Flair", lostTo: "Kevin Nash" },
      { title: "WCW World Heavyweight Championship", promotionSlug: "wcw", wonDate: "1999-07-11", lostDate: "1999-07-12", daysHeld: 1, wonFrom: "Randy Savage", lostTo: "Randy Savage" },
      { title: "WCW World Heavyweight Championship", promotionSlug: "wcw", wonDate: "1999-10-25", lostDate: "1999-11-21", daysHeld: 27, wonFrom: "Ric Flair", lostTo: "Bret Hart" }
    ]
  },
  {
    name: "Booker T",
    nickname: "Book",
    hometown: "Houston, Texas", 
    height: "6'3\"",
    weight: "256 lbs",
    debut: new Date("1989-01-01"),
    tagline: "Can You Dig It?",
    bio: "Five-time WCW World Heavyweight Champion and WWE Hall of Famer with a legendary career spanning decades.",
    era: "Monday Night Wars",
    finisher: "Book End",
    promotions: ["WCW", "WWE"],
    championships: [
      { title: "WCW World Heavyweight Championship", promotionSlug: "wcw", wonDate: "2000-07-09", lostDate: "2000-08-13", daysHeld: 35, wonFrom: "Jeff Jarrett", lostTo: "Kevin Nash" },
      { title: "WCW World Heavyweight Championship", promotionSlug: "wcw", wonDate: "2000-11-26", lostDate: "2001-01-14", daysHeld: 49, wonFrom: "Kevin Nash", lostTo: "Scott Steiner" },
      { title: "World Heavyweight Championship", promotionSlug: "wwe", wonDate: "2006-07-23", lostDate: "2006-11-26", daysHeld: 126, wonFrom: "Rey Mysterio", lostTo: "Batista" }
    ]
  },
  {
    name: "Scott Steiner",
    nickname: "Big Poppa Pump",
    hometown: "Bay City, Michigan",
    height: "6'1\"",
    weight: "276 lbs", 
    debut: new Date("1986-01-01"),
    retired: new Date("2018-01-01"),
    tagline: "Holla If You Hear Me",
    bio: "WCW World Heavyweight Champion and mathematical genius with the largest arms in the world.",
    era: "Monday Night Wars",
    finisher: "Steiner Recliner",
    promotions: ["WCW", "WWE", "TNA"],
    championships: [
      { title: "WCW World Heavyweight Championship", promotionSlug: "wcw", wonDate: "2000-11-26", lostDate: "2001-03-26", daysHeld: 120, wonFrom: "Booker T", lostTo: "Booker T" }
    ]
  },
  {
    name: "Kevin Nash",
    nickname: "Big Sexy",
    hometown: "Detroit, Michigan",
    height: "6'10\"",
    weight: "328 lbs",
    debut: new Date("1990-01-01"),
    retired: new Date("2010-01-01"),
    tagline: "Outsider",
    bio: "WCW World Heavyweight Champion, nWo founder, and one of the most influential wrestlers of the Monday Night Wars.",
    era: "Monday Night Wars", 
    finisher: "Jackknife Powerbomb",
    promotions: ["WCW", "WWE"],
    championships: [
      { title: "WCW World Heavyweight Championship", promotionSlug: "wcw", wonDate: "1998-12-27", lostDate: "1999-01-04", daysHeld: 8, wonFrom: "Goldberg", lostTo: "Hollywood Hogan" },
      { title: "WCW World Heavyweight Championship", promotionSlug: "wcw", wonDate: "1999-04-26", lostDate: "1999-05-09", daysHeld: 13, wonFrom: "Diamond Dallas Page", lostTo: "Randy Savage" },
      { title: "WCW World Heavyweight Championship", promotionSlug: "wcw", wonDate: "2000-08-13", lostDate: "2000-11-26", daysHeld: 105, wonFrom: "Booker T", lostTo: "Booker T" }
    ]
  },
  
  // nWo Members
  {
    name: "Scott Hall",
    nickname: "The Bad Guy",
    hometown: "Chuluota, Florida",
    height: "6'7\"", 
    weight: "287 lbs",
    debut: new Date("1984-01-01"),
    retired: new Date("2016-04-02"),
    tagline: "Hey Yo",
    bio: "nWo founding member who changed wrestling forever with his charisma and in-ring ability.",
    era: "Monday Night Wars",
    finisher: "Outsider's Edge",
    promotions: ["WCW", "WWE"],
    championships: [
      { title: "WCW United States Heavyweight Championship", promotionSlug: "wcw", wonDate: "1991-05-19", lostDate: "1991-08-25", daysHeld: 98, wonFrom: "Lex Luger", lostTo: "Lex Luger" }
    ]
  },
  {
    name: "Syxx",
    nickname: "X-Pac",
    hometown: "Minneapolis, Minnesota",
    height: "5'10\"",
    weight: "212 lbs",
    debut: new Date("1993-05-17"),
    tagline: "Suck It",
    bio: "nWo Cruiserweight who brought high-flying action to the stable as the X-Factor.",
    era: "Monday Night Wars",
    finisher: "X-Factor",
    promotions: ["WCW", "WWE"],
    championships: [
      { title: "WCW Cruiserweight Championship", promotionSlug: "wcw", wonDate: "1996-12-29", lostDate: "1997-05-18", daysHeld: 140, wonFrom: "Dean Malenko", lostTo: "Syxx" }
    ]
  },
  
  // Cruiserweight Division
  {
    name: "Rey Mysterio Jr.",
    nickname: "The Master of the 619",
    hometown: "San Diego, California",
    height: "5'6\"",
    weight: "175 lbs", 
    debut: new Date("1989-04-30"),
    tagline: "Booyaka Booyaka",
    bio: "Legendary lucha libre wrestler who revolutionized the cruiserweight division in WCW and became a WWE Hall of Famer.",
    era: "Monday Night Wars",
    finisher: "619",
    promotions: ["WCW", "WWE"],
    championships: [
      { title: "WCW Cruiserweight Championship", promotionSlug: "wcw", wonDate: "1996-07-08", lostDate: "1996-10-27", daysHeld: 111, wonFrom: "Dean Malenko", lostTo: "Dean Malenko" },
      { title: "WCW Cruiserweight Championship", promotionSlug: "wcw", wonDate: "1997-06-15", lostDate: "1997-12-28", daysHeld: 196, wonFrom: "Syxx", lostTo: "Eddie Guerrero" },
      { title: "WCW Cruiserweight Championship", promotionSlug: "wcw", wonDate: "1998-11-22", lostDate: "1999-01-04", daysHeld: 43, wonFrom: "Billy Kidman", lostTo: "Billy Kidman" }
    ]
  },
  {
    name: "Eddie Guerrero",
    nickname: "Latino Heat", 
    hometown: "El Paso, Texas",
    height: "5'8\"",
    weight: "228 lbs",
    debut: new Date("1987-01-01"),
    retired: new Date("2005-11-13"),
    tagline: "I Lie, I Cheat, I Steal",
    bio: "WCW Cruiserweight Champion who became WWE Champion and one of the most beloved wrestlers of all time.",
    era: "Monday Night Wars",
    finisher: "Frog Splash",
    promotions: ["WCW", "WWE"],
    championships: [
      { title: "WCW Cruiserweight Championship", promotionSlug: "wcw", wonDate: "1997-09-14", lostDate: "1997-11-10", daysHeld: 57, wonFrom: "Chris Jericho", lostTo: "Rey Mysterio Jr." },
      { title: "WWE Championship", promotionSlug: "wwe", wonDate: "2004-02-15", lostDate: "2004-06-27", daysHeld: 133, wonFrom: "Brock Lesnar", lostTo: "JBL" }
    ]
  },
  {
    name: "Dean Malenko",
    nickname: "The Man of 1000 Holds",
    hometown: "Tampa, Florida",
    height: "5'10\"",
    weight: "212 lbs",
    debut: new Date("1979-01-01"),
    retired: new Date("2001-01-01"),
    tagline: "The Iceman",
    bio: "Technical wrestling master and four-time WCW Cruiserweight Champion known for his submission expertise.",
    era: "Monday Night Wars",
    finisher: "Texas Cloverleaf",
    promotions: ["WCW", "WWE"],
    championships: [
      { title: "WCW Cruiserweight Championship", promotionSlug: "wcw", wonDate: "1996-05-18", lostDate: "1996-07-08", daysHeld: 51, wonFrom: "Shinjiro Otani", lostTo: "Rey Mysterio Jr." },
      { title: "WCW Cruiserweight Championship", promotionSlug: "wcw", wonDate: "1996-10-27", lostDate: "1996-12-29", daysHeld: 63, wonFrom: "Rey Mysterio Jr.", lostTo: "Ultimo Dragon" },
      { title: "WCW Cruiserweight Championship", promotionSlug: "wcw", wonDate: "1998-01-24", lostDate: "1998-03-15", daysHeld: 50, wonFrom: "Ultimo Dragon", lostTo: "Chris Jericho" }
    ]
  },
  {
    name: "Chris Jericho",
    nickname: "Y2J",
    hometown: "Winnipeg, Manitoba",
    height: "5'10\"",
    weight: "226 lbs",
    debut: new Date("1990-10-02"),
    tagline: "Asshole",
    bio: "First Undisputed Champion and King of the World who started his legendary career in WCW.",
    era: "Monday Night Wars",
    finisher: "Walls of Jericho",
    promotions: ["WCW", "WWE", "AEW"],
    championships: [
      { title: "WCW Cruiserweight Championship", promotionSlug: "wcw", wonDate: "1998-03-15", lostDate: "1998-08-10", daysHeld: 148, wonFrom: "Dean Malenko", lostTo: "Rey Mysterio Jr." },
      { title: "WCW Television Championship", promotionSlug: "wcw", wonDate: "1998-12-28", lostDate: "1999-01-04", daysHeld: 7, wonFrom: "Konnan", lostTo: "Konnan" }
    ]
  },
  {
    name: "Billy Kidman",
    nickname: "The Shooting Star",
    hometown: "Allentown, Pennsylvania",
    height: "5'9\"",
    weight: "215 lbs",
    debut: new Date("1994-01-01"),
    retired: new Date("2005-01-01"),
    tagline: "You Can't Powerbomb Billy Kidman",
    bio: "Three-time WCW Cruiserweight Champion known for his innovative Shooting Star Press.",
    era: "Monday Night Wars",
    finisher: "Shooting Star Press",
    promotions: ["WCW", "WWE"],
    championships: [
      { title: "WCW Cruiserweight Championship", promotionSlug: "wcw", wonDate: "1998-09-14", lostDate: "1998-11-22", daysHeld: 69, wonFrom: "Juventud Guerrera", lostTo: "Rey Mysterio Jr." },
      { title: "WCW Cruiserweight Championship", promotionSlug: "wcw", wonDate: "1999-01-04", lostDate: "1999-02-21", daysHeld: 48, wonFrom: "Juventud Guerrera", lostTo: "Juventud Guerrera" },
      { title: "WCW Cruiserweight Championship", promotionSlug: "wcw", wonDate: "1999-11-22", lostDate: "2000-04-16", daysHeld: 146, wonFrom: "Disco Inferno", lostTo: "Chris Candido" }
    ]
  },
  
  // WCW Legends & Main Event Stars
  {
    name: "Sid Vicious", 
    nickname: "Sycho Sid",
    hometown: "West Memphis, Arkansas",
    height: "6'9\"",
    weight: "317 lbs",
    debut: new Date("1987-01-01"),
    retired: new Date("2017-01-01"),
    tagline: "The Master and Ruler of the World",
    bio: "Two-time WCW World Heavyweight Champion known for his psychotic character and massive presence.",
    era: "Monday Night Wars",
    finisher: "Powerbomb",
    promotions: ["WCW", "WWE"],
    championships: [
      { title: "WCW World Heavyweight Championship", promotionSlug: "wcw", wonDate: "1999-05-09", lostDate: "1999-07-11", daysHeld: 63, wonFrom: "Kevin Nash", lostTo: "Randy Savage" },
      { title: "WCW World Heavyweight Championship", promotionSlug: "wcw", wonDate: "2000-01-16", lostDate: "2000-04-16", daysHeld: 91, wonFrom: "Chris Benoit", lostTo: "Jeff Jarrett" }
    ]
  },
  {
    name: "The Giant",
    nickname: "Big Show",
    hometown: "Tampa, Florida", 
    height: "7'0\"",
    weight: "441 lbs",
    debut: new Date("1995-10-23"),
    tagline: "The World's Largest Athlete",
    bio: "WCW World Heavyweight Champion who debuted at Halloween Havoc 1995 as Andre the Giant's son.",
    era: "Monday Night Wars",
    finisher: "Chokeslam",
    promotions: ["WCW", "WWE"],
    championships: [
      { title: "WCW World Heavyweight Championship", promotionSlug: "wcw", wonDate: "1996-02-11", lostDate: "1996-04-22", daysHeld: 71, wonFrom: "Randy Savage", lostTo: "Ric Flair" },
      { title: "WCW World Heavyweight Championship", promotionSlug: "wcw", wonDate: "1999-02-21", lostDate: "1999-03-14", daysHeld: 21, wonFrom: "Hollywood Hogan", lostTo: "Ric Flair" }
    ]
  },
  {
    name: "Vader",
    nickname: "Big Van Vader",
    hometown: "Rocky Mountain House, Alberta",
    height: "6'5\"",
    weight: "450 lbs",
    debut: new Date("1985-01-01"),
    retired: new Date("2018-06-18"),
    tagline: "It's Time",
    bio: "Three-time WCW World Heavyweight Champion and one of the most dominant big men in wrestling history.",
    era: "Monday Night Wars",
    finisher: "Vader Bomb", 
    promotions: ["WCW", "WWE"],
    championships: [
      { title: "WCW World Heavyweight Championship", promotionSlug: "wcw", wonDate: "1992-07-12", lostDate: "1992-12-30", daysHeld: 171, wonFrom: "Ron Simmons", lostTo: "Ric Flair" },
      { title: "WCW World Heavyweight Championship", promotionSlug: "wcw", wonDate: "1993-03-17", lostDate: "1993-05-23", daysHeld: 67, wonFrom: "Ric Flair", lostTo: "Ric Flair" },
      { title: "WCW World Heavyweight Championship", promotionSlug: "wcw", wonDate: "1995-09-17", lostDate: "1995-10-29", daysHeld: 42, wonFrom: "Ric Flair", lostTo: "Ric Flair" }
    ]
  },
  {
    name: "Lex Luger",
    nickname: "The Total Package",
    hometown: "Chicago, Illinois",
    height: "6'4\"",
    weight: "275 lbs",
    debut: new Date("1985-10-25"),
    retired: new Date("2006-01-01"),
    tagline: "I Don't Know",
    bio: "WCW World Heavyweight Champion and former bodybuilder who was the face of WCW in the early 90s.",
    era: "Monday Night Wars",
    finisher: "Torture Rack",
    promotions: ["WCW", "WWE"],
    championships: [
      { title: "WCW World Heavyweight Championship", promotionSlug: "wcw", wonDate: "1991-07-14", lostDate: "1991-07-14", daysHeld: 1, wonFrom: "Barry Windham", lostTo: "Barry Windham" },
      { title: "WCW United States Heavyweight Championship", promotionSlug: "wcw", wonDate: "1989-05-07", lostDate: "1989-09-10", daysHeld: 126, wonFrom: "Michael Hayes", lostTo: "Sid Vicious" }
    ]
  },
  
  // Four Horsemen
  {
    name: "Arn Anderson", 
    nickname: "The Enforcer",
    hometown: "Rome, Georgia",
    height: "6'0\"",
    weight: "255 lbs",
    debut: new Date("1982-01-01"),
    retired: new Date("1997-11-10"),
    tagline: "Spine Buster",
    bio: "Four Horsemen enforcer and wrestling legend known for the greatest spine buster in the business.",
    era: "Monday Night Wars",
    finisher: "DDT",
    promotions: ["NWA", "WCW", "WWE"],
    championships: [
      { title: "WCW Television Championship", promotionSlug: "wcw", wonDate: "1991-07-14", lostDate: "1991-08-25", daysHeld: 42, wonFrom: "Beautiful Bobby", lostTo: "Beautiful Bobby" }
    ]
  },
  {
    name: "Tully Blanchard",
    nickname: "The Horseman",
    hometown: "San Antonio, Texas", 
    height: "6'1\"",
    weight: "242 lbs",
    debut: new Date("1975-01-01"),
    retired: new Date("2019-04-06"),
    tagline: "Perfection",
    bio: "Four Horsemen member and technical wrestling master with legendary feuds throughout the territories.",
    era: "Territory",
    finisher: "Slingshot Suplex",
    promotions: ["NWA", "WCW", "WWE"],
    championships: [
      { title: "NWA Television Championship", promotionSlug: "nwa", wonDate: "1985-04-20", lostDate: "1985-12-25", daysHeld: 249, wonFrom: "Dusty Rhodes", lostTo: "Dusty Rhodes" }
    ]
  },
  
  // WCW Tag Teams
  {
    name: "The Outsiders",
    nickname: "nWo",
    hometown: "Wherever They Want",
    height: "6'8\" (Combined)",
    weight: "615 lbs (Combined)",
    debut: new Date("1996-07-07"),
    retired: new Date("2002-03-26"),
    tagline: "Too Sweet",
    bio: "Scott Hall and Kevin Nash as The Outsiders, the founding members of the nWo who changed wrestling forever.",
    era: "Monday Night Wars",
    finisher: "Outsider's Edge / Jackknife",
    promotions: ["WCW", "WWE"],
    championships: [
      { title: "WCW Tag Team Championship", promotionSlug: "wcw", wonDate: "1996-10-27", lostDate: "1997-01-25", daysHeld: 90, wonFrom: "Harlem Heat", lostTo: "Lex Luger & The Giant" }
    ]
  },
  {
    name: "Harlem Heat",
    nickname: "Booker T & Stevie Ray",
    hometown: "Harlem, New York",
    height: "6'3\" & 6'7\"",
    weight: "510 lbs (Combined)",
    debut: new Date("1993-01-01"),
    retired: new Date("2000-01-01"),
    tagline: "Harlem Heat",
    bio: "Ten-time WCW Tag Team Champions and one of the most dominant tag teams in WCW history.",
    era: "Monday Night Wars",
    finisher: "Heat Seeker",
    promotions: ["WCW"],
    championships: [
      { title: "WCW Tag Team Championship", promotionSlug: "wcw", wonDate: "1994-09-18", lostDate: "1995-05-21", daysHeld: 245, wonFrom: "Pretty Wonderful", lostTo: "Dick Slater & Bunkhouse Buck" },
      { title: "WCW Tag Team Championship", promotionSlug: "wcw", wonDate: "1995-07-01", lostDate: "1995-09-17", daysHeld: 78, wonFrom: "Dick Slater & Bunkhouse Buck", lostTo: "American Males" }
    ]
  },
  
  // WCW Women
  {
    name: "Madusa",
    nickname: "The She-Devil",
    hometown: "Milan, Italy",
    height: "5'10\"",
    weight: "150 lbs",
    debut: new Date("1984-01-01"),
    retired: new Date("2001-01-01"),
    tagline: "Dangerous",
    bio: "WCW Women's Champion who famously threw the WWE Women's Championship in the trash on Monday Nitro.",
    era: "Monday Night Wars",
    finisher: "German Suplex",
    promotions: ["WCW", "WWE"],
    championships: [
      { title: "WCW Women's Championship", promotionSlug: "wcw", wonDate: "1999-01-04", lostDate: "1999-03-14", daysHeld: 69, wonFrom: "Vacant", lostTo: "Gorgeous George" }
    ]
  },
  
  // Additional WCW Stars
  {
    name: "Curt Hennig",
    nickname: "Mr. Perfect",
    hometown: "Robbinsdale, Minnesota",
    height: "6'3\"",
    weight: "257 lbs", 
    debut: new Date("1980-01-01"),
    retired: new Date("2007-02-10"),
    tagline: "Perfect",
    bio: "WWE Intercontinental Champion who joined the nWo and became a WCW legend in his own right.",
    era: "Monday Night Wars",
    finisher: "Perfect-Plex",
    promotions: ["AWA", "WWE", "WCW"],
    championships: [
      { title: "WCW United States Heavyweight Championship", promotionSlug: "wcw", wonDate: "1997-09-15", lostDate: "1997-12-28", daysHeld: 104, wonFrom: "Steve McMichael", lostTo: "Diamond Dallas Page" }
    ]
  },
  {
    name: "Raven", 
    nickname: "The Flock Leader",
    hometown: "The Bowery",
    height: "6'1\"",
    weight: "215 lbs",
    debut: new Date("1988-01-01"),
    retired: new Date("2010-01-01"),
    tagline: "Quote the Raven, Nevermore",
    bio: "Hardcore legend who led The Flock and became a cult favorite in both ECW and WCW.",
    era: "Monday Night Wars",
    finisher: "Evenflow DDT",
    promotions: ["ECW", "WCW", "WWE", "TNA"],
    championships: [
      { title: "WCW United States Heavyweight Championship", promotionSlug: "wcw", wonDate: "1998-04-20", lostDate: "1998-06-14", daysHeld: 55, wonFrom: "Diamond Dallas Page", lostTo: "Goldberg" }
    ]
  },
  {
    name: "Chris Benoit",
    nickname: "The Rabid Wolverine",
    hometown: "Edmonton, Alberta", 
    height: "5'11\"",
    weight: "229 lbs",
    debut: new Date("1985-11-30"),
    retired: new Date("2007-06-24"),
    tagline: "Intensity",
    bio: "Technical wrestling master and WCW World Heavyweight Champion known for his incredible in-ring ability.",
    era: "Monday Night Wars",
    finisher: "Crippler Crossface",
    promotions: ["WCW", "WWE"],
    championships: [
      { title: "WCW World Heavyweight Championship", promotionSlug: "wcw", wonDate: "2000-01-16", lostDate: "2000-01-16", daysHeld: 1, wonFrom: "Sid Vicious", lostTo: "Sid Vicious" },
      { title: "WCW United States Heavyweight Championship", promotionSlug: "wcw", wonDate: "1998-12-27", lostDate: "1999-06-13", daysHeld: 168, wonFrom: "Diamond Dallas Page", lostTo: "Diamond Dallas Page" }
    ]
  }
];

async function importWCWMondayNightWarsWrestlers() {
  console.log('🚀 IMPORTING WCW/MONDAY NIGHT WARS WRESTLERS (1990s)');
  console.log('═══════════════════════════════════════════════════');
  
  let importedCount = 0;
  let skippedCount = 0;
  let championshipsImported = 0;

  for (const wrestler of WCW_MONDAY_NIGHT_WARS_WRESTLERS) {
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

  console.log('\n📊 WCW/MONDAY NIGHT WARS IMPORT SUMMARY:');
  console.log(`✅ Successfully imported: ${importedCount} wrestlers`);
  console.log(`⚠️  Skipped (already exist): ${skippedCount} wrestlers`); 
  console.log(`🏆 Championships imported: ${championshipsImported}`);
  console.log(`📦 Total wrestlers in dataset: ${WCW_MONDAY_NIGHT_WARS_WRESTLERS.length}`);
}

// Run the import
importWCWMondayNightWarsWrestlers()
  .catch(console.error)
  .finally(() => prisma.$disconnect());