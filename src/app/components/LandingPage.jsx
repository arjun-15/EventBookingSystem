import { Calendar, Ticket, Users, Shield, MapPin, ArrowRight } from 'lucide-react';

export const LandingPage = ({ onGetStarted, featuredEvents = [] }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
            
            <div className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
                    <h1 className="text-6xl sm:text-7xl font-extrabold text-white mb-6 animate-fade-in">
                        Event<span className="text-yellow-400">Hub</span>
                    </h1>
                    <p className="text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
                        Your Gateway to Unforgettable Experiences
                    </p>
                    <p className="text-lg text-purple-200 mb-12 max-w-2xl mx-auto">
                        Discover, book, and manage tickets for music festivals, tech conferences, art exhibitions, and more.
                    </p>
                    <button
                        onClick={onGetStarted}
                        className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 px-12 py-4 rounded-full text-xl transition-all transform hover:scale-105 shadow-2xl"
                    >
                        Get Started
                    </button>
                </div>

               
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all">
                            <img
                                src="https://images.unsplash.com/photo-1743791022256-40413c5f019b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwbXVzaWMlMjBldmVudHxlbnwxfHx8fDE3Njc2NjQ0NTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                                alt="Music Events"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                                <h3 className="text-white text-2xl p-6">Music Festivals</h3>
                            </div>
                        </div>
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all">
                            <img
                                src="https://images.unsplash.com/photo-1582192730841-2a682d7375f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29uZmVyZW5jZXxlbnwxfHx8fDE3Njc3NDc1NTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                                alt="Tech Conferences"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                                <h3 className="text-white text-2xl p-6">Tech Conferences</h3>
                            </div>
                        </div>
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all">
                            <img
                                src="https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBleGhpYml0aW9ufGVufDF8fHx8MTc2NzY4MjY4OHww&ixlib=rb-4.1.0&q=80&w=1080"
                                alt="Art Exhibitions"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                                <h3 className="text-white text-2xl p-6">Art Exhibitions</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
            <div className="glass py-20 border-x-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl text-white text-center mb-16">Why Choose EventHub?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="glass p-8 rounded-2xl text-center">
                            <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Calendar className="w-8 h-8 text-purple-900" />
                            </div>
                            <h3 className="text-xl text-white mb-2">Easy Booking</h3>
                            <p className="text-purple-200">Simple and quick ticket booking process</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur p-8 rounded-2xl text-center">
                            <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Ticket className="w-8 h-8 text-purple-900" />
                            </div>
                            <h3 className="text-xl text-white mb-2">Digital Tickets</h3>
                            <p className="text-purple-200">QR code tickets delivered instantly</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur p-8 rounded-2xl text-center">
                            <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-purple-900" />
                            </div>
                            <h3 className="text-xl text-white mb-2">For Everyone</h3>
                            <p className="text-purple-200">Attendees, organizers, and admins</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur p-8 rounded-2xl text-center">
                            <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-purple-900" />
                            </div>
                            <h3 className="text-xl text-white mb-2">Secure & Verified</h3>
                            <p className="text-purple-200">All events are verified and secure</p>
                        </div>
                    </div>
                </div>
            </div>

          
            {featuredEvents.length > 0 && (
                <div className="py-20 bg-black/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-4xl text-white">Highlighted Events</h2>
                            <button
                                onClick={onGetStarted}
                                className="text-yellow-400 hover:text-white transition-colors flex items-center gap-2 font-bold"
                            >
                                View All Events <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredEvents.map((event) => (
                                <div key={event.id} className="premium-card overflow-hidden group hover:scale-[1.02] transition-all duration-500">
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={event.bannerImage}
                                            alt={event.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 right-4 bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                            Featured
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-2xl text-white mb-2 line-clamp-1">{event.title}</h3>
                                        <div className="flex items-center gap-4 text-gray-600 text-sm mb-4">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4 text-purple-600" />
                                                {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4 text-purple-600" />
                                                {event.location}
                                            </div>
                                        </div>
                                        <button
                                            onClick={onGetStarted}
                                            className="w-full bg-white/10 hover:bg-yellow-400 hover:text-purple-900 text-white py-3 rounded-xl transition-all duration-300 font-bold border border-white/20 hover:border-transparent"
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            
            <div className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl text-white mb-6">Ready to Get Started?</h2>
                    <p className="text-xl text-purple-200 mb-8">
                        Join thousands of users discovering amazing events
                    </p>
                    <button
                        onClick={onGetStarted}
                        className="bg-white hover:bg-gray-100 text-purple-900 px-12 py-4 rounded-full text-xl transition-all transform hover:scale-105 shadow-2xl"
                    >
                        Sign Up Now
                    </button>
                </div>
            </div>

            
            <div id="about" className="bg-black/20 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl text-white mb-6">Our Mission</h2>
                            <p className="text-purple-200 text-lg mb-6 leading-relaxed">
                                At EventHub, we believe that life is defined by the experiences we share.
                                Our mission is to bridge the gap between event organizers and passionate attendees,
                                providing a seamless, secure, and transparent ticketing ecosystem.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-white">
                                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                    <span>Founded in 2024 to disrupt the ticketing industry</span>
                                </div>
                                <div className="flex items-center gap-3 text-white">
                                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                    <span>Serving over 100,000 active users monthly</span>
                                </div>
                                <div className="flex items-center gap-3 text-white">
                                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                    <span>Committed to 100% verified and secure transactions</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1540575861501-7c0f110f6f21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxldmVudCUyMG1hbmFnZW1lbnR8ZW58MXx8fHwxNzY3NjY0NDUzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                                alt="Event Management"
                                className="rounded-2xl shadow-2xl"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-yellow-400 p-8 rounded-2xl shadow-xl hidden lg:block">
                                <p className="text-purple-900 font-bold text-3xl">99.9%</p>
                                <p className="text-purple-800 text-sm">Customer Satisfaction</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
            <footer className="bg-purple-950 py-12 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white font-bold">E</div>
                            <span className="font-bold text-xl text-white">Event<span className="text-yellow-400">Hub</span></span>
                        </div>
                        <div className="flex gap-8 text-purple-300 text-sm">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                            <a href="#about" className="hover:text-white transition-colors">About Us</a>
                            <a href="#" className="hover:text-white transition-colors">Contact Support</a>
                        </div>
                        <div className="text-purple-400 text-sm">
                            © 2026 EventHub Inc. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
