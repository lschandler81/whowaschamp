import { Handler } from '@netlify/functions';
import { execSync } from 'child_process';
import { promisify } from 'util';

const exec = promisify(require('child_process').exec);

const handler: Handler = async (event, context) => {
  console.log('🚀 Comprehensive wrestling data update initiated');
  
  try {
    // Update WWE data with recent championships through 2024
    console.log('📺 Updating WWE championship data...');
    await exec('cd /opt/build/repo && npx tsx scripts/generate-wwe-data.ts');
    
    // Update UFC data with recent fights through 2024
    console.log('🥊 Updating UFC championship data...');
    await exec('cd /opt/build/repo && npx tsx scripts/generate-ufc-data.ts');
    
    // Import any missing current wrestlers
    console.log('👤 Adding current WWE roster...');
    await exec('cd /opt/build/repo && npx tsx scripts/import-current-wwe-stars.ts');
    
    // Update boxing data
    console.log('🥊 Updating boxing championship data...');
    await exec('cd /opt/build/repo && npx tsx scripts/import-boxing-legends.ts');
    
    // Run database summary to get statistics
    console.log('📊 Generating final statistics...');
    const { stdout } = await exec('cd /opt/build/repo && npx tsx scripts/database-summary.ts');
    
    // Parse statistics from output
    const stats = stdout.match(/(\d+)\s+profiles/)?.[1] || '0';
    const events = stdout.match(/(\d+)\s+events/)?.[1] || '0';
    const reigns = stdout.match(/(\d+)\s+championship reigns/)?.[1] || '0';
    const rivalries = stdout.match(/(\d+)\s+rivalries/)?.[1] || '0';
    const highlights = stdout.match(/(\d+)\s+career highlights/)?.[1] || '0';
    
    const updateTime = new Date().toISOString();
    
    console.log(`✅ Database update completed successfully at ${updateTime}`);
    console.log(`📈 Updated Statistics:
    - ${stats} total profiles
    - ${events} total events  
    - ${reigns} championship reigns
    - ${rivalries} rivalries
    - ${highlights} career highlights`);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        message: 'Wrestling database updated successfully',
        timestamp: updateTime,
        statistics: {
          profiles: parseInt(stats),
          events: parseInt(events),
          reigns: parseInt(reigns),
          rivalries: parseInt(rivalries),
          career_highlights: parseInt(highlights)
        },
        updated_categories: [
          'WWE Championships (through 2024)',
          'UFC Title Fights (current data)',
          'Current WWE Roster',
          'Boxing Championships',
          'Career Highlights & Rivalries'
        ]
      })
    };
    
  } catch (error: any) {
    console.error('❌ Database update failed:', error.message);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
        message: 'Wrestling database update failed - check function logs for details'
      })
    };
  }
};

export { handler };