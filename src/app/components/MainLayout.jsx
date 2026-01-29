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
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarInset,
    SidebarRail,
    SidebarTrigger,
    useSidebar,
} from './ui/sidebar.jsx';

export const MainLayout = ({ children, onNavigate, activePage }) => {
    const { user, logout } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');

    const menuItems = [
        {
            title: "Events",
            icon: Calendar,
            page: 'events',
        },
        {
            title: "My Tickets",
            icon: User,
            page: 'profile',
            show: user?.role === 'attendee',
        },
        {
            title: "Dashboard",
            icon: LayoutDashboard,
            page: 'dashboard',
            show: user?.role === 'admin' || user?.role === 'organizer',
        },
        {
            title: "Settings",
            icon: Settings,
            page: 'settings',
        }
    ];

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-gray-50">
                <Sidebar collapsible="icon" className="border-r border-gray-200">
                    <SidebarHeader className="p-4 border-b">
                        <div className="flex items-center gap-3 px-2">
                            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                                E
                            </div>
                            <span className="font-bold text-xl text-purple-900 group-data-[collapsible=icon]:hidden">
                                Event<span className="text-yellow-500">Hub</span>
                            </span>
                        </div>
                    </SidebarHeader>

                    <SidebarContent className="p-2">
                        <SidebarGroup>
                            <SidebarGroupLabel className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400 group-data-[collapsible=icon]:hidden">
                                Main Menu
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {menuItems.filter(item => item.show !== false).map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                onClick={() => onNavigate(item.page)}
                                                isActive={activePage === item.page}
                                                tooltip={item.title}
                                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${activePage === item.page
                                                        ? 'bg-purple-100 text-purple-700'
                                                        : 'text-gray-600 hover:bg-gray-100'
                                                    }`}
                                            >
                                                <item.icon className="w-5 h-5" />
                                                <span className="font-medium group-data-[collapsible=icon]:hidden">{item.title}</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>

                    <SidebarFooter className="p-4 border-t mt-auto">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    onClick={logout}
                                    tooltip="Logout"
                                    className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span className="font-medium group-data-[collapsible=icon]:hidden">Logout</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                    <SidebarRail />
                </Sidebar>

                <SidebarInset className="flex-1 flex flex-col min-w-0 overflow-hidden">
                    {/* Top Header */}
                    <header className="h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-30 shadow-sm">
                        <div className="flex items-center gap-4">
                            <SidebarTrigger className="p-2 hover:bg-gray-100 rounded-lg md:hidden" />
                            <div className="relative max-w-md hidden sm:block">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search events, organizers..."
                                    className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 w-64 transition-all"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>
                            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                                    <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                                </div>
                                <div className="w-9 h-9 bg-gradient-to-tr from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                                    {user?.name?.[0]?.toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Content Area */}
                    <main className="flex-1 overflow-y-auto p-6 lg:p-10 animate-fade-in">
                        <div className="max-w-7xl mx-auto">
                            {children}
                        </div>
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
};
