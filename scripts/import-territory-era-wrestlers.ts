import { PrismaClient } from '@prisma/client';
import { toSlug } from '../lib/slug';

const prisma = new PrismaClient();

const TERRITORY_ERA_WRESTLERS = [
  // NWA World Champions & Main Event Stars
  {
    name: "Dusty Rhodes",
    nickname: "The American Dream",
    hometown: "Austin, Texas",
    height: "6'2\"",
    weight: "275 lbs",
    debut: new Date("1968-01-01"),
    tagline: "Hard Times",
    bio: "The son of a plumber who became wrestling royalty. Three-time NWA World Heavyweight Champion and the voice of the common man.",
    era: "Territory",
    finisher: "Bionic Elbow",
    promotions: ["NWA", "WCW", "WWE"],
    championships: [
      { title: "NWA World Heavyweight Championship", promotionSlug: "nwa", wonDate: "1979-08-21", lostDate: "1979-09-17", daysHeld: 27, wonFrom: "Harley Race", lostTo: "Harley Race" },
      { title: "NWA World Heavyweight Championship", promotionSlug: "nwa", wonDate: "1981-06-21", lostDate: "1981-09-17", daysHeld: 88, wonFrom: "Harley Race", lostTo: "Harley Race" },
      { title: "NWA World Heavyweight Championship", promotionSlug: "nwa", wonDate: "1986-07-26", lostDate: "1986-08-09", daysHeld: 14, wonFrom: "Ric Flair", lostTo: "Ric Flair" }
    ]
  },
  {
    name: "Harley Race",
    nickname: "The King",
    hometown: "Kansas City, Missouri",
    height: "6'1\"",
    weight: "253 lbs",
    debut: new Date("1960-01-01"),
    tagline: "Bow to the King",
    bio: "Eight-time NWA World Heavyweight Champion. One of the toughest and most respected wrestlers in history.",
    era: "Territory",
    finisher: "Piledriver",
    promotions: ["NWA", "AWA", "WWE"],
    championships: [
      { title: "NWA World Heavyweight Championship", promotionSlug: "nwa", wonDate: "1973-05-07", lostDate: "1975-12-10", daysHeld: 947, wonFrom: "Dory Funk Jr.", lostTo: "Terry Funk" },
      { title: "NWA World Heavyweight Championship", promotionSlug: "nwa", wonDate: "1977-02-05", lostDate: "1979-08-21", daysHeld: 927, wonFrom: "Terry Funk", lostTo: "Dusty Rhodes" },
      { title: "NWA World Heavyweight Championship", promotionSlug: "nwa", wonDate: "1979-09-17", lostDate: "1981-06-21", daysHeld: 642, wonFrom: "Dusty Rhodes", lostTo: "Dusty Rhodes" }
    ]
  },
  {
    name: "Terry Funk",
    nickname: "The Texan",
    hometown: "Amarillo, Texas", 
    height: "6'1\"",
    weight: "247 lbs",
    debut: new Date("1965-12-09"),
    tagline: "Forever",
    bio: "NWA World Heavyweight Champion and hardcore legend. Still wrestling after 50+ years in the business.",
    era: "Territory",
    finisher: "Spinning Toe Hold",
    promotions: ["NWA", "WCW", "ECW"],
    championships: [
      { title: "NWA World Heavyweight Championship", promotionSlug: "nwa", wonDate: "1975-12-10", lostDate: "1977-02-05", daysHeld: 422, wonFrom: "Harley Race", lostTo: "Harley Race" }
    ]
  },
  {
    name: "Jack Brisco",
    nickname: "The Brisco Brothers",
    hometown: "Blackwell, Oklahoma",
    height: "5'10\"", 
    weight: "232 lbs",
    debut: new Date("1965-01-01"),
    tagline: "Amateur Excellence",
    bio: "Two-time NWA World Heavyweight Champion with legitimate amateur wrestling credentials.",
    era: "Territory",
    finisher: "Figure Four Leglock",
    promotions: ["NWA"],
    championships: [
      { title: "NWA World Heavyweight Championship", promotionSlug: "nwa", wonDate: "1973-07-20", lostDate: "1975-12-09", daysHeld: 872, wonFrom: "Dory Funk Jr.", lostTo: "Terry Funk" }
    ]
  },
  {
    name: "Dory Funk Jr.",
    nickname: "The Funkster",
    hometown: "Hammond, Indiana",
    height: "6'2\"",
    weight: "242 lbs", 
    debut: new Date("1963-01-01"),
    tagline: "Wrestling Royalty",
    bio: "Four-year NWA World Heavyweight Champion from wrestling's first family.",
    era: "Territory",
    finisher: "Spinning Toe Hold",
    promotions: ["NWA", "AWA"],
    championships: [
      { title: "NWA World Heavyweight Championship", promotionSlug: "nwa", wonDate: "1969-02-11", lostDate: "1973-05-24", daysHeld: 1563, wonFrom: "Gene Kiniski", lostTo: "Harley Race" }
    ]
  },
  
  // AWA Stars
  {
    name: "Nick Bockwinkel", 
    nickname: "The Wisecracker",
    hometown: "St. Louis, Missouri",
    height: "6'0\"",
    weight: "236 lbs",
    debut: new Date("1954-01-01"),
    tagline: "Intelligence over Brawn",
    bio: "Four-time AWA World Heavyweight Champion known for his technical wrestling and articulate promos.",
    era: "Territory",
    finisher: "Figure Four Leglock",
    promotions: ["AWA", "NWA"],
    championships: [
      { title: "AWA World Heavyweight Championship", promotionSlug: "awa", wonDate: "1975-11-08", lostDate: "1980-05-13", daysHeld: 1648, wonFrom: "Verne Gagne", lostTo: "Verne Gagne" },
      { title: "AWA World Heavyweight Championship", promotionSlug: "awa", wonDate: "1981-05-02", lostDate: "1982-04-18", daysHeld: 351, wonFrom: "Rick Martel", lostTo: "Rick Martel" }
    ]
  },
  {
    name: "Verne Gagne",
    nickname: "The Scientific Wrestler",
    hometown: "Robbinsdale, Minnesota", 
    height: "5'11\"",
    weight: "218 lbs",
    debut: new Date("1949-01-01"),
    tagline: "Wrestling's Living Legend",
    bio: "AWA founder and 10-time World Heavyweight Champion with legitimate amateur credentials.",
    era: "Territory",
    finisher: "Sleeper Hold",
    promotions: ["AWA"],
    championships: [
      { title: "AWA World Heavyweight Championship", promotionSlug: "awa", wonDate: "1960-08-16", lostDate: "1963-05-18", daysHeld: 1005, wonFrom: "Pat O'Connor", lostTo: "The Crusher" },
      { title: "AWA World Heavyweight Championship", promotionSlug: "awa", wonDate: "1968-07-01", lostDate: "1975-11-08", daysHeld: 2686, wonFrom: "Dick The Bruiser", lostTo: "Nick Bockwinkel" }
    ]
  },
  {
    name: "Rick Martel",
    nickname: "The Model", 
    hometown: "Quebec City, Canada",
    height: "6'0\"",
    weight: "234 lbs",
    debut: new Date("1972-01-01"),
    tagline: "Arrogance",
    bio: "AWA World Heavyweight Champion who later became a WWE superstar.",
    era: "Territory",
    finisher: "Boston Crab",
    promotions: ["AWA", "WWE"],
    championships: [
      { title: "AWA World Heavyweight Championship", promotionSlug: "awa", wonDate: "1984-02-23", lostDate: "1985-06-29", daysHeld: 491, wonFrom: "Jumbo Tsuruta", lostTo: "Stan Hansen" }
    ]
  },
  
  // WCCW Stars
  {
    name: "Kerry Von Erich",
    nickname: "The Modern Day Warrior",
    hometown: "Dallas, Texas",
    height: "6'2\"", 
    weight: "254 lbs",
    debut: new Date("1979-01-01"),
    retired: new Date("1993-02-18"),
    tagline: "The Yellow Rose of Texas",
    bio: "NWA World Heavyweight Champion and WWE Intercontinental Champion from wrestling's most famous family.",
    era: "Territory",
    finisher: "Iron Claw", 
    promotions: ["WCCW", "NWA", "WWE"],
    championships: [
      { title: "NWA World Heavyweight Championship", promotionSlug: "nwa", wonDate: "1984-05-06", lostDate: "1984-05-06", daysHeld: 1, wonFrom: "Ric Flair", lostTo: "Ric Flair" },
      { title: "WWE Intercontinental Championship", promotionSlug: "wwe", wonDate: "1990-08-29", lostDate: "1990-11-19", daysHeld: 82, wonFrom: "Mr. Perfect", lostTo: "Mr. Perfect" }
    ]
  },
  {
    name: "David Von Erich",
    nickname: "The Yellow Rose",
    hometown: "Dallas, Texas", 
    height: "6'4\"",
    weight: "242 lbs",
    debut: new Date("1980-01-01"),
    retired: new Date("1984-02-10"),
    tagline: "Texas Wrestling Royalty",
    bio: "Youngest of the Von Erich wrestling dynasty, considered the most naturally talented.",
    era: "Territory",
    finisher: "Iron Claw",
    promotions: ["WCCW", "NWA"],
    championships: []
  },
  {
    name: "Fritz Von Erich", 
    nickname: "The Baron",
    hometown: "Dallas, Texas",
    height: "6'4\"",
    weight: "275 lbs",
    debut: new Date("1953-01-01"),
    retired: new Date("1982-01-01"),
    tagline: "The Iron Claw",
    bio: "WCCW founder and patriarch of wrestling's most tragic family.",
    era: "Territory", 
    finisher: "Iron Claw",
    promotions: ["WCCW", "NWA"],
    championships: []
  },
  
  // Georgia Championship Wrestling
  {
    name: "Tommy Rich",
    nickname: "Wildfire",
    hometown: "Hendersonville, Tennessee",
    height: "5'11\"",
    weight: "225 lbs",
    debut: new Date("1974-01-01"),
    tagline: "White Lightning",
    bio: "NWA World Heavyweight Champion who held the title for four days in 1981.",
    era: "Territory",
    finisher: "Lou Thesz Press",
    promotions: ["NWA", "WCW"], 
    championships: [
      { title: "NWA World Heavyweight Championship", promotionSlug: "nwa", wonDate: "1981-04-27", lostDate: "1981-05-03", daysHeld: 6, wonFrom: "Harley Race", lostTo: "Harley Race" }
    ]
  },
  {
    name: "Ron Garvin",
    nickname: "Hands of Stone",
    hometown: "Montreal, Canada",
    height: "5'8\"", 
    weight: "229 lbs",
    debut: new Date("1962-01-01"),
    tagline: "The Rugged One",
    bio: "NWA World Heavyweight Champion known for his tough guy persona and boxing background.",
    era: "Territory",
    finisher: "Garvin Stomp",
    promotions: ["NWA", "WWE"],
    championships: [
      { title: "NWA World Heavyweight Championship", promotionSlug: "nwa", wonDate: "1987-09-25", lostDate: "1987-11-26", daysHeld: 62, wonFrom: "Ric Flair", lostTo: "Ric Flair" }
    ]
  },
  
  // Mid-South Wrestling
  {
    name: "Ted DiBiase Sr.",
    nickname: "The Million Dollar Man",
    hometown: "Omaha, Nebraska",
    height: "6'3\"",
    weight: "260 lbs",
    debut: new Date("1975-01-01"),
    retired: new Date("1993-01-01"),
    tagline: "Everybody's Got a Price",
    bio: "Multi-time champion in Mid-South before becoming WWE's Million Dollar Man.",
    era: "Territory",
    finisher: "Million Dollar Dream",
    promotions: ["Mid-South", "NWA", "WWE"],
    championships: [
      { title: "North American Heavyweight Championship", promotionSlug: "nwa", wonDate: "1979-03-20", lostDate: "1979-12-25", daysHeld: 280, wonFrom: "Dick Murdoch", lostTo: "Dick Murdoch" }
    ]
  },
  {
    name: "Dick Murdoch",
    nickname: "Captain Redneck",
    hometown: "Waxahachie, Texas", 
    height: "6'3\"",
    weight: "275 lbs",
    debut: new Date("1965-01-01"),
    retired: new Date("1996-01-01"),
    tagline: "Texas Outlaw",
    bio: "Legendary tag team wrestler and singles competitor across multiple territories.",
    era: "Territory",
    finisher: "Brainbuster",
    promotions: ["Mid-South", "NWA", "WWE"],
    championships: []
  },
  
  // Additional Territory Stars
  {
    name: "Blackjack Mulligan",
    nickname: "Big John Studd",
    hometown: "Eagle Pass, Texas",
    height: "6'9\"",
    weight: "340 lbs",
    debut: new Date("1967-01-01"),
    retired: new Date("1988-01-01"),
    tagline: "The Cowboy",
    bio: "Massive cowboy character who was a main event star across multiple territories.",
    era: "Territory",
    finisher: "Bear Hug", 
    promotions: ["NWA", "WCCW", "WWE"],
    championships: []
  },
  {
    name: "Stan Hansen",
    nickname: "The Lariat",
    hometown: "Borger, Texas",
    height: "6'4\"",
    weight: "319 lbs",
    debut: new Date("1973-01-01"),
    retired: new Date("2000-01-01"),
    tagline: "The Unsinkable Battleship",
    bio: "Legendary brawler who was a main event star in both America and Japan.",
    era: "Territory", 
    finisher: "Lariat",
    promotions: ["AWA", "NWA", "AJPW"],
    championships: [
      { title: "AWA World Heavyweight Championship", promotionSlug: "awa", wonDate: "1985-12-29", lostDate: "1986-04-24", daysHeld: 116, wonFrom: "Rick Martel", lostTo: "Nick Bockwinkel" }
    ]
  },
  {
    name: "Ox Baker",
    nickname: "The Madman from Texas",
    hometown: "Waterloo, Iowa",
    height: "6'5\"",
    weight: "300 lbs",
    debut: new Date("1966-01-01"),
    retired: new Date("1986-01-01"),
    tagline: "I Love to Hurt People",
    bio: "Menacing heel known for his wild appearance and the Heart Punch finisher.",
    era: "Territory",
    finisher: "Heart Punch",
    promotions: ["NWA", "AWA", "WCCW"],
    championships: []
  },
  {
    name: "Ernie Ladd", 
    nickname: "The Big Cat",
    hometown: "Orange, Texas",
    height: "6'9\"",
    weight: "315 lbs",
    debut: new Date("1961-01-01"),
    retired: new Date("1986-01-01"),
    tagline: "From the NFL to the Wrestling Ring",
    bio: "Former NFL player who became a dominant heel across multiple territories.",
    era: "Territory",
    finisher: "Bear Hug",
    promotions: ["NWA", "AWA", "WWE"],
    championships: []
  },
  {
    name: "Bobo Brazil",
    nickname: "The South American Giant",
    hometown: "Detroit, Michigan",
    height: "6'6\"", 
    weight: "270 lbs",
    debut: new Date("1951-01-01"),
    retired: new Date("1993-01-01"), 
    tagline: "Wrestling Pioneer",
    bio: "Pioneering African American wrestler who broke barriers across multiple territories.",
    era: "Territory",
    finisher: "Coco Butt",
    promotions: ["NWA", "WWE"],
    championships: []
  },
  
  // Memphis Wrestling
  {
    name: "Jerry Lawler",
    nickname: "The King", 
    hometown: "Memphis, Tennessee",
    height: "6'0\"",
    weight: "234 lbs",
    debut: new Date("1970-11-07"),
    tagline: "It's Good to Be the King",
    bio: "Memphis wrestling royalty and longtime WWE commentator with over 160 championship reigns.",
    era: "Territory",
    finisher: "Piledriver",
    promotions: ["CWA", "WWE", "NWA"],
    championships: [
      { title: "AWA Southern Heavyweight Championship", promotionSlug: "awa", wonDate: "1974-04-01", lostDate: "1974-07-01", daysHeld: 91, wonFrom: "Jackie Fargo", lostTo: "Jackie Fargo" }
    ]
  },
  {
    name: "Jackie Fargo",
    nickname: "The Fabulous One",
    hometown: "Minneapolis, Minnesota",
    height: "5'10\"",
    weight: "226 lbs", 
    debut: new Date("1952-01-01"),
    retired: new Date("1988-01-01"),
    tagline: "Strut and Fret",
    bio: "Memphis wrestling legend known for his strut and being Jerry Lawler's mentor.",
    era: "Territory",
    finisher: "Kneedrop",
    promotions: ["CWA", "NWA"],
    championships: []
  },
  {
    name: "Jimmy Hart",
    nickname: "The Mouth of the South",
    hometown: "Jackson, Mississippi", 
    height: "5'7\"",
    weight: "142 lbs",
    debut: new Date("1977-01-01"),
    tagline: "Megaphone Madness",
    bio: "Wrestling manager extraordinaire who started as a wrestler in Memphis.",
    era: "Territory", 
    finisher: "Manager",
    promotions: ["CWA", "WWE", "WCW"],
    championships: []
  },
  
  // More NWA/Territory Stars
  {
    name: "Wahoo McDaniel",
    nickname: "Chief Wahoo",
    hometown: "Bernice, Louisiana",
    height: "6'2\"",
    weight: "265 lbs",
    debut: new Date("1961-01-01"),
    retired: new Date("2001-04-18"),
    tagline: "The Native American Warrior",
    bio: "Former NFL player turned wrestling star, known for his chops and Indian strap matches.",
    era: "Territory",
    finisher: "Tomahawk Chop", 
    promotions: ["NWA", "AWA"],
    championships: []
  },
  {
    name: "Ricky Steamboat",
    nickname: "The Dragon",
    hometown: "Honolulu, Hawaii",
    height: "5'10\"",
    weight: "235 lbs",
    debut: new Date("1976-01-01"), 
    retired: new Date("1994-01-01"),
    tagline: "Fire Breathing",
    bio: "Technical wrestling master and NWA World Heavyweight Champion with classic feuds.",
    era: "Territory", 
    finisher: "Flying Crossbody",
    promotions: ["NWA", "WWE", "WCW"],
    championships: [
      { title: "NWA World Heavyweight Championship", promotionSlug: "nwa", wonDate: "1989-02-20", lostDate: "1989-05-07", daysHeld: 76, wonFrom: "Ric Flair", lostTo: "Ric Flair" }
    ]
  },
  
  // Women's Territory Wrestling
  {
    name: "Judy Martin",
    nickname: "The Glamour Girls",
    hometown: "Ephrata, Pennsylvania", 
    height: "5'8\"",
    weight: "150 lbs",
    debut: new Date("1979-01-01"),
    retired: new Date("1995-01-01"),
    tagline: "Glamorous and Tough",
    bio: "Half of The Glamour Girls tag team and women's wrestling pioneer.",
    era: "Territory",
    finisher: "Powerslam",
    promotions: ["WWE", "NWA"],
    championships: [
      { title: "WWE Women's Tag Team Championship", promotionSlug: "wwe", wonDate: "1987-08-24", lostDate: "1988-10-07", daysHeld: 410, wonFrom: "The Jumping Bomb Angels", lostTo: "The Jumping Bomb Angels" }
    ]
  },
  {
    name: "Leilani Kai",
    nickname: "The Hawaiian Princess",
    hometown: "Tampa, Florida",
    height: "5'6\"", 
    weight: "138 lbs",
    debut: new Date("1975-01-01"),
    retired: new Date("2002-01-01"),
    tagline: "Island Beauty with a Mean Streak", 
    bio: "WWE Women's Champion and longtime veteran of women's wrestling.",
    era: "Territory",
    finisher: "Piledriver",
    promotions: ["WWE", "NWA"],
    championships: [
      { title: "WWE Women's Championship", promotionSlug: "wwe", wonDate: "1985-01-23", lostDate: "1985-03-31", daysHeld: 67, wonFrom: "Wendi Richter", lostTo: "Wendi Richter" }
    ]
  }
];

async function importTerritoryEraWrestlers() {
  console.log('🏛️ IMPORTING TERRITORY ERA WRESTLERS (1970s-1980s)');
  console.log('════════════════════════════════════════════════');
  
  let importedCount = 0;
  let skippedCount = 0;
  let championshipsImported = 0;

  for (const wrestler of TERRITORY_ERA_WRESTLERS) {
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

  console.log('\n📊 TERRITORY ERA IMPORT SUMMARY:');
  console.log(`✅ Successfully imported: ${importedCount} wrestlers`);
  console.log(`⚠️  Skipped (already exist): ${skippedCount} wrestlers`); 
  console.log(`🏆 Championships imported: ${championshipsImported}`);
  console.log(`📦 Total wrestlers in dataset: ${TERRITORY_ERA_WRESTLERS.length}`);
}

// Run the import
importTerritoryEraWrestlers()
  .catch(console.error)
  .finally(() => prisma.$disconnect());