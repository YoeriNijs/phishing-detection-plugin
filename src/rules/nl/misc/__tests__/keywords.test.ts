import { describe } from '@jest/globals';
import { Engine } from '../../../../engine/engine';
import { NL_KEYWORDS_RULES } from '../_keywords';

describe('Real world detection tests', () => {
  const ENGINE: Engine = new Engine([], NL_KEYWORDS_RULES);

  it('should have a valid threshold', () => {
    expect(NL_KEYWORDS_RULES.threshold).toBe(1);
  });

  it.each([
    { url: 'https://belasting-waarschuwing.help', expectedProbability: 1.5 },
    { url: 'https://belasting-ideal-afronden.icu', expectedProbability: 1.5 },
    { url: 'https://belasting-deurwaarder.com', expectedProbability: 2 },
    { url: 'https://odido-betalen.com', expectedProbability: 1 },
    { url: 'https://odido-verificatie.help', expectedProbability: 1.5 },
    { url: 'https://odido-herstel.com/verificatie', expectedProbability: 1.5 },
    { url: 'simkaart-verificatie.help', expectedProbability: 1 },
    { url: 'bit.do/vervang-simkaart', expectedProbability: 1 },
    { url: 'simkaart-veilig.com', expectedProbability: 1 }
  ])('should detect the phishing url %s', scenario => {
    const detectionResult = ENGINE.detect(scenario.url)[0];
    expect(detectionResult.isPhishing).toBe(true);
    expect(detectionResult.phishingProbability).toBe(
      scenario.expectedProbability
    );
  });
});
