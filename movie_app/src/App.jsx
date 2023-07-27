import React, { useState, useEffect } from 'react';
import './App.css';
import searchIcon from '../src/assets/search.svg'
import { MovieCard } from './Components/MovieCard/MovieCard';
const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=f316c93a';

function App() {
  const [allMovies, setAllMovies] = useState([])
  const [searcedMovie, SetSearcedMovie] = useState('batman')
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setAllMovies(data.Search);
    console.log(data);
  };

  useEffect(() => {
    searchMovies(searcedMovie)
  }, []);

  function handleSearch(e) {
    SetSearcedMovie(e.target.value)
  }

  function handleSearched() {
    searchMovies(searcedMovie)
  }

  return (
    <div className='app'>
      <h1>MovieLand</h1>
      <div className='search'>
        <input type="text" placeholder='' value={searcedMovie} onChange={handleSearch} />
        <img src={searchIcon} alt="search_icon" onClick={handleSearched} />
      </div>
      {allMovies?.length > 0 ? (
        <div className="container">
          {allMovies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div >
  )
}

export default App;
