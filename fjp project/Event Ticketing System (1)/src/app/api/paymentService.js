import api from './apiClient';
import { ENDPOINTS } from './endpoints';

// Add payment endpoints if not present
const PAYMENT_ENDPOINTS = {
    INITIATE: 'http://localhost:8087/payments/initiate',
    PROCESS: (transactionId) => `http://localhost:8087/payments/process/${transactionId}`,
    GET_PAYMENT: (transactionId) => `http://localhost:8087/payments/${transactionId}`,
    USER_PAYMENTS: (userId) => `http://localhost:8087/payments/user/${userId}`,
};

export const paymentService = {
    initiatePayment: async (paymentData) => {
        const response = await api.post(PAYMENT_ENDPOINTS.INITIATE, paymentData);
        return response.data;
    },
    processPayment: async (transactionId) => {
        const response = await api.post(PAYMENT_ENDPOINTS.PROCESS(transactionId));
        return response.data;
    },
    getPaymentStatus: async (transactionId) => {
        const response = await api.get(PAYMENT_ENDPOINTS.GET_PAYMENT(transactionId));
        return response.data;
    },
    getUserPayments: async (userId) => {
        const response = await api.get(PAYMENT_ENDPOINTS.USER_PAYMENTS(userId));
        return response.data;
    }
};
