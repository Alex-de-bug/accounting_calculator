package com.example.web4.controllers;

import com.example.web4.dto.EmailCredentials;
import com.example.web4.service.EmailService;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.Set;

@Slf4j
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/feedback")
public class EmailController {
    private static final Logger logger = LoggerFactory.getLogger(EmailController.class);
    private final StringRedisTemplate redisTemplate;

    @Autowired
    private EmailService emailService;

    public EmailController(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @PostConstruct
    public void clearRateLimitAttempts() {
        Set<String> keys = redisTemplate.keys("rate_limit_for_email:*");
        if (keys != null && !keys.isEmpty()) {
            redisTemplate.delete(keys);
        }
        logger.info("Все попытки отправки email были очищены при старте приложения.");
    }

    @PostMapping()
    public ResponseEntity<?> loginUser(@Valid @RequestBody EmailCredentials emailCredentials, HttpServletRequest request) {
        String remoteAddress = request.getRemoteAddr();

        if (isRateLimited(remoteAddress)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Rate limit exceeded. Try again later.");
        }
        emailService.sendSimpleMessage(emailCredentials.getEmail(), emailCredentials.getName(), emailCredentials.getMessage());
        return ResponseEntity.ok().body("");
    }

    private boolean isRateLimited(String identifier) {
        String key = "rate_limit_for_email:" + identifier;
        ValueOperations<String, String> operations = redisTemplate.opsForValue();


        String countStr = operations.get(key);
        int count = countStr == null ? 0 : Integer.parseInt(countStr);

        if (count >= 3) {
            return true;
        }
        logger.info("{} count:{}", identifier, count);

        operations.increment(key);
        redisTemplate.expire(key, Duration.ofMinutes(1440));

        return false;
    }
}
