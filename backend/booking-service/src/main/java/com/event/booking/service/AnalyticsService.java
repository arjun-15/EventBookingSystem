package com.event.booking.service;

import com.event.booking.client.AuthClient;
import com.event.booking.client.EventClient;
import com.event.booking.repository.BookingRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AnalyticsService {
    private final BookingRepository bookingRepository;
    private final EventClient eventClient;
    private final AuthClient authClient;

    @Autowired
    public AnalyticsService(BookingRepository bookingRepository, 
                            EventClient eventClient, 
                            AuthClient authClient) {
        this.bookingRepository = bookingRepository;
        this.eventClient = eventClient;
        this.authClient = authClient;
    }

    public Map<String, Object> getSystemStats() {
        Map<String, Object> stats = new HashMap<>();
        try {
            List<Map<String, Object>> events = eventClient.getAllEvents();
            List<Map<String, Object>> users = authClient.getAllUsers();
            long totalBookings = bookingRepository.count();

            // Calculate total revenue from bookings
            // Assuming Booking has a getTotalPrice() method returning double
            double totalRevenue = bookingRepository.findAll().stream()
                    .mapToDouble(booking -> booking.getTotalPrice())
                    .sum();

            double adminCommission = totalRevenue * 0.10;

            stats.put("totalEvents", events != null ? events.size() : 0);
            stats.put("totalUsers", users != null ? users.size() : 0);
            stats.put("totalBookings", totalBookings);
            stats.put("totalRevenue", totalRevenue);
            stats.put("adminCommission", adminCommission);
        } catch (Exception e) {
            // Log error and return strictly 0s for missing services
            stats.put("totalEvents", 0);
            stats.put("totalUsers", 0);
            stats.put("totalBookings", 0);
            stats.put("totalRevenue", 0.0);
            stats.put("adminCommission", 0.0);
            stats.put("error", "Could not fetch stats: " + e.getMessage());
        }
        return stats;
    }

    public List<Map<String, Object>> getRevenueByOrganizer(String organizerId) {
        List<Booking> bookings = bookingRepository.findByOrganizerId(organizerId);
        
        // Group by event title and calculate revenue
        Map<String, Map<String, Object>> eventRevenue = new HashMap<>();
        
        for (Booking booking : bookings) {
            String title = booking.getEventTitle();
            Map<String, Object> stats = eventRevenue.getOrDefault(title, new HashMap<>());
            
            stats.put("eventTitle", title);
            
            double currentRevenue = (double) stats.getOrDefault("revenue", 0.0);
            stats.put("revenue", currentRevenue + booking.getTotalPrice());
            
            int currentTickets = (int) stats.getOrDefault("ticketsSold", 0);
            stats.put("ticketsSold", currentTickets + booking.getQuantity());
            
            eventRevenue.put(title, stats);
        }
        
        return new java.util.ArrayList<>(eventRevenue.values());
    }
}
