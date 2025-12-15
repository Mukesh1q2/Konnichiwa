#!/usr/bin/env node

import { spawn } from 'child_process';
import { existsSync, writeFileSync } from 'fs';

console.log('🚀 Starting Node.js 18 compatible development server...');

// Set Node.js 18 optimized environment
process.env.NODE_ENV = 'development';
process.env.NODE_OPTIONS = '--max-old-space-size=4096 --max-semi-space-size=128';

// Check Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 18) {
  console.error('❌ This script requires Node.js 18 or higher');
  console.error(`Current version: ${nodeVersion}`);
  process.exit(1);
}

console.log(`✅ Node.js ${nodeVersion} detected`);

// Create .nvmrc for version management
const nvmrc = `v${nodeVersion}`;
try {
  writeFileSync('.nvmrc', nvmrc);
  console.log('📝 Created .nvmrc for version management');
} catch (error) {
  console.warn('⚠️  Could not create .nvmrc:', error.message);
}

// Check if node_modules exists
if (!existsSync('./node_modules')) {
  console.log('📦 Installing dependencies with Node.js 18 compatibility...');

  const install = spawn('npm', [
    'install',
    '--legacy-peer-deps',
    '--no-audit',
    '--no-fund',
    '--prefer-offline',
    '--engine-strict=false'
  ], {
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      NODE_OPTIONS: '--max-old-space-size=4096'
    }
  });

  install.on('close', (code) => {
    if (code === 0) {
      console.log('✅ Dependencies installed successfully');
      startDevServer();
    } else {
      console.error('❌ Installation failed with code:', code);
      console.log('🔄 Attempting fallback installation...');
      fallbackInstall();
    }
  });

  install.on('error', (error) => {
    console.error('❌ Installation error:', error.message);
    fallbackInstall();
  });
} else {
  console.log('✅ Dependencies already installed');
  startDevServer();
}

function startDevServer() {
  console.log('🔧 Starting Next.js development server...');

  const dev = spawn('npx', [
    'next', 'dev',
    '--turbo'
  ], {
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      NODE_OPTIONS: '--max-old-space-size=4096'
    }
  });

  dev.on('close', (code) => {
    if (code !== null) {
      console.log(`Dev server exited with code ${code}`);
    }
  });

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('🛑 Shutting down development server...');
    dev.kill('SIGINT');
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    console.log('🛑 Shutting down development server...');
    dev.kill('SIGTERM');
    process.exit(0);
  });
}

function fallbackInstall() {
  console.log('🔄 Attempting fallback installation...');

  const fallback = spawn('npm', [
    'install',
    '--force',
    '--no-optional',
    '--legacy-peer-deps'
  ], {
    stdio: 'inherit',
    shell: true
  });

  fallback.on('close', (code) => {
    if (code === 0) {
      console.log('✅ Fallback installation successful');
      startDevServer();
    } else {
      console.error('❌ Fallback installation failed');
      console.log('💡 Try: npm install --force --legacy-peer-deps');
      process.exit(code);
    }
  });
}
