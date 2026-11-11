import { Engine } from '../../engine/engine';
import { PhishingRules } from '../../model/phishing-rules';
import { I18n } from './i18n/i18n';
import { PhishingRule } from '../../model/phishing-rule';
import { DetectionResult } from '../../model/detection-result';

export interface BadgeScore {
  isPhishing: string;
  phishingProbability: string;
  threshold: string;
  matchingRules: { include: PhishingRule[]; exclude: PhishingRule[] } | null;
}

export class BadgeScorer {
  private constructor() {
    // Do not instantiate
  }

  static calculate(
    communityUrls: string[],
    rules: PhishingRules[],
    url: string
  ): BadgeScore {
    const engine = new Engine(communityUrls, ...rules);
    const results = engine.detect(url);
    const resultWithHighestScore = results.reduce<DetectionResult | null>(
      (highest, result) => {
        if (!highest) {
          return result;
        }
        return result.phishingProbability > highest.phishingProbability
          ? result
          : highest;
      },
      null
    );

    if (!resultWithHighestScore) {
      return {
        isPhishing: I18n.translate('unlikely'),
        phishingProbability: '0.0',
        threshold: '0.0',
        matchingRules: null
      };
    }

    return {
      isPhishing: resultWithHighestScore.isPhishing
        ? I18n.translate('yes')
        : I18n.translate('unlikely'),
      phishingProbability:
        resultWithHighestScore.phishingProbability.toFixed(1),
      threshold: (resultWithHighestScore.threshold || 0).toFixed(1),
      matchingRules:
        resultWithHighestScore.phishingProbability < 0.1
          ? null
          : resultWithHighestScore.matchingRules
    };
  }
}
