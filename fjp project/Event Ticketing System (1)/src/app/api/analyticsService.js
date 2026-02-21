import api from './apiClient';
import { ENDPOINTS } from './endpoints';

export const analyticsService = {
    getSystemStats: async () => {
        const response = await api.get(ENDPOINTS.ANALYTICS.SYSTEM_STATS);
        return response.data;
    },
    getOrganizerRevenue: async (organizerId) => {
        const response = await api.get(ENDPOINTS.ANALYTICS.ORGANIZER_REVENUE(organizerId));
        return response.data;
    }
};
