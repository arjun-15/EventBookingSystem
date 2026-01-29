import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { LandingPage } from './components/LandingPage.jsx';
import { LoginPage } from './components/LoginPage.jsx';
import { EventListingPage } from './components/EventListingPage.jsx';
import { OrganizerDashboard } from './components/OrganizerDashboard.jsx';
import { AdminDashboard } from './components/AdminDashboard.jsx';
import { AttendeeProfile } from './components/AttendeeProfile.jsx';
import { SettingsPage } from './components/SettingsPage.jsx';
import { MainLayout } from './components/MainLayout.jsx';
import { Toaster } from './components/ui/sonner.jsx';
import { mockEvents } from './data/mockData.js';

function AppContent() {
    console.log("AppContent mounted. Authentication state:", useAuth().isAuthenticated);
    const { user, isAuthenticated } = useAuth();
    const [currentPage, setCurrentPage] = useState('landing');
    const [events, setEvents] = useState(() => {
        try {
            const stored = localStorage.getItem('persistent_events');
            if (!stored) return mockEvents;
            const parsed = JSON.parse(stored);
            return Array.isArray(parsed) ? parsed : mockEvents;
        } catch (error) {
            console.error("Failed to parse persistent_events:", error);
            return mockEvents;
        }
    });

    // Sync events if changed externally (e.g., from AdminDashboard)
    useEffect(() => {
        const handleEventsUpdate = () => {
            try {
                const stored = localStorage.getItem('persistent_events');
                if (stored) {
                    const parsed = JSON.parse(stored);
                    if (Array.isArray(parsed)) setEvents(parsed);
                }
            } catch (error) {
                console.error("Failed to sync persistent_events:", error);
            }
        };
        window.addEventListener('eventsUpdated', handleEventsUpdate);
        return () => window.removeEventListener('eventsUpdated', handleEventsUpdate);
    }, []);

    // Redirect based on auth state
    useEffect(() => {
        if (isAuthenticated && currentPage === 'login') {
            setCurrentPage('events');
        }
        if (!isAuthenticated && currentPage !== 'landing' && currentPage !== 'login') {
            setCurrentPage('landing');
        }
    }, [isAuthenticated, currentPage]);

    const renderPage = () => {
        if (!isAuthenticated) {
            if (currentPage === 'login') {
                return <LoginPage onBack={() => setCurrentPage('landing')} />;
            }
            const featuredEvents = events.filter(e => e.featured && e.approved);
            return <LandingPage onGetStarted={() => setCurrentPage('login')} featuredEvents={featuredEvents} />;
        }

        // Authenticated views wrapped in MainLayout
        let pageContent;
        switch (currentPage) {
            case 'dashboard':
                pageContent = user?.role === 'admin' ?
                    <AdminDashboard onNavigate={setCurrentPage} /> :
                    <OrganizerDashboard onNavigate={setCurrentPage} />;
                break;
            case 'profile':
                pageContent = <AttendeeProfile onNavigate={setCurrentPage} />;
                break;
            case 'settings':
                pageContent = <SettingsPage />;
                break;
            default:
                pageContent = <EventListingPage onNavigate={setCurrentPage} />;
        }

        return (
            <MainLayout onNavigate={setCurrentPage} activePage={currentPage}>
                {pageContent}
            </MainLayout>
        );
    };

    return (
        <>
            {renderPage()}
            <Toaster position="top-right" richColors />
        </>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}
