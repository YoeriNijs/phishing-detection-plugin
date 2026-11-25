import { BadgeScorer } from '../badge-scorer';
import { createHostRule } from '../../../testing';
import { PhishingRules } from '../../../model/phishing-rules';

describe('BadgeScorer', () => {
  it('should return a valid score when url is likely phishing', () => {
    const rules: PhishingRules[] = [
      {
        threshold: 1,
        include: [createHostRule({ value: 'google.com' })]
      }
    ];
    const score = BadgeScorer.calculate([], rules, 'https://google.com', false);
    expect(score).toEqual({
      isPhishing: 'yes',
      phishingProbability: '1.0',
      threshold: '1.0',
      matchingRules: {
        exclude: [],
        include: [createHostRule({ value: 'google.com' })]
      },
      isWhitelisted: 'no',
      showWarning: true
    });
  });

  it('should return a valid score when url is unlikely phishing', () => {
    const rules: PhishingRules[] = [
      {
        threshold: 1,
        include: [createHostRule({ value: 'yahoo.com' })]
      }
    ];
    const score = BadgeScorer.calculate([], rules, 'https://google.com', false);
    expect(score).toEqual({
      isPhishing: 'unlikely',
      phishingProbability: '0.0',
      threshold: '1.0',
      matchingRules: null,
      isWhitelisted: 'no',
      showWarning: false
    });
  });

  it('should return a valid score when there are no rules', () => {
    const score = BadgeScorer.calculate([], [], 'https://google.com', false);
    expect(score).toEqual({
      isPhishing: 'unlikely',
      phishingProbability: '0.0',
      threshold: '0.0',
      matchingRules: null,
      isWhitelisted: 'no',
      showWarning: false
    });
  });

  it.each(['', undefined, null])(
    'should return a valid score when there is no url',
    url => {
      const score = BadgeScorer.calculate([], [], url, false);
      expect(score).toEqual({
        isPhishing: 'unlikely',
        phishingProbability: '0.0',
        threshold: '0.0',
        matchingRules: null,
        isWhitelisted: 'no',
        showWarning: false
      });
    }
  );

  it('should return whitelisted value properly when it is marked as phishing', () => {
    const rules: PhishingRules[] = [
      {
        threshold: 1,
        include: [createHostRule({ value: 'google.com' })]
      }
    ];
    const score = BadgeScorer.calculate([], rules, 'https://google.com', true);
    expect(score).toEqual({
      isPhishing: 'yes',
      phishingProbability: '1.0',
      threshold: '1.0',
      matchingRules: {
        exclude: [],
        include: [createHostRule({ value: 'google.com' })]
      },
      isWhitelisted: 'yes',
      showWarning: true
    });
  });

  it('should return whitelisted value properly when it is not marked as phishing', () => {
    const rules: PhishingRules[] = [
      {
        threshold: 1,
        include: [createHostRule({ value: 'google.com' })]
      }
    ];
    const score = BadgeScorer.calculate([], rules, 'https://yahoo.com', true);
    expect(score).toEqual({
      isPhishing: 'unlikely',
      phishingProbability: '0.0',
      threshold: '1.0',
      matchingRules: null,
      isWhitelisted: 'yes',
      showWarning: false
    });
  });
});
