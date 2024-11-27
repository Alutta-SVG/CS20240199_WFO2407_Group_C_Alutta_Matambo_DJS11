import React, { useState, useEffect } from 'react';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    const removeFavorite = (item) => {
        const updatedFavorites = favorites.filter((fav) => fav.id !== item.id);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <div>
            <h1>Favorites</h1>
            {favorites.length === 0 ? (
                <p>No favorites yet!</p>
            ) : (
                favorites.map((favorite) => (
                    <div key={favorite.id}>
                        <h3>{favorite.title}</h3>
                        <button onClick={() => removeFavorite(favorite)}>Remove</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default FavoritesPage;