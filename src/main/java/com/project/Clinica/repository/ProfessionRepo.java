package com.project.Clinica.repository;

import com.project.Clinica.model.Profession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfessionRepo extends JpaRepository<Profession, Long> {
    void deleteProfessionById(Long id);

    Optional<Profession> findProfessionById(Long id);
}
