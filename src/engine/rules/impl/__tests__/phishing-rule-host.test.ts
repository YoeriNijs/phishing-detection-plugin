import { describe, expect } from '@jest/globals';
import { PhishingRuleHost } from '../phishing-rule-host';
import { createHostRule } from '../../../../testing';

describe('Phishing rule host tests', () => {
  it('should init', () => {
    const rule = new PhishingRuleHost();
    expect(rule).toBeDefined();
  });

  it('should return true if the url contains www', () => {
    const rule = new PhishingRuleHost();
    const regexRule = createHostRule({ value: 'google.com' });
    expect(
      rule.isApplicable(regexRule, 'https://www.google.com/search?q=test')
    ).toBe(true);
  });

  it('should return true if the host is the same', () => {
    const rule = new PhishingRuleHost();
    const regexRule = createHostRule({ value: 'google.com' });
    expect(
      rule.isApplicable(regexRule, 'https://google.com/search?q=test')
    ).toBe(true);
  });

  it('should return false if the host is not the same', () => {
    const rule = new PhishingRuleHost();
    const regexRule = createHostRule({ value: 'google.nl' });
    expect(
      rule.isApplicable(regexRule, 'https://google.com/search?q=test')
    ).toBe(false);
  });

  it('should return false if value is undefined', () => {
    const rule = new PhishingRuleHost();
    const regexRule = createHostRule({ value: undefined });
    expect(rule.isApplicable(regexRule, 'google.com')).toBe(false);
  });

  it('should return false if rule is undefined', () => {
    const rule = new PhishingRuleHost();
    expect(rule.isApplicable(undefined, 'google.com')).toBe(false);
  });
});
