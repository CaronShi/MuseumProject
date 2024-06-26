// A component for displaying a single favorite artwork.

import React from 'react';

interface FavoriteItemProps {
    artwork: { primaryImage: string; title: string };
    onDelete: () => void; // Callback function to handle delete and click events
    onClick: () => void;
}

const FavoriteItem: React.FC<FavoriteItemProps> = ({ artwork, onDelete, onClick }) => {

    // Call onDelete callback to delete the artwork from favorites
    const handleDelete = () => {
        onDelete();
    };

    // Call onClick callback to navigate to the artwork details page
    const handleClick = () => {
        onClick();
    }

    return (
        <div className="col-md-4 mb-4">
            <div className="card">
                <img src={artwork.primaryImage} className="card-img-top" alt={artwork.title} onClick={handleClick} />
                <div className="card-body">
                    <h5 className="card-title" onClick={handleClick}>{artwork.title}</h5>
                    <button className="btn btn-danger" onClick={handleDelete}>
                        Remove from Favorites
                    </button>
                </div>

            </div>
        </div>
    );
};

export default FavoriteItem;
