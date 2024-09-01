package com.example.web4.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "calc_constants")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CalcConst {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;
    @Column(name = "name_const")
    private String nameConst;
    @Column(name = "calc_const")
    private Double calcConst;

    public CalcConst(String nameConst, Double calcConst) {
        this.nameConst = nameConst;
        this.calcConst = calcConst;
    }

}
