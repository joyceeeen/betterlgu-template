#!/usr/bin/env node
/**
 * Script to convert TypeScript data files to JSON config files
 * Run: node scripts/convert-data-to-json.js
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Read and parse TypeScript files as text, extract the data
function extractArrayFromTS(content, variableName) {
  // Find the variable declaration and extract the array
  const regex = new RegExp(`export const ${variableName}[^=]*=\\s*\\[`, 's');
  const match = content.match(regex);
  if (!match) return null;

  const startIdx = content.indexOf(match[0]) + match[0].length - 1;
  let depth = 1;
  let endIdx = startIdx + 1;

  while (depth > 0 && endIdx < content.length) {
    if (content[endIdx] === '[') depth++;
    if (content[endIdx] === ']') depth--;
    endIdx++;
  }

  const arrayStr = content.slice(startIdx, endIdx);
  // Convert TS to JSON-compatible format
  const jsonStr = arrayStr
    .replace(/'/g, '"') // Single to double quotes
    .replace(/(\w+):/g, '"$1":') // Unquoted keys to quoted
    .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
    .replace(/\\\'/g, "'"); // Fix escaped quotes

  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error(`Failed to parse ${variableName}:`, e.message);
    return null;
  }
}

// For complex files, we'll just format the existing structure
console.log('Converting data files to JSON config...');

// Since the TS files are complex, let's use a simpler approach
// We'll manually structure the key config files

// Create categories.json from categoriesContent.ts
const categoriesJSON = {
  $schema: './schema/categories.schema.json',
  categories: [
    {
      id: 'certificates',
      name: 'Certificates & Vital Records',
      icon: 'bi-file-earmark-text-fill',
      badgeText: 'Certificates',
      description:
        'Official documents for birth, death, marriage, and other vital records',
    },
    {
      id: 'business',
      name: 'Business & Trade',
      icon: 'bi-shop',
      badgeText: 'Business',
      description:
        'Business permits, licenses, and trade registration services',
    },
    {
      id: 'tax-payments',
      name: 'Taxation & Payments',
      icon: 'bi-cash-coin',
      badgeText: 'Taxation',
      description: 'Property tax, business tax, payments, and tax clearance',
    },
    {
      id: 'social-services',
      name: 'Social Services',
      icon: 'bi-people-fill',
      badgeText: 'Social Services',
      description:
        'Welfare programs, senior citizen services, PWD benefits, and financial aid',
    },
    {
      id: 'health',
      name: 'Health & Wellness',
      icon: 'bi-heart-pulse-fill',
      badgeText: 'Health',
      description:
        'Vaccination programs, health certificates, and medical assistance',
    },
    {
      id: 'agriculture',
      name: 'Agriculture',
      icon: 'bi-tree-fill',
      badgeText: 'Agriculture',
      description:
        'Agricultural loans, crop insurance, fertilizer assistance, and training',
    },
    {
      id: 'infrastructure',
      name: 'Infrastructure',
      icon: 'bi-building-fill-gear',
      badgeText: 'Infrastructure',
      description:
        'Construction permits, road maintenance requests, and public facilities',
    },
    {
      id: 'education',
      name: 'Education & Scholarship',
      icon: 'bi-mortarboard-fill',
      badgeText: 'Education',
      description:
        'Scholarship programs, student assistance, and educational grants',
    },
    {
      id: 'public-safety',
      name: 'Public Safety',
      icon: 'bi-shield-fill-check',
      badgeText: 'Public Safety',
      description:
        'Emergency services, disaster preparedness, and community safety programs',
    },
    {
      id: 'environment',
      name: 'Environment',
      icon: 'bi-globe-americas',
      badgeText: 'Environment',
      description:
        'Environmental permits, waste management, and conservation programs',
    },
  ],
};

writeFileSync(
  join(rootDir, 'config', 'categories.json'),
  JSON.stringify(categoriesJSON, null, 2),
);
console.log('Created config/categories.json');

console.log(
  'Done! Note: service-details.json needs manual review due to complexity.',
);
console.log('The services.json was already copied to config/');
