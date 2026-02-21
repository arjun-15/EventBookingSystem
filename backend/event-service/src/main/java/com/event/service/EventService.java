package com.event.service;

import com.event.model.Event;
import com.event.repository.EventRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    public Event createEvent(Event event) {
        event.setCreatedAt(LocalDateTime.now());
        event.setUpdatedAt(LocalDateTime.now());
        event.setApproved(false); // Default pending approval
        event.setFeatured(false);
        
        // Ensure ticket tiers have 'available' set if 0
        if (event.getTicketTiers() != null) {
            for (Map<String, Object> tier : event.getTicketTiers()) {
                Object totalObj = tier.get("total");
                Object availObj = tier.get("available");
                
                int total = totalObj instanceof Number ? ((Number) totalObj).intValue() : 0;
                int available = availObj instanceof Number ? ((Number) availObj).intValue() : 0;
                
                if (available == 0 && total > 0) {
                    tier.put("available", total);
                }
            }
        }
        return eventRepository.save(event);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(String id) {
        return eventRepository.findById(id).orElseThrow(() -> new RuntimeException("Event not found"));
    }
    
    public List<Event> getEventsByOrganizer(String organizerId) {
        return eventRepository.findByOrganizerId(organizerId);
    }
    
    public void approveEvent(String id) {
        Event event = getEventById(id);
        event.setApproved(true);
        eventRepository.save(event);
    }
    
    public void toggleFeatured(String id) {
        Event event = getEventById(id);
        event.setFeatured(!event.isFeatured());
        eventRepository.save(event);
    }

    public void updateEvent(String id, Event updatedEvent) {
        Event existing = getEventById(id);
        existing.setTitle(updatedEvent.getTitle());
        existing.setDescription(updatedEvent.getDescription());
        existing.setCategory(updatedEvent.getCategory());
        existing.setBannerImage(updatedEvent.getBannerImage());
        existing.setDate(updatedEvent.getDate());
        existing.setTime(updatedEvent.getTime());
        existing.setVenue(updatedEvent.getVenue());
        existing.setLocation(updatedEvent.getLocation());
        existing.setTicketTiers(updatedEvent.getTicketTiers());
        existing.setSchedule(updatedEvent.getSchedule());
        existing.setSpeakerBios(updatedEvent.getSpeakerBios());
        existing.setUpdatedAt(LocalDateTime.now());
        eventRepository.save(existing);
    }
    
    public void deleteEvent(String id) {
        eventRepository.deleteById(id);
    }
}
