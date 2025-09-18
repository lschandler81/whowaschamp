import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ADDITIONAL_WOMENS_WRESTLERS = [
  {
    name: "Fabulous Moolah",
    realName: "Mary Lillian Ellison",
    nickname: "The Fabulous Moolah",
    hometown: "Kershaw County, South Carolina",
    height: "5'4\"",
    weight: "138 lbs",
    debut: "1949-01-01",
    retirement: "2007-10-27",
    finisher: "Hair Pull Snapmare",
    era: "Golden",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Women's Championship", reigns: 4, days: 10170, year: 1956 }
    ],
    bio: "Longest-reigning champion in WWE history, holding the Women's Championship for 28 years combined."
  },
  {
    name: "Mae Young",
    realName: "Johnnie Mae Young",
    nickname: "The First Lady of Wrestling",
    hometown: "Sand Springs, Oklahoma",
    height: "5'4\"",
    weight: "135 lbs",
    debut: "1939-01-01",
    retirement: "2008-01-01",
    finisher: "Mae Young Press",
    era: "Golden",
    promotions: ["WWE"],
    championships: [],
    bio: "Wrestling pioneer who competed for nearly 70 years and remained active into her 80s."
  },
  {
    name: "Jacqueline",
    realName: "Jacqueline DeLois Moore",
    nickname: "Miss Jackie",
    hometown: "Dallas, Texas",
    height: "5'3\"",
    weight: "130 lbs",
    debut: "1988-01-01",
    retirement: "2019-01-01",
    finisher: "DDT",
    era: "Attitude",
    promotions: ["WWE", "WCW"],
    championships: [
      { title: "WWE Women's Championship", reigns: 2, days: 155, year: 1998 }
    ],
    bio: "First African-American WWE Women's Champion and tough competitor who broke barriers."
  },
  {
    name: "Ivory",
    realName: "Lisa Mary Moretti",
    nickname: "The Role Model",
    hometown: "Los Angeles, California",
    height: "5'4\"",
    weight: "140 lbs",
    debut: "1986-01-01",
    retirement: "2005-01-01",
    finisher: "Poison Ivory",
    era: "Attitude",
    promotions: ["WWE", "GLOW"],
    championships: [
      { title: "WWE Women's Championship", reigns: 3, days: 126, year: 1999 }
    ],
    bio: "Member of Right to Censor who became a three-time Women's Champion in the Attitude Era."
  },
  {
    name: "Molly Holly",
    realName: "Nora Kristina Benshoof",
    nickname: "Mighty Molly",
    hometown: "Mobile, Alabama",
    height: "5'4\"",
    weight: "130 lbs",
    debut: "1997-01-01",
    retirement: "2005-01-01",
    finisher: "Molly-Go-Round",
    era: "Ruthless Aggression",
    promotions: ["WWE", "WCW"],
    championships: [
      { title: "WWE Women's Championship", reigns: 2, days: 126, year: 2002 },
      { title: "WWE Hardcore Championship", reigns: 1, days: 1, year: 2002 }
    ],
    bio: "Technical wrestler who was part of the Holly family and known for her wholesome character."
  },
  {
    name: "Victoria",
    realName: "Lisa Marie Varon",
    nickname: "The Psycho Bitch",
    hometown: "San Bernardino, California",
    height: "5'8\"",
    weight: "140 lbs",
    debut: "2000-01-01",
    retirement: "2016-01-01",
    finisher: "Widow's Peak",
    era: "Ruthless Aggression",
    promotions: ["WWE", "TNA"],
    championships: [
      { title: "WWE Women's Championship", reigns: 2, days: 371, year: 2002 }
    ],
    bio: "Fitness enthusiast turned psychotic character who dominated the early 2000s women's division."
  },
  {
    name: "Mickie James",
    realName: "Mickie Laree James",
    nickname: "Hardcore Country",
    hometown: "Richmond, Virginia",
    height: "5'4\"",
    weight: "125 lbs",
    debut: "1999-01-01",
    retirement: null,
    finisher: "Mick Kick",
    era: "Ruthless Aggression",
    promotions: ["WWE", "TNA"],
    championships: [
      { title: "WWE Women's Championship", reigns: 5, days: 1124, year: 2006 },
      { title: "WWE Divas Championship", reigns: 1, days: 113, year: 2009 }
    ],
    bio: "Country music recording artist and five-time Women's Champion with incredible longevity."
  },
  {
    name: "Melina",
    realName: "Melina Nava Perez",
    nickname: "The Paparazzi Princess",
    hometown: "Los Angeles, California",
    height: "5'4\"",
    weight: "115 lbs",
    debut: "2004-01-01",
    retirement: "2011-01-01",
    finisher: "Extreme Makeover",
    era: "Ruthless Aggression",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Women's Championship", reigns: 3, days: 532, year: 2007 },
      { title: "WWE Divas Championship", reigns: 2, days: 98, year: 2010 }
    ],
    bio: "Former model and manager who became a five-time champion known for her flexibility."
  },
  {
    name: "Michelle McCool",
    realName: "Michelle Leigh McCool",
    nickname: "The Cool One",
    hometown: "Palatka, Florida",
    height: "5'10\"",
    weight: "120 lbs",
    debut: "2004-01-01",
    retirement: "2011-01-01",
    finisher: "Faith Breaker",
    era: "Ruthless Aggression",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Divas Championship", reigns: 2, days: 279, year: 2008 },
      { title: "WWE Women's Championship", reigns: 2, days: 218, year: 2009 }
    ],
    bio: "Former teacher who became the first Divas Champion and formed LayCool with Layla."
  },
  {
    name: "Beth Phoenix",
    realName: "Elizabeth Kocianski Copeland",
    nickname: "The Glamazon",
    hometown: "Elmira, New York",
    height: "5'7\"",
    weight: "150 lbs",
    debut: "2001-01-01",
    retirement: "2012-01-01",
    finisher: "Glam Slam",
    era: "Ruthless Aggression",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Women's Championship", reigns: 3, days: 504, year: 2007 },
      { title: "WWE Divas Championship", reigns: 1, days: 204, year: 2011 }
    ],
    bio: "Powerhouse wrestler married to Edge who dominated with strength and technical skill."
  },
  {
    name: "Layla",
    realName: "Layla El",
    nickname: "The British Bombshell",
    hometown: "London, England",
    height: "5'2\"",
    weight: "110 lbs",
    debut: "2006-01-01",
    retirement: "2015-01-01",
    finisher: "Lay-Out",
    era: "PG",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Divas Championship", reigns: 1, days: 140, year: 2010 },
      { title: "WWE Women's Tag Team Championship", reigns: 1, days: 33, year: 2010 }
    ],
    bio: "British dancer who formed the LayCool team with Michelle McCool and held multiple titles."
  },
  {
    name: "Maryse",
    realName: "Maryse Mizanin",
    nickname: "The Sexiest of the Sexy",
    hometown: "Montreal, Quebec, Canada",
    height: "5'8\"",
    weight: "125 lbs",
    debut: "2006-01-01",
    retirement: "2019-01-01",
    finisher: "French Kiss",
    era: "PG",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Divas Championship", reigns: 2, days: 216, year: 2008 }
    ],
    bio: "French-Canadian model who became a two-time Divas Champion before managing The Miz."
  },
  {
    name: "Kelly Kelly",
    realName: "Barbara Jean Blank",
    nickname: "Kelly Kelly",
    hometown: "Jacksonville, Florida",
    height: "5'5\"",
    weight: "108 lbs",
    debut: "2006-01-01",
    retirement: "2012-01-01",
    finisher: "K2",
    era: "PG",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Divas Championship", reigns: 1, days: 104, year: 2011 }
    ],
    bio: "Former gymnast and model who became Divas Champion and was a fan favorite in the late 2000s."
  },
  {
    name: "Kaitlyn",
    realName: "Celeste Beryl Bonin",
    nickname: "The Hybrid Diva",
    hometown: "Houston, Texas",
    height: "5'6\"",
    weight: "134 lbs",
    debut: "2010-01-01",
    retirement: "2014-01-01",
    finisher: "Spear",
    era: "PG",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Divas Championship", reigns: 1, days: 153, year: 2013 }
    ],
    bio: "Bodybuilder and former NXT winner who brought power and athleticism to the Divas division."
  },
  {
    name: "AJ Lee",
    realName: "April Jeanette Mendez",
    nickname: "The Black Widow",
    hometown: "Union City, New Jersey",
    height: "5'2\"",
    weight: "115 lbs",
    debut: "2007-01-01",
    retirement: "2015-01-01",
    finisher: "Black Widow",
    era: "PG",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Divas Championship", reigns: 3, days: 406, year: 2013 }
    ],
    bio: "Nerdy character who became a three-time Divas Champion and was married to CM Punk."
  },
  {
    name: "Paige",
    realName: "Saraya-Jade Bevis",
    nickname: "The Anti-Diva",
    hometown: "Norwich, England",
    height: "5'8\"",
    weight: "120 lbs",
    debut: "2005-01-01",
    retirement: "2018-01-01",
    finisher: "Paige Turner",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Divas Championship", reigns: 2, days: 308, year: 2014 },
      { title: "NXT Women's Championship", reigns: 1, days: 301, year: 2013 }
    ],
    bio: "British wrestling royalty who became the youngest Divas Champion and started the women's revolution."
  },
  {
    name: "Nikki Bella",
    realName: "Stephanie Nicole Garcia-Colace",
    nickname: "Fearless Nikki",
    hometown: "San Diego, California",
    height: "5'6\"",
    weight: "125 lbs",
    debut: "2007-01-01",
    retirement: "2023-01-01",
    finisher: "Rack Attack",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Divas Championship", reigns: 2, days: 301, year: 2011 }
    ],
    bio: "Twin sister who became the longest-reigning Divas Champion in modern history at 301 days."
  },
  {
    name: "Brie Bella",
    realName: "Brianna Monique Garcia-Colace",
    nickname: "Brie Mode",
    hometown: "San Diego, California",
    height: "5'6\"",
    weight: "125 lbs",
    debut: "2007-01-01",
    retirement: "2019-01-01",
    finisher: "Yes! Lock",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Divas Championship", reigns: 1, days: 70, year: 2011 }
    ],
    bio: "Daniel Bryan's wife and Nikki's twin who formed the Bella Twins and was Divas Champion."
  },
  {
    name: "Asuka",
    realName: "Kanako Urai",
    nickname: "The Empress of Tomorrow",
    hometown: "Osaka, Japan",
    height: "5'3\"",
    weight: "137 lbs",
    debut: "2004-01-01",
    retirement: null,
    finisher: "Asuka Lock",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "WWE SmackDown Women's Championship", reigns: 1, days: 140, year: 2018 },
      { title: "WWE Raw Women's Championship", reigns: 1, days: 510, year: 2020 },
      { title: "NXT Women's Championship", reigns: 1, days: 523, year: 2015 }
    ],
    bio: "Japanese submission specialist with an undefeated streak of 914 days across NXT and main roster."
  },
  {
    name: "Alexa Bliss",
    realName: "Alexis Kaufman",
    nickname: "Little Miss Bliss",
    hometown: "Columbus, Ohio",
    height: "5'1\"",
    weight: "102 lbs",
    debut: "2013-01-01",
    retirement: null,
    finisher: "Twisted Bliss",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Raw Women's Championship", reigns: 3, days: 223, year: 2017 },
      { title: "WWE SmackDown Women's Championship", reigns: 2, days: 181, year: 2016 }
    ],
    bio: "Former gymnast who became the first woman to hold both Raw and SmackDown Women's Championships."
  }
];

