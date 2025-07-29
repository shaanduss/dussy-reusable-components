#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import path from 'path';

const program = new Command();

program
  .name('dussy-components')
  .description('Add dussy components to your project')
  .version('0.0.4');

program
  .command('add')
  .description('Add a component to your project')
  .argument('<component>', 'Component to add')
  .action(async (component: string) => {
    try {
      const componentName = component.toLowerCase();
      
      // Check if we're in a project directory
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

      // Create components directory if it doesn't exist
      const componentsDir = path.join(cwd, 'src', 'components');
      if (!fs.existsSync(componentsDir)) {
        fs.mkdirSync(componentsDir, { recursive: true });
      }

      // Create ui directory if it doesn't exist
      const uiDir = path.join(componentsDir, 'ui');
      if (!fs.existsSync(uiDir)) {
        fs.mkdirSync(uiDir, { recursive: true });
      }

      // Component templates
      const componentTemplates: Record<string, { files: Record<string, string> }> = {
        'form-box': {
          files: {
            'form-box.tsx': `import React from 'react';
import { FormBox } from 'dussy-components';

export function FormBoxExample() {
  return (
    <FormBox>
      {/* Your form content here */}
    </FormBox>
  );
}`,
            'form-block.tsx': `import React from 'react';
import { FormBlock } from 'dussy-components';

export function FormBlockExample() {
  return (
    <FormBlock>
      {/* Your form block content here */}
    </FormBlock>
  );
}`,
            'form-section.tsx': `import React from 'react';
import { FormSection } from 'dussy-components';

export function FormSectionExample() {
  return (
    <FormSection>
      {/* Your form section content here */}
    </FormSection>
  );
}`
          }
        },
        'financial-card': {
          files: {
            'financial-card.tsx': `import React from 'react';
import { FinancialCard } from 'dussy-components';

export function FinancialCardExample() {
  return (
    <FinancialCard
      title="Example Card"
      amount="$1,234.56"
      change="+12.5%"
      changeType="positive"
    />
  );
}`
          }
        },
        'progress-card': {
          files: {
            'progress-card.tsx': `import React from 'react';
import { ProgressCard, CircularProgress } from 'dussy-components';

export function ProgressCardExample() {
  return (
    <div>
      <ProgressCard
        title="Progress Example"
        progress={75}
        total={100}
      />
      <CircularProgress
        value={75}
        size={100}
      />
    </div>
  );
}`
          }
        }
      };

      const template = componentTemplates[componentName];
      
      if (!template) {
        console.error(`❌ Component "${component}" not found. Available components:`);
        console.error(Object.keys(componentTemplates).join(', '));
        process.exit(1);
      }

      // Create component files
      for (const [filename, content] of Object.entries(template.files)) {
        const filePath = path.join(uiDir, filename);
        fs.writeFileSync(filePath, content);
        console.log(`✅ Created ${filename}`);
      }

      console.log(`\n🎉 Successfully added ${component} component!`);
      console.log(`📁 Files created in: ${uiDir}`);
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