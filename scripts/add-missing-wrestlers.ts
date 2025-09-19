import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const MISSING_HIGH_PROFILE_WRESTLERS = [
  {
    name: "Christian",
    realName: "William Jason Reso", 
    nickname: "Captain Charisma",
    hometown: "Toronto, Ontario, Canada",
    height: "6'2\"",
    weight: "212 lbs",
    debut: "1993-06-26",
    retirement: "2023-01-01",
    finisher: "Killswitch",
    era: "Attitude",
    promotions: ["WWE", "TNA", "AEW"],
    championships: [
      { title: "World Heavyweight Championship", reigns: 2, days: 35, year: 2011 },
      { title: "ECW Championship", reigns: 1, days: 126, year: 2009 },
      { title: "Intercontinental Championship", reigns: 4, days: 386, year: 2003 },
      { title: "World Tag Team Championship", reigns: 7, days: 483, year: 1999 }
    ],
    bio: "Captain Charisma who formed one of the greatest tag teams with Edge before becoming a World Champion in his own right. Known for his charisma and in-ring psychology."
  },
  {
    name: "Jeff Jarrett",
    realName: "Jeffrey Leonard Jarrett",
    nickname: "Double J",
    hometown: "Hendersonville, Tennessee", 
    height: "6'0\"",
    weight: "230 lbs",
    debut: "1986-04-06",
    retirement: null,
    finisher: "Stroke",
    era: "Monday Night Wars",
    promotions: ["WWE", "WCW", "TNA"],
    championships: [
      { title: "WCW World Heavyweight Championship", reigns: 4, days: 153, year: 1999 },
      { title: "TNA World Heavyweight Championship", reigns: 6, days: 622, year: 2002 },
      { title: "Intercontinental Championship", reigns: 6, days: 289, year: 1995 }
    ],
    bio: "The Chosen One and founder of TNA Wrestling. Multi-time world champion known for his guitar-smashing antics and 'Ain't I Great?' catchphrase."
  },
  {
    name: "Matt Hardy",
    realName: "Matthew Moore Hardy",
    nickname: "The Sensei of Mattitude", 
    hometown: "Cameron, North Carolina",
    height: "6'2\"",
    weight: "235 lbs",
    debut: "1992-09-23",
    retirement: null,
    finisher: "Twist of Fate",
    era: "Attitude",
    promotions: ["WWE", "TNA", "AEW", "ROH"],
    championships: [
      { title: "ECW Championship", reigns: 1, days: 119, year: 2008 },
      { title: "World Tag Team Championship", reigns: 6, days: 331, year: 1999 },
      { title: "TNA World Heavyweight Championship", reigns: 2, days: 220, year: 2015 }
    ],
    bio: "Charismatic Enigma's brother who reinvented himself multiple times. From Hardy Boyz tag team specialist to singles champion to 'Broken' Matt Hardy phenomenon."
  },
  {
    name: "Jeff Hardy", 
    realName: "Jeffrey Nero Hardy",
    nickname: "The Charismatic Enigma",
    hometown: "Cameron, North Carolina",
    height: "6'2\"",
    weight: "225 lbs", 
    debut: "1993-05-23",
    retirement: null,
    finisher: "Swanton Bomb",
    era: "Attitude",
    promotions: ["WWE", "TNA", "AEW"],
    championships: [
      { title: "WWE Championship", reigns: 1, days: 42, year: 2008 },
      { title: "World Heavyweight Championship", reigns: 2, days: 118, year: 2009 },
      { title: "TNA World Heavyweight Championship", reigns: 3, days: 220, year: 2010 },
      { title: "World Tag Team Championship", reigns: 6, days: 331, year: 1999 }
    ],
    bio: "The Charismatic Enigma known for his high-flying, death-defying moves. One half of the legendary Hardy Boyz and multiple-time world champion."
  },
  {
    name: "Ken Shamrock", 
    realName: "Kenneth Wayne Shamrock",
    nickname: "The World's Most Dangerous Man",
    hometown: "Lodi, California", 
    height: "6'0\"",
    weight: "243 lbs",
    debut: "1997-02-13",
    retirement: "1999-10-17",
    finisher: "Ankle Lock",
    era: "Attitude",
    promotions: ["WWE"],
    championships: [
      { title: "Intercontinental Championship", reigns: 1, days: 91, year: 1998 },
      { title: "World Tag Team Championship", reigns: 1, days: 26, year: 1998 }
    ],
    bio: "UFC Hall of Famer who brought legitimate fighting credentials to WWE. Known for his intensity and ankle lock submission."
  },
  {
    name: "Finlay",
    realName: "David Edward Finlay Jr.",
    nickname: "The Fighting Irishman", 
    hometown: "Belfast, Northern Ireland",
    height: "5'10\"",
    weight: "233 lbs",
    debut: "1974-01-01",
    retirement: "2012-01-01",
    finisher: "Celtic Cross",
    era: "Ruthless Aggression",
    promotions: ["WWE", "WCW"],
    championships: [
      { title: "United States Championship", reigns: 1, days: 126, year: 2006 },
      { title: "WCW Television Championship", reigns: 1, days: 157, year: 1996 }
    ],
    bio: "Hard-hitting Irish brawler known for his shillelagh and his leprechaun sidekick Hornswoggle. Veteran wrestler and trainer."
  },
  {
    name: "Chyna",
    realName: "Joan Marie Laurer",
    nickname: "The Ninth Wonder of the World",
    hometown: "Rochester, New York",
    height: "5'10\"", 
    weight: "200 lbs",
    debut: "1997-02-16",
    retirement: "2002-01-01",
    finisher: "Pedigree",
    era: "Attitude",
    promotions: ["WWE"],
    championships: [
      { title: "Intercontinental Championship", reigns: 2, days: 188, year: 1999 },
      { title: "Women's Championship", reigns: 1, days: 57, year: 2001 }
    ],
    bio: "Groundbreaking female wrestler who competed against men and broke barriers. Founding member of D-Generation X."
  },
  {
    name: "Lita",
    realName: "Amy Christine Dumas",
    nickname: "The Daredevil Diva",
    hometown: "Fort Lauderdale, Florida",
    height: "5'6\"",
    weight: "125 lbs", 
    debut: "1999-08-23",
    retirement: "2006-11-27",
    finisher: "Litasault",
    era: "Attitude",
    promotions: ["WWE"],
    championships: [
      { title: "Women's Championship", reigns: 4, days: 279, year: 2000 },
      { title: "World Tag Team Championship", reigns: 1, days: 280, year: 2000 }
    ],
    bio: "Revolutionary women's wrestler who brought high-flying moves to the division. Part of Team Xtreme with the Hardy Boyz."
  },
  {
    name: "Trish Stratus",
    realName: "Patricia Anne Stratigeas",
    nickname: "The Queen of WWE",
    hometown: "Toronto, Ontario, Canada",
    height: "5'4\"",
    weight: "125 lbs",
    debut: "2000-03-19", 
    retirement: "2019-08-10",
    finisher: "Stratusfaction",
    era: "Ruthless Aggression",
    promotions: ["WWE"],
    championships: [
      { title: "Women's Championship", reigns: 7, days: 924, year: 2001 },
      { title: "Hardcore Championship", reigns: 1, days: 1, year: 2001 }
    ],
    bio: "Seven-time Women's Champion widely considered one of the greatest female wrestlers of all time. WWE Hall of Famer."
  },
  {
    name: "Bobby Lashley",
    realName: "Franklin Roberto Lashley",
    nickname: "The All Mighty",
    hometown: "Junction City, Kansas",
    height: "6'3\"",
    weight: "273 lbs",
    debut: "2005-09-23",
    retirement: null,
    finisher: "Spear",
    era: "Modern",
    promotions: ["WWE", "TNA", "Bellator"],
    championships: [
      { title: "WWE Championship", reigns: 2, days: 357, year: 2021 },
      { title: "ECW Championship", reigns: 1, days: 118, year: 2007 },
      { title: "TNA World Heavyweight Championship", reigns: 2, days: 133, year: 2016 }
    ],
    bio: "Legitimate tough guy with amateur wrestling and MMA background. Multi-time world champion known for his incredible physique and intensity."
  },
  {
    name: "William Regal",
    realName: "Darren Kenneth Matthews",
    nickname: "The Villain",
    hometown: "Blackpool, England",
    height: "6'3\"",
    weight: "243 lbs",
    debut: "1983-12-04",
    retirement: "2013-01-01", 
    finisher: "Regal Stretch",
    era: "Attitude",
    promotions: ["WWE", "WCW"],
    championships: [
      { title: "Intercontinental Championship", reigns: 4, days: 189, year: 2002 },
      { title: "European Championship", reigns: 2, days: 91, year: 2000 },
      { title: "King of the Ring", reigns: 1, days: 365, year: 2008 }
    ],
    bio: "Technical wrestling master and consummate villain. Respected trainer who helped develop many WWE superstars at NXT."
  }
];

