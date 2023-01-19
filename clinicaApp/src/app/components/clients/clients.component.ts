import {Component, OnInit} from '@angular/core';
import {Client} from "src/app/components/services/client";
import {ClientService} from "src/app/components/services/client.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  public clients: Client[] = [];
  constructor(private router: Router,
              private clientService: ClientService){
    this.clientService = clientService;
  }

  ngOnInit() {
    this.getClients();
  }

  clickOnSchedule(client: Client) {
    localStorage.setItem("Client", client.id.toString());
    this.router.navigate([`InfoClient`]);

  }

  public getClients(): void {
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
