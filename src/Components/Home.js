import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Components/Home.css';

const Home = () => {
    const [shows, setShows] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredShows, setFilteredShows] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://podcast-api.netlify.app')
            .then((response) => response.json())
            .then((data) => {
                setShows(data);
                setFilteredShows(data);
                setIsLoading(false); // Data is fetched, so stop loading
            })
            .catch((error) => {
                console.error('Error fetching shows:', error);
                setIsLoading(false); // Stop loading in case of error
            });
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

    const handleSort = (option) => {
        setSortOption(option);

        let sortedShows = [...filteredShows];
        if (option === 'A-Z') {
            sortedShows.sort((a, b) => a.title.localeCompare(b.title));
        } else if (option === 'Z-A') {
            sortedShows.sort((a, b) => b.title.localeCompare(a.title));
        } else if (option === 'Recently Updated') {
            sortedShows.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        }

        setFilteredShows(sortedShows);
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
                <select
                    className="sort-dropdown"
                    value={sortOption}
                    onChange={(e) => handleSort(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="A-Z">A to Z</option>
                    <option value="Z-A">Z to A</option>
                    <option value="Recently Updated">Recently Updated</option>
                </select>
            </header>

            {isLoading ? (
                <div className="loading">Loading...</div> // Loading state UI
            ) : (
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
            )}
        </div>
    );
};

export default Home;