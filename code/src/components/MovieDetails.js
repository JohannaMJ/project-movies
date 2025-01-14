import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BackIcon } from './BackIcon';

import { MOVIEDETAILS_URL } from '../utils/urls';

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState([]);
  const [hasError, setHasError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    fetch(MOVIEDETAILS_URL(id))
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setMovieDetails(data);
        } else {
          setHasError(true);
        }
      })
      .catch(() => setHasError(true));
  }, [id]);

  if (hasError) {
    return (
      <div>
        <h2 className='error-message'>Movie not found</h2>
        <Link to='/' className='backLink'>
          <BackIcon /> Movies
        </Link>
      </div>
    );
  }

  return (
    <div className='detail-page'>
      <Link to='/' className='backLink'>
        <BackIcon /> Movies
      </Link>
      <div
        className='backdrop'
        style={{
          backgroundImage: movieDetails.backdrop_path
            ? `linear-gradient(180deg, rgba(0,0,0,0) 70%, rgba(0,0,0,1) 100%), url(https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path})`
            : '',
        }}
      >
        <div className='summary'>
          <img
            src={
              movieDetails.poster_path
                ? `https://image.tmdb.org/t/p/w342${movieDetails.poster_path}`
                : ''
            }
            alt={movieDetails.title}
          />
          <div className='details'>
            <h3 className='details-header'>
              {movieDetails.original_title}{' '}
              <span>{movieDetails.vote_average}/10</span>
            </h3>
            <p>{movieDetails.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
