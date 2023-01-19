package com.project.Clinica.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;

@Entity
@Setter
@Getter
public class Doctor implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String password;
    private String imageUrl;
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String doctorCode;

    @ManyToMany(mappedBy = "doctors")
    private Set<Profession> professions = new HashSet<>();
    @ManyToMany(mappedBy = "doctorsAppointment")
    private Set<Appointment> appointmentsDoctor = new HashSet<>();

    public Doctor() {}
    public Doctor(String firstName, String lastName, String email, String phone,
                  String password, String imageUrl, String doctorCode, Set<Profession> professions) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.imageUrl = imageUrl;
        this.password = password;
        this.doctorCode = doctorCode;
        this.professions = professions;
    }
}


