// DepartmentSelection: The main component that handles department selection and pagination.

import React, { useState, useEffect } from 'react';
import DepartmentDropdown from './DepartmentDropdown';
import ArtworkList from './ArtworkList';
import Pagination from './Pagination';
import { Container } from 'react-bootstrap'; // Import Bootstrap components

interface Department {
    departmentId: number;
    displayName: string;
}

interface Artwork {
    objectID: number;
    primaryImageSmall: string;
    title: string;
    department: string;
}

const DepartmentSelection: React.FC = () => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState<number | null>(null);
    const [departmentName, setDepartmentName] = useState<string>('');
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [allObjectIDs, setAllObjectIDs] = useState<number[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const objectsPerPage = 10; // Number of objects to display per page
    const placeholderImage = "https://via.placeholder.com/150?text=No+Image+Found"; // URL for the placeholder image

    const fetchDepartments = () => {
        fetch('https://collectionapi.metmuseum.org/public/collection/v1/departments')
            .then(response => response.json())
            .then(data => setDepartments(data.departments))
            .catch(error => console.error('Error fetching departments:', error));
    };
    // Fetch departments initially
    useEffect(() => {
        fetchDepartments();
    }, []);

    // Fetch object IDs for the selected department
    useEffect(() => {
        if (selectedDepartment === 0) {
            console.log('Selected department is 0. Resetting the state.');
        }
        if (selectedDepartment) {
            setLoading(true);
            fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${selectedDepartment}&isOnView=true&hasImages=true`)
                .then(response => response.json())
                .then(data => {
                    if (data && data.objectIDs.length > 0) {
                        const sortedObjectIDs = data.objectIDs.sort((a: number, b: number) => a - b);
                        setAllObjectIDs(sortedObjectIDs); // Store all object IDs in the state
                    } else {
                        console.error('Error fetching object IDs: No valid data for departmentId', selectedDepartment);
                    }
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching object IDs:', error);
                    setLoading(false);
                });
        }

    }, [selectedDepartment]);

    // Fetch all object details for the selected department
    const fecthObjectDetails = (allObjectIDs: number[]) => {
        if (allObjectIDs.length > 0) {
            // Determine the Current Page's Object IDs:
            const indexOfLastRecord = page * objectsPerPage;
            const indexOfFirstRecord = indexOfLastRecord - objectsPerPage;
            // Slice the array of all object IDs to get the current page's object IDs (10)
            const currentObjectIDs = allObjectIDs.slice(indexOfFirstRecord, indexOfLastRecord);

            // Fetch details for each object ID
            // Promise.all is used to fetch details for each object ID concurrently. Each fetch returns a promise, and Promise.all aggregates these promises.
            Promise.all(currentObjectIDs.map((id: number) =>
                fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
                    .then(res => res.json())))
                .then(results => {
                    const transformedArtworks = results.map((artwork: any) => ({
                        objectID: artwork.objectID,
                        primaryImageSmall: artwork.primaryImageSmall || placeholderImage,
                        title: artwork.title,
                        department: artwork.department
                    }));
                    setArtworks(transformedArtworks);
                    setLoading(false);
                }).catch(error => {
                    //If any promise in the array rejects, the .catch() block will execute with the first encountered error.
                    console.error('Error fetching object details:', error);
                })
        }
    };

    // Fetch object details when the selected department changes or the page changes
    useEffect(() => {
        fecthObjectDetails(allObjectIDs);
    }, [allObjectIDs, page]);

    // Handle department change if a new department is selected in dropdown list
    const handleDepartmentChange = (departmentId: number) => {
        setSelectedDepartment(departmentId);
        const selectedDepartment = departments.find(dept => dept.departmentId === departmentId);
        if (selectedDepartment) {
            setDepartmentName(selectedDepartment.displayName);
        }
        setPage(1);
    };

    // Handle page change when the user clicks on a pagination button
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <Container>
            <p>Select a Departments</p>
            <DepartmentDropdown departments={departments} onChange={handleDepartmentChange} />
            {selectedDepartment && (
                <>
                    <h1>Artworks in {departmentName} Department</h1>

                    {loading ? (
                        <div>Loading artworks...</div>
                    ) : (
                        <>
                            <ArtworkList artworks={artworks} />
                            <Pagination pageCount={Math.ceil(allObjectIDs.length / objectsPerPage)} currentPage={page} onPageChange={handlePageChange} />
                        </>
                    )}
                </>
            )}
        </Container>
    );
};

export default DepartmentSelection;
