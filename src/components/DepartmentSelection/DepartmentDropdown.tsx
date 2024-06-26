// A component for the dropdown list of departments. A child component that only deals with rendering the dropdown and handling user input. 

import React, { useState } from 'react';

interface DepartmentDropdownProps {
    departments: { departmentId: number; displayName: string }[];
    onChange: (departmentId: number, displayName: string) => void;
}

const DepartmentDropdown: React.FC<DepartmentDropdownProps> = ({ departments, onChange }) => {
    const [selectedDepartment, setSelectedDepartment] = useState<string>('');

    // Handle the change event for the department dropdown
    const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // Update the selected department in the state
        setSelectedDepartment(e.target.value);
        const selectedDepartmentId = parseInt(e.target.value, 10); // Convert the selected value to a number

        // Find the department object based on the selected ID
        const selectedDepartment = departments.find(dept => dept.departmentId === selectedDepartmentId);

        if (selectedDepartment) {
            onChange(selectedDepartment.departmentId, selectedDepartment.displayName);
            // The logic for handling the selection is moved to the parent component.
        }
    }

    return (
        <select className="form-select" value={selectedDepartment} onChange={handleDepartmentChange}>
            {/* After initial selection, the "Select a department" will be disabled */}
            <option disabled={selectedDepartment !== ''} >Select a department</option>

            {departments.map(department => (
                <option key={department.departmentId} value={department.departmentId}>
                    {department.displayName}
                </option>
            ))}
        </select>
    );
};

export default DepartmentDropdown;
