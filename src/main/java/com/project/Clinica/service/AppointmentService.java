package com.project.Clinica.service;

import com.project.Clinica.exception.UserNorFountException;
import com.project.Clinica.model.Appointment;
import com.project.Clinica.model.Client;
import com.project.Clinica.model.Doctor;
import com.project.Clinica.repository.AppointmentRepo;
import com.project.Clinica.repository.ClientRepo;
import com.project.Clinica.repository.DoctorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class AppointmentService {
    private final AppointmentRepo appointmentRepo;
    private final ClientRepo clientRepo;
    private final DoctorRepo doctorRepo;

    @Autowired
    public AppointmentService(AppointmentRepo appointmentRepo,
                              ClientRepo clientRepo,
                              DoctorRepo doctorRepo) {
        this.appointmentRepo = appointmentRepo;
        this.clientRepo = clientRepo;
        this.doctorRepo = doctorRepo;
    }
    public Appointment addAppointment(Appointment appointment){
        return appointmentRepo.save(appointment);
    }
    public List<Appointment> findAllAppointments(){
        return appointmentRepo.findAll();}
    public Appointment updateAppointment(Appointment appointment){return appointmentRepo.save(appointment);}
    public Appointment findAppointmentById(Long id) {
        return appointmentRepo.findAppointmentById(id).orElseThrow(() ->
                new UserNorFountException("Appointment by id" + id + "was n ot found"));
    }
    public void deleteAppointment(Long id){appointmentRepo.deleteAppointmentById(id);}
    public Appointment clientsWithAppointments(Long clientId, Long appointmentId){
        Set<Client> clientSet = null;
        Appointment appointment = appointmentRepo.findById(appointmentId).get();
        Client client = clientRepo.findById(clientId).get();
        clientSet = appointment.getClientsAppointment();
        clientSet.add(client);
        appointment.setClientsAppointment(clientSet);
        return appointmentRepo.save(appointment);
    }
    public Appointment doctorsWithAppointments(Long doctorId, Long appointmentId){
        Set<Doctor> doctorSet = null;
        Appointment appointment = appointmentRepo.findById(appointmentId).get();
        Doctor doctor = doctorRepo.findById(doctorId).get();
        doctorSet = appointment.getDoctorsAppointment();
        doctorSet.add(doctor);
        appointment.setDoctorsAppointment(doctorSet);
        return appointmentRepo.save(appointment);
    }
}
