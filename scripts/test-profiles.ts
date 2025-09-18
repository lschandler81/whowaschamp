import { getAllProfiles } from '../lib/profiles';

async function testProfiles() {
  try {
    console.log('Testing getAllProfiles...');
    const profiles = await getAllProfiles();
    console.log(`Found ${profiles.length} profiles`);
    
    if (profiles.length > 0) {
      console.log('First profile:', profiles[0]);
      console.log('Profile types:', profiles.slice(0, 5).map(p => ({ name: p.name, type: p.type })));
    }
  } catch (error) {
    console.error('Error fetching profiles:', error);
  }
  
  process.exit(0);
}

testProfiles();