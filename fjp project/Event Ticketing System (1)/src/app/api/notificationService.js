import api from './apiClient';
import { ENDPOINTS } from './endpoints';

export const notificationService = {
    sendEmail: async (emailData) => {
        // emailData: { to: string, subject: string, body: string }
        const response = await api.post(`${ENDPOINTS.NOTIFICATION}/send-email`, emailData);
        return response.data;
    }
};
