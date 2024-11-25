import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const ShowDetailsPage = () => {
    const { id } = useParams();
    const [show, setShow] = useState({});

    useEffect(() => {
        fetch(`https://podcast-api.netlify.app/genre/${id}`)
        .then((response) => response.json())
        .then((data) => setShow (data))
        .catch((error) => console.error('Error fetching show details:', error))
        }, [id]);

        
    })