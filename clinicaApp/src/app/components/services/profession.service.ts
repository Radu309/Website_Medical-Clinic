import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Profession} from "./profession";

@Injectable({providedIn: 'root'})
export class ProfessionService{
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getProfession():Observable<Profession[]>{
    return this.http.get<Profession[]>(`${this.apiServerUrl}/profession/all`);
  }
  public getProfessionById(professionId: number): Observable<Profession>{
    return this.http.get<Profession>(`${this.apiServerUrl}/profession/find/${professionId}`);
  }
}
