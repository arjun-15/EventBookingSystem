import React, { useState } from 'react';
import {
    LayoutDashboard,
    Calendar,
    User,
    LogOut,
    Settings,
    Bell,
    Search,
    Menu
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
export const MainLayout = ({ children, onNavigate, activePage }) => {
    const { user, logout } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [
        { title: "Events", icon: Calendar, page: 'events' },
        { title: "My Tickets", icon: User, page: 'profile', show: user?.role === 'attendee' },
        { title: "Dashboard", icon: LayoutDashboard, page: 'dashboard', show: user?.role === 'admin' || user?.role === 'organizer' },
        { title: "Settings", icon: Settings, page: 'settings' }
    ];

    return (
        <div className="flex min-h-screen w-full bg-gray-50">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200">
                <div className="p-6 border-b">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">E</div>
                        <span className="font-bold text-xl text-purple-900 leading-none">Event<span className="text-yellow-500">Hub</span></span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Main Menu</p>
                    {menuItems.filter(item => item.show !== false).map((item) => (
                        <button
                            key={item.title}
                            onClick={() => onNavigate(item.page)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${activePage === item.page ? 'bg-purple-100 text-purple-700 font-bold' : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.title}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t">
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar (Overlay) */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
                    <aside className="relative w-64 bg-white h-full flex flex-col animate-in slide-in-from-left duration-300">
                        <div className="p-6 border-b">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">E</div>
                                <span className="font-bold text-xl text-purple-900 leading-none">Event<span className="text-yellow-500">Hub</span></span>
                            </div>
                        </div>
                        <nav className="flex-1 p-4 space-y-1">
                            {menuItems.filter(item => item.show !== false).map((item) => (
                                <button
                                    key={item.title}
                                    onClick={() => { onNavigate(item.page); setIsMobileMenuOpen(false); }}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${activePage === item.page ? 'bg-purple-100 text-purple-700 font-bold' : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span>{item.title}</span>
                                </button>
                            ))}
                        </nav>
                        <div className="p-4 border-t">
                            <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                                <LogOut className="w-5 h-5" />
                                <span className="font-medium">Logout</span>
                            </button>
                        </div>
                    </aside>
                </div>
            )}

            <div className="flex-1 flex flex-col min-w-0">
                <header className="h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="p-2 -ml-2 hover:bg-gray-100 rounded-lg md:hidden"
                        >
                            <Menu className="w-6 h-6 text-gray-600" />
                        </button>
                        <div className="relative max-w-md hidden sm:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search events..."
                                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 w-64 transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
                            <Bell className="w-5 h-5" />
                            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                            </div>
                            <div className="w-9 h-9 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-sm">
                                {user?.name?.[0]?.toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-6 lg:p-10">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};
