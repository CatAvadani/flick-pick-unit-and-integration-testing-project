import { describe, expect, it, Mock, vi } from 'vitest';
import { getMovieDetails, getSearchResults, getTrending } from './apiRequest';

// Mock the global fetch function
global.fetch = vi.fn();

describe('api requests', () => {
  it('should fetch results successfully ', async () => {
    const mockResponse = {
      results: [
        { id: 1, title: 'Movie 1' },
        { id: 2, title: 'Movie 2' },
      ],
    };

    (fetch as Mock).mockResolvedValue({
      json: () => Promise.resolve(mockResponse),
    });

    const data = await getTrending();
    expect(data).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('trending/all/day')
    );
  });

  it('should fetch search results', async () => {
    const mockResponse = {
      results: [
        { id: 3, title: 'Search Result 1' },
        { id: 4, title: 'Search Result 2' },
      ],
    };

    (fetch as Mock).mockResolvedValue({
      json: () => Promise.resolve(mockResponse),
    });

    const data = await getSearchResults('Test Search');
    expect(data).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('search/multi'));
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('query=Test%20Search')
    );
  });

  it('should fetch movie details successfully', async () => {
    const mockResponse = { id: 1, title: 'Movie Details' };

    (fetch as Mock).mockResolvedValue({
      json: () => Promise.resolve(mockResponse),
    });

    const data = await getMovieDetails(1);
    expect(data).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('movie/1'));
  });

  it('should handle fetch errors', async () => {
    (fetch as Mock).mockRejectedValue(new Error('Failed to fetch'));

    await expect(getTrending()).rejects.toThrow('Failed to fetch');
    await expect(getSearchResults('Test Search')).rejects.toThrow(
      'Failed to fetch'
    );
    await expect(getMovieDetails(1)).rejects.toThrow('Failed to fetch');
  });
});
