#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

// Helper to recursively copy files
function copyRecursiveSync(src: string, dest: string) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

program
  .name('dussy-components')
  .description('Add dussy components to your project')
  .version('0.0.5');

const COMPONENT_MAP: Record<string, { src: string; dest: string }> = {
  // Form Generator
  'form-box': {
    src: path.join(__dirname, '../src/components/form-generator/form-box'),
    dest: 'src/components/ui',
  },
  // Financial Card
  'financial-card': {
    src: path.join(__dirname, '../src/components/financial-card/ui'),
    dest: 'src/components/financial-card',
  },
  // Progress Card
  'progress-card': {
    src: path.join(__dirname, '../src/components/progress-card/ui'),
    dest: 'src/components/progress-card',
  },
  // UI Components (all)
  'ui': {
    src: path.join(__dirname, '../src/components/ui'),
    dest: 'src/components/ui',
  },
};

program
  .command('add')
  .description('Add a component or set of components to your project')
  .argument('<component>', 'Component to add (form-box, financial-card, progress-card, ui)')
  .action(async (component: string) => {
    try {
      const componentName = component.toLowerCase();
      const cwd = process.cwd();
      const packageJsonPath = path.join(cwd, 'package.json');
      if (!fs.existsSync(packageJsonPath)) {
        console.error('❌ No package.json found. Please run this command in your project directory.');
        process.exit(1);
      }
      // Read package.json
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      // Check if dussy-components is installed
      const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
      if (!dependencies['dussy-components']) {
        console.error('❌ dussy-components is not installed. Please install it first:');
        console.error('npm install dussy-components');
        process.exit(1);
      }
      // Check if component is supported
      const mapping = COMPONENT_MAP[componentName];
      if (!mapping) {
        console.error(`❌ Component "${component}" not found. Available components:`);
        console.error(Object.keys(COMPONENT_MAP).join(', '));
        process.exit(1);
      }
      // Prepare destination
      const destDir = path.join(cwd, mapping.dest);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      copyRecursiveSync(mapping.src, destDir);

      // Additional step for form-box interfaces
      if (componentName === 'form-box') {
        const formBoxInterfacesSrc = path.join(__dirname, '../src/interfaces/FormBoxInterfaces.tsx');
        const formBoxInterfacesDest = path.join(cwd, 'src/interfaces');
        if (!fs.existsSync(formBoxInterfacesDest)) {
          fs.mkdirSync(formBoxInterfacesDest, { recursive: true });
        }
        copyRecursiveSync(formBoxInterfacesSrc, formBoxInterfacesDest);
      }

      console.log(`\n🎉 Successfully added ${component} component(s)!`);
      console.log(`📁 Files copied to: ${destDir}`);
      if (componentName === 'form-box') {
        console.log(`📁 Additionally copied interfaces to: src/interfaces`);
      }
      console.log('\nNext steps:');
      console.log('1. Import the components in your React components');
      console.log('2. Make sure you have the required dependencies installed');
      console.log('3. Check the documentation for usage examples');
    } catch (error) {
      console.error('❌ Error adding component:', error);
      process.exit(1);
    }
  });

program.parse();