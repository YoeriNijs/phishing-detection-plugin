import { Engine } from '../../engine/engine';
import { PhishingRules } from '../../model/phishing-rules';

export interface BadgeScore {
  isPhishing: string;
  phishingProbability: string;
  threshold: string;
}

export const calculateBatchScore = (
  rules: PhishingRules[],
  url: string
): BadgeScore => {
  const engine = new Engine(...rules);
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
    isPhishing: resultWithHighestScore.isPhishing ? 'yes' : 'unlikely',
    phishingProbability: resultWithHighestScore.phishingProbability.toFixed(1),
    threshold: resultWithHighestScore.threshold.toFixed(1)
  };
};
