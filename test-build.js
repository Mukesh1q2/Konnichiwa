#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';

console.log('🧪 Testing build process...');

function runCommand(command, description) {
  console.log(`\n📋 ${description}...`);
  try {
    const result = execSync(command, { 
      encoding: 'utf8',
      stdio: 'pipe',
      timeout: 60000
    });
    console.log(`✅ ${description} - SUCCESS`);
    return true;
  } catch (error) {
    console.log(`❌ ${description} - FAILED`);
    console.log('Error output:', error.stderr || error.stdout);
    return false;
  }
}

// Test TypeScript compilation
const typeCheck = runCommand('npx tsc --noEmit', 'TypeScript type checking');

// Test Next.js lint
const lintCheck = runCommand('npx next lint', 'ESLint checking');

// Test build process
const buildCheck = runCommand('NODE_OPTIONS="--max-old-space-size=4096" npx next build', 'Production build');

// Generate summary
console.log('\n📊 Build Test Summary:');
console.log(`TypeScript: ${typeCheck ? '✅' : '❌'}`);
console.log(`ESLint: ${lintCheck ? '✅' : '❌'}`);
console.log(`Build: ${buildCheck ? '✅' : '❌'}`);

const allPassed = typeCheck && lintCheck && buildCheck;
console.log(`\nOverall: ${allPassed ? '🎉 ALL TESTS PASSED' : '⚠️  SOME TESTS FAILED'}`);

process.exit(allPassed ? 0 : 1);
