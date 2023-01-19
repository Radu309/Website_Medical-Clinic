package com.project.Clinica.repository;

import com.project.Clinica.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DoctorRepo extends JpaRepository<Doctor, Long> {
    void deleteDoctorById(Long id);

    Optional<Doctor> findDoctorById(Long id);
    Optional<Doctor> findDoctorByEmail(String email);
}
