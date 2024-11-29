import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Components/sidebar.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });
    const [genres, setGenres] = useState([]);

    // Toggle Sidebar
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Fetch genres from API
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(
                    'https://podcast-api.netlify.app/genre/'
                );
                const data = await response.json();
                setGenres(data.genres); // Update genres state
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchGenres();
    }, []);

    // Toggle Theme
    const toggleTheme = () => {
        const newTheme = isDarkTheme ? 'light' : 'dark';
        setIsDarkTheme(!isDarkTheme);
        document.body.className = newTheme === 'dark' ? 'dark-theme' : 'light-theme';
        localStorage.setItem('theme', newTheme);
    };

    return (
        <div>
            <button className="hamburger" onClick={toggleSidebar}>☰</button>
            <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
                <ul className="sidebar-list">
                    <li>
                        <Link to="/" onClick={toggleSidebar}>Home</Link>
                    </li>
                    <li>
                        <Link to="/favourites" onClick={toggleSidebar}>Favourites</Link>
                    </li>
                    {/* Genre Tab */}
                    <li>
                        <span>Genres</span>
                        <ul className="genre-list">
                            {genres.map((genre) => (
                                <li key={genre.id} className="genre-item">
                                    {genre.name}
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
                <button className="theme-toggle" onClick={toggleTheme}>
                    {isDarkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;