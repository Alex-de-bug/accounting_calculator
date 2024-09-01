package com.example.web4.service;

import com.example.web4.models.CalcConst;
import com.example.web4.repositories.ConstsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CalcService {
    private final ConstsRepository constsRepository;

    public Map<String, Double> getAllConstants() {
        List<CalcConst> constantsList = constsRepository.findAll();
        return constantsList.stream()
                .collect(Collectors.toMap(
                        CalcConst::getNameConst,
                        CalcConst::getCalcConst
                ));
    }


    public void updateConstants(Map<String, Double> updatedConstants) {
        updatedConstants.forEach((key, value) -> {
            CalcConst constant = constsRepository.findByNameConst(key);
            if (constant != null) {
                constant.setCalcConst(value);
                constsRepository.save(constant);
            }
        });
    }
}
