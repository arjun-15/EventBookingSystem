package com.event.notification.service;

import com.event.notification.model.NotificationLog;
import com.event.notification.repository.NotificationLogRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailService {
   @Autowired
    private NotificationLogRepository logRepository;

    public void sendEmail(Map<String, String> request) {
        String to      = request.getOrDefault("to", "");
        String subject = request.getOrDefault("subject", "");
        String body    = request.getOrDefault("body", "");

        // Log to console (replace with JavaMailSender when SMTP is configured)
        System.out.println("=== EMAIL ===");
        System.out.println("To:      " + to);
        System.out.println("Subject: " + subject);
        System.out.println("Body:    " + body);
        System.out.println("=============");

        NotificationLog log = new NotificationLog();
        log.setRecipient(to);
        log.setSubject(subject);
        log.setStatus("SENT");
        log.setSentAt(LocalDateTime.now());
        logRepository.save(log);
    }
}
