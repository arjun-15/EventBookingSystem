package com.event.booking.service;

import com.event.booking.client.NotificationClient;
import com.event.booking.model.Booking;
import com.event.booking.repository.BookingRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final NotificationClient notificationClient;

    @Autowired
    public BookingService(BookingRepository bookingRepository, 
                          NotificationClient notificationClient) {
        this.bookingRepository = bookingRepository;
        this.notificationClient = notificationClient;
    }

    public Booking createBooking(Booking booking) {
        booking.setBookingDate(LocalDateTime.now());
        if (booking.getStatus() == null) {
            booking.setStatus("CONFIRMED");
        }
        if (booking.getQrCode() == null) {
            booking.setQrCode(UUID.randomUUID().toString());
        }
        if (booking.getTransactionId() == null) {
            booking.setTransactionId("TXN-" + UUID.randomUUID().toString().substring(0, 8));
        }
        
        Booking savedBooking = bookingRepository.save(booking);
        
        // Asynchronously send email
        java.util.concurrent.CompletableFuture.runAsync(() -> {
            try {
                Map<String, String> emailRequest = new HashMap<>();
                emailRequest.put("to", savedBooking.getUserEmail());
                emailRequest.put("subject", "Booking Confirmed: " + savedBooking.getEventTitle());
                emailRequest.put("body", "Your booking for " + savedBooking.getEventTitle() + " is confirmed.\n" +
                                         "Booking ID: " + savedBooking.getId() + "\n" +
                                         "Total Price: $" + savedBooking.getTotalPrice() + "\n" +
                                         "Please present your QR Code at the venue.");
                notificationClient.sendEmail(emailRequest);
            } catch (Exception e) {
                System.err.println("Failed to send email notification: " + e.getMessage());
            }
        });
        
        return savedBooking;
    }

    public List<Booking> getBookingsByUser(String userId) {
        return bookingRepository.findByUserId(userId);
    }

    public List<Booking> getBookingsByEvent(String eventId) {
        return bookingRepository.findByEventId(eventId);
    }

    public Booking getBookingById(String id) {
        return bookingRepository.findById(id).orElseThrow(() -> new RuntimeException("Booking not found"));
    }
    
    public void cancelBooking(String id) {
        Booking booking = getBookingById(id);
        booking.setStatus("CANCELLED");
        bookingRepository.save(booking);
    }
    
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}
