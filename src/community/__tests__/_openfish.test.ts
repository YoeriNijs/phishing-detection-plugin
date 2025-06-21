import { Openfish, OpenFishCache } from '../_openfish';

describe('Openfish', () => {
  beforeEach(() => {
    // Clear the cache before each test
    OpenFishCache.updateCache(null);
    // Reset the fetch mock before each test
    global.fetch = jest.fn();
  });

  it('should fetch data from the URL and update the cache when cache is empty', async () => {
    // Mock the fetch function
    const mockFetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve('link1\nlink2\nlink3')
      })
    );

    // Replace the global fetch with the mock
    global.fetch = mockFetch;

    const openfish = new Openfish();
    const result = await openfish.fetch();

    expect(mockFetch).toHaveBeenCalledWith(openfish['_feed_url']);
    expect(result).toEqual(['link1', 'link2', 'link3']);
    expect(OpenFishCache.getCache()).toEqual(['link1', 'link2', 'link3']);
  });

  it('should return cached data when cache is not empty', async () => {
    // Set up the cache with some data
    const cachedData = ['cachedLink1', 'cachedLink2'];
    OpenFishCache.updateCache(cachedData);

    const openfish = new Openfish();
    const result = await openfish.fetch();

    expect(result).toEqual(cachedData);
    expect(global.fetch).not.toHaveBeenCalled(); // Ensure fetch was not called
  });
});
