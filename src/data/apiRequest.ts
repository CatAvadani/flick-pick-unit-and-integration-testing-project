import { MediaType, TrendingResults } from './dataResponse';

// const API_KEY = import.meta.env.API_KEY;
const API_KEY = '2222e9de15e1eef917bbfd087c60ad2e';

export const getTrending = async (
  page: number = 2
): Promise<TrendingResults> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${API_KEY}&page=${page}`
  );
  const data = await response.json();
  return data;
};

export const getSearchResults = async (
  query: string
): Promise<TrendingResults> => {
  console.log('Search query:', query);

  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?language=en-US&api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data;
};

export const getMovieDetails = async (id: number, type: MediaType) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}?language=en-US&api_key=${API_KEY}`
  );
  const data = await response.json();
  return data;
};
