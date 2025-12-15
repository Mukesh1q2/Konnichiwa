#!/usr/bin/env node

import { spawn } from 'child_process';
import { existsSync } from 'fs';

console.log('🚀 Starting development server with optimizations...');

// Set environment variables for development
process.env.NODE_ENV = 'development';
process.env.NODE_OPTIONS = '--max-old-space-size=4096';

// Check if node_modules exists
if (!existsSync('./node_modules')) {
  console.log('📦 Installing dependencies...');
  
  const install = spawn('npm', ['install', '--no-audit', '--no-fund'], {
    stdio: 'inherit',
    shell: true
  });
  
  install.on('close', (code) => {
    if (code === 0) {
      startDevServer();
    } else {
      console.error('❌ Installation failed');
      process.exit(code);
    }
  });
} else {
  startDevServer();
}

function startDevServer() {
  console.log('🔧 Starting Next.js development server...');
  
  const dev = spawn('npx', ['next', 'dev'], {
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
    dev.kill('SIGINT');
    process.exit(0);
  });
}
