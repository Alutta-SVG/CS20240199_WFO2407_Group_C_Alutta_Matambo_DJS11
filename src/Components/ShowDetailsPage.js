import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import '../Components/ShowDetailsPage.css';

const ShowDetailsPage = () => {
    const { id } = useParams();
    const [show, setShow] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [currentAudio, setCurrentAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isBarVisible, setIsBarVisible] = useState(false); // New state for progress bar visibility
    const audioRef = useRef(null);

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

        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, [id]);

    const formattedDate = show?.updated_at
        ? format(new Date(show.updated_at), 'MMMM dd, yyyy')
        : 'Date not available';

    const updateFavorites = (updatedFavorites) => {
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    const handleAddToFavorites = (episode) => {
        const newFavorites = [...favorites, episode];
        updateFavorites(newFavorites);
    };

    const handleRemoveFromFavorites = (episodeId) => {
        const updatedFavorites = favorites.filter(fav => fav.id !== episodeId);
        updateFavorites(updatedFavorites);
    };

    const isFavorite = (episodeId) => {
        return favorites.some(fav => fav.id === episodeId);
    };

    const handlePlay = (episode) => {
        if (audioRef.current && currentAudio === episode.audioUrl && isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            setCurrentAudio(episode.audioUrl);
            setIsPlaying(true);
            setIsBarVisible(true); // Show progress bar immediately on play
            if (audioRef.current) {
                audioRef.current.load();
                audioRef.current.play();
            }
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setProgress(currentProgress);
        }
    };

    const handleAudioEnd = () => {
        setIsPlaying(false);
        setIsBarVisible(false); // Hide progress bar when audio ends
    };

    return (
        <div className="show-details-container">
            <h1>{show?.title}</h1>
            <p>Last updated: {formattedDate}</p>

            <div className="season-container">
                <h2>Seasons</h2>
                <ul className="season-list">
                    {show?.seasons.map((season) => (
                        <li
                            key={season.id}
                            className={`season-item ${selectedSeason?.id === season.id ? 'active' : ''}`}
                            onClick={() => setSelectedSeason(season)}
                        >
                            {season.title}
                        </li>
                    ))}
                </ul>
            </div>

            {selectedSeason && (
                <div className="episodes">
                    <h3>Episodes in {selectedSeason.title}</h3>
                    <ul className="episode-list">
                        {selectedSeason.episodes.map((episode) => (
                            <li key={episode.id} className="episode">
                                <div className="episode-info">
                                    <span>{episode.title}</span>
                                    <div className="episode-actions">
                                        <button onClick={() => handlePlay(episode)}>
                                            {currentAudio === episode.audioUrl && isPlaying ? 'Pause' : 'Play'}
                                        </button>
                                        {isFavorite(episode.id) ? (
                                            <button onClick={() => handleRemoveFromFavorites(episode.id)}>
                                                Remove from Favorites
                                            </button>
                                        ) : (
                                            <button onClick={() => handleAddToFavorites(episode)}>
                                                Add to Favorites
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {currentAudio && (
                <div className="audio-player">
                    <audio
                        ref={audioRef}
                        src={currentAudio}
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={handleAudioEnd} // Handle audio end
                    ></audio>
                    {isBarVisible && ( // Show progress bar based on visibility state
                        <div className="progress-bar">
                            <div
                                className="progress"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ShowDetailsPage;