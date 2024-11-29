import React, { useEffect, useState } from 'react';


const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
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
            <li key={show.id}>
              <h3>{show.name}</h3>
              <p>{show.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;