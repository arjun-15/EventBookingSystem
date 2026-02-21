package com.event.payment.service;

import com.event.payment.model.Payment;
import com.event.payment.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentService {
    @Autowired
    private  PaymentRepository paymentRepository;

    public Payment initiatePayment(Map<String, Object> request) {
        Payment payment = new Payment();
        payment.setBookingId((String) request.get("bookingId"));
        payment.setUserId((String) request.get("userId"));
        payment.setEventId((String) request.get("eventId"));

        Object amountObj = request.get("amount");
        payment.setAmount(amountObj instanceof Number ? ((Number) amountObj).doubleValue() : 0.0);

        payment.setCurrency(request.getOrDefault("currency", "INR").toString());
        payment.setMethod((String) request.get("method")); // UPI, CARD, NETBANKING, WALLET
        payment.setStatus("PENDING");
        payment.setTransactionId("TXN-" + UUID.randomUUID().toString().substring(0, 10).toUpperCase());
        payment.setCreatedAt(LocalDateTime.now());
        payment.setUpdatedAt(LocalDateTime.now());

        return paymentRepository.save(payment);
    }

    public Payment processPayment(String transactionId) {
        Payment payment = paymentRepository.findByTransactionId(transactionId)
                .orElseThrow(() -> new RuntimeException("Payment not found: " + transactionId));

        // Simulate payment gateway processing
        boolean isSuccess = Math.random() > 0.05; // 95% success rate simulation
        payment.setStatus(isSuccess ? "SUCCESS" : "FAILED");
        payment.setGatewayReference("GW-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        payment.setUpdatedAt(LocalDateTime.now());

        return paymentRepository.save(payment);
    }

    public Payment refundPayment(String transactionId) {
        Payment payment = paymentRepository.findByTransactionId(transactionId)
                .orElseThrow(() -> new RuntimeException("Payment not found: " + transactionId));

        if (!"SUCCESS".equals(payment.getStatus())) {
            throw new RuntimeException("Only successful payments can be refunded");
        }

        payment.setStatus("REFUNDED");
        payment.setUpdatedAt(LocalDateTime.now());
        return paymentRepository.save(payment);
    }

    public Payment getPaymentByTransaction(String transactionId) {
        return paymentRepository.findByTransactionId(transactionId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }

    public List<Payment> getPaymentsByUser(String userId) {
        return paymentRepository.findByUserId(userId);
    }

    public List<Payment> getPaymentsByBooking(String bookingId) {
        return paymentRepository.findByBookingId(bookingId);
    }
}
