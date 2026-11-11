import { FirefoxStorage } from './firefox-storage';
import { DEFAULT_RULES } from '../../rules/default';
import { PhishingDetectionPlugin } from '../_shared/plugin';
import { fetchLatestRules } from '../_shared/rules-loader';

/**
 * Initialize the plugin synchronously at the top level so the tab listeners are
 * registered as soon as the background script starts.
 *
 * The latest rules are fetched lazily; the stored rules are used immediately
 * when they are available, and the bundled rules are the fallback on a fresh
 * install when the network is unavailable.
 */
const storage = new FirefoxStorage(() => fetchLatestRules(DEFAULT_RULES));
const plugin = new PhishingDetectionPlugin(storage, browser);

void plugin
  .whenReady()
  .then(() => console.log('Firefox Phishing Detection Plugin initialized!'))
  .catch(error =>
    console.error('Could not initialize the Phishing Detection Plugin', error)
  );
