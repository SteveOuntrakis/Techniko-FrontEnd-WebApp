import { PropertyOwner } from "./propertyOwner";
import { PropertyRepair } from "./propertyRepair";

export class Property {
    id!: number;
    address!: string;
    yearOfConstruction!: string;
    propertyType!: string;  
    ownerId!: number;  
    deleted!: boolean;
    repairs!: PropertyRepair[];  
    owner!: PropertyOwner;
  }