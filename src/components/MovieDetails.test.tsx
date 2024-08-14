import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, Mock, vi } from 'vitest';
import App from '../App';
import { getMovieDetails } from '../data/apiRequest';
import MovieDetails from './MovieDetails';

// Mock the API request
vi.mock('../data/apiRequest', () => ({
  getMovieDetails: vi.fn(),
}));

const queryClient = new QueryClient();

const mockMovieDetails = {
  id: 1,
  title: 'Game of Thrones',
  overview:
    'Seven noble families fight for control of the mythical land of Westeros',
  poster_path: '/poster_title.jpg',
  vote_average: 8.8,
  release_date: '2010-07-16',
};

describe('MovieDetails', () => {
  const renderWithQueryClient = (ui: React.ReactNode) => {
    return render(
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    );
  };

  it('should render movie details correctly', async () => {
    (getMovieDetails as Mock).mockResolvedValue(mockMovieDetails);

    renderWithQueryClient(
      <MemoryRouter initialEntries={['/movie/1']}>
        <Routes>
          <Route path='/movie/:id' element={<MovieDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('title')).toHaveTextContent('Game of Thrones');
    });

    expect(
      screen.getByText(
        'Seven noble families fight for control of the mythical land of Westeros'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Rating: 8.8')).toBeInTheDocument();
    expect(screen.getByText('Release Date: 2010-07-16')).toBeInTheDocument();
  });

  it('should navigate back when "Go Back" link is clicked', async () => {
    (getMovieDetails as Mock).mockResolvedValue(mockMovieDetails);

    renderWithQueryClient(
      <MemoryRouter initialEntries={['/movie/1']}>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/movie/:id' element={<MovieDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('title')).toHaveTextContent('Game of Thrones');
    });

    const goBackLink = screen.getByText('Go Back');
    goBackLink.click();

    await waitFor(() => {
      // Check if the URL is changed to the home page
      expect(window.location.pathname).toBe('/');
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });
  });
});
