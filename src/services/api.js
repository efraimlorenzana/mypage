import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/admin/login';
        }
        return Promise.reject(error);
    }
);

export const authService = {
    login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },
    register: async (email, password) => {
        const response = await api.post('/auth/register', { email, password });
        return response.data;
    },
    getMe: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },
};

export const portfolioService = {
    getAll: async () => {
        const response = await api.get('/api/portfolio');
        return response.data;
    },
    
    // Personal Info
    getPersonalInfo: async () => {
        const response = await api.get('/api/personal-info');
        return response.data;
    },
    createPersonalInfo: async (data) => {
        const response = await api.post('/api/personal-info', data);
        return response.data;
    },
    updatePersonalInfo: async (id, data) => {
        const response = await api.put(`/api/personal-info/${id}`, data);
        return response.data;
    },
    deletePersonalInfo: async (id) => {
        const response = await api.delete(`/api/personal-info/${id}`);
        return response.data;
    },

    // Skills
    getSkills: async () => {
        const response = await api.get('/api/skills');
        return response.data;
    },
    createSkill: async (data) => {
        const response = await api.post('/api/skills', data);
        return response.data;
    },
    updateSkill: async (id, data) => {
        const response = await api.put(`/api/skills/${id}`, data);
        return response.data;
    },
    deleteSkill: async (id) => {
        const response = await api.delete(`/api/skills/${id}`);
        return response.data;
    },

    // Projects
    getProjects: async () => {
        const response = await api.get('/api/projects');
        return response.data;
    },
    createProject: async (data) => {
        const response = await api.post('/api/projects', data);
        return response.data;
    },
    updateProject: async (id, data) => {
        const response = await api.put(`/api/projects/${id}`, data);
        return response.data;
    },
    deleteProject: async (id) => {
        const response = await api.delete(`/api/projects/${id}`);
        return response.data;
    },

    // Achievements
    getAchievements: async () => {
        const response = await api.get('/api/achievements');
        return response.data;
    },
    createAchievement: async (data) => {
        const response = await api.post('/api/achievements', data);
        return response.data;
    },
    updateAchievement: async (id, data) => {
        const response = await api.put(`/api/achievements/${id}`, data);
        return response.data;
    },
    deleteAchievement: async (id) => {
        const response = await api.delete(`/api/achievements/${id}`);
        return response.data;
    },

    // Work Histories
    getWorkHistories: async () => {
        const response = await api.get('/api/work-histories');
        return response.data;
    },
    createWorkHistory: async (data) => {
        const response = await api.post('/api/work-histories', data);
        return response.data;
    },
    updateWorkHistory: async (id, data) => {
        const response = await api.put(`/api/work-histories/${id}`, data);
        return response.data;
    },
    deleteWorkHistory: async (id) => {
        const response = await api.delete(`/api/work-histories/${id}`);
        return response.data;
    },

    // Social Accounts
    getSocialAccounts: async () => {
        const response = await api.get('/api/social-accounts');
        return response.data;
    },
    createSocialAccount: async (data) => {
        const response = await api.post('/api/social-accounts', data);
        return response.data;
    },
    updateSocialAccount: async (id, data) => {
        const response = await api.put(`/api/social-accounts/${id}`, data);
        return response.data;
    },
    deleteSocialAccount: async (id) => {
        const response = await api.delete(`/api/social-accounts/${id}`);
        return response.data;
    },

    // Technologies
    getTechnologies: async () => {
        const response = await api.get('/api/technologies');
        return response.data;
    },
    createTechnology: async (data) => {
        const response = await api.post('/api/technologies', data);
        return response.data;
    },
    updateTechnology: async (id, data) => {
        const response = await api.put(`/api/technologies/${id}`, data);
        return response.data;
    },
    deleteTechnology: async (id) => {
        const response = await api.delete(`/api/technologies/${id}`);
        return response.data;
    },

    // Contact Details
    getContactDetails: async () => {
        const response = await api.get('/api/contact-details');
        return response.data;
    },
    createContactDetails: async (data) => {
        const response = await api.post('/api/contact-details', data);
        return response.data;
    },
    updateContactDetails: async (id, data) => {
        const response = await api.put(`/api/contact-details/${id}`, data);
        return response.data;
    },
    deleteContactDetails: async (id) => {
        const response = await api.delete(`/api/contact-details/${id}`);
        return response.data;
    },

    // Resumes
    getResumes: async () => {
        const response = await api.get('/api/resumes');
        return response.data;
    },
    createResume: async (data) => {
        const response = await api.post('/api/resumes', data);
        return response.data;
    },
    updateResume: async (id, data) => {
        const response = await api.put(`/api/resumes/${id}`, data);
        return response.data;
    },
    deleteResume: async (id) => {
        const response = await api.delete(`/api/resumes/${id}`);
        return response.data;
    },

    // SVG Icons
    getSvgIcons: async () => {
        const response = await api.get('/api/svg-icons');
        return response.data;
    },
    createSvgIcon: async (data) => {
        const response = await api.post('/api/svg-icons', data);
        return response.data;
    },
    updateSvgIcon: async (id, data) => {
        const response = await api.put(`/api/svg-icons/${id}`, data);
        return response.data;
    },
    deleteSvgIcon: async (id) => {
        const response = await api.delete(`/api/svg-icons/${id}`);
        return response.data;
    },
};

export default api;
