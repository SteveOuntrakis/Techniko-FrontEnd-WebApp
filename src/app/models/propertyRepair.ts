export class PropertyRepair {
    id!: number;
    repairType!: string;  // Enum or string depending on your Java entity
    shortDescription!: string;
    description!: string;
    status!: string;  // Enum for status (e.g., "PENDING", "COMPLETED")
    proposedStartDate!: Date;
    proposedEndDate!: Date;
    actualStartDate!: Date;
    actualEndDate!: Date;
    cost!: number;
    propertyId!: number;  // Refers to the property this repair is associated with
  }