import api from './apiClient';
import { ENDPOINTS } from './endpoints';

export const authService = {
    login: async (email, password) => {
        const response = await api.post(ENDPOINTS.AUTH.LOGIN, { email, password });
        return response.data;
    },
    register: async (userData) => {
        const response = await api.post(ENDPOINTS.AUTH.REGISTER, userData);
        return response.data;
    },
};
