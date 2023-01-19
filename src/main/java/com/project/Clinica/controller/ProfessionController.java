
package com.project.Clinica.controller;

import com.project.Clinica.model.Profession;
import com.project.Clinica.service.ProfessionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/profession")
public class ProfessionController {

    private final ProfessionService professionService;

    public ProfessionController(ProfessionService professionService) {
        this.professionService = professionService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Profession>> getAllProfessions(){
        List<Profession> professionList = professionService.findAllProfessions();
        return new ResponseEntity<>(professionList, HttpStatus.OK);
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<Profession> getProfession(@PathVariable("id") Long id){
        Profession profession = professionService.findProfessionById(id);
        return new ResponseEntity<>(profession, HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<Profession> addProfession(@RequestBody Profession profession){
        Profession newProfession = professionService.addProfession(profession);
        return new ResponseEntity<>(newProfession, HttpStatus.OK);
    }
    @PutMapping("/update")
    public ResponseEntity<Profession> updateProfession(@RequestBody Profession profession){
        Profession newProfession = professionService.updateProfession(profession);
        return new ResponseEntity<>(newProfession, HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProfession(@PathVariable("id") Long id){
        professionService.deleteProfession(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PutMapping("/{professionId}/doctor/{doctorId}")
    public Profession doctorWithProfessions(
            @PathVariable("professionId") Long professionId,
            @PathVariable("doctorId")Long doctorId){

        return professionService.doctorWithProfessions(doctorId, professionId);
    }
    @PutMapping("/{professionId}/requirement/{requirementId}")
    public Profession professionWithRequirement(@PathVariable Long professionId,
                                                @PathVariable Long requirementId){
        return professionService.addRequirementToProfession(professionId,requirementId);
    }
}

