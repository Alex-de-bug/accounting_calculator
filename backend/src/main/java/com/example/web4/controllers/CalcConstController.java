package com.example.web4.controllers;

import com.example.web4.security.jwt.AuthEntryPoint;
import com.example.web4.security.jwt.AuthTokenFilter;
import com.example.web4.security.jwt.JwtUtils;
import com.example.web4.service.CalcService;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/const")
public class CalcConstController {
    private final CalcService calcService;
    private final JwtUtils jwtUtils;
    private final StringRedisTemplate redisTemplate;
    private static final Logger logger = LoggerFactory.getLogger(CalcConstController.class);

    @Autowired
    public CalcConstController(CalcService calcService, JwtUtils jwtUtils, AuthTokenFilter authTokenFilter, StringRedisTemplate redisTemplate) {
        this.calcService = calcService;
        this.jwtUtils = jwtUtils;
        this.redisTemplate = redisTemplate;
    }

    @PostConstruct
    public void clearRateLimitAttempts() {
        Set<String> keys = redisTemplate.keys("rate_limit_for_calc:*");
        if (keys != null && !keys.isEmpty()) {
            redisTemplate.delete(keys);
        }
        logger.info("Все попытки ограничения частоты запросов были очищены при старте приложения.");
    }

    @GetMapping()
    public ResponseEntity<?> getConst(HttpServletRequest request) {
        String ipAddress = Optional.ofNullable(request.getHeader("X-Forwarded-For"))
                .orElseGet(request::getRemoteAddr);

        if (isRateLimited(ipAddress)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Rate limit exceeded. Try again later.");
        }

        Map<String, Double> constants = calcService.getAllConstants();

        return ResponseEntity.ok(constants);
    }


    @PostMapping()
    public ResponseEntity<?> updateConstants(
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader,
            @RequestBody Map<String, Double> updatedConstants) {

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Authorization header is missing or invalid.");
        }

        String token = authorizationHeader.substring(7);

        if (token.trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token is empty.");
        }

        if (!jwtUtils.validateJwtToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid JWT token.");
        }

        try {
            calcService.updateConstants(updatedConstants);
            return ResponseEntity.ok("Constants updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update constants");
        }
    }

    private boolean isRateLimited(String identifier) {
        String key = "rate_limit_for_calc:" + identifier;
        ValueOperations<String, String> operations = redisTemplate.opsForValue();


        String countStr = operations.get(key);
        int count = countStr == null ? 0 : Integer.parseInt(countStr);

        if (count >= 20) {
            return true;
        }
        logger.info("{} count:{}", identifier, count);

        operations.increment(key);
        redisTemplate.expire(key, Duration.ofMinutes(30));

        return false;
    }

}

