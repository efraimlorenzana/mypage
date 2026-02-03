import React from 'react';
import CrudManager from '../components/CrudManager';
import { portfolioService } from '../../services/api';

const fields = [
    { name: 'url', label: 'Resume URL', required: true },
    { name: 'navigationLinkText', label: 'Navigation Link Text' },
];

const ResumesPage = () => {
    return (
        <CrudManager
            title="Resumes"
            fields={fields}
            fetchData={portfolioService.getResumes}
            createItem={portfolioService.createResume}
            updateItem={portfolioService.updateResume}
            deleteItem={portfolioService.deleteResume}
        />
    );
};

export default ResumesPage;
