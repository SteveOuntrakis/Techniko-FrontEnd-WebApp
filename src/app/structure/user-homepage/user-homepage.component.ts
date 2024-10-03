import { Component, inject, OnInit } from '@angular/core';
import { PropertyOwnerService } from '../../services/property-owner.service';
import { PropertyOwnerComponent } from "./property-owner/property-owner.component";
import { AdminComponent } from "../admin-homepage/admin/admin.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { PropertyRepairService } from '../../services/property-repair.service';

@Component({
  selector: 'app-user-homepage',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive,PropertyOwnerComponent,AdminComponent],
  templateUrl: './user-homepage.component.html',
  styleUrl: './user-homepage.component.css'
})
export class UserHomepageComponent implements OnInit{
  user: any = {};  // Replace with proper User model
  properties: any[] = [];  // Replace with Property model
  pendingRepairs: any[] = [];  // Replace with Repair model

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
      this.properties = data.filter((property: any) => !property.deleted);
    });
  }

  loadPendingRepairs() {
    this.repairService.findPendingRepairsByProperty(1).subscribe(data => {
      this.pendingRepairs = data.filter((repair: any) => !repair.deleted);;
    });
  }
}