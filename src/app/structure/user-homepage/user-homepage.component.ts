import { Component, inject, OnInit } from '@angular/core';
import { PropertyOwnerService } from '../../services/property-owner.service';
import { PropertyOwnerComponent } from "./property-owner/property-owner.component";
import { AdminComponent } from "../admin-homepage/admin/admin.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { PropertyRepairService } from '../../services/property-repair.service';
import { PropertyOwner } from '../../models/propertyOwner';
import { Property } from '../../models/property';
import { PropertyRepair } from '../../models/propertyRepair';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-user-homepage',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive,PropertyOwnerComponent,AdminComponent,SlicePipe],
  templateUrl: './user-homepage.component.html',
  styleUrl: './user-homepage.component.css'
})
export class UserHomepageComponent implements OnInit{
  user!: PropertyOwner;  
  properties!: Property[];
  pendingRepairs!: PropertyRepair[];

  constructor(
    private ownerService: PropertyOwnerService,
    private propertyService: PropertyService,
    private repairService: PropertyRepairService
  ) {}

  ngOnInit() {
    this.loadUserData();
    this.loadProperties();
    this.loadPendingRepairs();
  }

  loadUserData() {
    this.ownerService.getPropertyOwnerById(1).subscribe(data => {
      this.user = data;
    });
  }

  loadProperties() {
    this.propertyService.getPropertiesByUserId(1).subscribe(data => {
      this.properties = data.filter((property: Property) => !property.deleted);
    });
  }

  loadPendingRepairs() {
    this.repairService.findPendingRepairsByProperty(1).subscribe(data => {
      this.pendingRepairs = data.filter((repair: PropertyRepair) => !repair.deleted);;
    });
  }
}