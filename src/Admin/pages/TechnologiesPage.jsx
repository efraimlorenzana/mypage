import React from 'react';
import CrudManager from '../components/CrudManager';
import { portfolioService } from '../../services/api';

const fields = [
    { name: 'languageName', label: 'Language Name', required: true },
    { name: 'svgIconId', label: 'SVG Icon ID', type: 'number' },
    { name: 'iconUrl', label: 'Icon URL' },
];

const TechnologiesPage = () => {
    return (
        <CrudManager
            title="Technologies"
            fields={fields}
            fetchData={portfolioService.getTechnologies}
            createItem={portfolioService.createTechnology}
            updateItem={portfolioService.updateTechnology}
            deleteItem={portfolioService.deleteTechnology}
        />
    );
};

export default TechnologiesPage;
