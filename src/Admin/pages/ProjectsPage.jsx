import React from 'react';
import CrudManager from '../components/CrudManager';
import { portfolioService } from '../../services/api';

const fields = [
    { name: 'title', label: 'Title', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'link', label: 'Project Link' },
    { name: 'imageUrl', label: 'Image URL' },
];

const ProjectsPage = () => {
    return (
        <CrudManager
            title="Projects"
            fields={fields}
            fetchData={portfolioService.getProjects}
            createItem={portfolioService.createProject}
            updateItem={portfolioService.updateProject}
            deleteItem={portfolioService.deleteProject}
        />
    );
};

export default ProjectsPage;
