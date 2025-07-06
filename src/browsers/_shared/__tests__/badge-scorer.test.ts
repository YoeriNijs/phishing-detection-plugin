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
    const score = BadgeScorer.calculate(rules, 'https://google.com');
    expect(score).toEqual({
      isPhishing: 'yes',
      phishingProbability: '1.0',
      threshold: '1.0'
    });
  });

  it('should return a valid score when url is unlikely phishing', () => {
    const rules: PhishingRules[] = [
      {
        threshold: 1,
        include: [createHostRule({ value: 'yahoo.com' })]
      }
    ];
    const score = BadgeScorer.calculate(rules, 'https://google.com');
    expect(score).toEqual({
      isPhishing: 'unlikely',
      phishingProbability: '0.0',
      threshold: '1.0'
    });
  });

  it('should return a valid score when there are no rules', () => {
    const score = BadgeScorer.calculate([], 'https://google.com');
    expect(score).toEqual({
      isPhishing: 'unlikely',
      phishingProbability: '0.0',
      threshold: '0.0'
    });
  });

  it.each(['', undefined, null])(
    'should return a valid score when there is no url',
    url => {
      const score = BadgeScorer.calculate([], url);
      expect(score).toEqual({
        isPhishing: 'unlikely',
        phishingProbability: '0.0',
        threshold: '0.0'
      });
    }
  );
});
