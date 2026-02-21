const BASE_URLS = {
    AUTH: 'http://localhost:8085',
    EVENT: 'http://localhost:8082',
    BOOKING: 'http://localhost:8083',
    NOTIFICATION: 'http://localhost:8084',
    PAYMENT: 'http://localhost:8087',
};

export const ENDPOINTS = {
    AUTH: {
        LOGIN: `${BASE_URLS.AUTH}/auth/login`,
        REGISTER: `${BASE_URLS.AUTH}/auth/register`,
        GET_USER: (email) => `${BASE_URLS.AUTH}/users/${email}`,
    },
    EVENTS: {
        ALL: `${BASE_URLS.EVENT}/events`,
        BY_ID: (id) => `${BASE_URLS.EVENT}/events/${id}`,
        BY_ORGANIZER: (id) => `${BASE_URLS.EVENT}/events/organizer/${id}`,
        APPROVE: (id) => `${BASE_URLS.EVENT}/events/${id}/approve`,
        FEATURE: (id) => `${BASE_URLS.EVENT}/events/${id}/feature`,
    },
    BOOKINGS: {
        CREATE: `${BASE_URLS.BOOKING}/bookings`,
        USER_BOOKINGS: (userId) => `${BASE_URLS.BOOKING}/bookings/user/${userId}`,
        EVENT_BOOKINGS: (eventId) => `${BASE_URLS.BOOKING}/bookings/event/${eventId}`,
        ALL: `${BASE_URLS.BOOKING}/bookings`,
    },
    ANALYTICS: {
        SYSTEM_STATS: `${BASE_URLS.BOOKING}/analytics/system-stats`,
        ORGANIZER_REVENUE: (organizerId) => `${BASE_URLS.BOOKING}/analytics/organizer/${organizerId}`,
    },
    NOTIFICATION: `${BASE_URLS.NOTIFICATION}/notifications`
};
