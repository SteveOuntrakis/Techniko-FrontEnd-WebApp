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
    this.propertyService.getPropertiesByUserId().subscribe(data => {
      this.properties = data;
    });
  }

  loadPendingRepairs() {
    this.repairService.findPendingRepairsByProperty().subscribe(data => {
      this.pendingRepairs = data;
    });
  }
  // private service = inject(PropertyOwnerService);

  // all_property_owners: any;
  // property_owner :any;
  // property_owner_byUsername :any;


  // ngOnInit(): void {

  //   this.service.getAllPropertyOwners().subscribe({
  //     next : response => this.all_property_owners= response,
  //     error: err => console.error(`this error occured : ${err}`)
  //   })

  //   this.service.getPropertyOwnerById().subscribe({
  //     next: response=> this.property_owner = response,
  //     error : err => console.error(`this error occured : ${err}`)      
  //   })

  //   this.service.getPropertyOwnerByUsername().subscribe({
  //     next: response=> this.property_owner_byUsername=response,
  //     error : err => console.error(`this error occured : ${err}`) 
  //   })
  // }
}