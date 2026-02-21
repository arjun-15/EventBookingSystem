package com.event.booking.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Map;

@FeignClient(name = "event-service", url = "${event.service.url:http://localhost:8082}")
public interface EventClient {
    @GetMapping("/events")
    List<Map<String, Object>> getAllEvents();
}
