import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { WishlistContext } from '../context/WishlistProvider';
import MovieCard from './MovieCard';
import styles from './MovieList.module.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const API_KEY = import.meta.env.VITE_TOKEN;
      const moviesPerPage = 20;
      const page = currentPage;

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
        );
        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [currentPage]);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleNavigate = (id) => {
    navigate(`/movie/${id}`);
  };

  const isInWishlist = (movieId) => wishlist.some((movie) => movie.id === movieId);

  const toggleWishlist = (movie) => {
    if (isInWishlist(movie.id)) {
      removeFromWishlist(movie.id);
    } else {
      addToWishlist(movie);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Popular Movies</h1>
      <input
        type="text"
        className={styles.searchBar}
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className={styles.movieGrid}>
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isInWishlist={isInWishlist(movie.id)}
            onToggleWishlist={() => toggleWishlist(movie)}
            onViewDetails={() => handleNavigate(movie.id)}
          />
        ))}
      </div>

      <div className={styles.pagination}>
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default MovieList;
