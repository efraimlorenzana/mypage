import React from 'react';
import CrudManager from '../components/CrudManager';
import { portfolioService } from '../../services/api';

const fields = [
    { name: 'organization', label: 'Organization', required: true },
    { name: 'link', label: 'Link', required: true },
    { name: 'svgIconId', label: 'SVG Icon ID', type: 'number' },
];

const SocialAccountsPage = () => {
    return (
        <CrudManager
            title="Social Accounts"
            fields={fields}
            fetchData={portfolioService.getSocialAccounts}
            createItem={portfolioService.createSocialAccount}
            updateItem={portfolioService.updateSocialAccount}
            deleteItem={portfolioService.deleteSocialAccount}
        />
    );
};

export default SocialAccountsPage;
