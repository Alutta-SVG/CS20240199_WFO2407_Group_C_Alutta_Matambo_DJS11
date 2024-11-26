import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const ShowDetailsPage = () => {
    const { id } = useParams();
    const [show, setShow] = useState(null);

    useEffect(() => {
        fetch(`https://podcast-api.netlify.app/genre/${id}`)
            .then((response) => response.json())
            .then((data) => setShow(data))
            .catch((error) =>
                console.error('Error fetching show details:', error)
            );
    }, [id]);

    if (!show) return <div>Loading...</div>;

    return (
        <div>
            <h1>{show.title}</h1>
            <p>{show.description}</p>
            <div>
                {show.seasons.map((season) => (
                    <div key={season.id}>
                        <h2>{season.title}</h2>
                        {season.episodes.map((episode) => (
                            <p key={episode.id}>{episode.title}</p>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowDetailsPage;