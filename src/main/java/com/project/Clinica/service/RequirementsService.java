package com.project.Clinica.service;

import com.project.Clinica.exception.UserNorFountException;
import com.project.Clinica.model.Requirements;
import com.project.Clinica.repository.RequirementsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequirementsService {
    private final RequirementsRepo requirementsRepo;

    @Autowired
    public RequirementsService(RequirementsRepo requirementsRepo) {this.requirementsRepo = requirementsRepo;}

    public Requirements addRequirement(Requirements requirement){return requirementsRepo.save(requirement);}
    public List<Requirements> findAllRequirements(){return  requirementsRepo.findAll();}
    public Requirements updateRequirement(Requirements requirements){return requirementsRepo.save(requirements);}
    public Requirements findRequirementById(Long id){
        return requirementsRepo.findRequirementsById(id).orElseThrow(() ->
                new UserNorFountException("Requirement by id" + id + "was not found"));
    }
    public void deleteRequirement(Long id){requirementsRepo.deleteRequirementsById(id);}

}
