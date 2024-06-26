// Component to display a list of artworks in a boostrap grid layout

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './ArtworkList.css';

interface Artwork {
    objectID: number;
    primaryImageSmall: string;
    department: string;
    title: string;

}

interface ArtworkListProps {
    artworks: Artwork[]; // Array of objects, each object representing an artwork.
}

const ArtworkList: React.FC<ArtworkListProps> = ({ artworks }) => {
    return (
        <Container>
            <Row>
                {artworks.map(artwork => (
                    <Col key={artwork.objectID} xs={6} md={4} lg={2} className="mb-4">

                        <Card>
                            <Link to={`/artwork/${artwork.objectID}`}>
                                <Card.Img
                                    variant="top"
                                    src={artwork.primaryImageSmall}
                                    alt={artwork.title}
                                    className="img-fluid"
                                />
                                <Card.Body>
                                    <Card.Title>{artwork.title}</Card.Title>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ArtworkList;

