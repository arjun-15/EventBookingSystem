import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Ban, Settings, IndianRupee, Users as UsersIcon, Calendar, Search, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { mockEvents, mockReviews, mockCommissionSettings } from '../data/mockData.js';
import { toast } from 'sonner';

export const AdminDashboard = ({ onNavigate }) => {
    const { user } = useAuth();
    const [view, setView] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');

    const [events, setEvents] = useState(() => {
        try {
            const stored = localStorage.getItem('persistent_events');
            if (!stored) return mockEvents;
            const parsed = JSON.parse(stored);
            return Array.isArray(parsed) ? parsed : mockEvents;
        } catch (error) {
            return mockEvents;
        }
    });

    useEffect(() => {
        localStorage.setItem('persistent_events', JSON.stringify(events));

        window.dispatchEvent(new Event('eventsUpdated'));
    }, [events]);

    const [reviews, setReviews] = useState(mockReviews);
    const [commissionSettings, setCommissionSettings] = useState(mockCommissionSettings);
    const [verificationPendingUsers, setVerificationPendingUsers] = useState([
        { id: 'v1', name: 'Elite Organizers', email: 'elite@example.com', role: 'organizer', details: 'Business License: LIC-998877', submittedDate: '2026-01-28' },
        { id: 'v2', name: 'Master Admin', email: 'master@eventhub.com', role: 'admin', details: 'Staff ID: STF-001', submittedDate: '2026-01-29' },
    ]);

    const [users, setUsers] = useState([
        { id: '1', name: 'John Doe', email: 'john@example.com', role: 'attendee', verified: true, blocked: false },
        { id: '2', name: 'MusicEvents Inc.', email: 'contact@musicevents.com', role: 'organizer', verified: true, blocked: false },
        { id: '3', name: 'TechCon Organizers', email: 'hi@techcon.com', role: 'organizer', verified: true, blocked: false },
        { id: '4', name: 'Bob Wilson', email: 'bob@example.com', role: 'attendee', verified: true, blocked: true },
    ]);

    const getOrganizerRating = (organizerName) => {
        const organizerEvents = events.filter(e => e.organizerName === organizerName);
        const eventIds = organizerEvents.map(e => e.id);
        const organizerReviews = reviews.filter(r => eventIds.includes(r.eventId));
        if (organizerReviews.length === 0) return 0;
        const sum = organizerReviews.reduce((acc, r) => acc + r.rating, 0);
        return (sum / organizerReviews.length).toFixed(1);
    };

    const approveEvent = (eventId) => {
        setEvents(events.map(e => e.id === eventId ? { ...e, approved: true } : e));
        toast.success('Event approved!');
    };

    const rejectEvent = (eventId) => {
        setEvents(events.filter(e => e.id !== eventId));
        toast.success('Event rejected!');
    };

    const toggleFeatured = (eventId) => {
        setEvents(events.map(e => e.id === eventId ? { ...e, featured: !e.featured } : e));
        toast.success('Featured status updated!');
    };

    const toggleUserBlock = (userId) => {
        setUsers(users.map(u => u.id === userId ? { ...u, blocked: !u.blocked } : u));
        toast.success('User status updated!');
    };

    const toggleReviewFlag = (reviewId) => {
        setReviews(reviews.map(r => r.id === reviewId ? { ...r, flagged: !r.flagged } : r));
        const review = reviews.find(r => r.id === reviewId);
        if (review?.flagged) {
            toast.success('Review unflagged!');
        } else {
            if (review && review.rating <= 2) {

                setUsers(users.map(u => u.id === review.userId ? { ...u, blocked: true } : u));
                toast.warning('Review flagged and user blocked due to bad rating!');
            } else {
                toast.success('Review flagged!');
            }
        }
    };

    const approveVerification = (vUserId) => {
        const vUser = verificationPendingUsers.find(u => u.id === vUserId);
        if (vUser) {
            const newUser = {
                id: Math.random().toString(36).substr(2, 9),
                name: vUser.name,
                email: vUser.email,
                role: vUser.role,
                verified: true,
                blocked: false
            };
            setUsers([...users, newUser]);
            setVerificationPendingUsers(verificationPendingUsers.filter(u => u.id !== vUserId));
            toast.success(`${vUser.role} identity verified and account activated!`);
        }
    };

    const rejectVerification = (vUserId) => {
        setVerificationPendingUsers(verificationPendingUsers.filter(u => u.id !== vUserId));
        toast.error('Identity verification request rejected.');
    };

    const totalRevenue = events.reduce((sum, event) => {
        if (!event.ticketTiers || !Array.isArray(event.ticketTiers)) return sum;
        return sum + event.ticketTiers.reduce((tierSum, tier) => {
            return tierSum + ((tier.total || 0) - (tier.available || 0)) * (tier.price || 0);
        }, 0);
    }, 0);

    const adminRevenue = totalRevenue * (commissionSettings.adminPercentage / 100);

    return (
        <div className="min-h-screen bg-transparent">


            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-4">
                        <button
                            onClick={() => setView('overview')}
                            className={`py-4 px-6 border-b-2 transition-colors ${view === 'overview' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setView('events')}
                            className={`py-4 px-6 border-b-2 transition-colors ${view === 'events' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Event Moderation
                        </button>
                        <button
                            onClick={() => setView('users')}
                            className={`py-4 px-6 border-b-2 transition-colors ${view === 'users' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Attendees
                        </button>
                        <button
                            onClick={() => setView('organizers')}
                            className={`py-4 px-6 border-b-2 transition-colors ${view === 'organizers' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Organizers
                        </button>
                        <button
                            onClick={() => setView('reviews')}
                            className={`py-4 px-6 border-b-2 transition-colors ${view === 'reviews' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Reviews
                        </button>
                        <button
                            onClick={() => setView('verification')}
                            className={`py-4 px-6 border-b-2 transition-colors relative ${view === 'verification' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Verifications
                            {verificationPendingUsers.length > 0 && (
                                <span className="absolute top-2 right-0 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center border-2 border-white">
                                    {verificationPendingUsers.length}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setView('settings')}
                            className={`py-4 px-6 border-b-2 transition-colors ${view === 'settings' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Settings
                        </button>
                    </div>
                </div>
            </div>


            <div className="mt-8">
                {view === 'overview' && (
                    <div className="space-y-8">

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="premium-card p-6 shadow-none">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-purple-100 rounded-lg">
                                        <Calendar className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Total Events</p>
                                        <p className="text-2xl">{events.length}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="premium-card p-6 shadow-none">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-100 rounded-lg">
                                        <UsersIcon className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Total Users</p>
                                        <p className="text-2xl">{users.length}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="premium-card p-6 shadow-none">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-green-100 rounded-lg">
                                        <IndianRupee className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Platform Revenue</p>
                                        <p className="text-2xl">₹{totalRevenue.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="premium-card p-6 shadow-none">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-yellow-100 rounded-lg">
                                        <Settings className="w-6 h-6 text-yellow-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Admin Commission</p>
                                        <p className="text-2xl">₹{adminRevenue.toFixed(0)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="premium-card p-6 shadow-none">
                            <h2 className="text-lg mb-4">Pending Event Approvals</h2>
                            <div className="space-y-3">
                                {events.filter(e => !e.approved).length === 0 ? (
                                    <p className="text-gray-500 text-center py-4">No pending events</p>
                                ) : (
                                    events.filter(e => !e.approved).map(event => (
                                        <div key={event.id} className="flex items-center justify-between p-4 glass-dark text-white rounded-lg border-white/10">
                                            <div>
                                                <h3>{event.title}</h3>
                                                <p className="text-sm text-gray-600">{event.organizerName}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => approveEvent(event.id)}
                                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => rejectEvent(event.id)}
                                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {view === 'events' && (
                    <div>
                        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                            <h2 className="text-2xl font-bold">Event Moderation</h2>
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search events..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 font-medium text-sm"
                                />
                            </div>
                        </div>
                        <div className="premium-card overflow-hidden shadow-none">
                            <table className="w-full">
                                <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4 text-left">Event Title</th>
                                        <th className="px-6 py-4 text-left">Organizer</th>
                                        <th className="px-6 py-4 text-left">Status</th>
                                        <th className="px-6 py-4 text-left font-bold text-yellow-600">Premium Boost</th>
                                        <th className="px-6 py-4 text-left">Quick Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {events.filter(e => e.title.toLowerCase().includes(searchTerm.toLowerCase())).map((event) => (
                                        <tr key={event.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-900">{event.title}</div>
                                                <div className="text-[10px] text-gray-400 font-mono uppercase tracking-tighter">{event.id}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 font-medium">{event.organizerName}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${event.approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {event.approved ? 'Live' : 'Pending Review'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => toggleFeatured(event.id)}
                                                    className={`group flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${event.featured
                                                        ? 'bg-yellow-400 text-purple-900 shadow-sm'
                                                        : 'bg-gray-100 text-gray-400 hover:bg-yellow-100 hover:text-yellow-700'
                                                        }`}
                                                >
                                                    <Star className={`w-3 h-3 ${event.featured ? 'fill-purple-900' : ''}`} />
                                                    {event.featured ? 'Featured' : 'Make Featured'}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4">
                                                {!event.approved ? (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => approveEvent(event.id)}
                                                            className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                                                            title="Approve"
                                                        >
                                                            <CheckCircle className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => rejectEvent(event.id)}
                                                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                                            title="Reject"
                                                        >
                                                            <XCircle className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-gray-400 italic">No actions needed</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {view === 'users' && (
                    <div>
                        <h2 className="text-2xl mb-6">User Management</h2>
                        <div className="premium-card overflow-hidden shadow-none">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm">Name</th>
                                        <th className="px-6 py-3 text-left text-sm">Email</th>
                                        <th className="px-6 py-3 text-left text-sm">Role</th>
                                        <th className="px-6 py-3 text-left text-sm">Verified</th>
                                        <th className="px-6 py-3 text-left text-sm">Status</th>
                                        <th className="px-6 py-3 text-left text-sm">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td className="px-6 py-4">{user.name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs ${user.verified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {user.verified ? 'Verified' : 'Unverified'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs ${user.blocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                                    }`}>
                                                    {user.blocked ? 'Blocked' : 'Active'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => toggleUserBlock(user.id)}
                                                    className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${user.blocked
                                                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                                                        }`}
                                                >
                                                    <Ban className="w-4 h-4" />
                                                    {user.blocked ? 'Unblock' : 'Block'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {view === 'organizers' && (
                    <div className="animate-in fade-in duration-500">
                        <h2 className="text-2xl font-bold mb-6">Organizer Moderation</h2>
                        <div className="premium-card overflow-hidden shadow-none bg-white">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Business Name</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Avg Rating</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Events</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {users.filter(u => u.role === 'organizer').map((org) => {
                                        const rating = getOrganizerRating(org.name);
                                        const isFlagged = rating > 0 && rating < 2.5;

                                        return (
                                            <tr key={org.id} className={isFlagged ? 'bg-red-50/30' : ''}>
                                                <td className="px-6 py-4 font-medium text-gray-900">{org.name}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`px-2 py-1 rounded-lg text-sm font-bold ${isFlagged ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                                            {rating === 0 ? 'N/A' : `${rating} ★`}
                                                        </span>
                                                        {isFlagged && (
                                                            <span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">Poor Performance</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {events.filter(e => e.organizerName === org.name).length} Events
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${org.blocked ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                                                        {org.blocked ? 'Blocked' : 'Active'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => setView('reviews')}
                                                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 group"
                                                            title="View Reviews"
                                                        >
                                                            <Settings className="w-5 h-5 group-hover:text-purple-600" />
                                                        </button>
                                                        <button
                                                            onClick={() => toggleUserBlock(org.id)}
                                                            className={`p-2 rounded-lg transition-colors ${org.blocked ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
                                                            title={org.blocked ? 'Unblock Organizer' : 'Block Organizer'}
                                                        >
                                                            <Ban className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {view === 'reviews' && (
                    <div>
                        <h2 className="text-2xl mb-6">Review Management</h2>
                        <div className="space-y-4">
                            {reviews.map((review) => (
                                <div key={review.id} className={`bg-white rounded-lg p-6 shadow ${review.flagged ? 'border-2 border-red-500' : ''}`}>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-2">
                                                <h3>{review.userName}</h3>
                                                <div className="flex gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                                                            ★
                                                        </span>
                                                    ))}
                                                </div>
                                                {review.flagged && (
                                                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                                                        Flagged
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-gray-600 mb-2">{review.comment}</p>
                                            <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                                        </div>
                                        <button
                                            onClick={() => toggleReviewFlag(review.id)}
                                            className={`px-4 py-2 rounded-lg ${review.flagged
                                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                                                }`}
                                        >
                                            {review.flagged ? 'Unflag' : 'Flag'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {view === 'verification' && (
                    <div className="animate-in fade-in duration-500">
                        <h2 className="text-2xl font-bold mb-6">Identity Verification Requests</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {verificationPendingUsers.length === 0 ? (
                                <div className="premium-card p-12 text-center text-gray-500 shadow-none">
                                    No pending verification requests at this time.
                                </div>
                            ) : (
                                verificationPendingUsers.map((vUser) => (
                                    <div key={vUser.id} className="premium-card p-6 shadow-none flex flex-col md:flex-row items-center justify-between gap-6 border-l-4 border-yellow-400">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-xl">
                                                {vUser.name[0]}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900">{vUser.name} <span className="ml-2 px-2 py-0.5 bg-gray-100 text-[10px] rounded uppercase text-gray-500">{vUser.role}</span></h3>
                                                <p className="text-sm text-gray-500">{vUser.email}</p>
                                                <p className="text-xs text-purple-600 mt-1 font-medium">{vUser.details}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="text-right mr-4 hidden md:block">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase">Submitted</p>
                                                <p className="text-sm text-gray-600">{vUser.submittedDate}</p>
                                            </div>
                                            <button
                                                onClick={() => approveVerification(vUser.id)}
                                                className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all font-bold text-sm"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => rejectVerification(vUser.id)}
                                                className="px-6 py-2 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-all font-bold text-sm"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {view === 'settings' && (
                    <div>
                        <h2 className="text-2xl mb-6">Platform Settings</h2>
                        <div className="premium-card p-6 shadow-none">
                            <h3 className="text-lg mb-4">Commission Settings</h3>
                            <div className="space-y-4 max-w-md">
                                <div>
                                    <label className="block text-sm mb-2">Admin Commission (%)</label>
                                    <input
                                        type="number"
                                        value={commissionSettings.adminPercentage}
                                        onChange={(e) => setCommissionSettings({
                                            ...commissionSettings,
                                            adminPercentage: parseInt(e.target.value),
                                            organizerPercentage: 100 - parseInt(e.target.value)
                                        })}
                                        min="0"
                                        max="100"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-2">Organizer Share (%)</label>
                                    <input
                                        type="number"
                                        value={commissionSettings.organizerPercentage}
                                        disabled
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                                    />
                                </div>
                                <button
                                    onClick={() => toast.success('Commission settings updated!')}
                                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
