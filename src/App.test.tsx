import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, Mock, vi } from 'vitest';

import { MemoryRouter } from 'react-router-dom';
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
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
      </MemoryRouter>
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

  // Test if the header is rendered
  it('should render the header', () => {
    (getTrending as Mock).mockResolvedValue(mockTrendingData);

    renderWithQueryClient(<App />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  // Test if the search input is rendered
  it('should render the search input', () => {
    (getTrending as Mock).mockResolvedValue(mockTrendingData);

    renderWithQueryClient(<App />);

    expect(
      screen.getByPlaceholderText('Search for a movie, tv show, person....')
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText('Search for a movie, tv show, person....')
    ).toHaveAttribute('placeholder', 'Search for a movie, tv show, person....');
  });

  // Test if the search button is rendered
  it('should render the search button', () => {
    (getTrending as Mock).mockResolvedValue(mockTrendingData);

    renderWithQueryClient(<App />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Search');
  });

  // Test if trending movies are displayed
  it('should display trending movies', async () => {
    (getTrending as Mock).mockResolvedValue(mockTrendingData);

    renderWithQueryClient(<App />);

    await waitFor(() => {
      expect(screen.getByText('Trending Movie 1')).toHaveTextContent(
        'Trending Movie 1'
      );
      expect(screen.getByText('Trending Movie 2')).toBeInTheDocument();
    });
  });

  // Test if search results are displayed
  it('should fetch search results when a search is performed', async () => {
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

  // Test if search results are not fetched when search input is empty
  it('should not fetch search results if search input is empty', async () => {
    (getTrending as Mock).mockResolvedValue(mockTrendingData);
    (getSearchResults as Mock).mockResolvedValueOnce({ results: [] });

    renderWithQueryClient(<App />);

    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.queryByText('Search Result 1')).not.toBeInTheDocument();
    });
  });

  // Test if an error message is displayed when search fails
  it('should display an error message if fails to fetch search data', async () => {
    (getTrending as Mock).mockResolvedValue(mockTrendingData);

    (getSearchResults as Mock).mockRejectedValueOnce(
      new Error('Failed to fetch search results')
    );

    renderWithQueryClient(<App />);

    const searchInput = screen.getByPlaceholderText(
      'Search for a movie, tv show, person....'
    );
    fireEvent.change(searchInput, { target: { value: 'Test Search' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });
  });
});
