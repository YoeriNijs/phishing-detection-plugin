import { DEFAULT_RULES } from './all_rules.js';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const writeJsonToFs = (json, filename) => {
  const filePath = path.join(__dirname, filename);
  fs.writeFile(filePath, json, err => {
    if (err) {
      console.error(`Error writing rules to file '${filename}':`, err);
    } else {
      console.log(`Rules file '${filename}' has been written successfully`);
    }
  });
};

// For production purposes, we keep the json on a healthy diet; we minify it!
const jsonDataProd = JSON.stringify(DEFAULT_RULES);
writeJsonToFs(jsonDataProd, 'latest_rules.json');

// For debugging purposes, we keep indentation in a separate file.
const jsonDataDebug = JSON.stringify(DEFAULT_RULES, null, 2);
writeJsonToFs(jsonDataDebug, 'latest_rules_debug.json');
