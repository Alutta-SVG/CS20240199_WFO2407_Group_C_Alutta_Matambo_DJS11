import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
    const [shows, setShows] = useState ([]);

    useEffect (() => {
        fetch('https://podcast-api.netlify.app')
        .then(response => response.json())
        .then((data) => {
            const sortedShows = data.sort((a, b) =>
            a.title.localeCompare(b.title)
        );
        setShows(sortedShows);
        })
        .catch((error) => console.error('Error fetching shows:', error))
        }, []);

        return (
            <div className="home">
            <header className = "header">
                <h1>Podcast App</h1>
                <input type = "text" placeholder = "Search...." className = " search-bar"></input>
            </header>
            <div className = "shows-grid">
                {shows.map((show) => (
                    <div key = {show.id} className = "show-card">
                        <img src ={show.image} alt={show.title} className="show-image"/>
                        <h3>{show.title}</h3>
                        <p>{show.description}</p>
            </div>
                ))}
            </div>
            </div>
        );

    }

    export default Home;

    