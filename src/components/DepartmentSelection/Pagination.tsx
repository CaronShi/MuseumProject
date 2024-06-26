//A component for handling pagination controls.
// The Pagination component displays a set of pagination controls, including "Previous" and "Next" buttons, and a form input to jump to a specific page.

import React, { useState } from 'react';

interface PaginationProps {
    pageCount: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}
const Pagination: React.FC<PaginationProps> = ({ pageCount, currentPage, onPageChange }) => {
    const [targetPage, setTargetPage] = useState<number>(currentPage);

    // Handle click event for pagination buttons
    const handleClick = (page: number) => {
        if (page >= 1 && page <= pageCount) {
            onPageChange(page); // Call the onPageChange callback with the new page number
        }
    };

    // Handle change event for jump input
    const handleJumpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        setTargetPage(value);
    };

    // Handle submit event for jump form
    const handleJumpSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission
        handleClick(targetPage);
    };


    return (
        <nav>
            <ul className="pagination justify-content-center">
                {/* If currentPage is 1, disable Previous button; Otherwise, click previous, currentPage will minus 1  */}
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handleClick(currentPage - 1)}>
                        Previous
                    </button>
                </li>

                <li className="page-item active">
                    <span className="page-link">{currentPage} of {pageCount}</span></li>

                {/* If currentPage is max, disable Next button; Otherwise, click next, currentPage will add 1  */}
                <li className={`page-item ${currentPage === pageCount ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handleClick(currentPage + 1)}>
                        Next
                    </button>
                </li>

            </ul>

            {/* User could input a number, and choose to jump to a specific page in range from 1 to pageCount */}
            <form className="d-flex justify-content-center" onSubmit={handleJumpSubmit}>
                <input
                    type="number"
                    className="form-control"
                    style={{ width: '80px', marginRight: '10px' }}
                    value={targetPage}
                    onChange={handleJumpChange}
                    min="1"
                    max={pageCount}
                />
                <button type="submit" className="btn btn-outline-info">
                    Jump
                </button>
            </form>
        </nav>
    );
};

export default Pagination;
