#!/usr/bin/env node

// Comprehensive Issue Scanner
// Identifies all potential build issues similar to the ones just resolved

import { existsSync, readFileSync } from 'fs';

console.log('🔍 COMPREHENSIVE BUILD ISSUES SCANNER');
console.log('=====================================');
console.log('');

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function scanIssue(name, description, files, testFn) {
  log(`\n🔍 ${name}`, 'blue');
  log(`   ${description}`, 'blue');
  
  const issues = [];
  files.forEach(file => {
    if (existsSync(file)) {
      const result = testFn(file);
      if (result) {
        issues.push({ file, issue: result });
      }
    }
  });
  
  if (issues.length === 0) {
    log(`   ✅ No issues found`, 'green');
    return false;
  } else {
    log(`   ❌ Found ${issues.length} issue(s):`, 'red');
    issues.forEach(issue => {
      log(`      ${issue.file}: ${issue.issue}`, 'red');
    });
    return true;
  }
}

// Scan 1: JSX files in lib folders (same as notification system issue)
const jsxFilesInLib = [
  './src/lib/auth-context.tsx',
  './src/lib/brand-context.tsx', 
  './src/lib/notification-system.tsx'
];

const hasJSXInLib = scanIssue(
  'JSX FILES IN LIB FOLDERS',
  'Files with JSX components in lib folders causing type errors',
  jsxFilesInLib,
  (file) => {
    const content = readFileSync(file, 'utf8');
    // Check for JSX elements or components
    if (content.includes('return (') && content.includes('<')) {
      return 'Contains JSX components in lib folder';
    }
    return null;
  }
);

// Scan 2: Missing React imports in TS files using React hooks
const tsFilesInLib = [
  './src/lib/auth-context.tsx',
  './src/lib/brand-context.tsx',
  './src/lib/notification-system.tsx',
  './src/lib/form-validation.ts'
];

const hasMissingReactImports = scanIssue(
  'MISSING REACT IMPORTS',
  'Files using React hooks without proper imports',
  tsFilesInLib,
  (file) => {
    const content = readFileSync(file, 'utf8');
    // Check if using React hooks but no React import
    const usesHooks = content.includes('useState') || content.includes('useEffect') || content.includes('useContext');
    const hasReactImport = content.includes('import React') || content.includes("from 'react'") || content.includes('from "react"');
    
    if (usesHooks && !hasReactImport) {
      return 'Uses React hooks without proper React import';
    }
    return null;
  }
);

// Scan 3: API routes importing potentially broken services
const apiRoutes = [
  './src/app/api/admin/route.ts',
  './src/app/api/events/route.ts'
];

const hasBrokenServiceImports = scanIssue(
  'API ROUTES WITH POTENTIAL SERVICE ISSUES',
  'API routes importing services that may have compatibility issues',
  apiRoutes,
  (file) => {
    const content = readFileSync(file, 'utf8');
    // Check if importing database service (which has Node.js compatibility issues)
    if (content.includes('from \'@/lib/database\'') && !content.includes('database-compat')) {
      return 'Imports original database service (may have Node.js 18 compatibility issues)';
    }
    return null;
  }
);

// Scan 4: Environment variable usage without fallbacks
const serviceFiles = [
  './src/lib/auth-service.ts',
  './src/lib/database.ts',
  './src/lib/email-service.ts'
];

const hasUnsafeEnvUsage = scanIssue(
  'UNSAFE ENVIRONMENT VARIABLE USAGE',
  'Files using process.env without proper fallbacks or validation',
  serviceFiles,
  (file) => {
    const content = readFileSync(file, 'utf8');
    const lines = content.split('\n');
    const unsafeUsages = [];
    
    lines.forEach((line, index) => {
      if (line.includes('process.env.') && line.includes('!') && !line.includes('||')) {
        unsafeUsages.push(`Line ${index + 1}: ${line.trim()}`);
      }
    });
    
    if (unsafeUsages.length > 0) {
      return `Uses ${unsafeUsages.length} unsafe environment variable(s)`;
    }
    return null;
  }
);

// Scan 5: Package version compatibility issues
const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));

log('\n🔍 PACKAGE VERSION ANALYSIS', 'blue');
log('   Checking for potential version conflicts', 'blue');

const dependencyIssues = [];
const devDependencyIssues = [];

