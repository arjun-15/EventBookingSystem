import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Users, IndianRupee, TrendingUp, Mail, QrCode, Search as SearchBarIcon, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { eventService } from '../api/eventService';
import { analyticsService } from '../api/analyticsService';
import { bookingService } from '../api/bookingService';
import { notificationService } from '../api/notificationService';
import { mockCommissionSettings } from '../data/mockData.js';
import { toast } from 'sonner';

export const OrganizerDashboard = ({ onNavigate }) => {
    const { user } = useAuth();
    const [view, setView] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEventId, setSelectedEventId] = useState('');
    const [events, setEvents] = useState([]);
    const [stats, setStats] = useState({ totalRevenue: 0, ticketsSold: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!user?.id) return;
            setLoading(true);
            try {
                const [eventData, analyticsData] = await Promise.all([
                    eventService.getEventsByOrganizer(user.id),
                    analyticsService.getOrganizerRevenue(user.id)
                ]);
                setEvents(eventData || []);

                // Aggregate analytics data
                const totalStats = (analyticsData || []).reduce((acc, curr) => ({
                    totalRevenue: acc.totalRevenue + curr.revenue,
                    ticketsSold: acc.ticketsSold + curr.ticketsSold
                }), { totalRevenue: 0, ticketsSold: 0 });

                setStats(totalStats);
            } catch (error) {
                console.error('Failed to fetch organizer data:', error);
                toast.error('Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user?.id, view]);

    const analyticsData = [
        { name: 'Jan', sales: 4000, revenue: 2400 },
        { name: 'Feb', sales: 3000, revenue: 1398 },
        { name: 'Mar', sales: 2000, revenue: 9800 },
        { name: 'Apr', sales: 2780, revenue: 3908 },
        { name: 'May', sales: 1890, revenue: 4800 },
        { name: 'Jun', sales: 2390, revenue: 3800 },
    ];

    const totalRevenue = stats.totalRevenue;
    const organizerRevenue = totalRevenue * (mockCommissionSettings.organizerPercentage / 100);
    const adminCommission = totalRevenue * (mockCommissionSettings.adminPercentage / 100);

    return (
        <div className="min-h-screen bg-gray-50">

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
                            My Events
                        </button>
                        <button
                            onClick={() => setView('create')}
                            className={`py-4 px-6 border-b-2 transition-colors ${view === 'create' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Create Event
                        </button>
                        <button
                            onClick={() => setView('email')}
                            className={`py-4 px-6 border-b-2 transition-colors ${view === 'email' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Email Center
                        </button>
                    </div>
                </div>
            </div>


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-12">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
                        <p className="text-gray-500">Loading your dashboard...</p>
                    </div>
                ) : (
                    <>
                        {view === 'overview' && (
                            <div className="space-y-8 animate-in fade-in duration-500">

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="premium-card p-6 shadow-none">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-purple-100 rounded-lg">
                                                <IndianRupee className="w-6 h-6 text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Total Revenue</p>
                                                <p className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="premium-card p-6 shadow-none">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-green-100 rounded-lg">
                                                <TrendingUp className="w-6 h-6 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Your Share ({mockCommissionSettings.organizerPercentage}%)</p>
                                                <p className="text-2xl font-bold">₹{organizerRevenue.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="premium-card p-6 shadow-none">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-blue-100 rounded-lg">
                                                <Users className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Total Events</p>
                                                <p className="text-2xl font-bold">{events.length}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="premium-card p-6 shadow-none">
                                    <h2 className="text-lg font-bold mb-4">Revenue Distribution</h2>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-gray-600">
                                            <span>Your Earnings ({mockCommissionSettings.organizerPercentage}%)</span>
                                            <span className="text-xl font-medium text-gray-900">₹{organizerRevenue.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-gray-600">
                                            <span>Platform Fee ({mockCommissionSettings.adminPercentage}%)</span>
                                            <span className="text-xl font-medium text-gray-900">₹{adminCommission.toFixed(2)}</span>
                                        </div>
                                        <div className="border-t pt-3 flex justify-between items-center">
                                            <span className="text-lg font-bold">Total Revenue</span>
                                            <span className="text-2xl font-bold text-purple-600">₹{totalRevenue.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>


                                <div className="premium-card p-6 shadow-none">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-lg font-bold">Live Sales Activity</h2>
                                        <span className="flex items-center gap-2 text-xs text-green-600 font-bold uppercase tracking-wider">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                            Live Updates
                                        </span>
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            { id: 1, user: "Alex Rivera", event: "Summer Music Festival", amount: "$299", time: "2 mins ago" },
                                            { id: 2, user: "Sarah Smith", event: "Tech Innovation Summit", amount: "$199", time: "15 mins ago" },
                                            { id: 3, user: "John Carter", event: "Modern Art Exhibition", amount: "$45", time: "1 hour ago" },
                                        ].map((sale) => (
                                            <div key={sale.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50 border border-gray-100 hover:bg-gray-50 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                                                        {sale.user[0]}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900">{sale.user}</p>
                                                        <p className="text-xs text-gray-500">{sale.event}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-bold text-gray-900">{sale.amount.replace('$', '₹')}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase">{sale.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>


                                <div className="premium-card p-6 shadow-none">
                                    <h2 className="text-lg font-bold mb-6">Sales Analytics</h2>
                                    <div className="h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={analyticsData}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                                <YAxis axisLine={false} tickLine={false} />
                                                <Tooltip
                                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                                />
                                                <Legend />
                                                <Bar dataKey="sales" fill="#9333ea" radius={[4, 4, 0, 0]} />
                                                <Bar dataKey="revenue" fill="#facc15" radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        )}

                        {view === 'events' && (
                            <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-500">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                    <h2 className="text-2xl font-bold">My Events</h2>
                                    <div className="flex items-center gap-3 w-full md:w-auto">
                                        <div className="relative flex-1 md:w-64">
                                            <SearchBarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Search my events..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 font-medium text-sm"
                                            />
                                        </div>
                                        <button
                                            onClick={() => setView('create')}
                                            className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 whitespace-nowrap"
                                        >
                                            <Plus className="w-4 h-4" />
                                            New Event
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    {events
                                        .filter(e => e.title.toLowerCase().includes(searchTerm.toLowerCase()))
                                        .map((event) => (
                                            <EventManagementCard
                                                key={event.id}
                                                event={event}
                                                onEmail={() => {
                                                    setSelectedEventId(event.id);
                                                    setView('email');
                                                }}
                                            />
                                        ))}
                                </div>
                            </div>
                        )}

                        {view === 'create' && <CreateEventForm onComplete={() => setView('events')} />}
                        {view === 'email' && (
                            <CommunicationTool
                                events={events}
                                initialEventId={selectedEventId}
                                onBack={() => {
                                    setSelectedEventId('');
                                    setView('overview');
                                }}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

const EventManagementCard = ({ event, onEmail }) => {
    const totalTickets = (event.ticketTiers || []).reduce((sum, tier) => sum + (tier.total || 0), 0);
    const soldTickets = (event.ticketTiers || []).reduce((sum, tier) => sum + ((tier.total || 0) - (tier.available || 0)), 0);
    const revenue = (event.ticketTiers || []).reduce((sum, tier) => sum + ((tier.total || 0) - (tier.available || 0)) * (tier.price || 0), 0);


    return (
        <div className="premium-card p-6 shadow-none overflow-hidden group">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-48 h-32 flex-shrink-0">
                    <img src={event.bannerImage} alt={event.title} className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute top-2 right-2">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${event.approved ? 'bg-green-500 text-white' : 'bg-yellow-400 text-purple-900'
                            }`}>
                            {event.approved ? 'Approved' : 'Pending'}
                        </span>
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{event.title}</h3>
                    <p className="text-gray-500 text-sm mb-4">{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold mb-1">Tickets Sold</p>
                            <div className="flex items-end gap-1">
                                <p className="text-xl font-bold text-gray-900">{soldTickets}</p>
                                <p className="text-xs text-gray-400 mb-1">/ {totalTickets}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold mb-1">Revenue</p>
                            <p className="text-xl font-bold text-purple-600">₹{revenue.toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={onEmail}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                        >
                            <Mail className="w-4 h-4" />
                            Email Attendees
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-600">
                            <QrCode className="w-4 h-4" />
                            Check-in App
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CreateEventForm = ({ onComplete }) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Music',
        date: '',
        time: '',
        venue: '',
        location: '',
        bannerImage: '',
    });

    const [ticketTiers, setTicketTiers] = useState([
        { name: 'General Admission', price: 0, total: 0, features: ['Entry to event'] },
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newEvent = {
            ...formData,
            organizerId: user?.id,
            organizerName: user?.name,
            featured: false,
            approved: false, // Needs Admin approval
            ticketTiers: ticketTiers.map(t => ({
                ...t,
                available: t.total
            })),
            schedule: ['TBA'],
            speakerBios: ['TBA']
        };

        try {
            await eventService.createEvent(newEvent);
            toast.success('Event submitted for review! You will be notified once approved.');
            onComplete();
        } catch (error) {
            console.error('Failed to create event:', error);
            toast.error('Failed to create event. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900">Create New Event</h2>

            <div className="premium-card p-8 shadow-none space-y-8 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all font-medium"
                            placeholder="My Awesome Event"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all font-medium"
                        >
                            <option value="Music">Music & Concerts</option>
                            <option value="Tech">Technology & Code</option>
                            <option value="Art">Art & Culture</option>
                            <option value="Business">Business & Networking</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description (Markdown supported)</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all resize-none font-medium"
                        placeholder="Tell the world about your event..."
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all font-medium"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                        <input
                            type="time"
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all font-medium"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Venue Name</label>
                        <input
                            type="text"
                            value={formData.venue}
                            onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all font-medium"
                            placeholder="Grand Hall"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location/Address</label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all font-medium"
                            placeholder="New York, NY"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Banner Image URL</label>
                    <input
                        type="url"
                        value={formData.bannerImage}
                        onChange={(e) => setFormData({ ...formData, bannerImage: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all font-medium font-mono text-sm"
                        placeholder="https://images.unsplash.com/photo-..."
                        required
                    />
                </div>


                <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold">Ticket Tiers</h3>
                        <button
                            type="button"
                            onClick={() => setTicketTiers([...ticketTiers, { name: '', price: 0, total: 0, features: [] }])}
                            className="text-purple-600 hover:text-purple-700 flex items-center gap-1 font-bold text-sm"
                        >
                            <Plus className="w-4 h-4" />
                            Add Tier
                        </button>
                    </div>

                    {ticketTiers.map((tier, index) => (
                        <div key={index} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 animate-in slide-in-from-right-5 duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Tier Name</label>
                                    <input
                                        type="text"
                                        placeholder="Business VIP"
                                        value={tier.name}
                                        onChange={(e) => {
                                            const newTiers = [...ticketTiers];
                                            newTiers[index].name = e.target.value;
                                            setTicketTiers(newTiers);
                                        }}
                                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all font-medium"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Price (₹)</label>
                                    <input
                                        type="number"
                                        placeholder="99"
                                        value={tier.price}
                                        onChange={(e) => {
                                            const newTiers = [...ticketTiers];
                                            newTiers[index].price = parseInt(e.target.value);
                                            setTicketTiers(newTiers);
                                        }}
                                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all font-medium"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Total Capacity</label>
                                    <input
                                        type="number"
                                        placeholder="500"
                                        value={tier.total}
                                        onChange={(e) => {
                                            const newTiers = [...ticketTiers];
                                            newTiers[index].total = parseInt(e.target.value);
                                            setTicketTiers(newTiers);
                                        }}
                                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all font-medium"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex gap-4 pt-6 border-t font-medium">
                    <button
                        type="button"
                        onClick={onComplete}
                        className="flex-1 px-6 py-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all text-gray-600"
                    >
                        Save Draft
                    </button>
                    <button
                        type="submit"
                        className="flex-1 px-10 py-4 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transition-all shadow-xl shadow-purple-200"
                    >
                        Publish for Review
                    </button>
                </div>
            </div>
        </form>
    );
};

const CommunicationTool = ({ events, initialEventId, onBack }) => {
    const [selectedEvent, setSelectedEvent] = useState(initialEventId || events[0]?.id || '');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!selectedEvent) return;

        setSending(true);
        try {
            // 1. Fetch all bookings for this event
            const bookings = await bookingService.getEventBookings(selectedEvent);

            if (!bookings || bookings.length === 0) {
                toast.error('No attendees found for this event.');
                setSending(false);
                return;
            }

            // 2. Extract unique emails
            const emails = [...new Set(bookings.map(b => b.userEmail))];

            // 3. Send emails
            let successCount = 0;
            for (const email of emails) {
                try {
                    await notificationService.sendEmail({
                        to: email,
                        subject: subject,
                        body: message
                    });
                    successCount++;
                } catch (err) {
                    console.error(`Failed to send email to ${email}:`, err);
                }
            }

            toast.success(`Broadcasting complete! Sent to ${successCount} attendees.`);
            setSubject('');
            setMessage('');
        } catch (error) {
            console.error('Broadcast failed:', error);
            toast.error('Failed to broadcast emails. Please try again.');
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-500">
            <div className="flex items-center gap-4 mb-2">
                <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h2 className="text-2xl font-bold text-gray-900">Email Broadcast Center</h2>
            </div>

            <div className="premium-card p-8 shadow-none bg-white">
                <form onSubmit={handleSend} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Event</label>
                        <select
                            value={selectedEvent}
                            onChange={(e) => setSelectedEvent(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all font-medium"
                        >
                            {events.map(event => (
                                <option key={event.id} value={event.id}>{event.title}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Important update regarding the event..."
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all font-medium"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Message (Rich Text supported)</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={8}
                            placeholder="Write your announcement here..."
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all resize-none font-medium"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 font-medium">
                        <button
                            type="button"
                            onClick={onBack}
                            className="px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={sending}
                            className="px-10 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-50 transition-all flex items-center gap-2 shadow-lg shadow-purple-200"
                        >
                            {sending ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Mail className="w-4 h-4" />
                                    Broadcast Email
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
