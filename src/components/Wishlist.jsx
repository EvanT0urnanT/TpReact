import React, { useContext } from 'react';
import { WishlistContext } from '../context/WishlistProvider';
import MovieCard from './MovieCard';
import styles from './Wishlist.module.css';
import { useNavigate } from 'react-router';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className={styles.emptyMessage}>Your wishlist is empty!</p>
      ) : (
        <div className={styles.grid}>
          {wishlist.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isInWishlist={true}
              onToggleWishlist={() => removeFromWishlist(movie.id)}
              onViewDetails={() => handleNavigate(movie.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
