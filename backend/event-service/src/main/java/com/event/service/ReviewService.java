package com.event.service;

import com.event.model.Review;
import com.event.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public Review createReview(Review review) {
        review.setDate(LocalDateTime.now());
        review.setFlagged(false);
        return reviewRepository.save(review);
    }

    public List<Review> getReviewsByEvent(String eventId) {
        return reviewRepository.findByEventId(eventId);
    }
    
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }
    
    public void toggleFlag(String id) {
        Review review = reviewRepository.findById(id).orElseThrow(() -> new RuntimeException("Review not found"));
        review.setFlagged(!review.isFlagged());
        reviewRepository.save(review);
    }
    
    public void deleteReview(String id) {
        reviewRepository.deleteById(id);
    }
}
