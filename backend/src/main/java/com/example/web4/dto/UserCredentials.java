package com.example.web4.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserCredentials {
    private String name;
    private String password;
    private String key;

    public UserCredentials encoded(PasswordEncoder encoder) {
        return new UserCredentials(name, encoder.encode(password), key);
    }
}
