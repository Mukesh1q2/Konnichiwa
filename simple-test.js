#!/usr/bin/env node

// Simple test to check the specific failing issues

import { existsSync, readFileSync } from 'fs';

console.log('🔍 CHECKING SPECIFIC BUILD ISSUES');
console.log('==================================');

const tests = [
  {
    name: 'Fixed payment service exists',
    test: () => existsSync('./src/lib/payment-service-fixed.ts')
  },
  {
    name: 'Stripe dependency added',
    test: () => {
      const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
      return pkg.dependencies.stripe && pkg.dependencies.stripe.includes('14.0.0');
    }
  },
  {
    name: 'API routes updated',
    test: () => {
      const tickets = readFileSync('./src/app/api/tickets/route.ts', 'utf8');
      const webhook = readFileSync('./src/app/api/payments/webhook/route.ts', 'utf8');
      return tickets.includes('payment-service-fixed') && webhook.includes('payment-service-fixed');
    }
  },
  {
    name: 'Database compat imports',
    test: () => {
      const webhook = readFileSync('./src/app/api/payments/webhook/route.ts', 'utf8');
      return webhook.includes('database-compat');
    }
  },
  {
    name: 'Payment service type fixes',
    test: () => {
      const payment = readFileSync('./src/lib/payment-service-fixed.ts', 'utf8');
      return payment.includes('(request as any)') && 
             !payment.includes('request.prefer(');
    }
  },
  {
    name: 'Notification components moved',
    test: () => existsSync('./src/components/notifications/NotificationComponents.tsx')
  },
  {
    name: 'Notification hooks created',
    test: () => existsSync('./src/lib/notification-hooks.ts')
  },
  {
    name: 'Form validation React import',
    test: () => {
      const form = readFileSync('./src/lib/form-validation.ts', 'utf8');
      return form.includes('import React from \'react\'');
    }
  },
  {
    name: 'TypeScript compilation test',
    test: () => {
      try {
        const { execSync } = require('child_process');
        execSync('npx tsc --noEmit --skipLibCheck src/lib/payment-service-fixed.ts', {
          stdio: 'pipe'
        });
        return true;
      } catch (error) {
        console.log('TypeScript error:', error.message);
        return false;
      }
    }
  }
];

let passed = 0;
let failed = 0;

tests.forEach(test => {
  try {
    const result = test.test();
    if (result) {
      console.log(`✅ ${test.name}`);
      passed++;
    } else {
      console.log(`❌ ${test.name}`);
      failed++;
    }
  } catch (error) {
    console.log(`❌ ${test.name} - Error: ${error.message}`);
    failed++;
  }
});

console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('🎉 All critical issues resolved!');
} else {
  console.log(`⚠️  ${failed} issues still need attention`);
}
