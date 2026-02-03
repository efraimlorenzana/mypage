import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './CrudManager.css';

const CrudManager = ({ 
    title, 
    fields, 
    fetchData, 
    createItem, 
    updateItem, 
    deleteItem,
    backPath = '/admin/dashboard'
}) => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({});
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const data = await fetchData();
            setItems(data);
        } catch (err) {
            setError('Failed to load data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const initializeForm = () => {
        const initial = {};
        fields.forEach(field => {
            initial[field.name] = field.defaultValue || '';
        });
        return initial;
    };

    const handleAdd = () => {
        setEditingItem(null);
        setFormData(initializeForm());
        setShowForm(true);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        const data = {};
        fields.forEach(field => {
            data[field.name] = item[field.name] || '';
        });
        setFormData(data);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        
        try {
            await deleteItem(id);
            setItems(items.filter(item => item.id !== id));
        } catch (err) {
            setError('Failed to delete item');
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (editingItem) {
                const updated = await updateItem(editingItem.id, formData);
                setItems(items.map(item => item.id === editingItem.id ? updated : item));
            } else {
                const created = await createItem(formData);
                setItems([...items, created]);
            }
            setShowForm(false);
            setEditingItem(null);
            setFormData(initializeForm());
        } catch (err) {
            setError('Failed to save item');
            console.error(err);
        }
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) || 0 : value
        }));
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingItem(null);
        setFormData(initializeForm());
    };

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <div className="crud-container">
            <header className="crud-header">
                <div className="header-left">
                    <button onClick={() => navigate(backPath)} className="back-button">
                        ← Back
                    </button>
                    <h1>{title}</h1>
                </div>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </header>

            <main className="crud-main">
                {error && <div className="error-message">{error}</div>}

                <div className="crud-actions">
                    <button onClick={handleAdd} className="add-button">
                        + Add New
                    </button>
                </div>

                {showForm && (
                    <div className="form-overlay">
                        <form onSubmit={handleSubmit} className="crud-form">
                            <h2>{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
                            
                            {fields.map(field => (
                                <div key={field.name} className="form-group">
                                    <label htmlFor={field.name}>{field.label}</label>
                                    {field.type === 'textarea' ? (
                                        <textarea
                                            id={field.name}
                                            name={field.name}
                                            value={formData[field.name] || ''}
                                            onChange={handleChange}
                                            required={field.required}
                                            rows={4}
                                        />
                                    ) : (
                                        <input
                                            type={field.type || 'text'}
                                            id={field.name}
                                            name={field.name}
                                            value={formData[field.name] || ''}
                                            onChange={handleChange}
                                            required={field.required}
                                            step={field.type === 'number' ? '0.01' : undefined}
                                        />
                                    )}
                                </div>
                            ))}

                            <div className="form-buttons">
                                <button type="button" onClick={handleCancel} className="cancel-button">
                                    Cancel
                                </button>
                                <button type="submit" className="save-button">
                                    {editingItem ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {loading ? (
                    <div className="loading">Loading...</div>
                ) : items.length === 0 ? (
                    <div className="empty-state">
                        <p>No items found. Click "Add New" to create one.</p>
                    </div>
                ) : (
                    <div className="items-list">
                        {items.map(item => (
                            <div key={item.id} className="item-card">
                                <div className="item-content">
                                    {fields.slice(0, 3).map(field => (
                                        <div key={field.name} className="item-field">
                                            <span className="field-label">{field.label}:</span>
                                            <span className="field-value">
                                                {field.type === 'textarea' 
                                                    ? (item[field.name]?.substring(0, 100) + (item[field.name]?.length > 100 ? '...' : ''))
                                                    : item[field.name] || '-'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="item-actions">
                                    <button onClick={() => handleEdit(item)} className="edit-button">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(item.id)} className="delete-button">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default CrudManager;
