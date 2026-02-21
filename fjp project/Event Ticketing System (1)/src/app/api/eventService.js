import api from './apiClient';
import { ENDPOINTS } from './endpoints';

export const eventService = {
    getAllEvents: async () => {
        const response = await api.get(ENDPOINTS.EVENTS.ALL);
        return response.data;
    },
    getEventById: async (id) => {
        const response = await api.get(ENDPOINTS.EVENTS.BY_ID(id));
        return response.data;
    },
    getEventsByOrganizer: async (organizerId) => {
        const response = await api.get(ENDPOINTS.EVENTS.BY_ORGANIZER(organizerId));
        return response.data;
    },
    createEvent: async (eventData) => {
        const response = await api.post(ENDPOINTS.EVENTS.ALL, eventData);
        return response.data;
    },
    updateEvent: async (id, eventData) => {
        const response = await api.put(ENDPOINTS.EVENTS.BY_ID(id), eventData);
        return response.data;
    },
    approveEvent: async (id) => {
        const response = await api.put(ENDPOINTS.EVENTS.APPROVE(id));
        return response.data;
    },
    toggleFeatured: async (id) => {
        const response = await api.put(ENDPOINTS.EVENTS.FEATURE(id));
        return response.data;
    },
    deleteEvent: async (id) => {
        const response = await api.delete(ENDPOINTS.EVENTS.BY_ID(id));
        return response.data;
    },
};
