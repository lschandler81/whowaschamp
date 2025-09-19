import { schedule } from '@netlify/functions';
import type { HandlerEvent, HandlerContext } from '@netlify/functions';

// Runs 1st of every month at 9 AM UTC (4 AM EST, 1 AM PST)
const handler = schedule('0 9 1 * *', async (event: HandlerEvent, context: HandlerContext) => {
  console.log('📅 Monthly wrestling data update reminder triggered');
  
  const updateUrl = `${process.env.URL || 'https://whowaschamp.netlify.app'}/.netlify/functions/update-data`;
  const currentDate = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });
  
  // Log detailed reminder - you'll see this in Netlify function logs
  console.log(`
🎯 MONTHLY WRESTLING DATA UPDATE REMINDER - ${currentDate}

⏰ Time to update your wrestling database!

📊 What to check this month:
   - Recent WWE championship changes
   - Latest UFC title fights and results  
   - AEW championship updates
   - New wrestler debuts and signings
   - Boxing title fights and results

🔗 Update URL: ${updateUrl}

📋 Process:
   1. Visit the update URL above
   2. Wait for completion confirmation
   3. Check your live site for updated data
   4. Review any warnings or errors

💡 Tip: Bookmark the update URL for easy monthly access!
  `);
  
  // Also return the information in case you want to build a dashboard
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: `Monthly update reminder for ${currentDate}`,
      updateUrl: updateUrl,
      timestamp: new Date().toISOString(),
      instructions: [
        'Visit the update URL to refresh wrestling data',
        'Check WWE, UFC, AEW, and Boxing for recent changes',
        'Review results for any errors or warnings',
        'Verify updated data appears on your live site'
      ]
    })
  };
});

export { handler };