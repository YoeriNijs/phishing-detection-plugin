import { PhishingDatabase, PhishingDatabaseCache } from '../_phishing-database';

describe('PhishingDatabase', () => {
  beforeEach(() => {
    // Clear the cache before each test
    PhishingDatabaseCache.updateCache(null);
    // Reset the fetch mock before each test
    global.fetch = jest.fn();
  });

  it('should fetch data from the URL and update the cache when cache is empty', async () => {
    const mockFetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve('link1\nlink2\nlink3')
      })
    );

    // Replace the global fetch with the mock
    global.fetch = mockFetch;

    const phishingDatabase = new PhishingDatabase();
    const result = await phishingDatabase.fetch();

    expect(mockFetch).toHaveBeenCalledWith(phishingDatabase['_feed_url']);
    expect(result).toEqual(['link1', 'link2', 'link3']);
    expect(PhishingDatabaseCache.getCache()).toEqual([
      'link1',
      'link2',
      'link3'
    ]);
  });

  it('should return cached data when cache is not empty', async () => {
    // Set up the cache with some data
    const cachedData = ['cachedLink1', 'cachedLink2'];
    PhishingDatabaseCache.updateCache(cachedData);

    const phishingDatabase = new PhishingDatabase();
    const result = await phishingDatabase.fetch();

    expect(result).toEqual(cachedData);
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
