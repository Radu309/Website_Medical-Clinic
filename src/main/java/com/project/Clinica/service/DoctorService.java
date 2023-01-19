package com.project.Clinica.service;

import com.project.Clinica.exception.UserNorFountException;
import com.project.Clinica.model.Client;
import com.project.Clinica.model.Doctor;
import com.project.Clinica.model.Profession;
import com.project.Clinica.repository.DoctorRepo;
import com.project.Clinica.repository.ProfessionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
public class DoctorService {
    private final DoctorRepo doctorRepo;

    @Autowired
    public DoctorService(DoctorRepo doctorRepo) {
        this.doctorRepo = doctorRepo;
    }
    public boolean authenticateDoctor(Doctor doctor){
        BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder();
        Optional<Doctor> opDoctor = doctorRepo.findDoctorByEmail(doctor.getEmail());
        if(opDoctor.isPresent()){
            Doctor newDoctor = opDoctor.get();
            return bCrypt.matches(doctor.getPassword(), newDoctor.getPassword());
        }
        return false;
    }
    public Doctor addDoctor (Doctor doctor){
        doctor.setDoctorCode(String.valueOf(UUID.randomUUID()));

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        doctor.setPassword(passwordEncoder.encode(doctor.getPassword()));
        return doctorRepo.save(doctor);
    }
    public List<Doctor> findAllDoctors(){
        return doctorRepo.findAll();
    }
    public Doctor updateDoctor(Doctor doctor){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        doctor.setPassword(passwordEncoder.encode(doctor.getPassword()));
        return doctorRepo.save(doctor);
    }
    public Doctor findDoctorById(Long id){
        return doctorRepo.findDoctorById(id).orElseThrow(() ->
                new UserNorFountException("Doctor by id "+ id + "was not found"));
    }
    public void deleteDoctor(Long id){
        doctorRepo.deleteDoctorById(id);
    }

}
