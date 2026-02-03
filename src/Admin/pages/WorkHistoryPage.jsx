import React from 'react';
import CrudManager from '../components/CrudManager';
import { portfolioService } from '../../services/api';

const fields = [
    { name: 'company', label: 'Company', required: true },
    { name: 'role', label: 'Role', required: true },
    { name: 'durationFrom', label: 'Duration From' },
    { name: 'durationTo', label: 'Duration To' },
    { name: 'industry', label: 'Industry' },
    { name: 'department', label: 'Department' },
    { name: 'jobDescription', label: 'Job Description', type: 'richtext' },
    { name: 'logo', label: 'Company Logo', type: 'image' },
    { name: 'brandColorTag', label: 'Brand Color Tag' },
    { name: 'cardPosition', label: 'Card Position' },
];

const WorkHistoryPage = () => {
    return (
        <CrudManager
            title="Work History"
            fields={fields}
            fetchData={portfolioService.getWorkHistories}
            createItem={portfolioService.createWorkHistory}
            updateItem={portfolioService.updateWorkHistory}
            deleteItem={portfolioService.deleteWorkHistory}
        />
    );
};

export default WorkHistoryPage;
