import {Profession} from "./profession";
import {Appointment} from "./appointment";

export interface Doctor{
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  imageUrl: string;
  doctorCode: string;
  professions: Profession[];
  appointmentsDoctor: Appointment[];
}
