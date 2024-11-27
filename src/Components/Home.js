import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [shows, setShows] = useState([]);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredShows, setFilteredShows] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        fetch('https://podcast-api.netlify.app')
            .then((response) => response.json())
            .then((data) => {
                const sortedShows = data.sort((a, b) =>
                    a.title.localeCompare(b.title)
                );
                setShows(sortedShows);
                setFilteredShows(sortedShows);
            })
            .catch((error) => console.error('Error fetching shows:', error));
    }, []);

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim()) {
            const matchingShows = shows.filter(show =>
                show.title.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(matchingShows.slice(0, 5)); // Limit to 5 suggestions
        } else {
            setSuggestions([]);
        }
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            const matchingShows = shows.filter(show =>
                show.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredShows(matchingShows);
            setSuggestions([]); // Clear suggestions on search
        }
    };


    return (
        <div className="home">
            <header className="header">
                <h1>Podcast App</h1>
                <div className = "search-container"
                <input
                    type="text"
                    placeholder="Search for a podcast..."
                    className="search-bar"
                    value={searchQuery}
                        onChange={handleInputChange}
                        onKeyDown={handleSearch}
                />
                  {suggestions.length > 0 && (
                        <ul className="suggestions-list">
                            {suggestions.map(suggestion => (
                                <li key={suggestion.id}>
                                    {suggestion.title}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </header>
            <div className="shows-grid">
                {shows.map((show) => (
                    <div key={show.id} className="show-card">
                        <img
                            src={show.image}
                            alt={show.title}
                            className="show-image"
                        />
                        <h3>{show.title}</h3>
                        <p>{show.description}</p>
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