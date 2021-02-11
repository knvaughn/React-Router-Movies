import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Link, Switch } from 'react-router-dom';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';

import SavedList from './Movies/SavedList';

export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies') // Study this endpoint with Postman
        .then(response => {
          // Study this response with a breakpoint or log statements
          // and set the response data as the 'movieList' slice of state
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const getMovieById = (id) => {
    return movieList.find((movie) => movie.id == id);
  };

  const addToSavedList = id => {
    // This is stretch. Prevent the same movie from being "saved" more than once
    const movie = getMovieById(id);
    if (saved.indexOf(movie) === -1) {
      setSaved([...saved, movie]);
    }
  };

  return (
    <div>
      <SavedList list={saved} />

      <Switch>
        <Route path="/movies/:id">
          <Movie addToSavedList={addToSavedList} />
        </Route>
        <Route exact path="/">
          <MovieList movies={movieList} />
        </Route>
      </Switch>
    </div>
  );
}
