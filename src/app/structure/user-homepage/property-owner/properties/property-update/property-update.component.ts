import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertyService } from '../../../../../services/property.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-property-update',
  standalone: true,
  imports: [JsonPipe,ReactiveFormsModule],
  templateUrl: './property-update.component.html',
  styleUrl: './property-update.component.css'
})
export class PropertyUpdateComponent implements OnInit {

  updatePropertyForm!: FormGroup;
  private service = inject(PropertyService);

  property: any;
  viewMessage:string='';

  fb = inject(FormBuilder);
  

  ngOnInit(): void {
    this.updatePropertyForm = this.fb.group({
      address: ['', [Validators.required]],
      yearOfConstruction: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      propertyType: ['', [Validators.required]]
    });

    this.loadUserData();
  }

  loadUserData() {
    this.service.getPropertyById(3).subscribe(data => {
      this.property = data;
      this.updatePropertyForm.patchValue({
        address: this.property.address,
        yearOfConstruction: this.property.yearOfConstruction,
        propertyType: this.property.propertyType
    });
  })
}

updateProperty() {
  this.service.updateProperty(3,this.updatePropertyForm.value).subscribe({
    next:()=> this.viewMessage = `The Property has successfully been updated.`,
    error: err => console.error('An error occured ${err}'),
    complete: () => console.log('Data fetched.')
  });
}


  get address() {
    return this.updatePropertyForm.get('address');
  }

  get yearOfConstruction() {
    return this.updatePropertyForm.get('yearOfConstruction');
  }

  get propertyType() {
    return this.updatePropertyForm.get('propertyType');
  }
}