import { Routes } from '@angular/router';
import { UserHomepageComponent } from './structure/user-homepage/user-home/user-homepage.component';
import { AdminComponent } from './structure/admin-homepage/admin/admin.component';
import { PropertyOwnerComponent } from './structure/user-homepage/property-owner/property-owner-insert/property-owner.component';
import { PropertiesComponent } from './structure/user-homepage/property-owner/properties/property-insert/properties.component';
import { FileNotFoundComponent } from './structure/file-not-found/file-not-found.component';
import { PropertyRepairsComponent } from './structure/user-homepage/property-owner/properties/property-repairs/property-repair-insert/property-repairs.component';
import { UserUpdateComponent } from './structure/user-homepage/user-update/user-update.component';
import { AdminUpdateComponent } from './structure/admin-homepage/admin-update/admin-update.component';
import { UserSearchComponent } from './structure/user-homepage/user-search/user-search.component';
import { PropertyUpdateComponent } from './structure/user-homepage/property-owner/properties/property-update/property-update.component';
import { PropertyviewComponent } from './structure/user-homepage/property-owner/properties/property-view/property-view.component';
import { AdminViewComponent } from './structure/admin-homepage/admin-view/admin-view.component';
import { PropertyRepairsViewComponent } from './structure/user-homepage/property-owner/properties/property-repairs/property-repairs-view/property-repairs-view.component';

export const routes: Routes = [
    {path:'UserHome',component:UserHomepageComponent},  

    {path: 'User',component:PropertyOwnerComponent},
    {path: 'user/update', component: UserUpdateComponent },
    {path: 'user/search', component: UserSearchComponent },

    {path: 'Admin',component:AdminComponent},
    {path: 'admin/update', component: AdminUpdateComponent },
    {path: 'admin/view',component:AdminViewComponent},
  
    {path: 'Property/:id',component:PropertiesComponent},
    {path: 'PropertyUpdate/:id', component: PropertyUpdateComponent },
    {path: 'property/view', component: PropertyviewComponent}, 

    {path: 'PropertyRepairs',component:PropertyRepairsComponent},
    {path: 'propertyRepairs/view',component:PropertyRepairsViewComponent},

    {path: '',redirectTo:'UserHome', pathMatch: 'full'},

    {path: '**',component:FileNotFoundComponent}
];
