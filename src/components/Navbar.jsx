import React from 'react';
import { NavLink } from 'react-router';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Movies
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/wishlist"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Wishlist
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
