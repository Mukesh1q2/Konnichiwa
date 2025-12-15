import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Analyzing lucide-react icon usage...');

const srcDir = path.join(__dirname, '../src');

// Find all files that import from lucide-react
const iconImports = new Set();
const files = [];

function scanDirectory(dir) {
  const items = fs.readdirSync(dir (const item of);
  
  for items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      scanDirectory(fullPath);
    } else if (stat.isFile() && (item.endsWith('.tsx') || item.endsWith('.ts'))) {
      files.push(fullPath);
    }
  }
}

scanDirectory(srcDir);

// Extract icons from imports
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const importRegex = /import\s*\{\s*([^}]+)\s*\}\s*from\s*['"]lucide-react['"]/g;
  
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const icons = match[1].split(',').map(icon => icon.trim());
    icons.forEach(icon => {
      if (icon) iconImports.add(icon);
    });
  }
}

console.log('📊 Found icons:', Array.from(iconImports).sort());

// Check against available lucide-react icons
try {
  const lucideIcons = Object.keys(await import('lucide-react'));
  const missingIcons = Array.from(iconImports).filter(icon => !lucideIcons.includes(icon));
  
  console.log('⚠️  Missing icons:', missingIcons);
  console.log('✅ Available icons:', lucideIcons.filter(icon => iconImports.has(icon)));
  
} catch (error) {
  console.log('❌ Error checking lucide-react icons:', error.message);
}

console.log('📝 Analysis complete!');
