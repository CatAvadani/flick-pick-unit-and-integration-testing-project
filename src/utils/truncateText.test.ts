import { describe, expect, it } from 'vitest';
import { truncateText } from './truncateText';

describe('truncateText', () => {
  it('should truncate text when the word count is higher than the limit', () => {
    const text =
      'Seven noble families fight for control of the mythical land of Westeros.';
    const result = truncateText(text, 7);
    expect(result).toBe('Seven noble families fight for control of...');
  });

  it('should return the full text when word count is under the limit', () => {
    const text = 'A short sentence.';
    const result = truncateText(text, 10);
    expect(result).toBe('A short sentence.');
  });

  it('should return the full text when word count equals the limit', () => {
    const text = 'A short sentence with exactly';
    const result = truncateText(text, 5);
    expect(result).toBe('A short sentence with exactly');
  });

  it('should return an empty string if the input text is undefined', () => {
    const result = truncateText(undefined, 5);
    expect(result).toBe('');
  });

  it('should return an empty string if the input text is null', () => {
    const result = truncateText(null, 5);
    expect(result).toBe('');
  });
});
