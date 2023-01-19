import { Component } from '@angular/core';
import {Doctor} from "../services/doctor";
import {HttpErrorResponse} from "@angular/common/http";
import {DoctorService} from "../services/doctor.service";
import {ProfessionService} from "../services/profession.service";
import {toInteger} from "lodash";
import {Profession} from "../services/profession";
import {Appointment} from "../services/appointment";
import {AppointmentService} from "../services/appointment.service";
import {RequirementsService} from "../services/requirements.service";
import {Requirements} from "../services/requirements";
import {Client} from "../services/client";
import {ClientService} from "../services/client.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent {
  public allAppointments: Appointment[];
  public oneDoctor: Doctor | undefined;
  public oneClient: Client | undefined;
  public oneProfession: Profession | undefined;
  public oneRequirement: Requirements | undefined;

  public arrayCalendar: string[][];
  public arrayCalendarColor: string[][];
  public daysInWeek: number[];

  public totalCost: number = Number(localStorage.getItem("totalCost"));
  public free:string = "Free";
  public freeColor:string = "success";
  public busy:string = "Busy";
  public busyColor:string = "danger";
  public waiting:string = "Waiting";
  public waitingColor:string = "warning";

  constructor(private doctorService: DoctorService,
              private professionService: ProfessionService,
              private appointmentService: AppointmentService,
              private requirementsService: RequirementsService,
              private clientService: ClientService){
    this.doctorService = doctorService;
    this.professionService = professionService;
    this.appointmentService = appointmentService;
    this.requirementsService = requirementsService;
    this.clientService = clientService;
    this.allAppointments = [];
    this.arrayCalendar = [];
    this.arrayCalendarColor = [];
    this.daysInWeek = [];
  }
  ngOnInit(){
    this.initCalendar();
    this.getOneDoctor();
    this.getOneClient();
    this.getOneRequirement();
    this.getOneProfession();
    this.getAllAppointments();
  }
  public refresh(): void{
    this.setCalendar();
  }

  public clickForSchedule(i: number, j: number): void{
    if(this.arrayCalendarColor[i][j] == this.busyColor)
      alert("This time is busy");

    if(this.arrayCalendarColor[i][j] == this.freeColor){
      this.arrayCalendarColor[i][j] = this.waitingColor;
      this.arrayCalendar[i][j] = this.waiting;

      if(this.oneRequirement != undefined) {
        this.totalCost += this.oneRequirement?.cost;
        localStorage.setItem("totalCost", this.totalCost.toString());
      }

      var newId = this.findAppointmentId(i+8,this.getDayOfTheNumber(j));
      if(this.oneDoctor != undefined && this.oneClient != undefined) {
        this.setDoctorsWithAppointments(this.oneDoctor.id, newId);
        this.setClientsWithAppointments(this.oneClient.id, newId);
      }
    }
  }
  //random methods
  public getNumberOfTheDay(day: string):number{
    if(day == "Monday")
      return 0;
    if(day == "Tuesday")
      return 1;
    if(day == "Wednesday")
      return 2;
    if(day == "Thursday")
      return 3;
    if(day == "Friday")
      return 4;
    else
      return 5;
  }
  public getDayOfTheNumber(i: number):string{
    if(i == 0)
      return "Monday";
    if(i == 1)
      return "Tuesday";
    if(i == 2)
      return "Wednesday";
    if(i == 3)
      return "Thursday";
    if(i == 4)
      return "Friday";
    else
      return "Saturday";
  }
  public findAppointmentId(hour: number, day:string):number{
    if(this.allAppointments != undefined) {
      for (let app of this.allAppointments) {
        if (app.hour == hour && app.day == day) {
          return app.id;
        }
      }
    }
    return 0;
  }
  //setting calendar
  public initCalendar():void {
    for (var i = 8; i < 16; i++) {
      this.arrayCalendarColor[i-8] = [];
      this.arrayCalendar[i - 8] = [];
      for (var j = 0; j < 6; j++) {
        this.arrayCalendar[i - 8][j] = this.free;
        this.arrayCalendarColor[i - 8][j] = this.freeColor;
      }
    }
  }
  public setCalendar(): void {
    if(this.oneDoctor?.appointmentsDoctor != undefined) {
      for (let appointment of this.oneDoctor?.appointmentsDoctor) {
        this.arrayCalendar[appointment.hour-8][this.getNumberOfTheDay(appointment.day)] = this.busy;
        this.arrayCalendarColor[appointment.hour-8][this.getNumberOfTheDay(appointment.day)] = this.busyColor;
      }
    }
  }
  //methods for storing data from db
  public getAllAppointments(): void {
    this.appointmentService.getAllAppointments().subscribe(
      (response: Appointment[]) => {
         this.allAppointments= response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  public getOneProfession(): void {
    this.professionService.getProfessionById(toInteger(localStorage.getItem("Profession"))).subscribe(
      (response: Profession) => {
        this.oneProfession = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  public getOneRequirement(): void {
    this.requirementsService.getRequirementById(toInteger(localStorage.getItem("Requirement"))).subscribe(
      (response: Requirements) => {
        this.oneRequirement = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  public getOneDoctor(): void{
    this.doctorService.getDoctorById(toInteger(localStorage.getItem("Doctor"))).subscribe(
      (response: Doctor) => {
        this.oneDoctor = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
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
  public setDoctorsWithAppointments(doctorId: number, appointmentId: number){
    this.appointmentService.doctorsWithAppointments(doctorId, appointmentId).subscribe(
      (response: Appointment) =>{
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
    }
    );
  }
  public setClientsWithAppointments(clientId: number, appointmentId: number){
    this.appointmentService.clientsWithAppointments(clientId, appointmentId).subscribe(
      (response: Appointment) =>{
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }
}
