const DocFinder = require('./src/DocFinder');
const path = require('path');

// Create test examples for the DocFinder
async function runTests() {
  const docFinder = new DocFinder();
  
  console.log('\n--------- DocFinder Test ---------\n');
  
  try {
    // Test 1: Basic package documentation lookup
    console.log('Test 1: Basic package lookup');
    const packages = ['express', 'react', 'flask', 'django', 'nonexistentpackage'];
    
    for (const pkg of packages) {
      console.log(`\nLooking up documentation for "${pkg}"...`);
      const result = await docFinder.findPackageDoc(pkg);
      
      if (result) {
        console.log(`✅ Found: ${result.name}`);
        console.log(`   URL: ${result.documentationUrl}`);
        console.log(`   Latest version: ${result.latestVersion}`);
      } else {
        console.log(`❌ No documentation found for "${pkg}"`);
      }
    }
    
    // Test 2: Version-specific documentation
    console.log('\n\nTest 2: Version-specific documentation');
    const versionTests = [
      { package: 'flask', version: '2.0.1' },
      { package: 'flask', version: '3.0.0' },
      { package: 'django', version: '4.2.0' },
      { package: 'react', version: '16.8.0' }
    ];
    
    for (const test of versionTests) {
      console.log(`\nLooking up documentation for ${test.package}@${test.version}...`);
      const result = await docFinder.findVersionDocUrl(test.package, test.version);
      
      console.log(`Status: ${result.found ? '✅ Found' : '❌ Not found'}`);
      console.log(`Message: ${result.message}`);
      if (result.url) {
        console.log(`URL: ${result.url}`);
        console.log(`Exact version match: ${result.exactMatch ? 'Yes' : 'No'}`);
      }
    }
    
    // Test 3: Analyze package.json dependencies
    console.log('\n\nTest 3: Analyze package.json dependencies');
    const dependencies = await docFinder.analyzeDependencies(path.join(__dirname, 'package.json'));
    
    console.log(`\nFound ${dependencies.length} dependencies in package.json:`);
    
    // Table header
    console.log('\n| Package | Version | Documentation URL | Exact Match |');
    console.log('|---------|---------|-------------------|-------------|');
    
    // Table rows
    for (const dep of dependencies) {
      const exactMatch = dep.exactMatch ? '✅ Yes' : '❌ No';
      console.log(`| ${dep.package} | ${dep.version} | ${dep.url || 'N/A'} | ${exactMatch} |`);
    }
    
    console.log('\n---------- Test Complete ----------\n');
    
  } catch (error) {
    console.error('Error during test:', error);
  }
}

// Run the tests
runTests();
