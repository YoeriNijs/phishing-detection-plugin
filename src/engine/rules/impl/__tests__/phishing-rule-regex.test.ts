import { describe, expect } from '@jest/globals';
import { PhishingRuleRegex } from '../phishing-rule-regex';
import { createRegexRule } from '../../../../testing';

describe('Phishing rule regex tests', () => {
  it('should init', () => {
    const rule = new PhishingRuleRegex();
    expect(rule).toBeDefined();
  });

  it('should return true if regex test is true', () => {
    const rule = new PhishingRuleRegex();
    const regexRule = createRegexRule({ value: 'google(?!\\.com)' });
    expect(rule.isApplicable(regexRule, 'google.nl')).toBe(true);
  });

  it('should return false if regex test is false', () => {
    const rule = new PhishingRuleRegex();
    const regexRule = createRegexRule({ value: 'google(?!\\.com)' });
    expect(rule.isApplicable(regexRule, 'google.com')).toBe(false);
  });

  it('should return false if value is undefined', () => {
    const rule = new PhishingRuleRegex();
    const regexRule = createRegexRule({ value: undefined });
    expect(rule.isApplicable(regexRule, 'google.com')).toBe(false);
  });

  it('should return false if rule is undefined', () => {
    const rule = new PhishingRuleRegex();
    expect(rule.isApplicable(undefined, 'google.com')).toBe(false);
  });
});
