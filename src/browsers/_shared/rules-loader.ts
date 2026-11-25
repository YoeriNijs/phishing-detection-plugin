import { PhishingRules } from '../../model/phishing-rules';
import {
  DEFAULT_RULES_VERSION,
  isDefaultRules,
  mapDefaultRules
} from '../../rules/default';

const LATEST_RULES =
  'https://raw.githubusercontent.com/YoeriNijs/phishing-detection-plugin/refs/heads/main/release/latest_rules.json';

const FETCH_TIMEOUT_MS = 5000;

/**
 * Fetches the latest published rules. The plugin ships with a default rule set,
 * so a network failure must never prevent the plugin from starting.
 */
export async function fetchLatestRules(
  fallbackRules: PhishingRules[]
): Promise<PhishingRules[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(LATEST_RULES, {
      signal: controller.signal
    });
    if (!response.ok) {
      console.warn(
        `Could not fetch the latest rules from remote: (${response.status})`
      );
      return fallbackRules;
    }

    const rules = await response.json();
    if (isDefaultRules(rules)) {
      if (rules.version === DEFAULT_RULES_VERSION) {
        console.log('Successfully fetched latest rules from remote', rules);
        return mapDefaultRules(rules);
      }
    }
    console.warn(
      'Could not fetch the latest rules from remote, using fallback rules instead'
    );
    return fallbackRules;
  } catch (error) {
    console.warn(
      'Could not fetch the latest rules, using the bundled rules',
      error
    );
    return fallbackRules;
  } finally {
    clearTimeout(timeout);
  }
}
