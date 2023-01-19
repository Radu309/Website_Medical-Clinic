import {Appointment} from "./appointment";

export interface Client{
  id : number;
  imageUrl: string;
  name: string;
  password: string;
  age: number;
  phone: string;
  email: string;
  clientCode: string;
  appointmentsClient: Appointment[];
}
