package com.project.Clinica.service;

import com.project.Clinica.exception.UserNorFountException;
import com.project.Clinica.model.Client;
import com.project.Clinica.repository.ClientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ClientService {
    private final ClientRepo clientRepo;
    @Autowired
    public ClientService(ClientRepo clientRepo) {
        this.clientRepo = clientRepo;
    }
    public boolean authenticateClient(Client client){
        BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder();
        Optional<Client> opClient = clientRepo.findClientByEmail(client.getEmail());
        if(opClient.isPresent()){
            Client newClient = opClient.get();
            return bCrypt.matches(client.getPassword(), newClient.getPassword());
        }
        return false;
    }
    public Client addClient (Client client){
        client.setClientCode(String.valueOf(UUID.randomUUID()));

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        client.setPassword(passwordEncoder.encode(client.getPassword()));
        System.out.println(client.getPassword());
        return clientRepo.save(client);
    }

    public List<Client> findAllClients(){
        return clientRepo.findAll();
    }
    public Client updateClient(Client client){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        client.setPassword(passwordEncoder.encode(client.getPassword()));
        return clientRepo.save(client);
    }
    public Client findClientById(Long id){
        return clientRepo.findClientById(id).orElseThrow(() ->
                new UserNorFountException("User by id " + id + "was not found"));
    }
    public void deleteClient(Long id){
        clientRepo.deleteClientById(id);
    }
}
