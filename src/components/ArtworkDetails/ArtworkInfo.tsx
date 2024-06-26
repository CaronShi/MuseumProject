// A component for displaying the artwork's image and additional information.

// src/components/ArtworkDetails.tsx
import React from 'react';
interface ArtworkInfoProps {
    artwork: {
        objectID: number;
        primaryImage: string;
        title: string;
        artistDisplayName: string;
        objectDate: string;
        medium: string;
        dimensions: string;
        creditLine: string;
        objectURL: string;
    };
}

const ArtworkInfo: React.FC<ArtworkInfoProps> = ({ artwork }) => {
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-4">
                    <img src={artwork.primaryImage}
                        className="img-fluid rounded mb-4"
                        style={{ width: '500px', height: '500px', margin: '10px' }}
                        alt={artwork.title} />

                </div>
                <div className="col-md-8">
                    <h2>{artwork.title}</h2>
                    <p><strong>Artist:</strong> {artwork.artistDisplayName}</p>
                    <p><strong>Date:</strong> {artwork.objectDate}</p>
                    <p><strong>Medium:</strong> {artwork.medium}</p>
                    <p><strong>Dimensions:</strong> {artwork.dimensions}</p>
                    <p><strong>Credit Line:</strong> {artwork.creditLine}</p>
                    <a href={artwork.objectURL} target="_blank" rel="noopener noreferrer">View on Met Museum</a>
                </div>
            </div>
        </div>
    );
};

export default ArtworkInfo;
