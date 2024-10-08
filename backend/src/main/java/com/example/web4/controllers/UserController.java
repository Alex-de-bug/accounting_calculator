package com.example.web4.controllers;

import com.example.web4.dto.AuthorizedUserCredentials;
import com.example.web4.dto.UserCredentials;
import com.example.web4.service.UserService;
import com.example.web4.validators.AuthError;
import com.example.web4.validators.UserValidation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@Slf4j
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/admin/")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> loginUser(@RequestBody UserCredentials userRequest) {
        AuthError authError = new UserValidation().validateUser(userRequest.getName(), userRequest.getPassword());
        if(authError!=null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(authError.getErrorMessage());
        }
        try {
            AuthorizedUserCredentials credentials = userService.loginUser(userRequest);
            return ResponseEntity.ok().body(credentials);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(AuthError.INCORRECT_USERNAME_OR_PASSWORD.getErrorMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserCredentials userRequest) {
        String environmentKey = System.getenv("USER_KEY");

        if (!userRequest.getKey().equals(environmentKey)) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Отказ в доступе");
        }
        AuthError authError = new UserValidation().validateUser(userRequest.getName(), userRequest.getPassword());
        if(authError!=null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(authError.getErrorMessage());
        }
        AuthError userValidation = userService.createUser(userRequest);
        if(userValidation!=null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(userValidation.getErrorMessage());
        }
        return ResponseEntity.ok().body("Success");
    }
}
