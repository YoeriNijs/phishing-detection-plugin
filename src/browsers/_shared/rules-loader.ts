import { PhishingRules } from '../../model/phishing-rules';

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
      console.warn(`Could not fetch the latest rules (${response.status})`);
      return fallbackRules;
    }

    const rules = await response.json();
    if (Array.isArray(rules) && rules.length > 0) {
      return rules;
    }
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
