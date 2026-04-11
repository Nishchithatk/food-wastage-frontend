import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth Services
export const authService = {
  login: async (email, role) => {
    const response = await api.post('/auth/login', { email, role });
    return response.data;
  },
  register: async (name, email, role) => {
    const response = await api.post('/auth/register', { name, email, role });
    return response.data;
  },
};

// Donation Services
export const donationService = {
  getAll: async () => {
    const response = await api.get('/donations');
    return response.data;
  },
  create: async (donationData) => {
    const response = await api.post('/donations', donationData);
    return response.data;
  },
  updateStatus: async (id, status, volunteerId, volunteerName) => {
    const response = await api.put(`/donations/${id}/status`, { status, volunteerId, volunteerName });
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/donations/${id}`);
    return response.data;
  },
};

// Admin Services
export const adminService = {
  getUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },
  updateUserStatus: async (userId, status) => {
    const response = await api.put(`/admin/users/${userId}/status`, { status });
    return response.data;
  },
};

export default api;
