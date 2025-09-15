const http = require('http');

function testAPI(path, description) {
  return new Promise((resolve, reject) => {
    console.log(`\n🧪 ${description}`);
    console.log(`   URL: http://localhost:3000${path}`);
    
    const req = http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          console.log(`   Status: ${res.statusCode}`);
          console.log(`   Response:`, JSON.stringify(jsonData, null, 2));
          resolve({ status: res.statusCode, data: jsonData });
        } catch (error) {
          console.log(`   Status: ${res.statusCode}`);
          console.log(`   Raw response:`, data);
          resolve({ status: res.statusCode, data: data });
        }
      });
    });
    
    req.on('error', (error) => {
      console.log(`   Error: ${error.message}`);
      resolve({ error: error.message });
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      console.log(`   Timeout after 5 seconds`);
      resolve({ error: 'Timeout' });
    });
  });
}

async function runTests() {
  console.log('🎯 Testing PPV APIs...');
  console.log('   Server should be running on http://localhost:3000');
  
  // Wait a moment for server to be ready
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Test "On This Day" API
  await testAPI('/api/events/on-this-day?month=9&day=15', 'On This Day API (September 15)');
  
  // Test PPV Flashback API
  await testAPI('/api/events/ppv-flashback', 'PPV Flashback API');
  
  console.log('\n🎉 API tests completed!');
  console.log('\n💡 If both APIs return data successfully, your production issue is fixed!');
  process.exit(0);
}

runTests().catch(console.error);
