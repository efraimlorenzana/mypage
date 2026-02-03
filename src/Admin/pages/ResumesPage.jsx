import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { portfolioService } from '../../services/api';
import ReactQuill from 'react-quill';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'react-quill/dist/quill.snow.css';
import './ResumesPage.css';

const quillModules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['clean']
    ],
};

const ResumesPage = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const resumeRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [exporting, setExporting] = useState(false);
    const [error, setError] = useState('');
    const [resume, setResume] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        location: '',
        phone: '',
        email: '',
        website: '',
        summary: '',
        skills: [],
        experience: [],
        education: [],
        certifications: []
    });

    useEffect(() => {
        loadResume();
    }, []);

    const loadResume = async () => {
        try {
            setLoading(true);
            const data = await portfolioService.getResumes();
            if (data && data.length > 0) {
                setResume(data[0]);
                setFormData({
                    fullName: data[0].fullName || '',
                    location: data[0].location || '',
                    phone: data[0].phone || '',
                    email: data[0].email || '',
                    website: data[0].website || '',
                    summary: data[0].summary || '',
                    skills: data[0].skills || [],
                    experience: data[0].experience || [],
                    education: data[0].education || [],
                    certifications: data[0].certifications || []
                });
            }
        } catch (err) {
            setError('Failed to load resume');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRichTextChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleArrayAdd = (fieldName, template) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: [...(prev[fieldName] || []), template]
        }));
    };

    const handleArrayChange = (fieldName, index, key, value) => {
        setFormData(prev => {
            const newArray = [...(prev[fieldName] || [])];
            newArray[index] = { ...newArray[index], [key]: value };
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

    const handleSkillAdd = () => {
        setFormData(prev => ({
            ...prev,
            skills: [...(prev.skills || []), '']
        }));
    };

    const handleSkillChange = (index, value) => {
        setFormData(prev => {
            const newSkills = [...(prev.skills || [])];
            newSkills[index] = value;
            return { ...prev, skills: newSkills };
        });
    };

    const handleSkillRemove = (index) => {
        setFormData(prev => {
            const newSkills = [...(prev.skills || [])];
            newSkills.splice(index, 1);
            return { ...prev, skills: newSkills };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSaving(true);

        try {
            if (resume) {
                await portfolioService.updateResume(resume.id, formData);
            } else {
                const created = await portfolioService.createResume(formData);
                setResume(created);
            }
            await loadResume();
        } catch (err) {
            setError('Failed to save resume');
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleExportPDF = async () => {
        setExporting(true);
        try {
            const element = resumeRef.current;
            if (!element) return;

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 0;

            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save(`${formData.fullName || 'Resume'}.pdf`);
        } catch (err) {
            setError('Failed to export PDF');
            console.error(err);
        } finally {
            setExporting(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    if (loading) {
        return (
            <div className="resume-container">
                <div className="loading">Loading...</div>
            </div>
        );
    }

    return (
        <div className="resume-container">
            <header className="resume-header">
                <div className="header-left">
                    <button onClick={() => navigate('/admin/dashboard')} className="back-button">
                        ← Back
                    </button>
                    <h1>Resume Builder</h1>
                </div>
                <div className="header-actions">
                    <button onClick={handleExportPDF} className="export-button" disabled={exporting}>
                        {exporting ? 'Exporting...' : 'Export to PDF'}
                    </button>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </header>

            <main className="resume-main">
                {error && <div className="error-message">{error}</div>}

                <div className="resume-layout">
                    <div className="resume-form-section">
                        <form onSubmit={handleSubmit}>
                            <div className="form-section">
                                <h3>Personal Information</h3>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="e.g., EFRAIM A. LORENZANA"
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Location</label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            placeholder="e.g., Cavite, Philippines 4108"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="e.g., 09765317020"
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="e.g., email@example.com"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Website</label>
                                        <input
                                            type="text"
                                            name="website"
                                            value={formData.website}
                                            onChange={handleChange}
                                            placeholder="e.g., https://yoursite.com"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h3>Summary</h3>
                                <div className="form-group">
                                    <div className="richtext-wrapper">
                                        <ReactQuill
                                            theme="snow"
                                            value={formData.summary}
                                            onChange={(value) => handleRichTextChange('summary', value)}
                                            modules={quillModules}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h3>Skills</h3>
                                <div className="skills-list">
                                    {(formData.skills || []).map((skill, index) => (
                                        <div key={index} className="skill-item">
                                            <input
                                                type="text"
                                                value={skill}
                                                onChange={(e) => handleSkillChange(index, e.target.value)}
                                                placeholder="e.g., Programming Languages: C#, JavaScript"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleSkillRemove(index)}
                                                className="remove-btn"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={handleSkillAdd} className="add-btn">
                                        + Add Skill Category
                                    </button>
                                </div>
                            </div>

                            <div className="form-section">
                                <h3>Experience</h3>
                                {(formData.experience || []).map((exp, index) => (
                                    <div key={index} className="experience-item">
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Job Title</label>
                                                <input
                                                    type="text"
                                                    value={exp.title || ''}
                                                    onChange={(e) => handleArrayChange('experience', index, 'title', e.target.value)}
                                                    placeholder="e.g., Software Engineer"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Company</label>
                                                <input
                                                    type="text"
                                                    value={exp.company || ''}
                                                    onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
                                                    placeholder="e.g., Accenture Inc."
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Location</label>
                                                <input
                                                    type="text"
                                                    value={exp.location || ''}
                                                    onChange={(e) => handleArrayChange('experience', index, 'location', e.target.value)}
                                                    placeholder="e.g., Mandaluyong City, Philippines"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Period</label>
                                                <input
                                                    type="text"
                                                    value={exp.period || ''}
                                                    onChange={(e) => handleArrayChange('experience', index, 'period', e.target.value)}
                                                    placeholder="e.g., May 2019 - Current"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Description</label>
                                            <div className="richtext-wrapper">
                                                <ReactQuill
                                                    theme="snow"
                                                    value={exp.description || ''}
                                                    onChange={(value) => handleArrayChange('experience', index, 'description', value)}
                                                    modules={quillModules}
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleArrayRemove('experience', index)}
                                            className="remove-btn"
                                        >
                                            Remove Experience
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => handleArrayAdd('experience', { title: '', company: '', location: '', period: '', description: '' })}
                                    className="add-btn"
                                >
                                    + Add Experience
                                </button>
                            </div>

                            <div className="form-section">
                                <h3>Education</h3>
                                {(formData.education || []).map((edu, index) => (
                                    <div key={index} className="education-item">
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Degree/Certificate</label>
                                                <input
                                                    type="text"
                                                    value={edu.degree || ''}
                                                    onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                                                    placeholder="e.g., Certificate of Higher Education"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Field of Study</label>
                                                <input
                                                    type="text"
                                                    value={edu.field || ''}
                                                    onChange={(e) => handleArrayChange('education', index, 'field', e.target.value)}
                                                    placeholder="e.g., Web Development"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Institution</label>
                                                <input
                                                    type="text"
                                                    value={edu.institution || ''}
                                                    onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
                                                    placeholder="e.g., Tuitt Coding Bootcamp"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Year</label>
                                                <input
                                                    type="text"
                                                    value={edu.year || ''}
                                                    onChange={(e) => handleArrayChange('education', index, 'year', e.target.value)}
                                                    placeholder="e.g., 2018"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Achievements</label>
                                            <div className="richtext-wrapper">
                                                <ReactQuill
                                                    theme="snow"
                                                    value={edu.achievements || ''}
                                                    onChange={(value) => handleArrayChange('education', index, 'achievements', value)}
                                                    modules={quillModules}
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleArrayRemove('education', index)}
                                            className="remove-btn"
                                        >
                                            Remove Education
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => handleArrayAdd('education', { degree: '', field: '', institution: '', year: '', achievements: '' })}
                                    className="add-btn"
                                >
                                    + Add Education
                                </button>
                            </div>

                            <div className="form-section">
                                <h3>Certifications</h3>
                                {(formData.certifications || []).map((cert, index) => (
                                    <div key={index} className="certification-item">
                                        <input
                                            type="text"
                                            value={cert}
                                            onChange={(e) => {
                                                const newCerts = [...formData.certifications];
                                                newCerts[index] = e.target.value;
                                                setFormData(prev => ({ ...prev, certifications: newCerts }));
                                            }}
                                            placeholder="e.g., Microsoft Azure Fundamentals"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleArrayRemove('certifications', index)}
                                            className="remove-btn"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, certifications: [...(prev.certifications || []), ''] }))}
                                    className="add-btn"
                                >
                                    + Add Certification
                                </button>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="save-btn" disabled={saving}>
                                    {saving ? 'Saving...' : 'Save Resume'}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="resume-preview-section">
                        <h3>Preview</h3>
                        <div className="resume-preview" ref={resumeRef}>
                            <div className="preview-header">
                                <h1 className="preview-name">{formData.fullName || 'Your Name'}</h1>
                                <div className="preview-contact">
                                    {formData.location && <span>{formData.location}</span>}
                                    {formData.phone && <span>{formData.phone}</span>}
                                    {formData.email && <span>{formData.email}</span>}
                                    {formData.website && <span>{formData.website}</span>}
                                </div>
                            </div>

                            {formData.summary && (
                                <div className="preview-section">
                                    <h2>SUMMARY</h2>
                                    <div dangerouslySetInnerHTML={{ __html: formData.summary }} />
                                </div>
                            )}

                            {formData.skills && formData.skills.length > 0 && (
                                <div className="preview-section">
                                    <h2>SKILLS</h2>
                                    <ul className="preview-skills">
                                        {formData.skills.filter(s => s).map((skill, index) => (
                                            <li key={index}>{skill}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {formData.experience && formData.experience.length > 0 && (
                                <div className="preview-section">
                                    <h2>EXPERIENCE</h2>
                                    {formData.experience.map((exp, index) => (
                                        <div key={index} className="preview-experience">
                                            <div className="preview-exp-header">
                                                <div>
                                                    <strong>{exp.title}</strong>
                                                    {exp.company && <span> in {exp.company}</span>}
                                                    {exp.location && <span> | {exp.location}</span>}
                                                </div>
                                                {exp.period && <span className="preview-period">{exp.period}</span>}
                                            </div>
                                            {exp.description && (
                                                <div dangerouslySetInnerHTML={{ __html: exp.description }} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {formData.education && formData.education.length > 0 && (
                                <div className="preview-section">
                                    <h2>EDUCATION</h2>
                                    {formData.education.map((edu, index) => (
                                        <div key={index} className="preview-education">
                                            <div className="preview-edu-header">
                                                <div>
                                                    <strong>{edu.degree}</strong>
                                                    {edu.field && <span> | {edu.field}</span>}
                                                </div>
                                                {edu.year && <span className="preview-year">{edu.year}</span>}
                                            </div>
                                            {edu.institution && <div className="preview-institution">{edu.institution}</div>}
                                            {edu.achievements && (
                                                <div dangerouslySetInnerHTML={{ __html: edu.achievements }} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {formData.certifications && formData.certifications.length > 0 && (
                                <div className="preview-section">
                                    <h2>CERTIFICATIONS</h2>
                                    <ul className="preview-certifications">
                                        {formData.certifications.filter(c => c).map((cert, index) => (
                                            <li key={index}>{cert}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ResumesPage;
