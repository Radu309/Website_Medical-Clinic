import {Component, OnInit} from '@angular/core';
import {Doctor} from "../services/doctor";
import {DoctorService} from "../services/doctor.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ProfessionService} from "../services/profession.service";
import {Profession} from "../services/profession";
import {Router} from "@angular/router";
import {RequirementsService} from "../services/requirements.service";
import {Requirements} from "../services/requirements";

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit{

  public doctors: Doctor[] = [];
  public doctors2: Doctor[] = [];
  public professions: Profession[] = [];
  public requirements: Requirements[] = [];
  public newRequirements: Requirements[] = [];

  public totalCost: number = 0;
  public selectForSearch: string = "";
  public selectProfession: string = "";
  public selectRequirement: string = "";
  public receiptFile: string = "Receipt";
  public oneDoctor: Doctor = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    imageUrl: "",
    doctorCode: "",
    professions: [],
    appointmentsDoctor: [],
  };
  public oneProfession: Profession = {
    id: 0,
    name: "",
    requirementsSet: [],
    doctors: []
  }
  public oneRequirement: Requirements = {
    cost: 0,
    id: 0,
    name: "",
    time: 0
  }

  constructor(private router: Router,
              private doctorService: DoctorService,
              private professionService: ProfessionService,
              private requirementService: RequirementsService){
    this.doctorService = doctorService;
    this.professionService = professionService;
    this.requirementService = requirementService;
  }

  ngOnInit(){
    this.getOneDoctor();
    this.getDoctors();
    this.getRequirements();
    this.getAllProfessions();
  }
  public clickOnSeeMoreButton(doctor: Doctor): void{
    this.oneDoctor = doctor;
  }
  public clickOnSearchButton():void {
    this.doctors = [];
    this.doctors2?.forEach(val => this.doctors.push(Object.assign({}, val)));
    var n = this.doctors?.length;
    if(this.doctors != undefined && n!= undefined) {
      for(var i = 0; i < n; i++){
        let doc = this.doctors.shift();
        if(doc != undefined) {
          for (let prof of doc.professions) {
            if (this.selectForSearch == prof.name) {
              this.doctors?.push(doc);
            }
          }
        }
      }
    }
    else
      console.log("error");
  }
  public clickOnSchedule(pageName: string): void {
      if (this.selectProfession != "" && this.selectRequirement != "") {
        if(localStorage.getItem("totalCost") == null)
          localStorage.setItem("totalCost", this.totalCost.toString());
        else{
          this.totalCost = Number(localStorage.getItem("totalCost"));
          localStorage.setItem("totalCost",this.totalCost.toString());
        }
        localStorage.setItem("Doctor", this.oneDoctor.id.toString());
        localStorage.setItem("Profession", this.oneProfession.id.toString());
        localStorage.setItem("Requirement", this.oneRequirement.id.toString());
        this.router.navigate([`${pageName}`]);
      }
  }
  public clickOnReceipt(){
    this.totalCost = Number(localStorage.getItem("totalCost"));
    console.log(this.totalCost);
  }
  public saveProfession($event: any): void {
    for(let prof of this.professions)
      if ((prof.name) == this.selectProfession)
        this.oneProfession = prof;
    this.newRequirements = this.oneProfession.requirementsSet;
  }
  public saveRequirement($event: any): void {
    for(let req of this.requirements)
      if(req.name == this.selectRequirement)
        this.oneRequirement = req;
  }

  public getDoctors(): void {
    this.doctorService.getDoctors().subscribe(
      (response: Doctor[]) => {
        this.doctors = response;
        this.doctors2 = response;
        },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      )
  }
  public getRequirements(): void {
    this.requirementService.getRequirements().subscribe(
      (response: Requirements[]) => {
        this.requirements = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  public getAllProfessions(): void {
    this.professionService.getProfession().subscribe(
      (response: Profession[]) => {
        this.professions = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  public getOneDoctor(): void {
    this.doctorService.getDoctorById(1).subscribe(
      (response: Doctor) => {
        this.oneDoctor = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