async function addMissingWrestlers() {
  console.log('Adding missing high-profile wrestlers...\n');
  
  let addedCount = 0;
  
  for (const wrestler of MISSING_HIGH_PROFILE_WRESTLERS) {
    try {
      // Check if wrestler already exists
      const existing = await prisma.profile.findFirst({
        where: {
          name: wrestler.name
        }
      });
      
      if (existing) {
        console.log(`⏭️  ${wrestler.name} already exists`);
        continue;
      }
      
      // Generate slug
      const slug = wrestler.name.toLowerCase()
        .replace(/['']/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      
      // Calculate total championship stats
      const worldTitleReigns = wrestler.championships?.filter(c => 
        c.title.includes('World') || c.title.includes('WWE Championship') || c.title.includes('TNA World')
      ).reduce((sum, c) => sum + c.reigns, 0) || 0;
      
      const totalDays = wrestler.championships?.reduce((sum, c) => sum + (c.days * c.reigns), 0) || 0;
      
      // Create wrestler profile
      const newProfile = await prisma.profile.create({
        data: {
          slug,
          name: wrestler.name,
          nickname: wrestler.nickname,
          type: 'wrestler',
          tagline: `WWE Legend • ${worldTitleReigns > 0 ? `${worldTitleReigns}-time World Champion` : 'Hall of Fame Worthy'}`,
          hometown: wrestler.hometown,
          nationality: wrestler.hometown.split(', ').pop() || '',
          height: wrestler.height,
          weight: wrestler.weight,
          debut: new Date(wrestler.debut),
          retired: wrestler.retirement ? new Date(wrestler.retirement) : null,
          bio: wrestler.bio,
          wrestler: {
            create: {
              finisher: wrestler.finisher,
              era: wrestler.era,
              worldTitleReigns: worldTitleReigns,
              combinedDaysAsChampion: totalDays
            }
          }
        }
      });
      
      // Add promotions
      for (const promotion of wrestler.promotions || []) {
        try {
          // Find or create promotion
          const existingPromotion = await prisma.promotion.findFirst({
            where: { name: promotion }
          });
          
          if (existingPromotion) {
            await prisma.profilePromotion.create({
              data: {
                profileId: newProfile.id,
                promotionId: existingPromotion.id
              }
            });
          }
        } catch (error) {
          console.warn(`Could not add promotion ${promotion} for ${wrestler.name}`);
        }
      }
      
      // Add championships
      for (let i = 0; i < (wrestler.championships || []).length; i++) {
        const championship = wrestler.championships![i];
        try {
          // Find promotion for championship
          let promotionName = 'WWE';
          if (championship.title.includes('WCW')) promotionName = 'WCW';
          if (championship.title.includes('TNA')) promotionName = 'TNA';
          if (championship.title.includes('ECW')) promotionName = 'ECW';
          
          const promotion = await prisma.promotion.findFirst({
            where: { name: promotionName }
          });
          
          if (promotion) {
            await prisma.championship.create({
              data: {
                profileId: newProfile.id,
                promotionId: promotion.id,
                titleName: championship.title,
                reignNumber: i + 1,
                wonDate: new Date(`${championship.year}-01-01`),
                lostDate: new Date(`${championship.year}-12-31`),
                daysHeld: championship.days
              }
            });
          }
        } catch (error) {
          console.warn(`Could not add championship ${championship.title} for ${wrestler.name}`);
        }
      }
      
      console.log(`✅ Added ${wrestler.name} (${slug})`);
      addedCount++;
      
    } catch (error) {
      console.error(`❌ Error adding ${wrestler.name}:`, error);
    }
  }
  
  console.log(`\n🎉 Successfully added ${addedCount} wrestlers!`);
  await prisma.$disconnect();
}

addMissingWrestlers().catch(console.error);