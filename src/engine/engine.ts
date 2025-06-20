import { DetectionResult } from '../model/detection-result';
import { PhishingRules } from '../model/phishing-rules';
import { PhishingRuleType } from '../model/phishing-rule-type';
import { PhishingRuleFactory } from './rules/phishing-rule-factory';
import { PhishingRule } from '../model/phishing-rule';

interface EngineResult {
  isPhishing: boolean;
  phishingProbability: number;
}

const NO_PHISHING_RESULT: DetectionResult = {
  isPhishing: false,
  phishingProbability: 0,
  threshold: 0
};

const PHISHING_RESULT: DetectionResult = {
  isPhishing: true,
  phishingProbability: 1,
  threshold: 0
};

export class Engine {
  private _rules_sets: PhishingRules[] = [];

  constructor(
    private _community_urls: string[],
    ...rules: PhishingRules[]
  ) {
    this._rules_sets = rules;
  }

  detect(url: string): DetectionResult[] {
    // When we have no rules, then just mark the url as safe
    if (this._rules_sets.length < 1) {
      return [NO_PHISHING_RESULT];
    }

    // If it is a community url, then mark it as unsafe
    const isCommunityUrl = this._community_urls
      .map(cu => cu.toLowerCase())
      .includes(url.toLowerCase());
    if (isCommunityUrl) {
      return [PHISHING_RESULT];
    }

    return this._rules_sets.map(rules => {
      const containsProbability = this.runType(rules, 'contains', url);
      const startsWithProbability = this.runType(rules, 'startswith', url);
      const endsWithProbability = this.runType(rules, 'endswith', url);
      const regexProbability = this.runType(rules, 'regex', url);
      const hostProbability = this.runType(rules, 'host', url);
      const engineResult = this.calculateResult(rules.threshold, [
        containsProbability,
        startsWithProbability,
        endsWithProbability,
        regexProbability,
        hostProbability
      ]);
      return {
        isPhishing: engineResult.isPhishing,
        phishingProbability: engineResult.phishingProbability,
        threshold: rules.threshold
      };
    });
  }

  private runType(
    rules: PhishingRules,
    type: PhishingRuleType,
    url: string
  ): number {
    let totalWeight = 0;
    const phishingRuleFactory = new PhishingRuleFactory();
    const phishingRuleImpl = phishingRuleFactory.getPhishingRuleImpl(type);
    if (rules.include) {
      // The weight is going up when the include rule exists
      rules.include
        .filter(r => r.phishingRuleType === type)
        .filter(r => phishingRuleImpl.isApplicable(r, url))
        .map(r => r.weight)
        .forEach((weight: number) => (totalWeight += weight));
    }

    if (rules.exclude) {
      // The weight is going down when the exclude rule exists
      rules.exclude
        .filter((r: PhishingRule) => r.phishingRuleType === type)
        .filter(r => phishingRuleImpl.isApplicable(r, url))
        .map(r => r.weight)
        .forEach((weight: number) => (totalWeight -= weight));
    }

    return totalWeight;
  }

  private calculateResult(threshold: number, numbers: number[]): EngineResult {
    const filteredNumbers = numbers.filter((n: number) => n !== 0);
    if (filteredNumbers.length === 0) {
      return NO_PHISHING_RESULT;
    }

    const probability = filteredNumbers.reduce(
      (acc, number) => acc + number,
      0
    );
    return {
      isPhishing: probability >= threshold,
      phishingProbability: probability
    };
  }
}
