import React, { useEffect, useState } from 'react';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('/Favourites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  return (
    <div>
      <h1>Your Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites yet</p>
      ) : (
        <ul>
          {favorites.map((show) => (
            <li key={show.id || `${show.name}-${show.audioUrl}`}>
              <h3>{show.name || 'No name available'}</h3>
              <p>{show.description || 'No description available'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;