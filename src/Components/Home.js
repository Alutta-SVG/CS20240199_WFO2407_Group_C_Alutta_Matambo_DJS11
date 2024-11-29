import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Components/Home.css';


const Home = () => {
    const [shows, setShows] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredShows, setFilteredShows] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://podcast-api.netlify.app')
            .then((response) => response.json())
            .then((data) => {
                setShows(data);
                setFilteredShows(data);
            })
            .catch((error) => console.error('Error fetching shows:', error));
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim()) {
            const matchingShows = shows.filter(show =>
                show.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredShows(matchingShows);
        } else {
            setFilteredShows(shows);
        }
    };

    return (
        <div className="home">
            <header className="header">
                <h1>Podcast App</h1>
                <input
                    type="text"
                    placeholder="Search for a podcast..."
                    className="search-bar"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </header>
            <div className="shows-grid">
                {filteredShows.map((show) => (
                    <div key={show.id} className="show-card">
                        <img
                            src={show.image}
                            alt={show.title}
                            className="show-image"
                        />
                        <div className="show-info">
                            <h3>{show.title}</h3>
                            <div className="badges">
                                <span className="badge">
                                    Seasons: {Array.isArray(show.seasons) ? show.seasons.length : 0}
                                </span>
                                <span className="badge">
                                    Episodes: {Array.isArray(show.seasons)
                                        ? show.seasons.reduce((acc, season) => acc + (Array.isArray(season.episodes) ? season.episodes.length : 0), 0)
                                        : 0}
                                </span>
                            </div>
                        </div>
                        <button
                            className="details-button"
                            onClick={() => navigate(`/show/${show.id}`)}
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;