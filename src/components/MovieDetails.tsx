import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getMovieDetails } from '../data/apiRequest';

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  const getDetails = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetails(Number(id)),
  });

  if (getDetails.isLoading) return <p>Loading...</p>;
  if (getDetails.isError) return <p>Error loading movie details</p>;

  const movie = getDetails.data;

  return (
    <div className=' text-4xl font-bold flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-violet-800 text-white'>
      {movie.title}
      <button
        onClick={handleClick}
        className=' text-sm border border-white mt-4 px-4 py-2 rounded-md'
      >
        Go Back
      </button>
    </div>
  );
}
