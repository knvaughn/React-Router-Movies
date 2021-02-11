import React from 'react';
import { useHistory } from 'react-router-dom';

export default function SavedList(props) {
  let history = useHistory();

  const routeHome = () => {
    history.push('/');
  }

  return (
    <div className="saved-list">
      <h3>Saved Movies:</h3>
      {props.list.map(movie => (
        <span className="saved-movie" key={movie.id}>{movie.title}</span>
      ))}
      <div 
        className="home-button"
        onClick={routeHome}
      >
        Home
      </div>
    </div>
  );
}
