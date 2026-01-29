import React, { useState, useRef } from 'react';
import { ArrowLeft, Download, Share2, Calendar, MapPin, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../context/AuthContext.jsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const AttendeeProfile = ({ onNavigate }) => {
    const { user } = useAuth();
    const [bookings] = useState(() => {
        try {
            const stored = localStorage.getItem('bookings');
            if (!stored) return [];
            const parsed = JSON.parse(stored);
            return Array.isArray(parsed) ? parsed.filter((b) => b.userId === user?.id) : [];
        } catch (error) {
            return [];
        }
    });

    return (
        <div className="min-h-screen bg-transparent">

            {/* Content */}
            <div className="mt-8">
                <div className="mb-8">
                    <h1 className="text-3xl mb-2">My Tickets</h1>
                    <p className="text-gray-600">View and manage your booked tickets</p>
                </div>

                {bookings.length === 0 ? (
                    <div className="bg-white rounded-lg p-12 text-center">
                        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600 text-lg mb-4">No tickets booked yet</p>
                        <button
                            onClick={() => onNavigate('events')}
                            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            Browse Events
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookings.map((booking) => (
                            <TicketCard key={booking.id} booking={booking} />
                        ))}
                    </div>
                )}

                {/* Order History */}
                {bookings.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl mb-6">Order History</h2>
                        <div className="premium-card p-6 overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm">Order ID</th>
                                        <th className="px-6 py-3 text-left text-sm">Event</th>
                                        <th className="px-6 py-3 text-left text-sm">Date</th>
                                        <th className="px-6 py-3 text-left text-sm">Tickets</th>
                                        <th className="px-6 py-3 text-left text-sm">Total</th>
                                        <th className="px-6 py-3 text-left text-sm">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {bookings.map((booking) => (
                                        <tr key={booking.id}>
                                            <td className="px-6 py-4 text-sm text-gray-600">#{booking.id.substring(0, 8)}</td>
                                            <td className="px-6 py-4 text-sm">{booking.eventTitle}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {new Date(booking.bookingDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm">{booking.quantity}</td>
                                            <td className="px-6 py-4 text-sm">${booking.totalPrice}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const TicketCard = ({ booking }) => {
    const ticketRef = useRef(null);
    const [showQR, setShowQR] = useState(false);

    const downloadTicket = async () => {
        if (!ticketRef.current) return;

        try {
            const canvas = await html2canvas(ticketRef.current);
            const imgData = canvas.toDataURL('image/png');

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });

            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save(`ticket-${booking.id}.pdf`);
        } catch (error) {
            alert('Error downloading ticket');
        }
    };

    const shareTicket = () => {
        const shareData = {
            title: `Ticket for ${booking.eventTitle}`,
            text: `I'm attending ${booking.eventTitle}!`,
            url: window.location.href,
        };
        if (navigator.share) {
            navigator.share(shareData);
        } else {
            alert('Sharing not supported');
        }
    };

    const addToCalendar = () => {
        const eventDateStr = booking.eventDate || booking.bookingDate;
        const eventTimeStr = booking.eventTime || "00:00";
        const startDate = new Date(`${eventDateStr}T${eventTimeStr}`);
        const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000); // +3 hours

        const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(booking.eventTitle)}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=Ticket Information: ${booking.ticketTierName}&location=${encodeURIComponent(booking.venue || 'TBA')}`;

        window.open(calendarUrl, '_blank');
    };

    return (
        <div className="premium-card overflow-hidden">
            <div ref={ticketRef} className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-xl mb-1">{booking.eventTitle}</h3>
                        <p className="text-sm text-gray-600">{booking.ticketTierName} • {booking.quantity} Ticket(s)</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        {booking.status}
                    </span>
                </div>

                {/* Perforation Effect */}
                <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="h-[2px] flex-1 border-t-2 border-dashed border-gray-200"></div>
                    <div className="w-4 h-4 rounded-full bg-transparent border-2 border-gray-100 -mr-8 -ml-8"></div>
                    <div className="h-[2px] flex-1 border-t-2 border-dashed border-gray-200"></div>
                </div>

                {/* QR Code Section */}
                <div className="flex flex-col items-center">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-4 transition-transform hover:scale-105 duration-300">
                        <QRCodeSVG value={booking.qrCode} size={160} level="H" includeMargin={true} />
                    </div>
                    <div className="bg-gray-100 px-4 py-1.5 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                        Valid Entry Token
                    </div>
                </div>

                <div className="space-y-3 text-sm border-t pt-4">
                    <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        <span>{booking.eventDate ? new Date(booking.eventDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }) : 'Date TBA'} at {booking.eventTime || 'TBA'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4 text-purple-600" />
                        <span>{booking.venue || 'Venue TBA'}</span>
                    </div>
                </div>

                <div className="space-y-2 text-sm mt-4 border-t pt-4">
                    <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Order Reference:</span>
                        <span className="font-mono">#{booking.id.substring(0, 8).toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between items-end">
                        <span className="text-gray-600 font-medium">Total Paid:</span>
                        <span className="text-xl font-bold text-gray-900">${booking.totalPrice}</span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="border-t p-4 flex gap-2">
                <button
                    onClick={downloadTicket}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                    <Download className="w-4 h-4" />
                    Download
                </button>
                <button
                    onClick={shareTicket}
                    className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <Share2 className="w-4 h-4" />
                </button>
                <button
                    onClick={addToCalendar}
                    className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    title="Add to Calendar"
                >
                    <Calendar className="w-4 h-4" />
                </button>
            </div>

            {/* Attendee Details */}
            <div className="border-t p-4">
                <h4 className="text-sm mb-2">Attendees</h4>
                <div className="space-y-2">
                    {(booking.attendeeDetails || []).map((attendee, index) => (
                        <div key={index} className="text-sm text-gray-600">
                            {index + 1}. {attendee.name} - {attendee.email}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
