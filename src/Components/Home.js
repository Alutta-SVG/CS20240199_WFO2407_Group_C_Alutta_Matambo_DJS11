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
        })
    })
}