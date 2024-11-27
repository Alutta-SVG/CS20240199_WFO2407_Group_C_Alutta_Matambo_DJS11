import React, { useState, useEffect } from 'react';

const ShowDetailsPage = () => {
    const { id } = useParams();
    const [show, setShow] = useState(null);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);

        fetch(`https://podcast-api.netlify.app/id/${id}`)
            .then((response) => response.json())
            .then((data) => setShow(data))
            .catch((error) => console.error('Error fetching show details:', error));
    }, [id]);

    const addToFavorites = (item) => {
        const updatedFavorites = [...favorites, item];
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        alert(`${item.title} added to Favorites!`);
    };

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
                            <div key={episode.id}>
                                <p>{episode.title}</p>
                                <button onClick={() => addToFavorites(episode)}>Add to Favorites</button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowDetailsPage;