import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Appointment} from "./appointment";

@Injectable({providedIn: 'root'})
export class AppointmentService{
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getAllAppointments():Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.apiServerUrl}/appointment/all`);
  }
  public getAppointmentById(appointmentId: number): Observable<Appointment>{
    return this.http.get<Appointment>(`${this.apiServerUrl}/appointment/find/${appointmentId}`);
  }
  public addAppointment(appointment: Appointment): Observable<Appointment>{
    return this.http.post<Appointment>(`${this.apiServerUrl}/appointment/add`, appointment);
  }
  public doctorsWithAppointments(doctorId: number, appointmentId: number): Observable<Appointment>{
    return this.http.put<Appointment>(`${this.apiServerUrl}/appointment/${appointmentId}/doctor/${doctorId}`, null);
  }
  public clientsWithAppointments(clientId: number, appointmentId: number): Observable<Appointment>{
    return this.http.put<Appointment>(`${this.apiServerUrl}/appointment/${appointmentId}/client/${clientId}`, null);
  }
}
