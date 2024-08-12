import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('should start at 0', () => {
    // Arrange / Act
    render(<App />);

    // Assert
    expect(screen.getByRole('button')).toHaveTextContent('count is 0');
  });

  it('should increment count when clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveTextContent(/1/);

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveTextContent(/3/);
  });
});
