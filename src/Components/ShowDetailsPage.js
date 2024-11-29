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

    return (
        <div className="show-details">
            <h1>{show.title}</h1>
            <p>Last updated: {formattedDate}</p>

            <div className="seasons">
                <h2>Seasons</h2>
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
                <div className="episodes">
                    <h3>Episodes in {selectedSeason.title}</h3>
                    <ul className="episode-list">
                        {selectedSeason.episodes.map((episode) => (
                            <li key={episode.id}>{episode.title}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ShowDetailsPage;