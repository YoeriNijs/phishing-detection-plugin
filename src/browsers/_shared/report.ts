import {
  createStorageForBrowserImpl,
  getBrowserImpl
} from './util/browser-util';
import { I18n } from './i18n/i18n';
import { BadgeScorer } from './badge-scorer';

const htmlParagraphElement: HTMLParagraphElement = document.querySelector('p');
if (htmlParagraphElement) {
  const browserImpl = getBrowserImpl();
  browserImpl.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (tabs.length > 0) {
      const currentTab = tabs[0];
      const currentUrl = currentTab.url;
      const storage = createStorageForBrowserImpl();
      storage.getRules(rules => {
        const resultWithHighestScore = BadgeScorer.calculate(rules, currentUrl);
        const data = [
          {
            name: 'url',
            key: I18n.translate('url'),
            value: currentUrl
          },
          {
            name: 'is-phishing',
            key: I18n.translate('is-phishing'),
            value: resultWithHighestScore.isPhishing
          },
          {
            name: 'probability',
            key: I18n.translate('probability'),
            value: resultWithHighestScore.phishingProbability
          },
          {
            name: 'threshold',
            key: I18n.translate('threshold'),
            value: resultWithHighestScore.threshold
          }
        ];

        if (resultWithHighestScore.matchingRules !== null) {
          data.push({
            name: 'rules',
            key: I18n.translate('rules'),
            value: JSON.stringify(resultWithHighestScore.matchingRules)
          });
        }

        const table = document.createElement('table');
        const tbody = document.createElement('tbody');
        data.forEach(item => {
          const row = document.createElement('tr');

          const td1 = document.createElement('td');
          td1.appendChild(document.createTextNode(item.key));
          row.appendChild(td1);

          const td2 = document.createElement('td');
          if (item.name === 'rules') {
            const pre = document.createElement('pre');
            pre.innerText = item.value;
            td2.appendChild(pre);
          } else {
            td2.innerText = item.value;
          }
          row.appendChild(td2);

          tbody.appendChild(row);
        });
        table.appendChild(tbody);

        htmlParagraphElement.appendChild(table);
      });
    }
  });
}

I18n.translateI18NElements();
