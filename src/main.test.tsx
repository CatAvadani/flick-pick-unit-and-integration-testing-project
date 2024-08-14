import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from './App';
import MovieDetails from './components/MovieDetails';
import './index.css';

const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactNode, { route = '/' } = {}) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </QueryClientProvider>
  );
};

describe('main', () => {
  it('should render the App component on the root route', async () => {
    renderWithProviders(
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/movie/:id' element={<MovieDetails />} />
      </Routes>,
      { route: '/' }
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Search for a movie, tv show, person....')
    ).toBeInTheDocument();
  });

  it('should render the MovieDetails component on the /movie/:id route', async () => {
    renderWithProviders(
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/movie/:id' element={<MovieDetails />} />
      </Routes>,
      { route: '/movie/1' }
    );

    await waitFor(() => {
      expect(screen.getByTestId('movie-details')).toBeInTheDocument();
    });
  });

  it('should render a 404-like page for an unknown route', async () => {
    renderWithProviders(
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/movie/:id' element={<MovieDetails />} />
        <Route path='*' element={<div>404 Not Found</div>} />
      </Routes>,
      { route: '/unknown-route' }
    );

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });
});
