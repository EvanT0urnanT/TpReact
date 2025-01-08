import React from 'react';
import styles from './MovieCard.module.css';

const MovieCard = ({ movie, isInWishlist, onToggleWishlist, onViewDetails }) => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating / 2);
    const emptyStars = 5 - fullStars;

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <span key={`full-${index}`} className={styles.fullStar}>★</span>
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <span key={`empty-${index}`} className={styles.emptyStar}>★</span>
        ))}
      </>
    );
  };

  return (
    <div className={styles.movieCard}>
      <img
        src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
        alt={movie.title}
        className={styles.movieImage}
      />
      <h3 className={styles.movieTitle}>{movie.title}</h3>
      <div className={styles.movieRating}>
        {renderStars(movie.vote_average)}
      </div>
      <button onClick={onViewDetails} className={styles.detailsButton}>
        View Details
      </button>
      <button
        onClick={onToggleWishlist}
        className={`${styles.wishlistButton} ${isInWishlist ? styles.active : ''}`}
      >
        ❤
      </button>
    </div>
  );
};

export default MovieCard;
