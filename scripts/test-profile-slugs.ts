import { toProfileSlug } from '../lib/profiles';

// Test slug generation
const testNames = [
  'Austin Aries',
  'CM Punk', 
  'The Iron Sheik',
  'Stone Cold Steve Austin',
  'The Rock'
];

console.log('Testing profile slug generation:');
testNames.forEach(name => {
  console.log(`${name} -> ${toProfileSlug(name)}`);
});

// Test if slug exists in database
import { getProfileBySlug } from '../lib/profiles';

async function testProfileLookup() {
  console.log('\nTesting profile lookup:');
  for (const name of testNames) {
    const slug = toProfileSlug(name);
    try {
      const profile = await getProfileBySlug(slug);
      console.log(`${slug}: ${profile ? '✅ Found' : '❌ Not found'}`);
    } catch (error) {
      console.log(`${slug}: ❌ Error - ${error}`);
    }
  }
}

testProfileLookup();