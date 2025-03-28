const DocSlurper = require('./src/DocSlurper');
const path = require('path');
require('dotenv').config();

// Create test examples for the DocSlurper
async function runTests() {
  // Check if API key is available and correctly formatted
  if (!process.env.BRAVE_API_KEY) {
    console.error('\n❌ Brave API Key not found. Please set BRAVE_API_KEY in .env file.');
    console.error('   Sign up for a free key at: https://brave.com/search/api/');
    console.error('   Example .env file content:');
    console.error('   BRAVE_API_KEY=your-api-key-here\n');
    return;
  }
  
  // Very basic validation of API key format
  if (!/^[A-Za-z0-9_-]+$/.test(process.env.BRAVE_API_KEY)) {
    console.error('\n❌ API key appears to be in an invalid format.');
    console.error('   The key should only contain letters, numbers, underscores and hyphens.');
    console.error('   Please check your .env file and ensure the key is correctly copied.\n');
    return;
  }

  console.log(`Using Brave API key: ${process.env.BRAVE_API_KEY.substring(0, 3)}...${process.env.BRAVE_API_KEY.slice(-3)}`);
  console.log(`Rate limit delay: ${process.env.BRAVE_RATE_LIMIT_DELAY || '1000'}ms`);
  
  // If we're running without a proper API key, use only fallback registry
  const useOnlyFallback = process.argv.includes('--fallback-only');
  if (useOnlyFallback) {
    console.log('\n⚠️ Running in fallback-only mode (no API calls will be made)');
  }
  
  const docSlurper = new DocSlurper({
    verbose: true,
    registryPath: path.join(__dirname, 'data/test-registry.json'),
    rateLimitDelay: parseInt(process.env.BRAVE_RATE_LIMIT_DELAY || '1000', 10)
  });
  
  console.log('\n--------- DocSlurper Test ---------\n');
  
  try {
    // Test 1: Basic package documentation discovery
    console.log('Test 1: Basic Documentation Discovery');
    
    // Choose packages from different ecosystems
    const packages = [
      { name: 'express', version: '4.18.2' },  // Node.js
      { name: 'react', version: '18.2.0' },    // JavaScript
      { name: 'flask', version: '3.0.0' },     // Python
      { name: 'nonexistentpackage', version: null }
    ];
    
    for (const pkg of packages) {
      console.log(`\nSearching for documentation for ${pkg.name}${pkg.version ? `@${pkg.version}` : ''}...`);
      
      try {
        let result;
        
        if (useOnlyFallback) {
          // Skip web search, just use the fallback registry
          const fallbackRegistry = await docSlurper.loadFallbackRegistry();
          const entry = fallbackRegistry.find(e => e.name.toLowerCase() === pkg.name.toLowerCase());
          
          if (entry) {
            await docSlurper.updateRegistryFromFallback(pkg.name, pkg.version, entry);
            result = {
              found: true,
              source: 'fallback_registry',
              package: pkg.name,
              version: pkg.version || entry.latestVersion,
              urls: [{
                url: entry.documentationUrl,
                type: 'official',
                confidence: 'UNKNOWN'
              }],
              message: 'Found in fallback registry'
            };
          } else {
            result = {
              found: false,
              source: 'fallback_registry',
              package: pkg.name,
              message: 'Not found in fallback registry'
            };
          }
        } else {
          // Normal operation - try registry, fallback, then web search
          result = await docSlurper.findDocs(pkg.name, pkg.version);
        }
        
        if (result.found) {
          console.log(`✅ Found: ${result.message}`);
          
          console.log('\nDocumentation URLs:');
          console.log('--------------------------');
          for (const urlInfo of result.urls) {
            const confidenceEmoji = 
              urlInfo.confidence === 'EXACT' ? '🎯' : 
              urlInfo.confidence === 'CLOSE' ? '🔍' : 
              '❓';
              
            console.log(`${confidenceEmoji} [${urlInfo.confidence}] (${urlInfo.type}) ${urlInfo.url}`);
          }
          
          if (result.registryUrl) {
            console.log(`\nRegistry: ${result.registryUrl}`);
          }
          
          if (result.repositoryUrl) {
            console.log(`Repository: ${result.repositoryUrl}`);
          }
        } else {
          console.log(`❌ ${result.message}`);
        }
      } catch (error) {
        console.error(`Error processing ${pkg.name}:`, error.message);
      }
    }
    
    // Test 2: Registry listing
    console.log('\n\nTest 2: Registry Listing');
    const packages2 = await docSlurper.listPackages();
    
    console.log(`\nFound ${packages2.length} packages in registry:\n`);
    
    // Table header
    console.log('| Package | Versions | Registry URL | Repository URL |');
    console.log('|---------|----------|-------------|----------------|');
    
    // Table rows
    for (const pkg of packages2) {
      console.log(`| ${pkg.name} | ${pkg.versions.join(', ')} | ${pkg.registryUrl || 'N/A'} | ${pkg.repositoryUrl || 'N/A'} |`);
    }
    
    // Test 3: Package removal
    console.log('\n\nTest 3: Package Removal');
    
    if (packages2.length > 0) {
      const packageToRemove = packages2[0].name;
      console.log(`\nRemoving ${packageToRemove} from registry...`);
      
      const removed = await docSlurper.removePackage(packageToRemove);
      
      if (removed) {
        console.log(`✅ Package ${packageToRemove} removed successfully.`);
      } else {
        console.log(`❌ Failed to remove package ${packageToRemove}.`);
      }
      
      // Verify removal
      const remainingPackages = await docSlurper.listPackages();
      console.log(`\nRemaining packages in registry: ${remainingPackages.length}`);
    } else {
      console.log('\nNo packages in registry to remove.');
    }
    
    console.log('\n---------- Test Complete ----------\n');
    
  } catch (error) {
    console.error('Error during test:', error);
  }
}

// Run the tests
runTests();
