#!/usr/bin/env node

import { spawn } from 'child_process';

console.log('🏗️  Starting Node.js 18 compatible production build...');

// Set Node.js 18 optimized environment
process.env.NODE_ENV = 'production';
process.env.NODE_OPTIONS = '--max-old-space-size=4096 --max-semi-space-size=128';

const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 18) {
  console.error('❌ This script requires Node.js 18 or higher');
  console.error(`Current version: ${nodeVersion}`);
  process.exit(1);
}

console.log(`✅ Node.js ${nodeVersion} detected`);

const build = spawn('npx', [
  'next', 'build',
  '--debug'
], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    NODE_OPTIONS: '--max-old-space-size=4096'
  }
});

build.on('close', (code) => {
  if (code === 0) {
    console.log('🎉 Build completed successfully!');
  } else {
    console.error(`❌ Build failed with code ${code}`);
    console.log('🔍 Check the logs above for details');
  }
  process.exit(code);
});

build.on('error', (error) => {
  console.error('❌ Build process error:', error.message);
  process.exit(1);
});
