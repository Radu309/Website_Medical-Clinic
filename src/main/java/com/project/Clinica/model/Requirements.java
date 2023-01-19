package com.project.Clinica.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
public class Requirements {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String name;
    private Integer time;
    private Integer cost;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profession_id")
    @JsonIgnore
    private Profession professionRequirement ;

    public Requirements() {}

    public Requirements(String name, Integer time, Integer cost, Profession professionRequirement) {
        this.name = name;
        this.time = time;
        this.cost = cost;
        this.professionRequirement = professionRequirement;
    }
}
