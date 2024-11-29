import React, { useEffect, useState } from 'react';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    const removeFromFavorites = (showId) => {
        const updatedFavorites = favorites.filter(show => show.id !== showId);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
    };

    return (
        <div className="favorites">
            <h1>My Favorites</h1>
            <div className="shows-grid">
                {favorites.map((show) => (
                    <div key={show.id} className="show-card">
                        <img
                            src={show.image}
                            alt={show.title}
                            className="show-image"
                        />
                        <div className="show-info">
                            <h3>{show.title}</h3>
                            <button
                                className="remove-button"
                                onClick={() => removeFromFavorites(show.id)}
                            >
                                Remove from Favorites
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;