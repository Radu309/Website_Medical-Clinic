package com.project.Clinica.controller;

import com.project.Clinica.model.Profession;
import com.project.Clinica.model.Requirements;
import com.project.Clinica.service.RequirementsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("requirement")
public class RequirementsController {
    private final RequirementsService requirementsService;

    public RequirementsController(RequirementsService requirementsService) {
        this.requirementsService = requirementsService;
    }
    @GetMapping("/all")
    public ResponseEntity<List<Requirements>> getAllRequirements(){
        List<Requirements> requirementsList = requirementsService.findAllRequirements();
        return new ResponseEntity<>(requirementsList, HttpStatus.OK);
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<Requirements> getRequirement(@PathVariable("id") Long id){
        Requirements requirements = requirementsService.findRequirementById(id);
        return new ResponseEntity<>(requirements, HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<Requirements> addRequirement(@RequestBody Requirements requirements){
        Requirements newRequirements = requirementsService.addRequirement(requirements);
        return new ResponseEntity<>(newRequirements, HttpStatus.OK);
    }
    @PutMapping("/update")
    public ResponseEntity<Requirements> updateRequirement(@RequestBody Requirements requirements){
        Requirements newRequirements = requirementsService.updateRequirement(requirements);
        return new ResponseEntity<>(newRequirements, HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteRequirement(@PathVariable("id") Long id){
        requirementsService.deleteRequirement(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
