package com.example.web4.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();

        if (to == null || to.isEmpty()) {
            throw new IllegalArgumentException("Recipient email address is missing");
        }
        if (subject == null || subject.isEmpty()) {
            throw new IllegalArgumentException("Email subject is missing");
        }
        if (text == null || text.isEmpty()) {
            throw new IllegalArgumentException("Email text is missing");
        }

        message.setTo("vadim88zhukov@gmail.com");
        message.setSubject("Сайт бухгалтерия отчётность");
        message.setText("Вам пришло сообщение от "+subject+". Указаная почта для ответа: "+to+". Сообщение, которое просили вам передать: "+text);
        message.setFrom("support@zhukov-finance.ru");

        emailSender.send(message);
    }
}
