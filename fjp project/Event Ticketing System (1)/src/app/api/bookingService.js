import api from './apiClient';
import { ENDPOINTS } from './endpoints';

export const bookingService = {
    createBooking: async (bookingData) => {
        const response = await api.post(ENDPOINTS.BOOKINGS.CREATE, bookingData);
        return response.data;
    },
    getUserBookings: async (userId) => {
        const response = await api.get(ENDPOINTS.BOOKINGS.USER_BOOKINGS(userId));
        return response.data;
    },
    getEventBookings: async (eventId) => {
        const response = await api.get(ENDPOINTS.BOOKINGS.EVENT_BOOKINGS(eventId));
        return response.data;
    },
    getAllBookings: async () => {
        const response = await api.get(ENDPOINTS.BOOKINGS.ALL);
        return response.data;
    },
};
