import { getAllProfiles } from '../lib/profiles';

async function testProfiles() {
  console.log('Testing profile loading...');
  
  try {
    const profiles = await getAllProfiles();
    console.log(`Total profiles loaded: ${profiles.length}`);
    
    const wrestlers = profiles.filter(p => p.type === 'wrestler');
    const fighters = profiles.filter(p => p.type === 'fighter');
    
    console.log(`Wrestlers: ${wrestlers.length}`);
    console.log(`Fighters: ${fighters.length}`);
    
    // Show recent profiles
    const recent = profiles.slice(-10);
    console.log('\nLast 10 profiles added:');
    recent.forEach(p => console.log(`- ${p.name} (${p.type})`));
    
  } catch (error) {
    console.error('Error loading profiles:', error);
  }
}

testProfiles();