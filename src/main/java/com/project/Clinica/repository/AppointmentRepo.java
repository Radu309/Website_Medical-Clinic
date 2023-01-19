package com.project.Clinica.repository;

import com.project.Clinica.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppointmentRepo extends JpaRepository<Appointment, Long> {
        void deleteAppointmentById(Long id);

        Optional<Appointment> findAppointmentById(Long id);
}
