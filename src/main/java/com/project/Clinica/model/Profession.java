package com.project.Clinica.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Setter
@Getter
public class Profession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String name;
    @ManyToMany
    @JoinTable(
            name = "DOCTOR_PROFESSION",
            joinColumns = @JoinColumn(name = "profession_id"),
            inverseJoinColumns = @JoinColumn(name = "doctor_id")
    )
    @JsonIgnore
    private Set<Doctor> doctors = new HashSet<>();

    @OneToMany(mappedBy = "professionRequirement", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Requirements> requirementsSet = new HashSet<>();

    public Profession() {}
    public Profession(String name, Set<Doctor> doctors, Set<Requirements> requirementsSet) {
        this.name = name;
        this.doctors = doctors;
        this.requirementsSet = requirementsSet;
    }
}
