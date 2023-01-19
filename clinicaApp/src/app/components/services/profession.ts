import {Requirements} from "./requirements";
import {Doctor} from "./doctor";

export interface Profession{
  id: number;
  name: string;
  requirementsSet: Requirements[];
  doctors: Doctor[];
}
