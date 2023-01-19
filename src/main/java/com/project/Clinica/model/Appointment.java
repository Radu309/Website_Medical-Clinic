package com.project.Clinica.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Setter
@Getter
public class Appointment implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private Integer hour;
    private String day;

    @ManyToMany
    @JoinTable(
            name = "DOCTOR_APPOINTMENT",
            joinColumns = @JoinColumn(name = "appointment_id"),
            inverseJoinColumns = @JoinColumn(name = "doctor_id")
    )
    @JsonIgnore
    private Set<Doctor> doctorsAppointment = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "CLIENT_APPOINTMENT",
            joinColumns = @JoinColumn(name = "appointment_id"),
            inverseJoinColumns = @JoinColumn(name = "client_id")
    )
    @JsonIgnore
    private Set<Client> clientsAppointment = new HashSet<>();

}
