import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import FlipText from './components/FlipText';
import MovieCard from './components/MovieCard';
import { getSearchResults, getTrending } from './data/apiRequest';

function App() {
  const [searchString, setSearchString] = useState('');

  const trendingQuery = useQuery({
    queryKey: ['trending'],
    queryFn: () => getTrending(),
    enabled: !searchString,
  });

  const searchQuery = useQuery({
    queryKey: ['search', searchString],
    queryFn: () => getSearchResults(searchString),
    enabled: false,
  });

  return (
    <div className=' min-h-screen flex  flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-500 to-violet-800'>
      <FlipText
        className='text-7xl font-bold tracking-[-0.1em] text-white/50 md:text-7xl md:leading-[5rem]'
        word='FlicK  PicK'
      />
      <form
        className='flex items-center justify-center w-full max-w-sm mx-auto mt-4 mb-8'
        onSubmit={(e) => {
          e.preventDefault();
          searchQuery.refetch();
        }}
      >
        <input
          placeholder='Search for a movie, tv show, person....'
          className=' w-full px-4 py-2 bg-gray-100 rounded-l-full shadow-md'
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />

        <button
          className='px-4 py-2 text-white bg-yellow-500 rounded-r-full shadow-md '
          type='submit'
        >
          Search
        </button>
      </form>
      <h2 className='text-2xl font-bold text-purple-100 mb-8'>
        {searchQuery.data?.results ? 'Search Results' : 'Trending Movies'}
      </h2>

      {trendingQuery.isLoading || searchQuery.isLoading ? (
        <p className='text-purple-100'>Loading...</p>
      ) : trendingQuery.isError || searchQuery.isError ? (
        <p data-testid='error' className='text-purple-100'>
          Error fetching data
        </p>
      ) : (
        <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {searchQuery.data?.results
            ? searchQuery.data.results.map((result) => (
                <MovieCard key={result.id} movie={result} />
              ))
            : trendingQuery.data?.results.map((result) => (
                <MovieCard key={result.id} movie={result} />
              ))}
        </ul>
      )}
    </div>
  );
}

export default App;
