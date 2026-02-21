package com.event.controller;

import com.event.model.Event;
import com.event.service.EventService;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {
    @Autowired
    private EventService eventService;

    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        return ResponseEntity.ok(eventService.createEvent(event));
    }

    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable String id) {
        return ResponseEntity.ok(eventService.getEventById(id));
    }
    
    @GetMapping("/organizer/{organizerId}")
    public ResponseEntity<List<Event>> getEventsByOrganizer(@PathVariable String organizerId) {
        return ResponseEntity.ok(eventService.getEventsByOrganizer(organizerId));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateEvent(@PathVariable String id, @RequestBody Event event) {
        eventService.updateEvent(id, event);
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/{id}/approve")
    public ResponseEntity<Void> approveEvent(@PathVariable String id) {
        eventService.approveEvent(id);
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/{id}/feature")
    public ResponseEntity<Void> toggleFeatured(@PathVariable String id) {
        eventService.toggleFeatured(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable String id) {
        eventService.deleteEvent(id);
        return ResponseEntity.ok().build();
    }
}
