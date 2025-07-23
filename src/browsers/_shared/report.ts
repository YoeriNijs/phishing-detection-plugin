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
        const resultWithHighestScore = BadgeScorer.calculate(
          [],
          rules,
          currentUrl
        );
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
            name: 'source',
            key: I18n.translate('source'),
            value: JSON.stringify(resultWithHighestScore.matchingRules, null, 2) // format properly
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
          if (item.name === 'url') {
            td2.classList.add('shorten');
            td2.innerText = item.value;
            td2.onclick = () => alert(item.value);
          } else if (item.name === 'source') {
            const rulesDetailsArea: HTMLElement =
              document.querySelector('div.rules-details');
            const closeRulesDetailsAreBtn = document.createElement('button');
            closeRulesDetailsAreBtn.classList.add('close-rules-details');
            closeRulesDetailsAreBtn.innerText = I18n.translate('close');
            closeRulesDetailsAreBtn.onclick = () =>
              (rulesDetailsArea.style.display = 'none');

            const rulesDetailsAreaTitle = document.createElement('h2');
            rulesDetailsAreaTitle.innerText =
              I18n.translate('detection-based-on');

            const rulesDetailsAreaBody = document.createElement('div');
            rulesDetailsAreaBody.classList.add('rules-body');
            const rulesDetailsAreaBodyPre = document.createElement('pre');
            rulesDetailsAreaBodyPre.innerText = item.value;
            rulesDetailsAreaBody.append(rulesDetailsAreaBodyPre);

            rulesDetailsArea.append(
              closeRulesDetailsAreBtn,
              rulesDetailsAreaTitle,
              rulesDetailsAreaBody
            );

            const btn = document.createElement('button');
            btn.innerText = I18n.translate('show-rules-btn');
            btn.onclick = () => (rulesDetailsArea.style.display = 'flex');
            td2.appendChild(btn);
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
