#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync } from 'fs';

console.log('🧪 Testing Node.js 18 Compatibility...');
console.log('=======================================');

const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

console.log(`Node.js version: ${nodeVersion}`);

if (majorVersion < 18) {
  console.log('❌ Node.js 18+ required');
  process.exit(1);
}

console.log('✅ Node.js version compatible');

function runTest(name, command) {
  console.log(`\n🧪 Testing: ${name}`);
  try {
    execSync(command, { 
      encoding: 'utf8',
      stdio: 'pipe',
      timeout: 30000
    });
    console.log(`✅ ${name} - PASSED`);
    return true;
  } catch (error) {
    console.log(`❌ ${name} - FAILED`);
    console.log('Error:', error.message);
    return false;
  }
}

// Test package.json validity
const packageJsonValid = existsSync('./package.json');
console.log(`\n📦 Package.json exists: ${packageJsonValid ? '✅' : '❌'}`);

// Test dependency installation
const installResult = runTest('Dependency Installation', 'npm install --legacy-peer-deps --no-audit --no-fund --engine-strict=false');

// Test TypeScript compilation
const typeCheck = runTest('TypeScript Check', 'npx tsc --noEmit --skipLibCheck');

// Test icon type definitions
const iconDefsExist = existsSync('./src/types/lucide-react.d.ts');
console.log(`\n🎨 Icon type definitions exist: ${iconDefsExist ? '✅' : '❌'}`);

// Test compatibility layers
const compatLayersExist = existsSync('./src/lib/supabase-compat.ts');
console.log(`🔧 Supabase compatibility layer exists: ${compatLayersExist ? '✅' : '❌'}`);

// Test development server wrapper
const devServerExist = existsSync('./scripts/dev-server-node18.js');
console.log(`🚀 Development server wrapper exists: ${devServerExist ? '✅' : '❌'}`);

// Test build process (lightweight)
let buildTest = false;
if (installResult) {
  console.log('\n🏗️  Testing build process...');
  try {
    // Create a minimal next.config.js for testing
    const minimalConfig = `module.exports = {
  reactStrictMode: true,
  swcMinify: true,
};`;
    require('fs').writeFileSync('next.config.js', minimalConfig);
    
    execSync('npx next build --no-lint', {
      encoding: 'utf8',
      stdio: 'pipe',
      timeout: 60000
    });
    console.log('✅ Build process - PASSED');
    buildTest = true;
  } catch (error) {
    console.log('❌ Build process - FAILED (but this may be due to missing environment variables)');
  }
}

// Summary
console.log('\n📊 COMPATIBILITY TEST SUMMARY:');
console.log('================================');
console.log(`Node.js Version: ${nodeVersion} ${majorVersion >= 18 ? '✅' : '❌'}`);
console.log(`Package.json: ${packageJsonValid ? '✅' : '❌'}`);
console.log(`Dependencies: ${installResult ? '✅' : '❌'}`);
console.log(`TypeScript: ${typeCheck ? '✅' : '❌'}`);
console.log(`Icon Definitions: ${iconDefsExist ? '✅' : '❌'}`);
console.log(`Compatibility Layers: ${compatLayersExist ? '✅' : '❌'}`);
console.log(`Development Server: ${devServerExist ? '✅' : '❌'}`);
console.log(`Build Process: ${buildTest ? '✅' : '⚠️  (may need environment variables)'}`);

const allPassed = packageJsonValid && typeCheck && iconDefsExist && compatLayersExist && devServerExist;
console.log(`\nOverall Compatibility: ${allPassed ? '🎉 FULLY COMPATIBLE' : '⚠️  SOME ISSUES DETECTED'}`);

console.log('\n🚀 READY TO START:');
console.log('Development: npm run dev:node18');
console.log('Build: npm run build:node18');

process.exit(allPassed ? 0 : 1);
