import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PropertyOwner } from '../models/propertyOwner';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyOwnerService {

  http = inject(HttpClient);

  getAllPropertyOwners():Observable<PropertyOwner[]>{
    const url ='http://localhost:8080/Techniko/propertyOwner';
    return this.http.get<PropertyOwner[]>(url);
  }

  getPropertyOwnerById(id:number):Observable<PropertyOwner>{
    const url=`http://localhost:8080/Techniko/propertyOwner/${id}`;
    return this.http.get<PropertyOwner>(url);
  }

  getPropertyOwnerByUsername():Observable<PropertyOwner>{
    const url='http://localhost:8080/Techniko/propertyOwner/getName/Stevoun';
    return this.http.get<PropertyOwner>(url);
  }

  postPropertyOwner(owner: PropertyOwner):Observable<PropertyOwner>{
    const header = new HttpHeaders()
    .set('Content-Type','application/json');

    const url = 'http://localhost:8080/Techniko/propertyOwner';

    return this.http.post<PropertyOwner>(url,JSON.stringify(owner),{headers: header});
    
  }

  updatePropertyOwner(id:any, owner: PropertyOwner):Observable<PropertyOwner> {
    const header = new HttpHeaders()
    .set('Content-Type', 'application/json');
    
    const url = `http://localhost:8080/Techniko/propertyOwner/${id}`;
    return this.http.post<PropertyOwner>(url, JSON.stringify(owner), { headers: header });
  }

}
