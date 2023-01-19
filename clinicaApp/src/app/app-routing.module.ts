import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientsComponent} from "./components/clients/clients.component";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {FirstPageComponent} from "./components/home/first-page.component";
import {DoctorsComponent} from "./components/doctors/doctors.component";
import {ScheduleComponent} from "./components/schedule/schedule.component";
import {SeeInfoClientComponent} from "./components/see-info-client/see-info-client.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'LogIn', component: LoginComponent},
  {path: 'Register', component: RegisterComponent},
  {path: 'Clients', component: ClientsComponent},
  {path: 'Doctors', component: DoctorsComponent},
  {path: 'Home', component: FirstPageComponent},
  {path: 'Schedule', component:ScheduleComponent},
  {path: 'InfoClient', component:SeeInfoClientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
