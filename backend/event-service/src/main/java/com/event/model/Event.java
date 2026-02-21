package com.event.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "events")
public class Event {

    @Id
    private String id;
    private String title;
    private String description;
    private String category; // Music, Tech, Art
    private String bannerImage;
    private String date; // Changed to String to match frontend format (YYYY-MM-DD or similar)
    private String time; // Changed to String
    private String venue; 
    private String location; 
    
    private String organizerName; 
    private String organizerId; 
    
    private boolean approved; 
    private boolean featured;

    private List<Map<String, Object>> ticketTiers; // id, name, price, available, total, features (List)

    private List<String> schedule; 
    private List<String> speakerBios; 
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getBannerImage() {
		return bannerImage;
	}
	public void setBannerImage(String bannerImage) {
		this.bannerImage = bannerImage;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
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
	public String getOrganizerName() {
		return organizerName;
	}
	public void setOrganizerName(String organizerName) {
		this.organizerName = organizerName;
	}
	public String getOrganizerId() {
		return organizerId;
	}
	public void setOrganizerId(String organizerId) {
		this.organizerId = organizerId;
	}
	public boolean isApproved() {
		return approved;
	}
	public void setApproved(boolean approved) {
		this.approved = approved;
	}
	public boolean isFeatured() {
		return featured;
	}
	public void setFeatured(boolean featured) {
		this.featured = featured;
	}
	public List<Map<String, Object>> getTicketTiers() {
		return ticketTiers;
	}
	public void setTicketTiers(List<Map<String, Object>> ticketTiers) {
		this.ticketTiers = ticketTiers;
	}
	public List<String> getSchedule() {
		return schedule;
	}
	public void setSchedule(List<String> schedule) {
		this.schedule = schedule;
	}
	public List<String> getSpeakerBios() {
		return speakerBios;
	}
	public void setSpeakerBios(List<String> speakerBios) {
		this.speakerBios = speakerBios;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}
	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}
    
}
