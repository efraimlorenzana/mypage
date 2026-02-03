import React from 'react';
import CrudManager from '../components/CrudManager';
import { portfolioService } from '../../services/api';

const fields = [
    { name: 'technology', label: 'Technology', required: true },
    { name: 'knowledgeLevel', label: 'Knowledge Level (0-1)', type: 'number', required: true },
];

const SkillsPage = () => {
    return (
        <CrudManager
            title="Skills"
            fields={fields}
            fetchData={portfolioService.getSkills}
            createItem={portfolioService.createSkill}
            updateItem={portfolioService.updateSkill}
            deleteItem={portfolioService.deleteSkill}
        />
    );
};

export default SkillsPage;
