import { ICommunity } from './i-community';

export class Openfish implements ICommunity {
  private readonly _feed_url =
    'https://raw.githubusercontent.com/openphish/public_feed/refs/heads/main/feed.txt';

  fetch(): Promise<string[]> {
    return fetch(this._feed_url)
      .then(res => res.text())
      .then(text => text.split('\n'));
  }
}
