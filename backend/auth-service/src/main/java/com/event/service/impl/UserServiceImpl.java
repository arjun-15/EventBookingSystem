package com.event.service.impl;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.event.entity.User;
import com.event.entity.userRole; 
import com.event.repository.UserRepository;
import com.event.service.UserService;
import com.event.utils.JWTUtils;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User getUserByEmail(String email) {
        return userRepository.getUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public ResponseEntity<String> CreateUser(Map<String, String> body) {
        try {
            String email = body.get("email");

            if (userRepository.getUserByEmail(email).isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
            }

            // 1. Capture Role (Default to ATTENDEE)
            String roleStr = body.getOrDefault("role", "ATTENDEE").toUpperCase();
            userRole role;
            try {
                role = userRole.valueOf(roleStr);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid role specified");
            }

            // 2. Create User Object & Set Common Fields
            User user = new User();
            user.setFullName(body.get("fullName")); 
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode(body.get("password")));
            user.setRole(role);

            // 3. Handle Organizer Specific Fields (Only if role is ORGANIZER)
            if (role == userRole.ORGANIZER) {
                user.setAadharNumber(body.get("aadharNumber"));
                user.setContactNumber(body.get("contactNumber")); 
                user.setBusinessLicense(body.get("businessLicense"));
            }

            userRepository.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");

        } catch (Exception e) {
            e.printStackTrace(); 
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> loginUser(Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

        Optional<User> optionalUser = userRepository.getUserByEmail(email);

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        User user = optionalUser.get();

        if (!passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        String token = jwtUtils.generateToken(user.getEmail());

        return ResponseEntity.ok(Map.of(
                "token", token,
                "role", user.getRole(),
                "fullName", user.getFullName(),
                "id", user.getId()
        ));
    }
}
