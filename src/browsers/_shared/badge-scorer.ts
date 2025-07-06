import { Engine } from '../../engine/engine';
import { PhishingRules } from '../../model/phishing-rules';
import { I18n } from './i18n/i18n';

export interface BadgeScore {
  isPhishing: string;
  phishingProbability: string;
  threshold: string;
}

export class BadgeScorer {
  private constructor() {
    // Do not instantiate
  }

  static calculate(rules: PhishingRules[], url: string): BadgeScore {
    const engine = new Engine([], ...rules);
    const results = engine.detect(url);
    const resultWithHighestScore = results
      .sort((a, b) => {
        if (a.phishingProbability > b.phishingProbability) {
          return 1;
        } else {
          return -1;
        }
      })
      .pop();
    return {
      isPhishing: resultWithHighestScore.isPhishing
        ? I18n.translate('yes')
        : I18n.translate('unlikely'),
      phishingProbability:
        resultWithHighestScore.phishingProbability.toFixed(1),
      threshold: resultWithHighestScore.threshold.toFixed(1)
    };
  }
}
