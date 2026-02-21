package com.event.booking.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Document(collection = "bookings")
public class Booking {

    @Id
    private String id;
    private String userId;
    private String userName;
    private String userEmail;
    
    private String eventId;
    private String eventTitle; 
    private String organizerId;
    private String organizerName;
    private String eventDate;
    private String eventTime;
    private String venue;
    private String location;
    
    private LocalDateTime bookingDate;
    private String status; // CONFIRMED, CANCELLED, PENDING
    private double totalPrice;
    
    private String ticketTierId;
    private String ticketTierName;
    private int quantity;
    
    private List<Map<String, String>> attendeeDetails; // name, email, phone
    
    private String transactionId; 
    private String qrCode;

    // Explicit Default Constructor
    public Booking() {}

    // Explicit All-Args Constructor for @Builder replacement
    public Booking(String id, String userId, String userName, String userEmail, String eventId, String eventTitle, String organizerId, String organizerName, String eventDate, String eventTime, String venue, String location, LocalDateTime bookingDate, String status, double totalPrice, String ticketTierId, String ticketTierName, int quantity, List<Map<String, String>> attendeeDetails, String transactionId, String qrCode) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.eventId = eventId;
        this.eventTitle = eventTitle;
        this.organizerId = organizerId;
        this.organizerName = organizerName;
        this.eventDate = eventDate;
        this.eventTime = eventTime;
        this.venue = venue;
        this.location = location;
        this.bookingDate = bookingDate;
        this.status = status;
        this.totalPrice = totalPrice;
        this.ticketTierId = ticketTierId;
        this.ticketTierName = ticketTierName;
        this.quantity = quantity;
        this.attendeeDetails = attendeeDetails;
        this.transactionId = transactionId;
        this.qrCode = qrCode;
    }

    // Explicit Getters and Setters for compatibility and to ensure IDE sees them if Lombok has issues
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public String getEventId() {
		return eventId;
	}
	public void setEventId(String eventId) {
		this.eventId = eventId;
	}
	public String getEventTitle() {
		return eventTitle;
	}
	public void setEventTitle(String eventTitle) {
		this.eventTitle = eventTitle;
	}
	public String getOrganizerId() {
		return organizerId;
	}
	public void setOrganizerId(String organizerId) {
		this.organizerId = organizerId;
	}
	public String getOrganizerName() {
		return organizerName;
	}
	public void setOrganizerName(String organizerName) {
		this.organizerName = organizerName;
	}
	public String getEventDate() {
		return eventDate;
	}
	public void setEventDate(String eventDate) {
		this.eventDate = eventDate;
	}
	public String getEventTime() {
		return eventTime;
	}
	public void setEventTime(String eventTime) {
		this.eventTime = eventTime;
	}
	public String getVenue() {
		return venue;
	}
	public void setVenue(String venue) {
		this.venue = venue;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public LocalDateTime getBookingDate() {
		return bookingDate;
	}
	public void setBookingDate(LocalDateTime bookingDate) {
		this.bookingDate = bookingDate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public double getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}
	public String getTicketTierId() {
		return ticketTierId;
	}
	public void setTicketTierId(String ticketTierId) {
		this.ticketTierId = ticketTierId;
	}
	public String getTicketTierName() {
		return ticketTierName;
	}
	public void setTicketTierName(String ticketTierName) {
		this.ticketTierName = ticketTierName;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public List<Map<String, String>> getAttendeeDetails() {
		return attendeeDetails;
	}
	public void setAttendeeDetails(List<Map<String, String>> attendeeDetails) {
		this.attendeeDetails = attendeeDetails;
	}
	public String getTransactionId() {
		return transactionId;
	}
	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}
	public String getQrCode() {
		return qrCode;
	}
	public void setQrCode(String qrCode) {
		this.qrCode = qrCode;
	} 
}
