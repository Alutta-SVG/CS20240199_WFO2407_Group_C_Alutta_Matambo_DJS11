import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns'; 
import '../Components/ShowDetailsPage.css';

const ShowDetailsPage = () => {
    const { id } = useParams();
    const [show, setShow] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(null);

    useEffect(() => {
        fetch(`https://podcast-api.netlify.app/id/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setShow(data);
                if (data.seasons.length > 0) {
                    setSelectedSeason(data.seasons[0]);
                }
            })
            .catch((error) => console.error('Error fetching show details:', error));
    }, [id]);

    if (!show) return <div>Loading...</div>;

    // Validate the `updated_at` field
    const formattedDate = show.updated_at
        ? format(new Date(show.updated_at), 'MMMM dd, yyyy')
        : 'Date not available';

    // Utility function to get favorites from localStorage
    const getFavoritesFromLocalStorage = () => {
        const favorites = localStorage.getItem('favorites');
        return favorites ? JSON.parse(favorites) : [];
    };

    // Add show to favorites
    const handleAddToFavorites = (show) => {
        const favorites = getFavoritesFromLocalStorage();
        if (!favorites.some(fav => fav.id === show.id)) {
            favorites.push(show);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    };

    // Remove show from favorites
    const handleRemoveFromFavorites = (showId) => {
        let favorites = getFavoritesFromLocalStorage();
        favorites = favorites.filter(fav => fav.id !== showId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    };

    // Handle play functionality
    const handlePlay = (show) => {
        // Placeholder for actual play logic
        console.log(`Playing: ${show.title}`);
    };

    // Check if show is already in favorites
    const isFavorite = getFavoritesFromLocalStorage().some(fav => fav.id === show.id);

    return (
        <div className="show-details">
            <h1>{show.title}</h1>
            <p>Last updated: {formattedDate}</p>

            <div className="show-summary">
                <h2>Show Summary</h2>
                <p>{show.description}</p>
            </div>

            <div className="seasons">
                <h2>Seasons</h2>
                <p>Total Seasons: {show.seasons.length}</p>
                <p>Total Episodes: {show.seasons.reduce((total, season) => total + season.episodes.length, 0)}</p>

                <ul className="season-list">
                    {show.seasons.map((season) => (
                        <li
                            key={season.id}
                            className={`season-item ${selectedSeason && selectedSeason.id === season.id ? 'active' : ''}`}
                            onClick={() => setSelectedSeason(season)}
                        >
                            {season.title}
                        </li>
                    ))}
                </ul>
            </div>

            {selectedSeason && (
                <div className="season-details">
                    <h3>Episodes in {selectedSeason.title}</h3>
                    <p>{selectedSeason.description}</p> {/* Season Description */}
                    <ul className="episode-list">
                        {selectedSeason.episodes.map((episode) => (
                            <li key={episode.id}>{episode.title}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="action-buttons">
                <button onClick={() => handlePlay(show)}>Play</button>
                {isFavorite ? (
                    <button onClick={() => handleRemoveFromFavorites(show.id)}>Remove from Favorites</button>
                ) : (
                    <button onClick={() => handleAddToFavorites(show)}>Add to Favorites</button>
                )}
            </div>
        </div>
    );
};

export default ShowDetailsPage;