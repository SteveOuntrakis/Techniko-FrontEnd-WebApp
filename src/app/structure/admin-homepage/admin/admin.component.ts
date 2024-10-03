import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  createAdminForm! : FormGroup;
  private service = inject(AdminService);

  users : any;
  viewMessage: string='';

  fb = inject(FormBuilder);


  ngOnInit(): void {
    this.createAdminForm = this.fb.group({
      username:['',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]]
    });
  }

  //,Validators.pattern("^[a-zA-Z0-9@$#!%&]+$")
  get username(){
    return this.createAdminForm.get('username');
  }

  get email(){
    return this.createAdminForm.get('email');
  }

  get password(){
    return this.createAdminForm.get('password');
  }

  CreateAdmin(){
      this.service.postAdmin(this.createAdminForm.value).subscribe({
        next: () => this.viewMessage = `Admin has been successfully created.`,
        error: err => console.error('An error occured ${err}'),
        complete: () => console.log('Data fetched.')
      });
  }
}
