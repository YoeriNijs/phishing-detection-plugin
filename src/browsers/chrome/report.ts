import { ChromeStorage } from './storage';
import { DEFAULT_RULES } from '../../rules/default';
import { Engine } from '../../engine/engine';

const htmlParagraphElement: HTMLParagraphElement = document.querySelector('p');
if (htmlParagraphElement) {
  const storage = new ChromeStorage(DEFAULT_RULES);
  storage.getInitiator(initiator => {
    storage.getRules(rules => {
      const engine = new Engine(...rules);
      const results = engine.detect(initiator);
      const resultWithHighestScore = results
        .sort((a, b) => {
          if (a.phishingProbability > b.phishingProbability) {
            return 1;
          } else {
            return -1;
          }
        })
        .pop();

      const initiatorEl = document.createElement('div');
      initiatorEl.innerText = `Initiator: ${initiator}`;

      const isPhishingEl = document.createElement('div');
      isPhishingEl.innerText = `Is phishing: ${resultWithHighestScore.isPhishing}`;

      const phishingProbabilityEl = document.createElement('div');
      phishingProbabilityEl.innerText = `Phishing probability: ${resultWithHighestScore.phishingProbability.toFixed(1)}`;

      htmlParagraphElement.append(
        initiatorEl,
        isPhishingEl,
        phishingProbabilityEl
      );
    });
  });
}
