import { describe } from '@jest/globals';
import { Engine } from '../../../../engine/engine';
import { WETRANSFER_RULES } from '../_wetransfer';

describe('Real world WeTransfer detection tests', () => {
  const ENGINE: Engine = new Engine([], WETRANSFER_RULES);

  it('should have a valid threshold', () => {
    expect(WETRANSFER_RULES.threshold).toBe(1);
  });

  it.each([
    { url: 'https://wetransfer-s69g.onrender.com', expectedProbability: 1 }
  ])('should detect the phishing url %s', scenario => {
    const detectionResult = ENGINE.detect(scenario.url)[0];
    expect(detectionResult.isPhishing).toBe(true);
    expect(detectionResult.phishingProbability).toBe(
      scenario.expectedProbability
    );
  });
});
