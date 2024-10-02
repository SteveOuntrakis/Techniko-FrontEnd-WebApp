import { Routes } from '@angular/router';
import { UserHomepageComponent } from './structure/user-homepage/user-homepage.component';
import { AdminComponent } from './structure/admin-homepage/admin/admin.component';
import { AdminHomepageComponent } from './structure/admin-homepage/admin-homepage.component';
import { PropertyOwnerComponent } from './structure/user-homepage/property-owner/property-owner.component';
import { PropertiesComponent } from './structure/user-homepage/property-owner/properties/properties.component';
import { FileNotFoundComponent } from './structure/file-not-found/file-not-found.component';
import { PropertyRepairsComponent } from './structure/user-homepage/property-owner/properties/property-repairs/property-repairs.component';
import { UserUpdateComponent } from './structure/user-homepage/user-update/user-update.component';
import { AdminUpdateComponent } from './structure/admin-homepage/admin/admin-update/admin-update.component';
import { UserSearchComponent } from './structure/user-homepage/user-search/user-search.component';

export const routes: Routes = [
    {path:'UserHome',component:UserHomepageComponent},
    {path:'AdminHome',component:AdminHomepageComponent},
    {path: 'User',component:PropertyOwnerComponent},
    {path: 'user/update', component: UserUpdateComponent },
    {path: 'Admin',component:AdminComponent},
    {path: 'admin/update', component: AdminUpdateComponent },
    {path: 'user/search', component: UserSearchComponent },
    {path: 'Property/:id',component:PropertiesComponent},
    {path: 'PropertyRepairs',component:PropertyRepairsComponent},
    {path: '',redirectTo:'UserHome', pathMatch: 'full'},

    {path: '**',component:FileNotFoundComponent}
];
