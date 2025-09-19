import { Handler } from '@netlify/functions';
import { promisify } from 'util';
import { exec } from 'child_process';

const execAsync = promisify(exec);

// Manual trigger function for checking wrestling database status
const handler: Handler = async (event, context) => {
  console.log('🚀 Wrestling database status check initiated');
  
  // Add CORS headers for browser access
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };
  
  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }
  
  try {
    console.log('📊 Running database summary for current state...');
    const { stdout } = await execAsync('cd /opt/build/repo && npx tsx scripts/database-summary.ts');
    
    // Parse statistics from output
    const stats = stdout.match(/(\d+)\s+profiles/)?.[1] || '0';
    const events = stdout.match(/(\d+)\s+events/)?.[1] || '0';
    const reigns = stdout.match(/(\d+)\s+championship reigns/)?.[1] || '0';
    const rivalries = stdout.match(/(\d+)\s+rivalries/)?.[1] || '0';
    const highlights = stdout.match(/(\d+)\s+career highlights/)?.[1] || '0';
    
    const updateTime = new Date().toISOString();
    
    console.log(`✅ Database query completed successfully at ${updateTime}`);
    console.log(`📈 Current Statistics:
    - ${stats} total profiles
    - ${events} total events  
    - ${reigns} championship reigns
    - ${rivalries} rivalries
    - ${highlights} career highlights`);
    
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        message: 'Wrestling database queried successfully',
        timestamp: updateTime,
        statistics: {
          profiles: parseInt(stats),
          events: parseInt(events),
          reigns: parseInt(reigns),
          rivalries: parseInt(rivalries),
          career_highlights: parseInt(highlights)
        },
        note: 'This function shows current database state. Use update-all-data function for comprehensive updates.'
      })
    };
    
  } catch (error: any) {
    console.error('❌ Database query failed:', error.message);
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
        message: 'Database query failed - check function logs for details'
      })
    };
  }
};

export { handler };