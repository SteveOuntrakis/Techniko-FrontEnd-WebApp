import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertyRepairService } from '../../../../../../services/property-repair.service';
import { PropertyService } from '../../../../../../services/property.service';
import { JsonPipe } from '@angular/common';
import { Property } from '../../../../../../models/property';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-repairs',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe],
  templateUrl: './property-repairs.component.html',
  styleUrl: './property-repairs.component.css'
})
export class PropertyRepairsComponent implements OnInit {
  createRepairForm!: FormGroup;
  property!: Property; 
  private repairService = inject(PropertyRepairService);
  private propertyService = inject(PropertyService);
  viewMessage: string = '';  
  router =inject(Router);

  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.createRepairForm = this.fb.group({
      shortDescription: ['', Validators.required],
      description: [''],
      repairType: [null, Validators.required],
      property: this.fb.group({
        id: [null, Validators.required]
      })
    });

    this.loadProperty();
  }

  get shortDescription() {
    return this.createRepairForm.get('shortDescription');
  }

  get repairType() {
    return this.createRepairForm.get('repairType');
  }

  loadProperty():void {
    this.propertyService.getPropertyById(1).subscribe(data => {
      this.property = data;
      this.createRepairForm.patchValue({ property: { id: this.property.id } });
    });
  }
  goHome(){
    this.router.navigate(['UserHome']);
  }
  
  goProperty(){
    this.router.navigate(['Property/:id']);
  }

  CreateRepair():void {
    if (this.createRepairForm.valid) {

      const date = new Date();

      const repairData = {
        ...this.createRepairForm.value, 
        status: 0, 
        dateSubmitted: date,  
        proposedCost: null, 
        ownerAcceptance: null,
        proposedStartDate: null, 
        proposedEndDate: null
      };
      this.repairService.postPropertyRepair(repairData).subscribe({
        next: () => this.viewMessage = `Your Request has been successfully submitted.`,
        error: err => console.error('Error:', err),
        complete: () => console.log('Property Repair creation complete.')
      });
    }
  }
}