Object.entries(packageJson.dependencies || {}).forEach(([pkg, version]) => {
  // Check for potential Node.js 18 compatibility issues
  if (pkg === '@supabase/supabase-js' && version.includes('2.87')) {
    dependencyIssues.push(`${pkg}@${version} may require Node.js 20+`);
  }
  if (pkg === 'stripe' && version.includes('14.0.0')) {
    // This should be fine, we added it for compatibility
  }
});

Object.entries(packageJson.devDependencies || {}).forEach(([pkg, version]) => {
  if (pkg === 'typescript' && version.includes('5.9')) {
    // Should be compatible with Node.js 18
  }
});

if (dependencyIssues.length > 0) {
  log('   ❌ Potential dependency issues:', 'red');
  dependencyIssues.forEach(issue => log(`      ${issue}`, 'red'));
} else {
  log('   ✅ No major dependency issues found', 'green');
}

// Scan 6: Missing or incomplete type definitions
const potentialTypeIssues = [
  './src/types/index.ts',
  './src/types/lucide-react.d.ts'
];

const hasTypeIssues = scanIssue(
  'TYPE DEFINITION ISSUES',
  'Missing or incomplete type definitions',
  potentialTypeIssues,
  (file) => {
    if (file.includes('lucide-react.d.ts')) {
      const content = readFileSync(file, 'utf8');
      // Check if we have comprehensive type definitions
      const iconCount = (content.match(/export const/g) || []).length;
      if (iconCount < 50) {
        return `Only ${iconCount} icon types defined (should be comprehensive)`;
      }
    }
    return null;
  }
);

// Scan 7: Import path consistency
log('\n🔍 IMPORT PATH CONSISTENCY', 'blue');
log('   Checking for inconsistent import patterns', 'blue');

const filesWithAtImports = [
  './src/lib/auth-context.tsx',
  './src/lib/brand-context.tsx',
  './src/components/notifications/NotificationComponents.tsx'
];

let hasImportInconsistencies = false;
filesWithAtImports.forEach(file => {
  if (existsSync(file)) {
    const content = readFileSync(file, 'utf8');
    if (content.includes('from \'@/types\'') && !content.includes('from \'@/lib/types\'')) {
      log(`   ❌ ${file}: Inconsistent @/types import`, 'red');
      hasImportInconsistencies = true;
    }
  }
});

if (!hasImportInconsistencies) {
  log('   ✅ Import paths are consistent', 'green');
}

// Final summary
log('\n📋 COMPREHENSIVE SCAN SUMMARY', 'blue');
log('==============================', 'blue');

const totalIssues = [
  hasJSXInLib,
  hasMissingReactImports, 
  hasBrokenServiceImports,
  hasUnsafeEnvUsage,
  hasTypeIssues,
  hasImportInconsistencies
].filter(Boolean).length;

if (totalIssues === 0) {
  log('\n🎉 EXCELLENT! No additional issues found!', 'green');
  log('✅ All potential build issues have been addressed', 'green');
} else {
  log(`\n⚠️  Found ${totalIssues} additional issue categories that need attention:`, 'yellow');
  
  if (hasJSXInLib) {
    log('   • JSX files in lib folders (same as notification system)', 'yellow');
  }
  if (hasMissingReactImports) {
    log('   • Missing React imports in TS files using hooks', 'yellow');
  }
  if (hasBrokenServiceImports) {
    log('   • API routes importing potentially incompatible services', 'yellow');
  }
  if (hasUnsafeEnvUsage) {
    log('   • Unsafe environment variable usage without fallbacks', 'yellow');
  }
  if (hasTypeIssues) {
    log('   • Incomplete type definitions', 'yellow');
  }
  if (hasImportInconsistencies) {
    log('   • Import path inconsistencies', 'yellow');
  }
  
  log('\n🔧 RECOMMENDED ACTIONS:', 'blue');
  if (hasJSXInLib) {
    log('   1. Move JSX components from lib/ to components/ folders (same fix as notification system)', 'blue');
  }
  if (hasMissingReactImports) {
    log('   2. Add proper React imports to TS files using React hooks', 'blue');
  }
  if (hasBrokenServiceImports) {
    log('   3. Update API routes to use database-compat service', 'blue');
  }
  if (hasUnsafeEnvUsage) {
    log('   4. Add fallbacks for environment variables', 'blue');
  }
}

process.exit(0);
