import React, { createContext, useContext, useState, useEffect } from 'react';

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

    const login = (email, password, role, verified, extraData = {}) => {
        // Mock login - in real app, this would call an API
        const newUser = {
            id: Math.random().toString(36).substr(2, 9),
            name: extraData.name || email.split('@')[0],
            email,
            role: role,
            verified,
            blocked: false,
            ...extraData
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
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
