import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import MovieDetails from './components/MovieDetails';
import MovieList from './components/MovieList';
import { MOVIELIST_URL } from './utils/urls';

export const App = () => {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    fetch(MOVIELIST_URL)
      .then((res) => res.json())
      .then((data) => setMovieList(data.results));
  }, []);

  console.log(movieList);

  return (
    <BrowserRouter>
      <main>
        <Switch>
          <Route path='/' exact>
            <MovieList movies={movieList} />
          </Route>
          <Route path='/details/:id'>
            <MovieDetails />
          </Route>
          {/* <Route path='/details' component={MovieDetails} /> */}
        </Switch>
      </main>
    </BrowserRouter>
  );
};
