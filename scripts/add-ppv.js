const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const promotions = ['WWE', 'UFC', 'AEW', 'WCW', 'ECW', 'TNA', 'NJPW', 'Other'];

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

function selectPromotion() {
  return new Promise((resolve) => {
    console.log('\n📋 Select promotion:');
    promotions.forEach((promo, index) => {
      console.log(`${index + 1}. ${promo}`);
    });
    
    rl.question('\nEnter number (1-8): ', (answer) => {
      const index = parseInt(answer) - 1;
      if (index >= 0 && index < promotions.length) {
        resolve(promotions[index]);
      } else {
        console.log('❌ Invalid selection. Using "Other".');
        resolve('Other');
      }
    });
  });
}

async function addPPVEvent() {
  try {
    console.log('🎪 Add New PPV Event\n');
    console.log('📝 Enter event details (press Enter to skip optional fields):\n');

    const name = await askQuestion('Event name (required): ');
    if (!name) {
      console.log('❌ Event name is required!');
      return;
    }

    const date = await askQuestion('Date (YYYY-MM-DD, required): ');
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      console.log('❌ Valid date in YYYY-MM-DD format is required!');
      return;
    }

    const promotion = await selectPromotion();
    const venue = await askQuestion('Venue (optional): ');
    const city = await askQuestion('City (optional): ');
    const country = await askQuestion('Country (optional): ');
    const attendanceStr = await askQuestion('Attendance (optional): ');
    const buyrateStr = await askQuestion('Buyrate/PPV buys (optional): ');

    const attendance = attendanceStr ? parseInt(attendanceStr) : null;
    const buyrate = buyrateStr ? parseInt(buyrateStr) : null;

    // Generate unique ID
    const id = `manual-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const newEvent = {
      id,
      name,
      date: `${date}T00:00:00.000Z`,
      promotion,
      venue: venue || null,
      city: city || null,
      country: country || null,
      attendance,
      buyrate,
      isPpv: true,
      addedManually: true,
      addedAt: new Date().toISOString()
    };

    // Load existing events
    const eventsPath = path.join(process.cwd(), 'public', 'data', 'manual-ppv-events.json');
    let existingEvents = [];
    
    if (fs.existsSync(eventsPath)) {
      existingEvents = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));
    }

    // Add new event
    existingEvents.push(newEvent);
    
    // Sort by date
    existingEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Create data directory if it doesn't exist
    const dataDir = path.dirname(eventsPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Save updated events
    fs.writeFileSync(eventsPath, JSON.stringify(existingEvents, null, 2));

    console.log('\n✅ PPV event added successfully!');
    console.log(`📁 Saved to: ${eventsPath}`);
    console.log(`🎪 ${name} (${promotion}) - ${date}`);

    const shouldCommit = await askQuestion('\n🚀 Commit and push changes? (y/n): ');
    
    if (shouldCommit.toLowerCase() === 'y') {
      try {
        // Regenerate static data
        console.log('\n🔄 Regenerating static PPV data...');
        execSync('npx tsx scripts/generate-ppv-data.ts', { stdio: 'inherit' });
        
        // Git operations
        console.log('📦 Adding files to git...');
        execSync(`git add ${eventsPath}`, { stdio: 'inherit' });
        execSync('git add public/data/ppv-flashback.json', { stdio: 'inherit' });
        execSync('git add public/data/ppv-flashback-summary.json', { stdio: 'inherit' });
        
        console.log('💾 Committing changes...');
        execSync(`git commit -m "Add PPV event: ${name} (${promotion}) - ${date}"`, { stdio: 'inherit' });
        
        console.log('🚀 Pushing to remote...');
        execSync('git push', { stdio: 'inherit' });
        
        console.log('\n🎉 Successfully deployed new PPV event!');
        console.log('⏱️  Netlify should rebuild and deploy automatically (2-3 minutes)');
        
      } catch (error) {
        console.error('❌ Error during git operations:', error.message);
        console.log('💡 You can manually run: git add . && git commit -m "message" && git push');
      }
    } else {
      console.log('\n💡 To deploy later, run: npm run update-static-data');
    }

  } catch (error) {
    console.error('❌ Error adding PPV event:', error);
  } finally {
    rl.close();
  }
}

// Run the script
addPPVEvent();