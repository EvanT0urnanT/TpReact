import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import styles from "./MovieDetail.module.css";
import { WishlistContext } from "../context/WishlistProvider";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating / 2);
    const emptyStars = 5 - fullStars;

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <span key={`full-${index}`} className={styles.fullStar}>
            ★
          </span>
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <span key={`empty-${index}`} className={styles.emptyStar}>
            ★
          </span>
        ))}
      </>
    );
  };

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_TOKEN;

    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        const movieData = await movieResponse.json();

        const castResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
        );
        const castData = await castResponse.json();

        setMovie(movieData);
        setCast(castData.cast.slice(0, 10));
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleWishlistToggle = () => {
    if (wishlist.some((m) => m.id === movie.id)) {
      removeFromWishlist(movie.id);
    } else {
      addToWishlist(movie);
    }
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{movie.title}</h1>
      <div className={styles.movieDetails}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className={styles.poster}
        />
        <div className={styles.movieInfo}>
          <p>{movie.overview}</p>
          <p>
            <span>Release Date:</span> {movie.release_date}
          </p>
          <p>
            <span>Rating:</span> {renderStars(movie.vote_average)}
          </p>
          <button
            onClick={handleWishlistToggle}
            className={`${styles.wishlistButton} ${
              wishlist.some((m) => m.id === movie.id) ? styles.active : ""
            }`}
          >
            ❤
          </button>
        </div>
      </div>

      <h2>Cast</h2>
      <ul className={styles.castList}>
        {cast.map((actor) => (
          <li key={actor.id}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                  : "https://via.placeholder.com/100?text=No+Image"
              }
              alt={actor.name}
            />
            <span>{actor.name}</span>
            <small>as {actor.character}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieDetail;
