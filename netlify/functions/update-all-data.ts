import { Handler } from '@netlify/functions';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "file:./dev.db"
    }
  }
});

const handler: Handler = async (event, context) => {
  console.log('🚀 Comprehensive wrestling data update initiated');
  
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };
  
  if (event?.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }
  
  try {
    const [profileCount, highlightCount, rivalryCount, eventCount] = await Promise.all([
      prisma.profile.count(),
      prisma.careerHighlight.count(),
      prisma.rivalry.count(),
      prisma.event.count()
    ]);

    const response = {
      success: true,
      message: 'Comprehensive wrestling data update completed',
      database_status: {
        profiles: profileCount,
        career_highlights: highlightCount,
        rivalries: rivalryCount,
        events: eventCount
      },
      note: 'Main data population happens during build. This function shows current state.',
      timestamp: new Date().toISOString()
    };

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(response),
    };
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        error: `Data update failed: ${errorMessage}`,
        timestamp: new Date().toISOString()
      }),
    };
  } finally {
    await prisma.$disconnect();
  }
};

export { handler };
