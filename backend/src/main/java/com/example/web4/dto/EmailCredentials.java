package com.example.web4.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmailCredentials {
    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email should be valid")
    private String email;
    private String name;
    private String message;
}
