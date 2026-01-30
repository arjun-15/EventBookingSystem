import React, { useState, useEffect } from 'react';
import { X, Calendar, MapPin, Clock, Users, Share2, Facebook, Twitter, Instagram, Linkedin, LinkedinIcon, CheckSquare, Shield, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { toast } from 'sonner';

export const EventDetailModal = ({ event, onClose }) => {
    const { user } = useAuth();
    const [selectedTier, setSelectedTier] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [showCheckout, setShowCheckout] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600);
    const [timerActive, setTimerActive] = useState(false);

    
    useEffect(() => {
        if (timerActive && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            toast.error('Time expired! Please try again.');
            setShowCheckout(false);
            setTimerActive(false);
            setTimeLeft(600);
        }
    }, [timerActive, timeLeft]);

    const handleSelectTier = (tier) => {
        setSelectedTier(tier);
        setShowCheckout(true);
        setTimerActive(true);
        setTimeLeft(600);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const shareEvent = (platform) => {
        const url = window.location.href;
        const text = `Check out ${event.title}!`;

        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
                break;
            case 'instagram':
                toast.info('Copy link to share on Instagram');
                navigator.clipboard.writeText(url);
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
                break;
        }
    };

    const addToCalendar = () => {
        const startDate = new Date(`${event.date}T${event.time}`);
        const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000); 

        const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.venue)}`;

        window.open(calendarUrl, '_blank');
        toast.success('Opening calendar...');
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto">
                
                <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between z-10">
                    <h2 className="text-2xl">{event.title}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                
                <div className="relative h-64">
                    <img
                        src={event.bannerImage}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                </div>


                <div className="p-6">
                   
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h3 className="text-lg mb-4">Event Details</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-purple-600" />
                                    <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-purple-600" />
                                    <span>{event.time}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-purple-600" />
                                    <span>{event.venue}, {event.location}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Users className="w-5 h-5 text-purple-600" />
                                    <span>Organized by {event.organizerName}</span>
                                </div>
                            </div>

                            
                            <button
                                onClick={addToCalendar}
                                className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                            >
                                <Calendar className="w-4 h-4" />
                                Add to Calendar
                            </button>
                        </div>

                        <div>
                            <h3 className="text-lg mb-4">Share Event</h3>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => shareEvent('facebook')}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#1877F2]/90 transition-all hover:scale-105"
                                >
                                    <Facebook className="w-4 h-4" />
                                    Facebook
                                </button>
                                <button
                                    onClick={() => shareEvent('twitter')}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1DA1F2]/90 transition-all hover:scale-105"
                                >
                                    <Twitter className="w-4 h-4" />
                                    Twitter
                                </button>
                                <button
                                    onClick={() => shareEvent('linkedin')}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-lg hover:bg-[#0A66C2]/90 transition-all hover:scale-105"
                                >
                                    <Linkedin className="w-4 h-4" />
                                    LinkedIn
                                </button>
                            </div>
                        </div>
                    </div>

                    
                    <div className="mb-6">
                        <h3 className="text-lg mb-3">Venue Map</h3>
                        <div className="w-full h-48 bg-gray-100 rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=40.7128,-74.0060&zoom=13&size=800x400&sensor=false')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500 opacity-20"></div>
                            <MapPin className="w-8 h-8 text-purple-600 relative z-10" />
                            <span className="text-sm text-gray-400 relative z-10">{event.venue}, {event.location}</span>
                            <button className="mt-2 text-xs font-medium text-purple-600 hover:underline relative z-10">
                                Open in Google Maps
                            </button>
                        </div>
                    </div>

                    
                    <div className="mb-6">
                        <h3 className="text-lg mb-3">About This Event</h3>
                        <p className="text-gray-600">{event.description}</p>
                    </div>

                    
                    {event.schedule && event.schedule.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-lg mb-3">Event Schedule</h3>
                            <ul className="space-y-2">
                                {event.schedule.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-purple-600">•</span>
                                        <span className="text-gray-600">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    
                    {event.speakerBios && event.speakerBios.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-lg mb-3">Speakers</h3>
                            <ul className="space-y-2">
                                {event.speakerBios.map((bio, index) => (
                                    <li key={index} className="text-gray-600">{bio}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    
                    {!showCheckout ? (
                        <div>
                            <h3 className="text-lg mb-4">Select Your Tickets</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {event.ticketTiers.map((tier) => (
                                    <div
                                        key={tier.id}
                                        className="border rounded-lg p-4 hover:border-purple-600 hover:shadow-lg transition-all"
                                    >
                                        <h4 className="text-lg mb-2">{tier.name}</h4>
                                        <p className="text-3xl text-purple-600 mb-3">${tier.price}</p>
                                        <ul className="space-y-2 mb-4">
                                            {tier.features.map((feature, index) => (
                                                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                                    <span className="text-green-600">✓</span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="text-sm text-gray-500 mb-3">
                                            {tier.available} / {tier.total} available
                                        </p>
                                        <button
                                            onClick={() => handleSelectTier(tier)}
                                            disabled={tier.available === 0 || user?.role !== 'attendee'}
                                            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all duration-300 font-bold shadow-sm hover:shadow-md active:scale-[0.98] disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
                                        >
                                            {user?.role !== 'attendee' ? 'Attendees Only' : tier.available === 0 ? 'Sold Out' : 'Select Ticket'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <CheckoutForm
                            event={event}
                            tier={selectedTier}
                            quantity={quantity}
                            onQuantityChange={setQuantity}
                            timeLeft={formatTime(timeLeft)}
                            onCancel={() => {
                                setShowCheckout(false);
                                setTimerActive(false);
                                setTimeLeft(600);
                            }}
                            onComplete={onClose}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

const CheckoutForm = ({
    event,
    tier,
    quantity,
    onQuantityChange,
    timeLeft,
    onCancel,
    onComplete,
}) => {
    const { user } = useAuth();
    const [attendeeDetails, setAttendeeDetails] = useState([
        { name: '', email: '', phone: '' }
    ]);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        setAttendeeDetails(Array(quantity).fill(null).map(() => ({ name: '', email: '', phone: '' })));
    }, [quantity]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        
        setTimeout(() => {
            const booking = {
                id: Math.random().toString(36).substr(2, 9),
                eventId: event.id,
                eventTitle: event.title,
                userId: user.id,
                userName: user.name,
                userEmail: user.email,
                ticketTierId: tier.id,
                ticketTierName: tier.name,
                quantity,
                totalPrice: tier.price * quantity,
                bookingDate: new Date().toISOString(),
                eventDate: event.date,
                eventTime: event.time,
                venue: event.venue,
                location: event.location,
                qrCode: Math.random().toString(36).substr(2, 9).toUpperCase(),
                status: 'confirmed',
                attendeeDetails,
            };

          
            const storedBookings = localStorage.getItem('bookings');
            const bookings = storedBookings ? JSON.parse(storedBookings) : [];
            bookings.push(booking);
            localStorage.setItem('bookings', JSON.stringify(bookings));

            setIsProcessing(false);
            setIsSuccess(true);
            toast.success(`Payment successful! Tickets sent to ${user.email}`);
        }, 3000);
    };

    if (isSuccess) {
        return (
            <div className="text-center py-12 animate-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckSquare className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
                <p className="text-gray-600 mb-8">
                    Your tickets have been sent to <span className="font-medium">{user.email}</span>
                </p>
                <button
                    onClick={onComplete}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-all font-medium"
                >
                    View My Tickets
                </button>
            </div>
        );
    }

    if (isProcessing) {
        return (
            <div className="text-center py-20">
                <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Processing Secure Payment</h3>
                <p className="text-gray-500 flex items-center justify-center gap-2">
                    <Shield className="w-4 h-4" />
                    Checking with your bank...
                </p>
            </div>
        );
    }

    return (
        <div className="border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg">Complete Your Booking</h3>
                <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg">
                    Time remaining: {timeLeft}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                
                <div>
                    <label className="block text-sm mb-2">Number of Tickets</label>
                    <input
                        type="number"
                        min="1"
                        max={Math.min(10, tier.available)}
                        value={quantity}
                        onChange={(e) => onQuantityChange(parseInt(e.target.value))}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                </div>

                
                {attendeeDetails.map((attendee, index) => (
                    <div key={index} className="border rounded-lg p-4">
                        <h4 className="mb-3">Attendee {index + 1}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={attendee.name}
                                onChange={(e) => {
                                    const newDetails = [...attendeeDetails];
                                    newDetails[index].name = e.target.value;
                                    setAttendeeDetails(newDetails);
                                }}
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={attendee.email}
                                onChange={(e) => {
                                    const newDetails = [...attendeeDetails];
                                    newDetails[index].email = e.target.value;
                                    setAttendeeDetails(newDetails);
                                }}
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                            <input
                                type="tel"
                                placeholder="Phone"
                                value={attendee.phone}
                                onChange={(e) => {
                                    const newDetails = [...attendeeDetails];
                                    newDetails[index].phone = e.target.value;
                                    setAttendeeDetails(newDetails);
                                }}
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                        </div>
                    </div>
                ))}

            
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                        <span>{tier.name} x {quantity}</span>
                        <span>${tier.price * quantity}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between">
                        <span>Total</span>
                        <span className="text-xl">${tier.price * quantity}</span>
                    </div>
                </div>

                
                <div>
                    <label className="block text-sm font-bold text-gray-500 uppercase mb-3">Select Payment Method</label>
                    <div className="grid grid-cols-3 gap-3">
                        {['card', 'paypal', 'transfer'].map((method) => (
                            <button
                                key={method}
                                type="button"
                                onClick={() => setPaymentMethod(method)}
                                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === method ? 'border-purple-600 bg-purple-50' : 'border-gray-100 hover:border-purple-200'
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${paymentMethod === method ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-400'
                                    }`}>
                                    {method === 'card' && <Lock className="w-5 h-5" />}
                                    {method === 'paypal' && <Share2 className="w-5 h-5" />}
                                    {method === 'transfer' && <MapPin className="w-5 h-5" />}
                                </div>
                                <span className={`text-[10px] font-bold uppercase ${paymentMethod === method ? 'text-purple-700' : 'text-gray-400'}`}>
                                    {method === 'card' ? 'Credit Card' : method === 'paypal' ? 'PayPal' : 'Transfer'}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

             
                {paymentMethod === 'card' && (
                    <div className="border rounded-2xl p-6 bg-purple-50/30 border-purple-100 animate-in slide-in-from-top-2 duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-bold text-purple-900">Secure Card Details</h4>
                            <div className="flex gap-2">
                                <Lock className="w-4 h-4 text-purple-600" />
                                <Shield className="w-4 h-4 text-purple-600" />
                            </div>
                        </div>
                        <input
                            type="text"
                            placeholder="Card Number"
                            className="w-full px-4 py-3 rounded-xl border border-purple-100 mb-3 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white"
                            required
                        />
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="text"
                                placeholder="MM/YY"
                                className="px-4 py-3 rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white"
                                required
                            />
                            <input
                                type="text"
                                placeholder="CVV"
                                className="px-4 py-3 rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white"
                                required
                            />
                        </div>
                    </div>
                )}

                {paymentMethod !== 'card' && (
                    <div className="border rounded-2xl p-6 bg-blue-50/30 border-blue-100 text-center animate-in slide-in-from-top-2 duration-300">
                        <p className="text-blue-800 font-medium mb-2">Redirecting to Online Gateway</p>
                        <p className="text-blue-600 text-xs">You will be securely redirected to complete your {paymentMethod} payment after clicking finish.</p>
                    </div>
                )}

                
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all duration-300 font-bold shadow-lg active:scale-[0.98]"
                    >
                        Complete Booking
                    </button>
                </div>
            </form>
        </div>
    );
};
