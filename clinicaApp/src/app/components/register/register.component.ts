import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Client} from "../services/client";
import {HttpErrorResponse} from "@angular/common/http";
import {ClientService} from "../services/client.service";
import {Appointment} from "../services/appointment";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  clients: Client[] = [];

  constructor(private router: Router,
              private clientService: ClientService){ }

  ngOnInit() {
    this.getClients();
  }
  public clickOnRegisterAccount(setName: String, setEmail : String, setAge : String, setPhone: String,
                                setPassword: String, setGender: String): void{
    if(setGender == "Female")
      setGender = 'https://bootdey.com/img/Content/avatar/avatar3.png';
    else if(setGender == "Male")
      setGender = 'https://bootdey.com/img/Content/avatar/avatar6.png';
    else
      setGender = "";
    console.log(setGender);
    let ok: number = 0;
    console.log(setGender)
    for(let client of this.clients) {
      if (client.email == setEmail || client.phone == setPhone)
        ok = 1;
    }
    if(setName == "" || setAge == "" || setPassword == "" || setEmail == "" || setPhone == "" || setGender == "")
      ok = 1;
    var newID: number = 1 + this.clients.length;
    if(ok == 0) {
      const client : Client = {
        age: 0,
        clientCode: "",
        email: "",
        id: 0,
        imageUrl: "",
        name: "",
        password: "",
        phone: "",
        appointmentsClient: []
      }
      client.age = Number(setAge);
      client.clientCode = '111';
      client.email= String(setEmail);
      client.id = newID;
      client.imageUrl = String(setGender);
      client.name = String(setName);
      client.password = String(setPassword);
      client.phone = String(setPhone);

      this.clientService.addClient(client).subscribe(
        (response: Client) => {
          console.log(response);
          this.getClients();
        },
        (error: HttpErrorResponse) =>{
          alert(error.message);
        }
      );
      this.router.navigate(['LogIn']).then(() => {window.location.reload();});
    }
    else
      alert("Exist an account with this email/phone");
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
}

