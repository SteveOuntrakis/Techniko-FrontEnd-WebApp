import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertyService } from '../../../../../services/property.service';

@Component({
  selector: 'app-property-view',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe],
  templateUrl: './property-view.component.html',
  styleUrl: './property-view.component.css'
})

export class PropertyviewComponent implements OnInit {
  properties: any[] = []; 
  viewPropertyForm!: FormGroup;
  viewMessage: string = '';  

  private propertyService = inject(PropertyService);
  private fb = inject(FormBuilder);

  ngOnInit() {
    this.loadProperties(); 
    this.viewPropertyForm = this.fb.group({
      propertyId: ['', Validators.required]
    });
  }

  loadProperties() {
    this.propertyService.getPropertiesByUserId(1).subscribe((data: any) => {
      this.properties = data.filter((property: any) => !property.deleted);
    });
  }
  viewProperty() {
    const propertyId = this.viewPropertyForm.get('propertyId')?.value;
    const propertyToview = this.properties.find(property => property.id === +propertyId);

    if (propertyToview) {
      this.propertyService.deletePropertyById(propertyId).subscribe({
        next: () => {
          this.viewMessage = `The property with id ${propertyId} in the address ${propertyToview.address} has been successfully removed.`;
          this.loadProperties(); 
        },
        error: err => console.error('Error:', err),
      });
    } else {
      this.viewMessage = `Property with id ${propertyId} not found.`;
    }
  }
}
