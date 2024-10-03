import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PropertyOwnerService } from '../../../services/property-owner.service';
import { JsonPipe } from '@angular/common';
import { PropertyOwner } from '../../../models/propertyOwner';

@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive,JsonPipe],
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.css'
})
export class UserSearchComponent implements OnInit{
  users!: PropertyOwner[];

  constructor(
    private ownerService: PropertyOwnerService
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.ownerService.getAllPropertyOwners().subscribe((data:PropertyOwner[]) => {
      this.users = data;
    });
  }
}