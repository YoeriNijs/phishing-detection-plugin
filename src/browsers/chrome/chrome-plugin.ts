import { ChromeStorage } from './chrome-storage';
import { DEFAULT_RULES } from '../../rules/default';
import { PhishingDetectionPlugin } from '../_shared/plugin';
import { fetchLatestRules } from '../_shared/rules-loader';

/**
 * Initialize the plugin synchronously at the top level.
 *
 * Chrome MV3 service workers are stopped when idle and restarted for the next
 * browser event. Registering the tab listeners only from onStartup/onInstalled
 * means they are missing after such a restart. Creating the plugin here makes
 * sure the listeners are registered every time the service worker starts.
 *
 * The latest rules are fetched lazily. If storage already contains rules, the
 * fetch result is ignored and the stored rules are used immediately. On a fresh
 * install the plugin waits (at most a few seconds) for the latest rules, then
 * falls back to the bundled rules.
 */
const storage = new ChromeStorage(() => fetchLatestRules(DEFAULT_RULES));
const plugin = new PhishingDetectionPlugin(storage, chrome);

function logInitialized(message: string): void {
  void plugin
    .whenReady()
    .then(() =>
      console.log(`${message} Phishing Detection Plugin initialized.`)
    )
    .catch(error =>
      console.error('Could not initialize the Phishing Detection Plugin', error)
    );
}

/**
 * Fired when a profile that has this extension installed first starts up. This
 * event is not fired when an incognito profile is started, even if this
 * extension is operating in 'split' incognito mode.
 */
chrome.runtime.onStartup.addListener(() => logInitialized('Started'));

/**
 * Fired when the extension is first installed, when the extension is updated to
 * a new version, and when Chrome is updated to a new version.
 */
chrome.runtime.onInstalled.addListener(() => logInitialized('Installed'));
