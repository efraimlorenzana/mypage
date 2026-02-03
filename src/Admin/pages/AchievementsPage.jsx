import React from 'react';
import CrudManager from '../components/CrudManager';
import { portfolioService } from '../../services/api';

const fields = [
    { name: 'title', label: 'Title', required: true },
    { name: 'description', label: 'Description', type: 'richtext' },
    { name: 'dateAchieved', label: 'Date Achieved' },
    { name: 'image', label: 'Achievement Image', type: 'image' },
];

const AchievementsPage = () => {
    return (
        <CrudManager
            title="Achievements"
            fields={fields}
            fetchData={portfolioService.getAchievements}
            createItem={portfolioService.createAchievement}
            updateItem={portfolioService.updateAchievement}
            deleteItem={portfolioService.deleteAchievement}
        />
    );
};

export default AchievementsPage;
