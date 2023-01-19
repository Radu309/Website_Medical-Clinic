
package com.project.Clinica.service;

import com.project.Clinica.exception.UserNorFountException;
import com.project.Clinica.model.Doctor;
import com.project.Clinica.model.Profession;
import com.project.Clinica.model.Requirements;
import com.project.Clinica.repository.DoctorRepo;
import com.project.Clinica.repository.ProfessionRepo;
import com.project.Clinica.repository.RequirementsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class ProfessionService {

    private final ProfessionRepo professionRepo;
    private final DoctorRepo doctorRepo;
    private final RequirementsRepo requirementsRepo;

    @Autowired
    public ProfessionService(ProfessionRepo professionRepo, DoctorRepo doctorRepo, RequirementsRepo requirementsRepo) {
        this.professionRepo = professionRepo;
        this.doctorRepo = doctorRepo;
        this.requirementsRepo = requirementsRepo;
    }

    public Profession addProfession(Profession profession){
        return professionRepo.save(profession);
    }
    public List<Profession> findAllProfessions(){return professionRepo.findAll();}
    public Profession updateProfession(Profession profession){return professionRepo.save(profession);}
    public Profession findProfessionById(Long id) {
        return professionRepo.findProfessionById(id).orElseThrow(() ->
                new UserNorFountException("Profession by id" + id + "was n ot found"));
    }
    public void deleteProfession(Long id){professionRepo.deleteProfessionById(id);}

    public Profession doctorWithProfessions(Long doctorId, Long professionId) {
        Set<Doctor> doctorSet = null;
        Profession profession = professionRepo.findById(professionId).get();
        Doctor doctor = doctorRepo.findById(doctorId).get();
        doctorSet = profession.getDoctors();
        doctorSet.add(doctor);
        profession.setDoctors(doctorSet);
        return professionRepo.save(profession);
    }
    public Profession addRequirementToProfession(Long professionId, Long requirementId){
        Profession profession = professionRepo.findById(professionId).get();
        Requirements requirement = requirementsRepo.findRequirementsById(requirementId).get();

        requirement.setProfessionRequirement(profession);
        requirementsRepo.save(requirement);

        Set<Requirements> requirements = profession.getRequirementsSet();
        requirements.add(requirement);
        profession.setRequirementsSet(requirements);

        return professionRepo.save(profession);
    }
}