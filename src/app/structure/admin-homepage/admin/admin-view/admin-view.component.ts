import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../../services/admin.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-admin-view',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe],
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.css'
})
export class AdminViewComponent implements OnInit {
  admins: any[] = []; 
  viewadminForm!: FormGroup;
  viewMessage: string = '';  

  private adminService = inject(AdminService);
  private fb = inject(FormBuilder);

  ngOnInit() {
    this.loadadmin(); 
    this.viewadminForm = this.fb.group({
      adminId: ['', Validators.required]
    });
  }

  loadadmin() {
    this.adminService.getAllAdmins().subscribe((data: any) => {
      this.admins = data.filter((admin: any) => !admin.deleted);
    });
  }
  viewadmin() {
    const adminId = this.viewadminForm.get('adminId')?.value;
    const adminToview = this.admins.find(admin => admin.id === +adminId);

    if (adminToview) {
      this.adminService.deleteAdminById(adminId).subscribe({
        next: () => {
          this.viewMessage = `The admin with id ${adminId} with the username ${adminToview.username} has been successfully removed.`;
          this.loadadmin(); 
        },
        error: err => console.error('Error:', err),
      });
    } else {
      this.viewMessage = `admin with id  not found.`;
    }
  }
}