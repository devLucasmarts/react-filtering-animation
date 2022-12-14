import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Filter from './components/Filter';
import Movie from './components/Movie';
import './App.css';


const App = () => {

  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);

  const fetchPopularMovies = async () => {
    const moviesData = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);

    const movies = await moviesData.json();
    setPopular(movies.results);
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <div className='app'>
      <Filter
        popular={ popular }
        setFiltered={ setFiltered }
        activeGenre={ activeGenre }
        setActiveGenre={ setActiveGenre }
      />
      <motion.div
        layout 
        className='popular-movies'
      >
        <AnimatePresence>
          {filtered.map((movie) => (
            <Movie key={ movie.id } movie={ movie } />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default App;
