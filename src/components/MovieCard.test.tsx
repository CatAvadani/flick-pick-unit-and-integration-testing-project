import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ResultItem } from '../data/dataResponse';
import { truncateText } from '../utils/truncateText';
import MovieCard from './MovieCard';

describe('MovieCard Component', () => {
  const movie: ResultItem = {
    id: 1,
    title: 'Game of Thrones',
    overview:
      'Seven noble families fight for control of the mythical land of Westeros',
    poster_path: '/poster_title.jpg',
  };

  it('renders movie title', () => {
    render(<MovieCard movie={movie} />);
    expect(screen.getByText('Game of Thrones')).toBeInTheDocument();
  });

  it('renders movie poster with correct src', () => {
    render(<MovieCard movie={movie} />);
    const img = screen.getByAltText('Game of Thrones') as HTMLImageElement;
    expect(img.src).toBe('https://image.tmdb.org/t/p/w500/poster_title.jpg');
  });

  it('truncates text correctly', () => {
    const text =
      'Seven noble families fight for control of the mythical land of Westeros.';
    const result = truncateText(text, 7);
    expect(result).toBe('Seven noble families fight for control of...');
  });

  it('returns full text if under word limit', () => {
    const text = 'A short sentence.';
    const result = truncateText(text, 10);
    expect(result).toBe('A short sentence.');
  });
});
