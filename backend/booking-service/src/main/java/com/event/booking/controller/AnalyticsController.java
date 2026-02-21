package com.event.booking.controller;

import com.event.booking.service.AnalyticsService;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/analytics")
@RequiredArgsConstructor
public class AnalyticsController {
    @Autowired
    private  AnalyticsService analyticsService;

    @GetMapping("/system-stats")
    public ResponseEntity<Map<String, Object>> getSystemStats() {
        return ResponseEntity.ok(analyticsService.getSystemStats());
    }

    @GetMapping("/organizer/{organizerId}")
    public ResponseEntity<List<Map<String, Object>>> getOrganizerRevenue(@PathVariable String organizerId) {
        return ResponseEntity.ok(analyticsService.getRevenueByOrganizer(organizerId));
    }
}