async function importAdditionalWomensWrestlers() {
  console.log('👩‍🦰 Starting additional women\'s wrestlers import...\n');

  let importedProfiles = 0;
  let importedChampionships = 0;
  let skipped = 0;

  for (const wrestlerData of ADDITIONAL_WOMENS_WRESTLERS) {
    try {
      console.log(`📝 Processing ${wrestlerData.name}...`);

      // Check if profile already exists
      const existingProfile = await prisma.profile.findFirst({
        where: { 
          OR: [
            { name: wrestlerData.name },
            { slug: wrestlerData.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-') }
          ]
        }
      });

      if (existingProfile) {
        console.log(`   ⚠️  ${wrestlerData.name} already exists, skipping...`);
        skipped++;
        continue;
      }

      // Create profile
      const profile = await prisma.profile.create({
        data: {
          name: wrestlerData.name,
          slug: wrestlerData.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
          type: 'wrestler',
          nickname: wrestlerData.nickname,
          hometown: wrestlerData.hometown,
          height: wrestlerData.height,
          weight: wrestlerData.weight,
          debut: wrestlerData.debut ? new Date(wrestlerData.debut) : null,
          retired: wrestlerData.retirement ? new Date(wrestlerData.retirement) : null,
          bio: wrestlerData.bio,
          tagline: `${wrestlerData.championships?.reduce((total, c) => total + c.reigns, 0) || 0}-time Women's Champion`
        }
      });

      // Create wrestler-specific profile
      await prisma.wrestlerProfile.create({
        data: {
          profileId: profile.id,
          finisher: wrestlerData.finisher,
          era: wrestlerData.era,
          worldTitleReigns: wrestlerData.championships?.reduce((total, c) => total + c.reigns, 0) || 0,
          combinedDaysAsChampion: wrestlerData.championships?.reduce((total, c) => total + c.days, 0) || 0,
          firstReignDate: wrestlerData.championships?.length ? new Date(`${wrestlerData.championships[0].year}-01-01`) : null,
          lastReignDate: wrestlerData.championships?.length ? new Date(`${wrestlerData.championships[wrestlerData.championships.length - 1].year}-01-01`) : null
        }
      });

      importedProfiles++;

      // Handle promotions and championships
      if (wrestlerData.promotions && wrestlerData.championships?.length) {
        for (const promotionName of wrestlerData.promotions) {
          // Find or create promotion
          let promotion = await prisma.promotion.findFirst({
            where: { 
              OR: [
                { name: promotionName },
                { name: promotionName === "WWE" ? "World Wrestling Entertainment" : promotionName }
              ]
            }
          });
          
          if (!promotion) {
            try {
              promotion = await prisma.promotion.create({
                data: {
                  name: promotionName,
                  slug: promotionName.toLowerCase().replace(/[^a-z0-9]/g, '-')
                }
              });
            } catch (error) {
              // Promotion might already exist with different slug, find it
              promotion = await prisma.promotion.findFirst({
                where: { 
                  slug: promotionName.toLowerCase().replace(/[^a-z0-9]/g, '-')
                }
              });
            }
          }

          if (promotion) {
            // Connect profile to promotion
            await prisma.profilePromotion.upsert({
              where: {
                profileId_promotionId: {
                  profileId: profile.id,
                  promotionId: promotion.id
                }
              },
              update: {},
              create: {
                profileId: profile.id,
                promotionId: promotion.id
              }
            });
          }
        }

        // Import championships
        for (const championship of wrestlerData.championships) {
          const promotion = await prisma.promotion.findFirst({
            where: { 
              OR: [
                { name: { in: wrestlerData.promotions } },
                { name: "World Wrestling Entertainment" }
              ]
            }
          });

          if (promotion) {
            await prisma.championship.create({
              data: {
                profileId: profile.id,
                titleName: championship.title,
                promotionId: promotion.id,
                reignNumber: championship.reigns,
                wonDate: new Date(`${championship.year}-01-01`),
                daysHeld: championship.days,
                isCurrentChampion: false
              }
            });
            importedChampionships++;
          }
        }
      } else if (wrestlerData.promotions) {
        // Just connect to promotions without championships
        for (const promotionName of wrestlerData.promotions) {
          let promotion = await prisma.promotion.findFirst({
            where: { 
              OR: [
                { name: promotionName },
                { name: promotionName === "WWE" ? "World Wrestling Entertainment" : promotionName }
              ]
            }
          });

          if (promotion) {
            await prisma.profilePromotion.upsert({
              where: {
                profileId_promotionId: {
                  profileId: profile.id,
                  promotionId: promotion.id
                }
              },
              update: {},
              create: {
                profileId: profile.id,
                promotionId: promotion.id
              }
            });
          }
        }
      }

      console.log(`   ✅ ${wrestlerData.name} imported successfully`);

    } catch (error) {
      console.error(`   ❌ Error importing ${wrestlerData.name}:`, error);
    }
  }

  console.log('\n👩‍🦰 Additional women\'s wrestlers import completed!');
  console.log(`📊 Total Profiles Imported: ${importedProfiles}`);
  console.log(`⚠️  Profiles Skipped: ${skipped}`);
  console.log(`🏆 Total Championships Imported: ${importedChampionships}`);

  await prisma.$disconnect();
}

if (require.main === module) {
  importAdditionalWomensWrestlers().catch(console.error);
}

export { importAdditionalWomensWrestlers };