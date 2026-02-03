import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CrudManager.css';

const quillModules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link'],
        ['clean']
    ],
};

const CrudManager = ({ 
    title, 
    fields, 
    fetchData, 
    createItem, 
    updateItem, 
    deleteItem,
    backPath = '/admin/dashboard',
    singleEntry = false
}) => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({});
    const [showForm, setShowForm] = useState(false);
    const fileInputRefs = useRef({});

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (singleEntry && !loading && items.length > 0) {
            handleEdit(items[0]);
        } else if (singleEntry && !loading && items.length === 0) {
            handleAdd();
        }
    }, [singleEntry, loading, items.length]);

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
            if (field.type === 'array') {
                initial[field.name] = field.defaultValue || [];
            } else {
                initial[field.name] = field.defaultValue || '';
            }
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
            if (field.type === 'array') {
                data[field.name] = item[field.name] || [];
            } else {
                data[field.name] = item[field.name] || '';
            }
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
            if (!singleEntry) {
                setShowForm(false);
                setEditingItem(null);
                setFormData(initializeForm());
            } else {
                loadData();
            }
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

    const handleRichTextChange = useCallback((name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const handleImageUpload = (fieldName) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFormData(prev => ({
                        ...prev,
                        [fieldName]: reader.result
                    }));
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };

    const handleArrayAdd = (fieldName) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: [...(prev[fieldName] || []), '']
        }));
    };

    const handleArrayChange = (fieldName, index, value) => {
        setFormData(prev => {
            const newArray = [...(prev[fieldName] || [])];
            newArray[index] = value;
            return { ...prev, [fieldName]: newArray };
        });
    };

    const handleArrayRemove = (fieldName, index) => {
        setFormData(prev => {
            const newArray = [...(prev[fieldName] || [])];
            newArray.splice(index, 1);
            return { ...prev, [fieldName]: newArray };
        });
    };

    const handleCancel = () => {
        if (!singleEntry) {
            setShowForm(false);
            setEditingItem(null);
            setFormData(initializeForm());
        } else {
            navigate(backPath);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const renderField = (field) => {
        switch (field.type) {
            case 'richtext':
                return (
                    <div className="richtext-wrapper">
                        <ReactQuill
                            theme="snow"
                            value={formData[field.name] || ''}
                            onChange={(value) => handleRichTextChange(field.name, value)}
                            modules={quillModules}
                        />
                    </div>
                );
            case 'image':
                return (
                    <div className="image-upload-wrapper">
                        {formData[field.name] && (
                            <div className="image-preview">
                                <img src={formData[field.name]} alt="Preview" />
                            </div>
                        )}
                        <button 
                            type="button" 
                            onClick={() => handleImageUpload(field.name)}
                            className="upload-button"
                        >
                            {formData[field.name] ? 'Change Image' : 'Upload Image'}
                        </button>
                        {formData[field.name] && (
                            <button 
                                type="button" 
                                onClick={() => setFormData(prev => ({ ...prev, [field.name]: '' }))}
                                className="remove-image-button"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                );
            case 'textarea':
                return (
                    <textarea
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        rows={4}
                    />
                );
            case 'array':
                return (
                    <div className="array-field-wrapper">
                        {(formData[field.name] || []).map((item, index) => (
                            <div key={index} className="array-item">
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => handleArrayChange(field.name, index, e.target.value)}
                                    placeholder={field.itemLabel || `Item ${index + 1}`}
                                />
                                <button 
                                    type="button" 
                                    onClick={() => handleArrayRemove(field.name, index)}
                                    className="array-remove-button"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button 
                            type="button" 
                            onClick={() => handleArrayAdd(field.name)}
                            className="array-add-button"
                        >
                            + Add {field.itemLabel || 'Item'}
                        </button>
                    </div>
                );
            default:
                return (
                    <input
                        type={field.type || 'text'}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        step={field.type === 'number' ? '0.01' : undefined}
                    />
                );
        }
    };

    const renderFieldValue = (field, item) => {
        if (field.type === 'image' && item[field.name]) {
            return <img src={item[field.name]} alt={field.label} className="field-image-preview" />;
        }
        if (field.type === 'richtext') {
            const text = item[field.name]?.replace(/<[^>]*>/g, '') || '';
            return text.substring(0, 100) + (text.length > 100 ? '...' : '');
        }
        if (field.type === 'array') {
            return (item[field.name] || []).join(', ') || '-';
        }
        if (field.type === 'textarea') {
            return (item[field.name]?.substring(0, 100) + (item[field.name]?.length > 100 ? '...' : '')) || '-';
        }
        return item[field.name] || '-';
    };

    if (singleEntry && showForm) {
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
                    
                    <form onSubmit={handleSubmit} className="crud-form single-entry-form">
                        {fields.map(field => (
                            <div key={field.name} className="form-group">
                                <label htmlFor={field.name}>{field.label}</label>
                                {renderField(field)}
                            </div>
                        ))}

                        <div className="form-buttons">
                            <button type="button" onClick={handleCancel} className="cancel-button">
                                Cancel
                            </button>
                            <button type="submit" className="save-button">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        );
    }

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
                                    {renderField(field)}
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
                                                {renderFieldValue(field, item)}
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
