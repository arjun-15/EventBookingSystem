package com.event.service;

import com.event.entity.User;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface UserService {
    User getUserByEmail(String email);
    ResponseEntity<String> CreateUser(Map<String, String> body);
    ResponseEntity<?> loginUser(Map<String,String> body);

}
