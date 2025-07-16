import { DEFAULT_RULES } from './all_rules.js';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const jsonData = JSON.stringify(DEFAULT_RULES, null, 2);
const filePath = path.join(__dirname, 'latest_rules.json');
fs.writeFile(filePath, jsonData, err => {
  if (err) {
    console.error('Error writing rules to file:', err);
  } else {
    console.log('Rules file has been written successfully');
  }
});
