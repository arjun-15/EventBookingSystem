package com.event.repository;

import com.event.model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {
    List<Event> findByCategory(String category);
    List<Event> findByOrganizerId(String organizerId);
    // List<Event> findByPriceLessThanEqual(double price); // Removed as price field no longer exists
    // Basic search by title
    List<Event> findByTitleContainingIgnoreCase(String title);
}
