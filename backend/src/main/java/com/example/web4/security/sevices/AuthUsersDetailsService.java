package com.example.web4.security.sevices;


import com.example.web4.controllers.CalcConstController;
import com.example.web4.models.User;
import com.example.web4.repositories.UserRepository;

import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthUsersDetailsService implements UserDetailsService {
    private static final Logger logger = LoggerFactory.getLogger(AuthUsersDetailsService.class);


    private final UserRepository userRepository;

    @Autowired
    public AuthUsersDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByName(username);
        logger.info("Name auth user: {}", user.get().getName());
        if (!user.isPresent())
            throw new UsernameNotFoundException("User Not Found with username: " + username);

        return AuthUsersDetails.build(user.get());
    }

}
