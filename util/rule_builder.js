const fs = require('fs');
const path = require('path');

const [, , fileName, weight, name, desc] = process.argv;
const filePath = path.join(__dirname, fileName);

/**
 * A simple utility to transform rules line by line to phishing rules.
 *
 * Usage: node ./rule_builder.js <fileToRead> <rule weight to use> <rule name to use> <rule description to use>
 */
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err.message}`);
    return;
  }
  const rawRules = data.split('\n');
  const mappedRules = Array.from(rawRules).reduce((mappedRules, rawRule) => {
    const mappedRule = {
      name: `${name}_${mappedRules.length + 1}`,
      description: desc,
      phishingRuleType: 'regex',
      value: rawRule,
      weight: +weight
    };
    return [...mappedRules, mappedRule];
  }, []);
  console.log(mappedRules);
});
