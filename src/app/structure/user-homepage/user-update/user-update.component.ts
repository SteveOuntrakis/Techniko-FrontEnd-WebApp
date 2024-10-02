import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertyOwnerService } from '../../../services/property-owner.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [JsonPipe,ReactiveFormsModule],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent implements OnInit {

  updateUserForm!: FormGroup;
  private service = inject(PropertyOwnerService);

  user : any;
  answer: any;

  fb = inject(FormBuilder);

  ngOnInit() {
    this.updateUserForm = this.fb.group({
      id: [''],
      username: ['', [Validators.required, Validators.maxLength(20)]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      vatNumber: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

    // Load current user data
    this.loadUserData();
  }

  loadUserData() {
    this.service.getPropertyOwnerById(1).subscribe(data => {
      this.user = data;
      this.updateUserForm.patchValue({
        id: this.user.id,
        username: this.user.username,
        name: this.user.name,
        surname: this.user.surname,
        address: this.user.address,
        phoneNumber: this.user.phoneNumber,
        vatNumber: this.user.vatNumber,
        email: this.user.email,
        password: ''
      });
    });
  }

  updateUser() {
      this.service.updatePropertyOwner(1,this.updateUserForm.value).subscribe({
        next: response => this.answer=response,
        error: err => console.error('An error occured ${err}'),
        complete: () => console.log('Data fetched.')
      });
  }

  get username() {
    return this.updateUserForm.get('username');
  }

  get name() {
    return this.updateUserForm.get('name');
  }

  get surname() {
    return this.updateUserForm.get('surname');
  }

  get address() {
    return this.updateUserForm.get('address');
  }

  get phoneNumber() {
    return this.updateUserForm.get('phoneNumber');
  }

  get vatNumber() {
    return this.updateUserForm.get('vatNumber');
  }

  get email() {
    return this.updateUserForm.get('email');
  }

  get password() {
    return this.updateUserForm.get('password');
  }
}
