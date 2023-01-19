package com.project.Clinica.repository;

import com.project.Clinica.model.Requirements;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RequirementsRepo extends JpaRepository<Requirements, Long>{
    void deleteRequirementsById(Long id);

    Optional<Requirements> findRequirementsById(Long id);
}
