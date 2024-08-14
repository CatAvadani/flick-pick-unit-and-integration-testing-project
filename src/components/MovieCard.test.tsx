import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { ResultItem } from '../data/dataResponse';
import MovieCard from './MovieCard';

describe('MovieCard Component', () => {
  const movie: ResultItem = {
    id: 1,
    title: 'Game of Thrones',
    overview:
      'Seven noble families fight for control of the mythical land of Westeros',
    poster_path: '/poster_title.jpg',
  };

  it('should render movie title', () => {
    render(
      <MemoryRouter>
        <MovieCard movie={movie} />
      </MemoryRouter>
    );
    expect(screen.getByText('Game of Thrones')).toBeInTheDocument();
  });

  it('should render movie poster with correct src', () => {
    render(
      <MemoryRouter>
        <MovieCard movie={movie} />
      </MemoryRouter>
    );
    const img = screen.getByAltText('Game of Thrones') as HTMLImageElement;
    expect(img.src).toBe('https://image.tmdb.org/t/p/w500/poster_title.jpg');
  });

  it('should have a link that navigates to the correct movie details page', () => {
    render(
      <MemoryRouter>
        <MovieCard movie={movie} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link') as HTMLAnchorElement;
    expect(link).toHaveAttribute('href', '/movie/1');
  });
});
