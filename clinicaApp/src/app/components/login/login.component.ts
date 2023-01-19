import {Component, Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {Client} from "../services/client";
import {ClientService} from "src/app/components/services/client.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Appointment} from "../services/appointment";
import {DoctorService} from "../services/doctor.service";
import {Doctor} from "../services/doctor";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{
  clients: Client[] = [];
  doctors: Doctor[] = [];
  constructor(private router: Router,
              private clientService: ClientService,
              private doctorService: DoctorService) {
  }

  ngOnInit() {
    this.getClients();
    this.getDoctors();
  }

  public registerHere(pageName: string): void{
    this.router.navigate([`${pageName}`]);
  }

  public clickLogIn(verifyClientMail: string, verifyClientPassword : string): void{
    for(let client of this.clients){
      if (client.email == verifyClientMail){
        let newClient : Client = client;
        newClient.password = verifyClientPassword;
        this.clientService.authenticateClient(newClient).subscribe(
          (response: Boolean) => {
            console.log(response);
            if(response){
              localStorage.setItem("Client", client.id.toString());
              this.router.navigate([`Home`]);
            }
            else
              alert("Try again");
          },
          (error:HttpErrorResponse)=> {
            alert(error.message)
          })
      }
    }
    for(let doctor of this.doctors){
      if(doctor.email == verifyClientMail){
        let newDoctor : Doctor = doctor;
        newDoctor.password = verifyClientPassword;
        this.doctorService.authenticateDoctor(newDoctor).subscribe(
          (response: Boolean) => {
            console.log(response);
            if(response){
              localStorage.setItem("Doctor", doctor.id.toString());
              this.router.navigate([`Clients`]);
            }
            else
              alert("Try again");
          },
          (error:HttpErrorResponse)=> {
            alert(error.message)
          })
      }
    }
  }

  public getClients(){
    this.clientService.getClients().subscribe(
      (response: Client[]) => {
        this.clients = response;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }
  public getDoctors(){
    this.doctorService.getDoctors().subscribe(
      (response: Doctor[]) => {
        this.doctors = response;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }
}

