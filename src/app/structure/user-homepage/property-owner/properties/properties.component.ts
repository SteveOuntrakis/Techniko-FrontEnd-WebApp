import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PropertyService } from '../../../../services/property.service';
import { PropertyOwnerService } from '../../../../services/property-owner.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})
export class PropertiesComponent implements OnInit{

  viewMessage :string ='';  
  router =inject(Router);
  goHome(){
    this.router.navigate(['UserHome']);
  }
  
  goRepairs(){
    this.router.navigate(['PropertyRepairs']);
  }

  createPropertyForm!: FormGroup;
  owner: any;  // Replace with proper PropertyOwner model
  private propertyService = inject(PropertyService);
  private ownerService = inject(PropertyOwnerService);
  
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.createPropertyForm = this.fb.group({
      address: ['', Validators.required],
      yearOfConstruction: [null, Validators.required],
      propertyType: [null, Validators.required],
      owner: this.fb.group({
        id: [null, Validators.required],  
      })
    });

    this.loadOwner();
  }

  get address() {
    return this.createPropertyForm.get('address');
  }

  get yearOfConstruction() {
    return this.createPropertyForm.get('yearOfConstruction');
  }

  get propertyType() {
    return this.createPropertyForm.get('propertyType');
  }

  loadOwner() {
    this.ownerService.getPropertyOwnerById(1).subscribe(data => {
      this.owner = data;
      this.createPropertyForm.patchValue({ owner: { id: this.owner.id } });
    });
  }

  CreateProperty() {
    if (this.createPropertyForm.valid) {
      this.propertyService.postProperty(this.createPropertyForm.value).subscribe({
        next: () => {
          this.viewMessage = `The Property has been successfully created.`;;
        },
        error: err => console.error('Error:', err),
        complete: () => console.log('Property creation complete.')
      });
    }
  }
}