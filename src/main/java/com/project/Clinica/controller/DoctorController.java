package com.project.Clinica.controller;

import com.project.Clinica.model.Client;
import com.project.Clinica.model.Doctor;
import com.project.Clinica.service.DoctorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctor")
public class DoctorController {
    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Doctor>> getAllDoctors(){
        List<Doctor> doctorList = doctorService.findAllDoctors();
        return new ResponseEntity<>(doctorList, HttpStatus.OK);
    }
    @GetMapping("/find/{idDoctor}")
    public ResponseEntity<Doctor> getDoctor(@PathVariable("idDoctor") Long id){
        Doctor doctor = doctorService.findDoctorById(id);
        return new ResponseEntity<>(doctor, HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<Doctor> addDoctor(@RequestBody Doctor doctor){
        Doctor newDoctor = doctorService.addDoctor(doctor);
        return new ResponseEntity<>(newDoctor, HttpStatus.OK);
    }
    @PutMapping("/update")
    public ResponseEntity<Doctor> updateDoctor(@RequestBody Doctor doctor){
        Doctor newDoctor = doctorService.updateDoctor(doctor);
        return new ResponseEntity<>(newDoctor, HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteDoctor(@PathVariable("id") Long id){
        doctorService.deleteDoctor(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/authenticate")
    public ResponseEntity<Boolean> authenticateClient(@RequestBody Doctor doctor){
        Boolean newDoctor = doctorService.authenticateDoctor(doctor);
        return new ResponseEntity<>(newDoctor, HttpStatus.OK);
    }
}
