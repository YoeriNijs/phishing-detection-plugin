import { describe, expect } from '@jest/globals';
import { createHostEndsWith } from '../../../../testing';
import { PhishingRuleHostEndsWith } from '../phishing-rule-hostendswith';

describe('Phishing rule hostendswith tests', () => {
  it('should init', () => {
    const rule = new PhishingRuleHostEndsWith();
    expect(rule).toBeDefined();
  });

  it.each([
    { ruleValue: '.nl', url: 'https://www.nu.nl/weer' },
    { ruleValue: 'nl', url: 'https://www.nu.nl/weer' },
    { ruleValue: '.nl', url: 'https://www.nu.nl' },
    { ruleValue: 'nl', url: 'https://www.nu.nl' },
    { ruleValue: '.nl', url: 'https://www.nu.nl/' },
    { ruleValue: 'nl', url: 'https://www.nu.nl/' },
    { ruleValue: 'nu.nl', url: 'https://www.nu.nl' }
  ])('should return true if the host returns with the %s', scenario => {
    const rule = new PhishingRuleHostEndsWith();
    const regexRule = createHostEndsWith({ value: scenario.ruleValue });
    expect(rule.isApplicable(regexRule, scenario.url)).toBe(true);
  });

  it.each([
    { ruleValue: 'weer', url: 'https://www.nu.nl/weer' },
    { ruleValue: '/', url: 'https://www.nu.nl/' },
    { ruleValue: '.be', url: 'https://www.nu.nl' }
  ])('should return false if the host returns with the %s', scenario => {
    const rule = new PhishingRuleHostEndsWith();
    const regexRule = createHostEndsWith({ value: scenario.ruleValue });
    expect(rule.isApplicable(regexRule, scenario.url)).toBe(false);
  });
});
