import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
    const [shows, setShows] = useState ([]);

    useEffect (() => {
        fetch('https://podcast-api.netlify.app')
    })
}