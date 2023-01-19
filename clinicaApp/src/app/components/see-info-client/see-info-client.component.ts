import { Component } from '@angular/core';
import {toInteger} from "lodash";
import {Client} from "../services/client";
import {HttpErrorResponse} from "@angular/common/http";
import {ClientService} from "../services/client.service";

@Component({
  selector: 'app-see-info-client',
  templateUrl: './see-info-client.component.html',
  styleUrls: ['./see-info-client.component.css']
})
export class SeeInfoClientComponent {

  public oneClient: Client | undefined;

  constructor(private clientService: ClientService) {
    this.clientService = clientService;
  }

  ngOnInit(){
    this.getOneClient();
    console.log(this.oneClient?.appointmentsClient)
  }

  public getOneClient(): void{
    this.clientService.getClientById(toInteger(localStorage.getItem("Client"))).subscribe(
      (response: Client) => {
        this.oneClient = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }


}
