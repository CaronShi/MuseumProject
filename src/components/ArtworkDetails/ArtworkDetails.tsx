//The component that displays a img and some details of a selected artwork.

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ArtworkInfo from './ArtworkInfo';
import SaveButton from './SaveButton';

interface ArtworkDetails {
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

const ArtworkDetails: React.FC = () => {
    const { artworkId, artworkName } = useParams<{ artworkId: string; artworkName: string }>();
    const [artwork, setArtwork] = useState<ArtworkDetails | null>(null);
    const placeholderImage = "https://via.placeholder.com/150?text=No+Image+Found";
    const [error, setError] = useState<string | null>(null);

    // Fetch artwork details when the component mounts
    useEffect(() => {
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${artworkId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('ObjectID not found');
                }
                return response.json()
            })
            .then(data => {
                const ArtworkSelectedDetails: ArtworkDetails = {
                    objectID: data.objectID,
                    primaryImage: data.primaryImage || placeholderImage,
                    title: data.title,
                    artistDisplayName: data.artistDisplayName,
                    objectDate: data.objectDate,
                    medium: data.medium,
                    dimensions: data.dimensions,
                    creditLine: data.creditLine,
                    objectURL: data.objectURL
                };
                setArtwork(ArtworkSelectedDetails);
                setError(null);

            })
            .catch(error => {
                console.error('Error fetching artwork details:', error);
                setError('Artwork not found. Please check the Object ID.');
                setArtwork(null);
            });
    }, [artworkName]);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }
    // If the artwork is not loaded yet, display a loading message
    if (!artwork) {
        return <div>Loading...</div>; // Display loading indicator while fetching data
    }

    return (
        <div>
            <div className="row">
                <ArtworkInfo artwork={artwork} />
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100px' }}>
                    <SaveButton artwork={artwork} />
                </div>
            </div>
        </div>
    );
};

export default ArtworkDetails;
