import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Doctor} from './doctor';
import {HttpClient} from "@angular/common/http";
import {environment} from "src/environments/environment";
import {Client} from "./client";

@Injectable({providedIn: 'root'})
export class DoctorService{
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getDoctors(): Observable<Doctor[]>{
    return this.http.get<Doctor[]>(`${this.apiServerUrl}/doctor/all`);
  }
  public authenticateDoctor(doctor: Doctor): Observable<Boolean>{
    return this.http.post<Boolean>(`${this.apiServerUrl}/doctor/authenticate`, doctor);
  }
  public getDoctorById(doctorId: number): Observable<Doctor>{
    return this.http.get<Doctor>(`${this.apiServerUrl}/doctor/find/${doctorId}`);
  }
  public addDoctor(doctor: Doctor): Observable<Doctor>{
    return this.http.post<Doctor>(`${this.apiServerUrl}/doctor/add`, doctor);
  }
  public updateDoctor(doctor: Doctor): Observable<Doctor>{
    return this.http.put<Doctor>(`${this.apiServerUrl}/doctor/update`, doctor);
  }
  public deleteDoctor(doctorId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/doctor/delete/${doctorId}`);
  }
}
