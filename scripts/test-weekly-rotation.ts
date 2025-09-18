#!/usr/bin/env node
/**
 * Test script to verify PPV Flashback weekly rotation
 */

import { getISOWeek, getYear } from 'date-fns';

async function testWeeklyRotation() {
  console.log('🎪 Testing PPV Flashback Weekly Rotation...\n');

  // Test current week
  const now = new Date();
  const currentWeek = getISOWeek(now);
  const currentYear = getYear(now);
  
  console.log(`📅 Current Date: ${now.toLocaleDateString()}`);
  console.log(`📊 Current ISO Week: ${currentWeek} of ${currentYear}`);
  console.log('');

  // Test different endpoints
  const endpoints = [
    { name: 'WWE Flashback', url: 'http://localhost:3000/api/events/wwe-flashback' },
    { name: 'UFC Flashback', url: 'http://localhost:3000/api/events/ufc-flashback' },
    { name: 'Weekly Refresh Status', url: 'http://localhost:3000/api/refresh/weekly' }
  ];

  for (const endpoint of endpoints) {
    console.log(`🔍 Testing ${endpoint.name}:`);
    
    try {
      const response = await fetch(endpoint.url);
      
      if (!response.ok) {
        console.log(`❌ ${endpoint.name} failed: ${response.status}`);
        continue;
      }
      
      const data = await response.json();
      
      if (endpoint.name === 'Weekly Refresh Status') {
        console.log(`✅ ${endpoint.name} operational`);
        console.log(`   Current Time: ${data.currentTime}`);
        console.log(`   Current Week: ${data.currentWeek}`);
      } else if (data.event) {
        console.log(`✅ ${endpoint.name} returned event:`);
        console.log(`   Event: ${data.event.name}`);
        console.log(`   Date: ${new Date(data.event.date).toDateString()}`);
        console.log(`   Promotion: ${data.event.promotion}`);
        if (data.event.yearsAgo) {
          console.log(`   Years Ago: ${data.event.yearsAgo}`);
        }
      } else {
        console.log(`⚠️  ${endpoint.name} returned no event data`);
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.log(`❌ Error testing ${endpoint.name}:`, errorMessage);
    }
    
    console.log(''); // Empty line for readability
  }

  // Test manual refresh (requires auth token)
  console.log('🔄 Testing manual weekly refresh:');
  console.log('   To test refresh manually, set WEEKLY_REFRESH_TOKEN in .env and run:');
  console.log('   curl -X POST -H "Authorization: Bearer your-token" http://localhost:3000/api/refresh/weekly');
  console.log('');

  // Show upcoming weeks for testing
  console.log('📊 Upcoming weeks for testing:');
  for (let i = 0; i < 4; i++) {
    const futureDate = new Date(now);
    futureDate.setDate(futureDate.getDate() + (i * 7));
    const futureWeek = getISOWeek(futureDate);
    const futureYear = getYear(futureDate);
    console.log(`   Week ${futureWeek} of ${futureYear}: ${futureDate.toDateString()}`);
  }

  console.log('\n🎉 Weekly rotation test completed!');
  console.log('\n💡 Next steps:');
  console.log('1. Content should automatically update every Sunday at midnight');
  console.log('2. Cache refreshes every 6 hours during the week');
  console.log('3. Check browser console for debug logs about current week calculations');
}

testWeeklyRotation().catch(console.error);