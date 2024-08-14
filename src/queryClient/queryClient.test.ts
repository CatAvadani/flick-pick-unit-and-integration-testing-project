import { QueryClient } from '@tanstack/react-query';
import { describe, expect, it } from 'vitest';
import { queryClient } from './queryClient';

describe('QueryClient', () => {
  it('should create a QueryClient instance', () => {
    expect(queryClient).toBeInstanceOf(QueryClient);
  });
});
