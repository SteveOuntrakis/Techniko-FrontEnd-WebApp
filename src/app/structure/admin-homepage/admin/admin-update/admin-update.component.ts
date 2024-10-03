import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../../services/admin.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-admin-update',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe],
  templateUrl: './admin-update.component.html',
  styleUrl: './admin-update.component.css'
})
export class AdminUpdateComponent implements OnInit {

  updateAdminForm!: FormGroup;
  private service = inject(AdminService);
  admin : any;
  viewMessage: string= '';

  fb = inject(FormBuilder);

  ngOnInit(): void  {
    this.updateAdminForm = this.fb.group({
      id: [''],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.loadAdminData();
  }

  loadAdminData() {
    this.service.getAdminById(1).subscribe(data => {
      this.admin = data;
      this.updateAdminForm.patchValue({
        id: this.admin.id,
        username: this.admin.username,
        email: this.admin.email,
        password: '' 
      });
    });
  }

  updateAdmin() {
      this.service.updateAdmin( 1,this.updateAdminForm.value).subscribe({
        next: () => this.viewMessage='Succesfully updated Admin',
        error: err => console.error(`An error occured ${err}`),
        complete: () => console.log('Data fetched.')
      });
  }

  get username() { 
    return this.updateAdminForm.get('username'); 
  }
  get email() { 
    return this.updateAdminForm.get('email'); 
  }
  get password() { 
    return this.updateAdminForm.get('password'); 
  }
}
