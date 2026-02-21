package com.event.utils;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
@Component
public class JWTUtils {
	private final String secret="BENTENbentenbentenbentenhgdgsdghdsfhsfghfghfghfsghsthsfthsfgbscxhsghsfghsghbsbxcbsdfsgseyujkmbvzet";
	private final long expiration= 1000*60*60;
	private final Key secretKey=Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
	
	public String generateToken(String email) {
		return Jwts.builder()
				   .setSubject(email)
				   .setIssuedAt(new Date(System.currentTimeMillis()))
				   .setExpiration(new Date(System.currentTimeMillis() + expiration))
				   .signWith(secretKey,SignatureAlgorithm.HS384)
				   .compact();
				   	}
	public String extractEmail(String token){
	return 	Jwts.parserBuilder()
				.setSigningKey(secretKey)
				.build()
				.parseClaimsJws(token)
				.getBody()
				.getSubject();

	}
	public boolean validateToken(String token) {
		try {
			extractEmail(token);
            return true;
			} catch (JwtException e) {
			return false;
		}
	}
}
