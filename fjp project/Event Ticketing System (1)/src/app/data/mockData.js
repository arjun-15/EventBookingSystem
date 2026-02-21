export const mockEvents = [
    {
        id: '1',
        title: 'Summer Music Festival 2026',
        description: 'Experience the biggest music festival of the summer with world-class artists and amazing performances.',
        category: 'Music',
        date: '2026-07-15',
        time: '18:00',
        venue: 'Central Park Arena',
        location: 'New York, NY',
        bannerImage: 'https://images.unsplash.com/photo-1743791022256-40413c5f019b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwbXVzaWMlMjBldmVudHxlbnwxfHx8fDE3Njc2NjQ0NTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
        organizerId: 'org1',
        organizerName: 'MusicEvents Inc.',
        featured: true,
        approved: true,
        ticketTiers: [
            { id: 't1', name: 'Early Bird', price: 99, available: 500, total: 500, features: ['General Admission', 'Free Parking'] },
            { id: 't2', name: 'General', price: 149, available: 1000, total: 1000, features: ['General Admission'] },
            { id: 't3', name: 'VIP', price: 299, available: 100, total: 100, features: ['VIP Lounge', 'Premium Seating', 'Meet & Greet'] },
        ],
        schedule: ['18:00 - Opening Act', '19:30 - Headline Performance', '21:00 - After Party'],
        speakerBios: ['DJ Maxwell - International DJ', 'The Harmonics - Award-winning band'],
    },
    {
        id: '2',
        title: 'Tech Innovation Summit 2026',
        description: 'Join industry leaders and innovators for a day of cutting-edge technology discussions and networking.',
        category: 'Tech',
        date: '2026-08-20',
        time: '09:00',
        venue: 'Convention Center',
        location: 'San Francisco, CA',
        bannerImage: 'https://images.unsplash.com/photo-1582192730841-2a682d7375f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29uZmVyZW5jZXxlbnwxfHx8fDE3Njc3NDc1NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        organizerId: 'org2',
        organizerName: 'TechCon Organizers',
        featured: true,
        approved: true,
        ticketTiers: [
            { id: 't4', name: 'Standard', price: 199, available: 300, total: 300, features: ['All Sessions', 'Lunch'] },
            { id: 't5', name: 'Premium', price: 399, available: 150, total: 150, features: ['All Sessions', 'Workshops', 'Lunch', 'Swag Bag'] },
        ],
        schedule: ['09:00 - Registration', '10:00 - Keynote', '14:00 - Breakout Sessions'],
        speakerBios: ['Dr. Sarah Chen - AI Researcher', 'Mark Johnson - Startup Founder'],
    },
    {
        id: '3',
        title: 'Modern Art Exhibition',
        description: 'Explore contemporary art from emerging and established artists in an immersive gallery experience.',
        category: 'Art',
        date: '2026-06-10',
        time: '11:00',
        venue: 'Metropolitan Gallery',
        location: 'Chicago, IL',
        bannerImage: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBleGhpYml0aW9ufGVufDF8fHx8MTc2NzY4MjY4OHww&ixlib=rb-4.1.0&q=80&w=1080',
        organizerId: 'org3',
        organizerName: 'Art Collective',
        featured: false,
        approved: true,
        ticketTiers: [
            { id: 't6', name: 'General Admission', price: 25, available: 200, total: 200, features: ['Gallery Access'] },
            { id: 't7', name: 'Guided Tour', price: 45, available: 50, total: 50, features: ['Gallery Access', 'Expert Guide', 'Artist Q&A'] },
        ],
    },
];

export const mockBookings = [];

export const mockReviews = [
    {
        id: 'r1',
        eventId: '1',
        userId: 'user1',
        userName: 'John Doe',
        rating: 5,
        comment: 'Amazing event! Great lineup and organization.',
        date: '2026-01-05',
        flagged: false,
    },
    {
        id: 'r2',
        eventId: '1',
        userId: 'user2',
        userName: 'Jane Smith',
        rating: 1,
        comment: 'Terrible experience, very disappointed.',
        date: '2026-01-06',
        flagged: true,
    },
];

export const mockCommissionSettings = {
    adminPercentage: 10,
    organizerPercentage: 90,
};
