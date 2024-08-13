import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, Mock, vi } from 'vitest';
import App from './App';
import { getSearchResults, getTrending } from './data/apiRequest';

// Mock the API requests
vi.mock('./data/apiRequest', () => ({
  getTrending: vi.fn(),
  getSearchResults: vi.fn(),
}));

const queryClient = new QueryClient();

describe('App', () => {
  const renderWithQueryClient = (ui: React.ReactNode) => {
    return render(
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    );
  };

  // Mock data
  const mockTrendingData = {
    results: [
      {
        id: 1,
        title: 'Trending Movie 1',
        poster_path: '/trending1.jpg',
        overview: 'Overview 1',
      },
      {
        id: 2,
        title: 'Trending Movie 2',
        poster_path: '/trending2.jpg',
        overview: 'Overview 2',
      },
    ],
  };

  const mockSearchData = {
    results: [
      {
        id: 3,
        title: 'Search Result 1',
        poster_path: '/search1.jpg',
        overview: 'Search Overview 1',
      },
    ],
  };

  it('renders the header', () => {
    (getTrending as Mock).mockResolvedValue(mockTrendingData);

    renderWithQueryClient(<App />);
    expect(screen.getByText('FLicK PicK')).toBeInTheDocument();
  });

  it('renders the search input', () => {
    (getTrending as Mock).mockResolvedValue(mockTrendingData);

    renderWithQueryClient(<App />);
    expect(
      screen.getByPlaceholderText('Search for a movie, tv show, person....')
    ).toBeInTheDocument();
  });

  it('renders the search button', () => {
    (getTrending as Mock).mockResolvedValue(mockTrendingData);

    renderWithQueryClient(<App />);
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('displays loading text while fetching trending movies', async () => {
    (getTrending as Mock).mockResolvedValue(mockTrendingData);

    renderWithQueryClient(<App />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    );
  });

  it('displays error message if fetching data fails', async () => {
    (getTrending as Mock).mockRejectedValueOnce(new Error('Failed to fetch'));

    renderWithQueryClient(<App />);

    await waitFor(() => {
      expect(screen.getByText(/error fetching data/i)).toBeInTheDocument();
    });
  });

  it('displays trending movies', async () => {
    (getTrending as Mock).mockResolvedValue(mockTrendingData);

    renderWithQueryClient(<App />);

    await waitFor(() => {
      expect(screen.getByText('Trending Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Trending Movie 2')).toBeInTheDocument();
    });
  });

  it('fetches search results when a search is performed', async () => {
    (getTrending as Mock).mockResolvedValue(mockTrendingData);
    (getSearchResults as Mock).mockResolvedValueOnce(mockSearchData);

    renderWithQueryClient(<App />);

    const searchInput = screen.getByPlaceholderText(
      'Search for a movie, tv show, person....'
    ) as HTMLInputElement;
    const searchButton = screen.getByText('Search');

    fireEvent.change(searchInput, { target: { value: 'Test Search' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('Search Result 1')).toBeInTheDocument();
    });
  });
});
