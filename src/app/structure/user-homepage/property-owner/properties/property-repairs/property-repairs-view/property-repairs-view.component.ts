import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertyRepairService } from '../../../../../../services/property-repair.service';
import { PropertyRepair } from '../../../../../../models/propertyRepair';

@Component({
  selector: 'app-property-repairs-view',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe],
  templateUrl: './property-repairs-view.component.html',
  styleUrl: './property-repairs-view.component.css'
})
export class PropertyRepairsViewComponent implements OnInit {
  propertyRepairs!: PropertyRepair[];
  viewPropertyRepairForm!: FormGroup;
  viewMessage: string = '';  

  private propertyRepairService = inject(PropertyRepairService);
  private fb = inject(FormBuilder);

  ngOnInit():void {
    this.loadProperties(); 
    this.viewPropertyRepairForm = this.fb.group({
      propertyRepairId: ['', Validators.required]
    });
  }

  loadProperties():void {
    this.propertyRepairService.findRepairsByProperty(1).subscribe((data: PropertyRepair[]) => {
      this.propertyRepairs = data.filter((propertyRepair: PropertyRepair) => !propertyRepair.deleted);
    });
  }
  viewPropertyRepair():void {
    const propertyRepairId = this.viewPropertyRepairForm.get('propertyRepairId')?.value;
    const propertyToview = this.propertyRepairs.find(propertyRepair => propertyRepair.id === +propertyRepairId);

    if (propertyToview) {
      this.propertyRepairService.deletePropertyRepairById(propertyRepairId).subscribe({
        next: () => {
          this.viewMessage = `The repair with id ${propertyRepairId} has been successfully removed.`;
          this.loadProperties(); 
        },
        error: err => console.error('Error:', err),
      });
    } else {
      this.viewMessage = `Property Repair with id ${propertyRepairId} not found.`;
    }
  }
}
