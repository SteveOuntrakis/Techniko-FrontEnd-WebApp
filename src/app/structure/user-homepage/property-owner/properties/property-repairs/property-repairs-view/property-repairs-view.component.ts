import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertyRepairService } from '../../../../../../services/property-repair.service';

@Component({
  selector: 'app-property-repairs-view',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe],
  templateUrl: './property-repairs-view.component.html',
  styleUrl: './property-repairs-view.component.css'
})
export class PropertyRepairsViewComponent implements OnInit {
  propertyRepairs: any[] = []; 
  viewPropertyRepairForm!: FormGroup;
  viewMessage: string = '';  

  private propertyRepairService = inject(PropertyRepairService);
  private fb = inject(FormBuilder);

  ngOnInit() {
    this.loadProperties(); 
    this.viewPropertyRepairForm = this.fb.group({
      propertyRepairId: ['', Validators.required]
    });
  }

  loadProperties() {
    this.propertyRepairService.findRepairsByProperty(3).subscribe((data: any) => {
      this.propertyRepairs = data.filter((property: any) => !property.deleted);
    });
  }
  viewPropertyRepair() {
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
