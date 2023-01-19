import {Component, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import * as Console from "console";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable({providedIn: 'root'})
export class AppComponent {
  constructor(private router: Router){
  }

  public registerHere(pageName: string): void{
    console.log("MEAASD");
    this.router.navigateByUrl(`${pageName}`);
  }
}
