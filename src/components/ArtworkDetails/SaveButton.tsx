//A button component to save/remove the artwork to favorites.

import React, { useState, useEffect } from 'react';

interface Artwork {
    objectID: number;
    primaryImage: string;
    title: string;
    artistDisplayName: string;
    objectDate: string;
    medium: string;
    dimensions: string;
    creditLine: string;
    objectURL: string;
}

interface SaveButtonProps {
    artwork: Artwork;
}

const MAX_FAVORITES = 100; // Maximum number of favorites allowed
const SaveButton: React.FC<SaveButtonProps> = ({ artwork }) => {
    const [isSaved, setIsSaved] = useState(false);

    // Check if artwork is already saved in localStorage, if so, set isSaved to true initially
    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const isAlreadySaved = favorites.some((fav: Artwork) => fav.objectID === artwork.objectID);
        setIsSaved(isAlreadySaved);
    }, [artwork]);

    // Toggle favorite status when the button is clicked
    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

        // Check if artwork is already saved, and get its index
        const existingIndex = favorites.findIndex((fav: Artwork) => fav.objectID === artwork.objectID);

        if (existingIndex !== -1) {
            // Remove from favorites if already saved
            favorites.splice(existingIndex, 1); // Remove element starting from existingIndex, 1 element
            setIsSaved(false);
        } else {
            // Check if adding this artwork will exceed the maximum limit
            if (favorites.length >= MAX_FAVORITES) {
                alert(`Cannot add more than ${MAX_FAVORITES} favorites.`);
                return;
            }

            // Add to favorites if within limit
            favorites.push(artwork);
            setIsSaved(true);
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
    };

    return (
        <button className={`btn ${isSaved ? 'btn-danger' : 'btn-primary'}`} onClick={toggleFavorite}>
            {isSaved ? 'Remove from Favorites' : 'Save to Favorites'}
        </button>
    );
};

export default SaveButton;
