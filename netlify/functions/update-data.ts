import { Handler } from '@netlify/functions';
import { PrismaClient } from '@prisma/client';

// Use the correct path for Netlify functions runtime
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "file:./dev.db"
    }
  }
});

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
  if (event?.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }
  
  try {
    // Test database connection and get counts
    const [profileCount, highlightCount, rivalryCount, eventCount] = await Promise.all([
      prisma.profile.count(),
      prisma.careerHighlight.count(),
      prisma.rivalry.count(),
      prisma.event.count()
    ]);

    const response = {
      success: true,
      database_status: {
        profiles: profileCount,
        career_highlights: highlightCount,
        rivalries: rivalryCount,
        events: eventCount
      },
      message: 'Database accessible and populated',
      timestamp: new Date().toISOString()
    };

    console.log('✅ Database status check completed:', response);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(response),
    };
    
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        error: `Database connection failed: ${errorMessage}`,
        timestamp: new Date().toISOString()
      }),
    };
  } finally {
    await prisma.$disconnect();
  }
};

export { handler };