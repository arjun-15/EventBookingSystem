package com.event.booking.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Map;

@FeignClient(name = "auth-service", url = "${auth.service.url:http://localhost:8085}")
public interface AuthClient {
    @GetMapping("/users")
    List<Map<String, Object>> getAllUsers();
}
