import { Property } from "./property";

export class PropertyRepair {
    id!: number;
    repairType!: string;
    shortDescription!: string;
    description!: string;
    status!: string;
    proposedStartDate!: Date;
    proposedEndDate!: Date;
    actualStartDate!: Date;
    actualEndDate!: Date;
    cost!: number;
    deleted!:boolean;
    property!: Property;
  }