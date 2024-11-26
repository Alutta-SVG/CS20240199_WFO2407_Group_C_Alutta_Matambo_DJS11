import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

const sidebar = () => {
    return (
        <nav className="sidebar">
            <ul className="sidebar-list">
                <li>
                    <Link to="/Home">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/contact"></Link>
                </li>
            </ul>
        </nav>
    );
};

export default sidebar;