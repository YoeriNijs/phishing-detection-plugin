import { calculateBatchScore } from './badge';
import {
  createStorageForBrowserImpl,
  getBrowserImpl
} from './util/browser-util';
import { getTranslationForKey } from './i18n/i18n';

const h1Element: HTMLElement = document.querySelector('h1');
if (h1Element) {
  h1Element.innerText = getTranslationForKey('title-report');
}

const htmlParagraphElement: HTMLParagraphElement = document.querySelector('p');
if (htmlParagraphElement) {
  const browserImpl = getBrowserImpl();
  browserImpl.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (tabs.length > 0) {
      const currentTab = tabs[0];
      const currentUrl = currentTab.url;
      const storage = createStorageForBrowserImpl();
      storage.getRules(rules => {
        const resultWithHighestScore = calculateBatchScore(rules, currentUrl);
        const data = [
          { key: getTranslationForKey('url'), value: currentUrl },
          {
            key: getTranslationForKey('is-phishing'),
            value: resultWithHighestScore.isPhishing
          },
          {
            key: getTranslationForKey('probability'),
            value: resultWithHighestScore.phishingProbability
          },
          {
            key: getTranslationForKey('threshold'),
            value: resultWithHighestScore.threshold
          }
        ];

        const table = document.createElement('table');
        const tbody = document.createElement('tbody');
        data.forEach(item => {
          const row = document.createElement('tr');
          Object.values(item).forEach(text => {
            const td = document.createElement('td');
            td.textContent = text;
            row.appendChild(td);
          });
          tbody.appendChild(row);
        });
        table.appendChild(tbody);

        htmlParagraphElement.appendChild(table);
      });
    }
  });
}
