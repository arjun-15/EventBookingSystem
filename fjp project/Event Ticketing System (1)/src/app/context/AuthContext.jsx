import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../api/authService';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const parsed = JSON.parse(storedUser);
                if (parsed && typeof parsed === 'object') {
                    setUser(parsed);
                }
            }
        } catch (error) {
            localStorage.removeItem('user'); // Clear corrupted data
        }
    }, []);

    const login = async (email, password) => {
        try {
            const data = await authService.login(email, password);
            // data should be { token, role, fullName, id } based on backend
            // In backend, role might be uppercase (e.g., "ATTENDEE", "ORGANIZER", "ADMIN")
            const newUser = {
                id: data.id,
                name: data.fullName,
                email,
                role: data.role.toLowerCase(), // Frontend uses lowercase roles
                token: data.token,
                verified: true,
            };
            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
            return newUser;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
