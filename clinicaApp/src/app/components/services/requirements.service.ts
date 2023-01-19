import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Requirements} from "./requirements";

@Injectable({providedIn: 'root'})
export class RequirementsService{
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getRequirements():Observable<Requirements[]>{
    return this.http.get<Requirements[]>(`${this.apiServerUrl}/requirement/all`);
  }
  public getRequirementById(requirementId: number): Observable<Requirements>{
    return this.http.get<Requirements>(`${this.apiServerUrl}/requirement/find/${requirementId}`);
  }
}
