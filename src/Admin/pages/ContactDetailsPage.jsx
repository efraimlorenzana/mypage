import React from 'react';
import CrudManager from '../components/CrudManager';
import { portfolioService } from '../../services/api';

const fields = [
    { name: 'email', label: 'Email' },
    { name: 'phone', label: 'Phone' },
    { name: 'address', label: 'Address' },
    { name: 'city', label: 'City' },
    { name: 'country', label: 'Country' },
];

const ContactDetailsPage = () => {
    return (
        <CrudManager
            title="Contact Details"
            fields={fields}
            fetchData={portfolioService.getContactDetails}
            createItem={portfolioService.createContactDetails}
            updateItem={portfolioService.updateContactDetails}
            deleteItem={portfolioService.deleteContactDetails}
        />
    );
};

export default ContactDetailsPage;
