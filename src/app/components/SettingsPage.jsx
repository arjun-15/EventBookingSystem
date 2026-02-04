import React, { useState } from 'react';
import { User, Bell, Shield, Mail, MessageSquare, ChevronRight, Save, HelpCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { toast } from 'sonner';

export const SettingsPage = () => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState(true);
    const [marketingEmail, setMarketingEmail] = useState(false);
    const [language, setLanguage] = useState('English');

    const handleSave = () => {
        toast.success('Settings saved successfully!');
    };

    const contactAdmin = () => {
        const subject = encodeURIComponent(`Help Request from ${user.name}`);
        const body = encodeURIComponent(`Hi Admin,\n\nI need help with...`);
        window.location.href = `mailto:admin@eventhub.com?subject=${subject}&body=${body}`;
        toast.info('Opening your email client...');
    };

    return (
        <div className="animate-in fade-in duration-500">
            <div className="mb-8">
                <h1 className="text-3xl mb-2 font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500 font-medium">Manage your account and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               
                <div className="lg:col-span-1 space-y-4">
                    <div className="premium-card p-6 shadow-none flex items-center gap-4">
                        <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                            {user?.name?.[0]?.toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">{user?.name}</h2>
                            <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
                        </div>
                    </div>

                    <div className="premium-card p-2 shadow-none flex flex-col gap-1">
                        {[
                            { icon: User, label: "Profile", active: true },
                            { icon: Bell, label: "Notifications" },
                            { icon: HelpCircle, label: "Help & Support" },
                        ].map((item) => (
                            <button
                                key={item.label}
                                className={`flex items-center justify-between p-3 rounded-xl transition-all ${item.active ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-semibold">{item.label}</span>
                                </div>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        ))}
                    </div>

                    
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-3xl text-white shadow-xl shadow-purple-200">
                        <h3 className="text-lg font-bold mb-2">Need Help?</h3>
                        <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
                            Our support team is available 24/7 to assist you with any platform issues or event bookings.
                        </p>
                        <button
                            onClick={contactAdmin}
                            className="w-full bg-white text-purple-700 py-3 rounded-xl font-bold hover:bg-yellow-400 hover:text-purple-900 transition-all flex items-center justify-center gap-2"
                        >
                            <Mail className="w-4 h-4" />
                            Email Admin
                        </button>
                    </div>
                </div>

               
                <div className="lg:col-span-2 space-y-6">
                    <div className="premium-card p-8 shadow-none bg-white">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <User className="w-6 h-6 text-purple-600" />
                            Professional Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-sm font-bold text-gray-500 uppercase mb-2">Full Name</label>
                                <input
                                    type="text"
                                    defaultValue={user?.name}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-500 uppercase mb-2">Email Address</label>
                                <input
                                    type="email"
                                    defaultValue={user?.email}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 pt-6 border-t">
                            <Bell className="w-6 h-6 text-purple-600" />
                            Notification Preferences
                        </h3>
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50">
                                <div>
                                    <p className="font-bold text-gray-900">Event Reminders</p>
                                    <p className="text-sm text-gray-500">Get notified 24h before your event starts</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={notifications}
                                        onChange={(e) => setNotifications(e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50">
                                <div>
                                    <p className="font-bold text-gray-900">Marketing Communications</p>
                                    <p className="text-sm text-gray-500">Receive news about upcoming events and deals</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={marketingEmail}
                                        onChange={(e) => setMarketingEmail(e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 font-medium">
                            <button className="px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-gray-600">
                                Reset Changes
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-8 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-100 flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
