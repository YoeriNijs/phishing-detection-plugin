import { describe, expect } from '@jest/globals';
import { createEndsWithRule } from '../../../../testing';
import { PhishingRuleStartsWith } from '../phishing-rule-startswith';

describe('Phishing rule startswith tests', () => {
  it('should init', () => {
    const rule = new PhishingRuleStartsWith();
    expect(rule).toBeDefined();
  });

  it('should return true when url starts with value', () => {
    const implementation = new PhishingRuleStartsWith();
    const containsRule = createEndsWithRule({ value: 'www' });
    expect(implementation.isApplicable(containsRule, 'www.google.com')).toBe(
      true
    );
  });

  it('should return true when url with https starts with value', () => {
    const implementation = new PhishingRuleStartsWith();
    const containsRule = createEndsWithRule({ value: 'www' });
    expect(
      implementation.isApplicable(containsRule, 'https://www.google.com')
    ).toBe(true);
  });

  it('should return true when url with http starts with value', () => {
    const implementation = new PhishingRuleStartsWith();
    const containsRule = createEndsWithRule({ value: 'www' });
    expect(
      implementation.isApplicable(containsRule, 'http://www.google.com')
    ).toBe(true);
  });

  it('should return false when url does not start with value', () => {
    const implementation = new PhishingRuleStartsWith();
    const containsRule = createEndsWithRule({ value: 'com' });
    expect(implementation.isApplicable(containsRule, 'www.google.com')).toBe(
      false
    );
  });

  it('should return false when url is undefined', () => {
    const implementation = new PhishingRuleStartsWith();
    const containsRule = createEndsWithRule({ value: 'com' });
    expect(implementation.isApplicable(containsRule, undefined)).toBe(false);
  });
});
