import { PropertyRepair } from "./propertyRepair";

export class Property {
    id!: number;
    address!: string;
    yearOfConstruction!: number;
    propertyType!: string;  
    ownerId!: number;  
    repairs!: PropertyRepair[];  
  }