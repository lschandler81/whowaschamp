import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// List of notable wrestlers that might be missing
const NOTABLE_WRESTLERS = [
  'Christian',
  'Jeff Jarrett',
  'Christian Cage',
  'Double J Jeff Jarrett',
  'Captain Charisma',
  'Edge',  // Check if we have Edge
  'Matt Hardy',
  'Jeff Hardy',
  'Hardy Boyz',
  'Dudley Boys',
  'Bubba Ray Dudley',
  'D-Von Dudley',
  'Test',
  'Big Boss Man',
  'Ken Shamrock',
  'Val Venis',
  'X-Pac',
  'Road Dogg',
  'Billy Gunn',
  'New Age Outlaws',
  'D-Generation X',
  'Al Snow',
  'Hardcore Holly',
  'Bob Holly',
  'Crash Holly',
  'Molly Holly',
  'Ivory',
  'Jacqueline',
  'Chyna',
  'Lita',
  'Trish Stratus',
  'Victoria',
  'Mickie James',
  'Carlito',
  'Chris Masters',
  'Muhammad Hassan',
  'Daivari',
  'JBL',
  'John Bradshaw Layfield',
  'Orlando Jordan',
  'Heidenreich',
  'Luther Reigns',
  'Mark Jindrak',
  'Garrison Cade',
  'Lance Cade',
  'Trevor Murdoch',
  'Highlanders',
  'Robbie McAllister',
  'Rory McAllister',
  'Eugene',
  'William Regal',
  'Fit Finlay',
  'Finlay',
  'Bobby Lashley',
  'Umaga',
  'Rikishi',
  'Too Cool',
  'Scotty 2 Hotty',
  'Grand Master Sexay',
  'Rikishi Phatu',
  'The Headbangers',
  'Mosh',
  'Thrasher',
  'The Godwinns',
  'Henry Godwinn',
  'Phineas Godwinn',
  'The New Blackjacks',
  'Bradshaw',
  'Justin Hawk Bradshaw',
  'Farooq',
  'Ron Simmons',
  'The Nation of Domination',
  'D-Lo Brown',
  'Mark Henry',
  'Ahmed Johnson',
  'Savio Vega',
  'Razor Ramon',
  'Scott Hall',
  'Diesel',
  'Kevin Nash',
  'Sycho Sid',
  'Sid Vicious',
  'Sid Justice',
  '123 Kid',
  'Lightning Kid',
  'Doink the Clown',
  'Tatanka',
  'Papa Shango',
  'Kamala',
  'The Berzerker',
  'Nailz',
  'Giant Gonzalez',
  'Ludvig Borga',
  'Yokozuna',
  'Bam Bam Bigelow',
  'King Kong Bundy',
  'One Man Gang',
  'Akeem',
  'Big John Studd',
  'Andre the Giant',
  'Hercules',
  'Haku',
  'The Barbarian',
  'The Powers of Pain',
  'Demolition',
  'Ax',
  'Smash',
  'Crush',
  'The Brain Busters',
  'Arn Anderson',
  'Tully Blanchard',
  'The Red Rooster',
  'Terry Taylor',
  'The Blue Blazer',
  'Owen Hart',
  'British Bulldog',
  'Davey Boy Smith',
  'Jim Neidhart',
  'The Anvil',
  'Bret Hart',
  'Hart Foundation',
  'Jacques Rougeau',
  'Raymond Rougeau',
  'The Fabulous Rougeaus',
  'The Mountie',
  'Dino Bravo',
  'Rick Martel',
  'The Model',
  'Honky Tonk Man',
  'Greg Valentine',
  'The Hammer',
  'Brutus Beefcake',
  'The Barber',
  'Hacksaw Jim Duggan',
  '2x4',
  'Koko B. Ware',
  'Frankie',
  'Junkyard Dog',
  'JYD',
  'Tony Atlas',
  'Rocky Johnson',
  'High Chief Peter Maivia',
  'Chief Jay Strongbow',
  'Wahoo McDaniel',
  'Iron Sheik',
  'Nikolai Volkoff',
  'Sgt. Slaughter',
  'General Adnan',
  'Colonel Mustafa',
  'The Warlord',
  'The Berserker',
  'Rick Rude',
  'Ravishing',
  'Mr. Perfect',
  'Curt Hennig',
  'Texas Tornado',
  'Kerry Von Erich',
  'The Ultimate Warrior',
  'Warrior'
];

async function checkMissingWrestlers() {
  console.log('Checking for missing notable wrestlers...\n');
  
  const missing = [];
  const found = [];
  
  for (const wrestler of NOTABLE_WRESTLERS) {
    try {
      // Search by name (case insensitive)
      const profile = await prisma.profile.findFirst({
        where: {
          OR: [
            {
              name: {
                contains: wrestler
              }
            },
            {
              nickname: {
                contains: wrestler
              }
            }
          ],
          type: 'wrestler'
        },
        select: {
          name: true,
          nickname: true,
          slug: true
        }
      });
      
      if (profile) {
        found.push(`✅ ${wrestler} -> ${profile.name} (${profile.slug})`);
      } else {
        missing.push(`❌ ${wrestler}`);
      }
    } catch (error) {
      console.error(`Error checking ${wrestler}:`, error);
    }
  }
  
  console.log(`\n=== MISSING WRESTLERS (${missing.length}) ===`);
  missing.forEach(wrestler => console.log(wrestler));
  
  console.log(`\n=== FOUND WRESTLERS (${found.length}) ===`);
  found.slice(0, 10).forEach(wrestler => console.log(wrestler)); // Show first 10
  if (found.length > 10) {
    console.log(`... and ${found.length - 10} more`);
  }
  
  // Focus on the most important missing ones
  const highPriority = missing.filter(name => 
    name.includes('Christian') || 
    name.includes('Jeff Jarrett') ||
    name.includes('Edge') ||
    name.includes('Matt Hardy') ||
    name.includes('Jeff Hardy') ||
    name.includes('Chyna') ||
    name.includes('Lita') ||
    name.includes('Trish Stratus') ||
    name.includes('Bobby Lashley') ||
    name.includes('William Regal') ||
    name.includes('Finlay') ||
    name.includes('Ken Shamrock') ||
    name.includes('Ultimate Warrior')
  );
  
  console.log(`\n=== HIGH PRIORITY MISSING (${highPriority.length}) ===`);
  highPriority.forEach(wrestler => console.log(wrestler));
  
  await prisma.$disconnect();
}

checkMissingWrestlers().catch(console.error);