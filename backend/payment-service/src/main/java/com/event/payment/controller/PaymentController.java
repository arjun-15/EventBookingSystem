package com.event.payment.controller;

import com.event.payment.model.Payment;
import com.event.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {
	@Autowired

    private  PaymentService paymentService;

    // Step 1: Initiate a payment (called from booking-service after booking is created)
    @PostMapping("/initiate")
    public ResponseEntity<Payment> initiatePayment(@RequestBody Map<String, Object> request) {
        return ResponseEntity.ok(paymentService.initiatePayment(request));
    }

    // Step 2: Process/confirm the payment (simulates gateway callback)
    @PostMapping("/process/{transactionId}")
    public ResponseEntity<Payment> processPayment(@PathVariable String transactionId) {
        return ResponseEntity.ok(paymentService.processPayment(transactionId));
    }

    // Refund a payment
    @PostMapping("/refund/{transactionId}")
    public ResponseEntity<Payment> refundPayment(@PathVariable String transactionId) {
        return ResponseEntity.ok(paymentService.refundPayment(transactionId));
    }

    // Get payment status by transaction ID
    @GetMapping("/{transactionId}")
    public ResponseEntity<Payment> getPayment(@PathVariable String transactionId) {
        return ResponseEntity.ok(paymentService.getPaymentByTransaction(transactionId));
    }

    // Get all payments for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Payment>> getUserPayments(@PathVariable String userId) {
        return ResponseEntity.ok(paymentService.getPaymentsByUser(userId));
    }

    // Get all payments for a booking
    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<List<Payment>> getBookingPayments(@PathVariable String bookingId) {
        return ResponseEntity.ok(paymentService.getPaymentsByBooking(bookingId));
    }
}
