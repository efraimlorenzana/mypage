import React from 'react';
import CrudManager from '../components/CrudManager';
import { portfolioService } from '../../services/api';

const fields = [
    { name: 'title', label: 'Title', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'dateAchieved', label: 'Date Achieved' },
    { name: 'imageUrl', label: 'Image URL' },
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
