export interface TrendingResults {
  page: number;
  results: ResultItem[];
  total_pages: number;
  total_results: number;
}

export interface ResultItem {
  id: number;
  title?: string;
  original_title?: string;
  overview: string;
  poster_path: string;
}

export enum MediaType {
  Movie = 'movie',
  Tv = 'tv',
}
