import { calculateBatchScore } from './badge';
import {
  createStorageForBrowserImpl,
  getBrowserImpl
} from './util/browser-util';

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
          { key: 'URL', value: currentUrl },
          {
            key: 'Is phishing',
            value: resultWithHighestScore.isPhishing
          },
          {
            key: 'Probability',
            value: resultWithHighestScore.phishingProbability
          },
          {
            key: 'Threshold',
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
