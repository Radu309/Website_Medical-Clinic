import {Doctor} from "./doctor";
import {Client} from "./client";

export interface Appointment{
  id : number;
  hour : number;
  day: string;
  doctorsAppointment: Doctor[];
  clientsAppointment: Client[];
}
