import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from "@angular/router";
import { ClientsComponent } from './components/clients/clients.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule} from "@angular/forms";
import { FirstPageComponent } from './components/home/first-page.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { SeeInfoClientComponent } from './components/see-info-client/see-info-client.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    RegisterComponent,
    LoginComponent,
    FirstPageComponent,
    DoctorsComponent,
    ScheduleComponent,
    SeeInfoClientComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
