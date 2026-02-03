import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { AuthProvider } from './context/AuthContext';
import Login from './Admin/pages/Login';
import Dashboard from './Admin/pages/Dashboard';
import ProtectedRoute from './Admin/components/ProtectedRoute';
import PersonalInfoPage from './Admin/pages/PersonalInfoPage';
import SkillsPage from './Admin/pages/SkillsPage';
import ProjectsPage from './Admin/pages/ProjectsPage';
import AchievementsPage from './Admin/pages/AchievementsPage';
import WorkHistoryPage from './Admin/pages/WorkHistoryPage';
import SocialAccountsPage from './Admin/pages/SocialAccountsPage';
import TechnologiesPage from './Admin/pages/TechnologiesPage';
import ContactDetailsPage from './Admin/pages/ContactDetailsPage';
import ResumesPage from './Admin/pages/ResumesPage';

const particlesOptions = {
    particles: {
        number: {
            value: 200,
            density: {
                enable: true,
                area: 800
            }
        },
        color: {
            value: "#ffffff"
        },
        links: {
            enable: true,
            color: "#ffffff",
            opacity: 0.4
        },
        move: {
            enable: true,
            speed: 1
        },
        opacity: {
            value: 0.5
        },
        size: {
            value: { min: 1, max: 3 }
        }
    },
    detectRetina: true
};

function PortfolioPage() {
    const [init, setInit] = React.useState(false);

    React.useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    return (
        <div className="Main">
            <div className="main__bg">
                {init && <Particles id="tsparticles" options={particlesOptions} />}
            </div>
            <App />
        </div>
    );
}

function Root() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<PortfolioPage />} />
                    <Route path="/admin/login" element={<Login />} />
                    <Route path="/admin/dashboard" element={
                        <ProtectedRoute><Dashboard /></ProtectedRoute>
                    } />
                    <Route path="/admin/personal-info" element={
                        <ProtectedRoute><PersonalInfoPage /></ProtectedRoute>
                    } />
                    <Route path="/admin/skills" element={
                        <ProtectedRoute><SkillsPage /></ProtectedRoute>
                    } />
                    <Route path="/admin/projects" element={
                        <ProtectedRoute><ProjectsPage /></ProtectedRoute>
                    } />
                    <Route path="/admin/achievements" element={
                        <ProtectedRoute><AchievementsPage /></ProtectedRoute>
                    } />
                    <Route path="/admin/work-history" element={
                        <ProtectedRoute><WorkHistoryPage /></ProtectedRoute>
                    } />
                    <Route path="/admin/social-accounts" element={
                        <ProtectedRoute><SocialAccountsPage /></ProtectedRoute>
                    } />
                    <Route path="/admin/technologies" element={
                        <ProtectedRoute><TechnologiesPage /></ProtectedRoute>
                    } />
                    <Route path="/admin/contact-details" element={
                        <ProtectedRoute><ContactDetailsPage /></ProtectedRoute>
                    } />
                    <Route path="/admin/resumes" element={
                        <ProtectedRoute><ResumesPage /></ProtectedRoute>
                    } />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Root />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
    