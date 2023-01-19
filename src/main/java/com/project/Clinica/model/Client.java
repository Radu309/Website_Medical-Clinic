package com.project.Clinica.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Setter
@Getter
public class Client implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private Integer age;
    private String name;
    private String password;
    private String email;
    private String phone;
    private String imageUrl;
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String clientCode;
    @ManyToMany(mappedBy = "clientsAppointment")
    private Set<Appointment> appointmentsClient = new HashSet<>();

    public Client() {}

    public Client(Integer age, String name, String password, String email, String phone, String imageUrl, String clientCode) {
        this.age = age;
        this.name = name;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.imageUrl = imageUrl;
        this.clientCode = clientCode;
    }
}
