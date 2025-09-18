// Netlify scheduled function for weekly PPV Flashback refresh
// Runs every Sunday at midnight UTC (0 0 * * 0)
export const handler = async (event, context) => {
  // Only run on scheduled events
  if (event.source !== 'schedule') {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'This function should only be called by scheduled events' })
    };
  }

  try {
    console.log('[Netlify Weekly Refresh] Starting scheduled refresh...');
    
    // Call our internal weekly refresh API
    const refreshUrl = process.env.NETLIFY_URL || process.env.URL || 'http://localhost:3000';
    const response = await fetch(`${refreshUrl}/api/refresh/weekly`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WEEKLY_REFRESH_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Refresh API responded with status: ${response.status}`);
    }

    const result = await response.json();
    
    console.log('[Netlify Weekly Refresh] ✅ Successfully completed:', result);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Weekly PPV Flashback refresh completed',
        timestamp: new Date().toISOString(),
        result
      })
    };

  } catch (error) {
    console.error('[Netlify Weekly Refresh] ❌ Failed:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};

// Configure the schedule: Every Sunday at midnight UTC
export const schedule = '0 0 * * 0';