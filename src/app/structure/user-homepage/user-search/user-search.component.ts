import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PropertyOwnerService } from '../../../services/property-owner.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive,JsonPipe],
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.css'
})
export class UserSearchComponent implements OnInit{
  user: any = {};  // Replace with proper User model
  properties: any[] = [];  // Replace with Property model
  pendingRepairs: any[] = [];  // Replace with Repair model

  constructor(
    private ownerService: PropertyOwnerService
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.ownerService.getPropertyOwnerById(1).subscribe(data => {
      this.user = data;
    });
  }
}