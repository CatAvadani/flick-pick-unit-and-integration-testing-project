import { ArrowUturnLeftIcon } from '@heroicons/react/16/solid';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { getMovieDetails } from '../data/apiRequest';

function MovieDetails() {
  const { id } = useParams<{ id: string }>();

  const getDetails = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetails(Number(id)),
  });

  const movie = getDetails.data;

  return (
    <div
      data-testid='movie-details'
      className='w-full h-full min-h-screen p-8 sm:p-16 bg-gradient-to-br from-blue-500 to-violet-800 rounded-sm flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10'
    >
      {movie?.poster_path ? (
        <img
          className='w-[80vw] sm:w-[35vw] sm:h-[650px] object-cover rounded-lg hover:opacity-80 transition-all'
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      ) : (
        <div className='w-[80vw] sm:w-[35vw] sm:h-[650px] flex items-center justify-center bg-black/50 rounded-lg hover:opacity-80'>
          <p className='text-white text-xl'>No Image Available</p>
        </div>
      )}
      <div className='flex flex-col gap-4 sm:gap-10'>
        <h1
          data-testid='title'
          className='text-3xl sm:text-5xl font-bold text-white mb-4 sm:mb-10'
        >
          {movie?.title}
        </h1>
        <p className='text-white/50 w-full sm:w-[50vw] text-base sm:text-lg'>
          {movie?.overview}
        </p>
        <div className='flex gap-2 sm:gap-4 mt-4'>
          <p className='text-white/50 text-sm sm:text-base'>
            Rating: {movie?.vote_average}
          </p>
          <p className='text-white/50 text-sm sm:text-base'>
            Release Date: {movie?.release_date}
          </p>
        </div>
        <button className='px-4 py-2 text-white bg-yellow-500 rounded-full shadow-md'>
          Watch Trailer
        </button>
        <Link to='/' className='flex items-center gap-2 mt-4'>
          <ArrowUturnLeftIcon className='h-8 w-8 sm:h-10 sm:w-10 text-white hover:scale-110 transition-all' />
          <p className='text-white/50 text-sm'>Go Back</p>
        </Link>
      </div>
    </div>
  );
}

export default MovieDetails;
