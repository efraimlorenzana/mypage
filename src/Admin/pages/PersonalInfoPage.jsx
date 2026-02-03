import React from 'react';
import CrudManager from '../components/CrudManager';
import { portfolioService } from '../../services/api';

const fields = [
    { name: 'firstName', label: 'First Name', required: true },
    { name: 'lastName', label: 'Last Name', required: true },
    { name: 'middleName', label: 'Middle Name' },
    { name: 'nickName', label: 'Nickname' },
    { name: 'currentRole', label: 'Current Role' },
    { name: 'aboutMe', label: 'About Me', type: 'textarea' },
    { name: 'profilePicture', label: 'Profile Picture URL' },
];

const PersonalInfoPage = () => {
    return (
        <CrudManager
            title="Personal Info"
            fields={fields}
            fetchData={portfolioService.getPersonalInfo}
            createItem={portfolioService.createPersonalInfo}
            updateItem={portfolioService.updatePersonalInfo}
            deleteItem={portfolioService.deletePersonalInfo}
        />
    );
};

export default PersonalInfoPage;
