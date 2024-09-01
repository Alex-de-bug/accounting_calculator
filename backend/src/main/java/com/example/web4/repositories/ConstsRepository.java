package com.example.web4.repositories;

import com.example.web4.models.CalcConst;
import com.example.web4.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConstsRepository extends JpaRepository<CalcConst, Long> {
    CalcConst findByNameConst(String nameConst);
}
