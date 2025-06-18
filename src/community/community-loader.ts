import { Openfish } from './_openfish';

export class CommunityLoader {
  private _communityUrls: string[] = [];

  async getCommunityUrls(): Promise<string[]> {
    const sources = [new Openfish()];
    const $community_sources = sources.map(source =>
      source
        .fetch()
        .then(res => (this._communityUrls = [...this._communityUrls, ...res]))
        .catch(err => {
          throw Error(`Cannot fetch community data: ${err}`);
        })
    );
    return await Promise.all($community_sources).then(
      () => this._communityUrls
    );
  }
}
