import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 Fixing missing icon references...');

const srcDir = path.join(__dirname, '../src');

// Icon mappings for common missing icons
const iconMappings = {
  // Map older/deprecated names to current ones
  'Building2': 'Building',
  'Smartphone': 'Phone',
  // Add other mappings as needed
};

const fallbackMappings = {
  'Instagram': 'User',
  'Twitter': 'User',
  'Facebook': 'User',
  'Youtube': 'User',
  'Building2': 'Building',
  'Smartphone': 'Phone',
  'Crown': 'Award',
  'Gift': 'Award',
  'Zap': 'Zap',
  'QrCode': 'QrCode'
};

// Process files and replace missing icons
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace icon imports
  content = content.replace(
    /import\s*\{\s*([^}]+)\s*\}\s*from\s*['"]lucide-react['"]/g,
    (match, icons) => {
      const iconList = icons.split(',').map(icon => {
        const trimmedIcon = icon.trim();
        if (iconMappings[trimmedIcon]) {
          return iconMappings[trimmedIcon];
        }
        return trimmedIcon;
      });
      return `import { ${iconList.join(', ')} } from 'lucide-react'`;
    }
  );
  
  // Replace usage of missing icons with fallbacks
  Object.entries(fallbackMappings).forEach(([missing, fallback]) => {
    const regex = new RegExp(`\\b${missing}\\b`, 'g');
    content = content.replace(regex, fallback);
  });
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Fixed: ${path.relative(srcDir, filePath)}`);
}

// Process all TypeScript/React files
function scanDirectory(dir) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      scanDirectory(fullPath);
    } else if (stat.isFile() && (item.endsWith('.tsx') || item.endsWith('.ts'))) {
      processFile(fullPath);
    }
  }
}

scanDirectory(srcDir);

console.log('🎉 Icon fixes complete!');
