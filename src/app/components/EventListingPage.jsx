import React, { useState } from 'react';
import { Search, Filter, Calendar, MapPin, DollarSign, Share2, LogOut, User, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { mockEvents } from '../data/mockData.js';
import { EventDetailModal } from './EventDetailModal.jsx';

export const EventListingPage = ({ onNavigate }) => {
    const { user, logout } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState([0, 500]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events] = useState(mockEvents);

    const filteredEvents = events.filter((event) => {
        const matchesSearch = (event.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (event.description || '').toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
        const minPrice = Math.min(...event.ticketTiers.map(t => t.price));
        const matchesPrice = minPrice >= priceRange[0] && minPrice <= priceRange[1];
        return matchesSearch && matchesCategory && matchesPrice && event.approved;
    });

    const featuredEvents = filteredEvents.filter(e => e.featured);
    const regularEvents = filteredEvents.filter(e => !e.featured);

    const shareEvent = (event) => {
        const shareData = {
            title: event.title,
            text: event.description,
            url: window.location.href,
        };
        if (navigator.share) {
            navigator.share(shareData);
        } else {
            alert('Share: ' + event.title);
        }
    };

    return (
        <div className="bg-transparent">
            {/* Search and Filters */}
            <div className="mb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="md:col-span-2 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search events..."
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                        </div>

                        {/* Category Filter */}
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        >
                            <option value="All">All Categories</option>
                            <option value="Music">Music</option>
                            <option value="Tech">Tech</option>
                            <option value="Art">Art</option>
                        </select>

                        {/* Price Range */}
                        <div className="flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-gray-400" />
                            <input
                                type="range"
                                min="0"
                                max="500"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                className="flex-1"
                            />
                            <span className="text-sm text-gray-600">${priceRange[1]}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Featured Events */}
                {featuredEvents.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl mb-6">Featured Events</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredEvents.map((event) => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    onSelect={() => setSelectedEvent(event)}
                                    onShare={() => shareEvent(event)}
                                    featured
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Regular Events */}
                <div>
                    <h2 className="text-2xl mb-6">All Events</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {regularEvents.map((event) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                onSelect={() => setSelectedEvent(event)}
                                onShare={() => shareEvent(event)}
                            />
                        ))}
                    </div>
                </div>

                {filteredEvents.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No events found matching your criteria</p>
                    </div>
                )}
            </div>

            {/* Event Detail Modal */}
            {selectedEvent && (
                <EventDetailModal
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
        </div>
    );
};

const EventCard = ({ event, onSelect, onShare, featured }) => {
    const minPrice = Math.min(...event.ticketTiers.map(t => t.price));

    return (
        <div className={`premium-card overflow-hidden ${featured ? 'ring-2 ring-yellow-400' : ''}`}>
            {featured && (
                <div className="bg-yellow-400 text-purple-900 text-center py-1 text-sm">
                    ⭐ Featured Event
                </div>
            )}
            <div className="relative h-48">
                <img
                    src={event.bannerImage}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-3 py-1 bg-white/90 rounded-full text-sm">
                    {event.category}
                </span>
            </div>
            <div className="p-6">
                <h3 className="text-xl mb-2">{event.title}</h3>
                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <MapPin className="w-4 h-4 text-purple-600" />
                        <span>{event.venue}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-gray-900">From ${minPrice}</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={onSelect}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg transition-all duration-300 font-bold shadow-sm hover:shadow-md active:scale-[0.98]"
                    >
                        View Details
                    </button>
                    <button
                        onClick={onShare}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Share2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};
