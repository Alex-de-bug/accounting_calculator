package com.example.web4.service;

import com.example.web4.dto.AuthorizedUserCredentials;
import com.example.web4.dto.UserCredentials;
import com.example.web4.models.User;
import com.example.web4.repositories.UserRepository;
import com.example.web4.security.jwt.JwtUtils;
import com.example.web4.validators.AuthError;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {
    private final PasswordEncoder encoder;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthorizedUserCredentials loginUser(UserCredentials userCredentials) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userCredentials.getName(), userCredentials.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwtToken = JwtUtils.generateJwtToken(userCredentials.getName());
        return new AuthorizedUserCredentials(userCredentials.getName(), jwtToken);
    }

    public AuthError createUser(UserCredentials userCredentials){
        if(userRepository.findByName(userCredentials.getName()).isPresent()) return AuthError.USER_ALREADY_EXIST;
        User user = new User(userCredentials.encoded(encoder));
        user.setPassword(passwordEncoder.encode(userCredentials.getPassword()));
        log.info("Saving new user with username: {}", user.getUsername());
        userRepository.save(user);
        return null;
    }
}
