import { Component, inject, OnInit } from '@angular/core';
import { PropertyOwnerService } from '../../../services/property-owner.service';
import { JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-property-owner',
  standalone: true,
  imports: [JsonPipe,ReactiveFormsModule],
  templateUrl: './property-owner.component.html',
  styleUrl: './property-owner.component.css'
})
export class PropertyOwnerComponent implements OnInit{

  createOwnerForm! : FormGroup;
  private service = inject(PropertyOwnerService);

  users : any;
  answer: any;

  fb = inject(FormBuilder);


  ngOnInit(): void {
    this.createOwnerForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(20)]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],  
      vatNumber: ['', [Validators.required, Validators.maxLength(9), Validators.minLength(9)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  //,Validators.pattern("^[a-zA-Z0-9@$#!%&]+$")
  get username() {
    return this.createOwnerForm.get('username');
  }

  get name() {
    return this.createOwnerForm.get('name');
  }

  get surname() {
    return this.createOwnerForm.get('surname');
  }

  get address() {
    return this.createOwnerForm.get('address');
  }

  get phoneNumber() {
    return this.createOwnerForm.get('phoneNumber');
  }

  get vatNumber() {
    return this.createOwnerForm.get('vatNumber');
  }

  get email() {
    return this.createOwnerForm.get('email');
  }

  get password() {
    return this.createOwnerForm.get('password');
  }

  CreateOwner(){
      this.service.postPropertyOwner(this.createOwnerForm.value).subscribe({
        next: response => this.answer=response,
        error: err => console.error('An error occured ${err}'),
        complete: () => console.log('Data fetched.')
      });
  }
}