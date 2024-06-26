//The main component that displays the list of favorite artworks.

import React, { useState, useEffect } from 'react';
import FavoriteItem from './FavoriteItem';
import { useNavigate } from 'react-router-dom';

const FavoritesList: React.FC = () => {
    const localStorageKey = 'favorites';
    const initialFavorites = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
    const [favorites, setFavorites] = useState(initialFavorites);
    const [loading, setLoading] = useState(true); // Loading indicator
    const navigate = useNavigate();

    // Update localStorage whenever favorites change 
    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(favorites));
        // Set loading to false after updating favorites
        setLoading(false);
    }, [favorites]);

    // Filter out the artwork with the given objectID from favorites and update the state
    const removeFromFavorites = (objectID: number) => {
        // Remove the artwork with the given objectID from favorites
        const updatedFavorites = favorites.filter((artwork: { objectID: number }) => artwork.objectID !== objectID);
        setFavorites(updatedFavorites);

        // Alert if no favorites after deletion
        if (updatedFavorites.length === 0) {
            alert('No favorites available.');
        }
    };

    // Display loading indicator
    if (loading) {
        return <div className="container mt-4">Loading...</div>;
    }

    // Display a message if there are no favorites
    if (favorites.length === 0) {
        return <div className="alert alert-danger">No favorites available.</div>;
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <h1>Favorites</h1>
                <small>only 100 artworks allowed</small>
                {favorites.map((artwork: { objectID: number, primaryImage: string, title: string }) => (
                    <FavoriteItem
                        key={artwork.objectID}
                        artwork={artwork}
                        onDelete={() => removeFromFavorites(artwork.objectID)}
                        onClick={() => { navigate(`../artwork/${artwork.objectID}`) }}
                    />
                ))}
            </div>
        </div>
    );
};

export default FavoritesList;
