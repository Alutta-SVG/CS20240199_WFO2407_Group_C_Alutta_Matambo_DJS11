import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Components/sidebar.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        // Retrieve theme preference from localStorage
        return localStorage.getItem('theme') === 'dark';
    });

    // Toggle Sidebar
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Close Sidebar on Outside Click
    const handleOutsideClick = (event) => {
        if (isOpen && !event.target.closest('.sidebar') && !event.target.closest('.hamburger')) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isOpen]);

    // Toggle Theme
    const toggleTheme = () => {
        const newTheme = isDarkTheme ? 'light' : 'dark';
        setIsDarkTheme(!isDarkTheme);
        document.body.className = newTheme === 'dark' ? 'dark-theme' : 'light-theme';
        localStorage.setItem('theme', newTheme); // Save to localStorage
    };

    // Apply theme on initial load
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.className = savedTheme === 'dark' ? 'dark-theme' : 'light-theme';
    }, []);

    return (
        <div>
            {/* Hamburger Button */}
            <button className="hamburger" onClick={toggleSidebar}>
                ☰
            </button>

            {/* Sidebar */}
            <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
                <ul className="sidebar-list">
                    <li>
                        <Link to="/" onClick={toggleSidebar}>Home</Link>
                    </li>
                    <li>
                        <Link to="/about" onClick={toggleSidebar}>About</Link>
                    </li>
                    <li>
                        <Link to="/contact" onClick={toggleSidebar}>Contact</Link>
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