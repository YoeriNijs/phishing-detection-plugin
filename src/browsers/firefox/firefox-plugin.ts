import { FirefoxStorage } from './firefox-storage';
import { DEFAULT_RULES } from '../../rules/default';
import { PhishingDetectionPlugin } from '../_shared/plugin';

// Initialize plugin
const storage = new FirefoxStorage(DEFAULT_RULES);
new PhishingDetectionPlugin(storage, browser);
