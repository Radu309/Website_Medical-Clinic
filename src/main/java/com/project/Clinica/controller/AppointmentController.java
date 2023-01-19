package com.project.Clinica.controller;

import com.project.Clinica.model.Appointment;
import com.project.Clinica.model.Profession;
import com.project.Clinica.service.AppointmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointment")
public class AppointmentController {
    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Appointment>> getAllAppointments(){
        List<Appointment> appointmentList = appointmentService.findAllAppointments();
        return new ResponseEntity<>(appointmentList, HttpStatus.OK);
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<Appointment> getAppointment(@PathVariable("id") Long id){
        Appointment appointment = appointmentService.findAppointmentById(id);
        return new ResponseEntity<>(appointment, HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<Appointment> addAppointment(@RequestBody Appointment appointment){
        Appointment newAppointment = appointmentService.addAppointment(appointment);
        return new ResponseEntity<>(newAppointment, HttpStatus.OK);
    }
    @PutMapping("/update")
    public ResponseEntity<Appointment> updateAppointment(@RequestBody Appointment appointment){
        Appointment newAppointment = appointmentService.updateAppointment(appointment);
        return new ResponseEntity<>(newAppointment, HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAppointment(@PathVariable("id") Long id){
        appointmentService.deleteAppointment(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PutMapping("/{appointmentId}/doctor/{doctorId}")
    public ResponseEntity<Appointment> doctorsWithAppointments(
            @PathVariable("doctorId") Long doctorId,
            @PathVariable("appointmentId")Long appointmentId){
        System.out.println("here");
        Appointment newAppointment = appointmentService.doctorsWithAppointments(doctorId, appointmentId);
        return new ResponseEntity<>(newAppointment,HttpStatus.OK);
    }
    @PutMapping("/{appointmentId}/client/{clientId}")
    public Appointment clientsWithAppointments(
            @PathVariable("clientId") Long clientId,
            @PathVariable("appointmentId")Long appointmentId){

        return appointmentService.clientsWithAppointments(clientId, appointmentId);
    }
}
