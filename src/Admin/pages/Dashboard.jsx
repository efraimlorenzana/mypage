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
        { name: 'Personal Info', path: '/admin/personal-info', count: stats.personalInfo, icon: '👤' },
        { name: 'Skills', path: '/admin/skills', count: stats.skills, icon: '💡' },
        { name: 'Projects', path: '/admin/projects', count: stats.projects, icon: '📁' },
        { name: 'Achievements', path: '/admin/achievements', count: stats.achievements, icon: '🏆' },
        { name: 'Work History', path: '/admin/work-history', count: stats.workHistories, icon: '💼' },
        { name: 'Social Accounts', path: '/admin/social-accounts', count: stats.socialAccounts, icon: '🔗' },
        { name: 'Technologies', path: '/admin/technologies', count: stats.technologies, icon: '⚙️' },
        { name: 'Contact Details', path: '/admin/contact-details', count: stats.contactDetails, icon: '📧' },
        { name: 'Resumes', path: '/admin/resumes', count: stats.resumes, icon: '📄' },
    ];

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Portfolio Dashboard</h1>
                <div className="header-actions">
                    <span className="user-email">{user?.email}</span>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </header>

            <main className="dashboard-main">
                <div className="welcome-section">
                    <h2>Welcome back!</h2>
                    <p>Manage your portfolio content from here.</p>
                    <a href="/" className="view-portfolio-link" target="_blank" rel="noopener noreferrer">
                        View Portfolio
                    </a>
                </div>

                {loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <div className="dashboard-grid">
                        {menuItems.map((item) => (
                            <Link to={item.path} key={item.name} className="dashboard-card">
                                <span className="card-icon">{item.icon}</span>
                                <h3>{item.name}</h3>
                                <span className="card-count">{item.count} items</span>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
