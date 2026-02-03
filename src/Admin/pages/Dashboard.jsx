import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { portfolioService } from '../../services/api';
import './Dashboard.css';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        personalInfo: 0,
        skills: 0,
        projects: 0,
        achievements: 0,
        workHistories: 0,
        socialAccounts: 0,
        technologies: 0,
        contactDetails: 0,
        resumes: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const data = await portfolioService.getAll();
            setStats({
                personalInfo: data.personalInfoes?.length || 0,
                skills: data.skillSets?.length || 0,
                projects: data.projects?.length || 0,
                achievements: data.achievements?.length || 0,
                workHistories: data.workHistories?.length || 0,
                socialAccounts: data.socialAccounts?.length || 0,
                technologies: data.technologies?.length || 0,
                contactDetails: data.contactDetailses?.length || 0,
                resumes: data.resumes?.length || 0,
            });
        } catch (error) {
            console.error('Failed to load stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const menuItems = [
        { name: 'Personal Info', path: '/admin/personal-info', count: stats.personalInfo, icon: 'user' },
        { name: 'Skills', path: '/admin/skills', count: stats.skills, icon: 'lightbulb' },
        { name: 'Projects', path: '/admin/projects', count: stats.projects, icon: 'folder' },
        { name: 'Achievements', path: '/admin/achievements', count: stats.achievements, icon: 'trophy' },
        { name: 'Work History', path: '/admin/work-history', count: stats.workHistories, icon: 'briefcase' },
        { name: 'Social Accounts', path: '/admin/social-accounts', count: stats.socialAccounts, icon: 'link' },
        { name: 'Technologies', path: '/admin/technologies', count: stats.technologies, icon: 'cog' },
        { name: 'Contact Details', path: '/admin/contact-details', count: stats.contactDetails, icon: 'envelope' },
        { name: 'Resumes', path: '/admin/resumes', count: stats.resumes, icon: 'file' },
    ];

    const getIcon = (iconName) => {
        const icons = {
            user: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            ),
            lightbulb: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.9V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.1A7 7 0 0 0 12 2z" />
                </svg>
            ),
            folder: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
            ),
            trophy: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2z" />
                </svg>
            ),
            briefcase: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
            ),
            link: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
            ),
            cog: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
            ),
            envelope: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                </svg>
            ),
            file: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                </svg>
            ),
        };
        return icons[iconName] || null;
    };

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-container">
                <aside className="dashboard-sidebar">
                    <div className="sidebar-content">
                        <div className="user-profile">
                            <div className="user-avatar">
                                {user?.email?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className="user-info">
                                <span className="user-name">{user?.email?.split('@')[0] || 'User'}</span>
                                <span className="user-email">{user?.email}</span>
                            </div>
                        </div>
                        <div className="sidebar-links">
                            <a href="/" className="view-portfolio-link" target="_blank" rel="noopener noreferrer">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                    <polyline points="15 3 21 3 21 9" />
                                    <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                                View Portfolio
                            </a>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="logout-button">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Logout
                    </button>
                </aside>

                <main className="dashboard-main">
                    <header className="dashboard-header">
                        <h1>Dashboard</h1>
                        <p>Manage your portfolio content</p>
                    </header>

                    {loading ? (
                        <div className="loading">Loading...</div>
                    ) : (
                        <div className="dashboard-grid">
                            {menuItems.map((item) => (
                                <Link to={item.path} key={item.name} className="dashboard-card">
                                    <div className="card-icon">
                                        {getIcon(item.icon)}
                                    </div>
                                    <div className="card-content">
                                        <h3>{item.name}</h3>
                                        <span className="card-count">{item.count} {item.count === 1 ? 'item' : 'items'}</span>
                                    </div>
                                    <div className="card-arrow">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="9 18 15 12 9 6" />
                                        </svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
