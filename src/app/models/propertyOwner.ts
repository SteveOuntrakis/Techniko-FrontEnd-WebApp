import { Property } from "./property";

export class PropertyOwner {
  id!: number;
  username! : string;
  email! : string;
  password!: string;
  name!: string;
  surname!: string;
  vatNumber!: string;
  phoneNumber!: string;
  address!: string;
  deleted!:boolean;
  properties!:Property[];
}