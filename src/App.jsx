import React from "react";
import { Routes, Route } from "react-router";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import Wishlist from "./components/Wishlist";
import { WishlistProvider } from "./context/WishlistProvider";
import Navbar from "./components/NavBar";

const App = () => {
  return (
    <WishlistProvider>
      <Navbar />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
    </WishlistProvider>
  );
};

export default App;
