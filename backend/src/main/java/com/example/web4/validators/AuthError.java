package com.example.web4.validators;

import lombok.Getter;

@Getter
public enum AuthError {
    INCORRECT_USERNAME_OR_PASSWORD("Некорректное имя или пароль"),
    INVALID_PASSWORD("Пароль не менее 1 символа и включает только буквы и цифры"),
    INVALID_LOGIN("Логин не менее 1 символа и включает только буквы и цифры"),
    USER_ALREADY_EXIST("Пользователь уже существует, придумайте другое имя"),
    SESSION_EXPIRED("Действие токена истекло");

    private final String errorMessage;

    AuthError(String errorMessage) {
        this.errorMessage = errorMessage;
    }

}