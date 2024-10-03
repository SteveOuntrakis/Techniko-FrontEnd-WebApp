import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Property } from '../models/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  http = inject(HttpClient);

  getAllProperties():Observable<Property[]> {
    const url = 'http://localhost:8080/Techniko/property';
    return this.http.get<Property[]>(url);
  }

  getPropertyById(id: number):Observable<Property> {
    const url = `http://localhost:8080/Techniko/property/${id}`;
    return this.http.get<Property>(url);
  }

  getPropertiesByUserId(id:number): Observable<Property[]> {
    const url = `http://localhost:8080/Techniko/property/properties/${id}`;
    return this.http.get<Property[]>(`${url}`);
  }

  postProperty(property: Property):Observable<Property> {
    const header = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const url = 'http://localhost:8080/Techniko/property';

    return this.http.post<Property>(url, JSON.stringify(property), { headers: header });
  }

  updateProperty(id: number, updatedProperty: Property):Observable<Property> {
    const url = `http://localhost:8080/Techniko/property/${id}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    return this.http.post<Property>(url, JSON.stringify(updatedProperty), { headers });
  }

  deletePropertyById(id: number) {
    const url = `http://localhost:8080/Techniko/property/${id}`;
    return this.http.delete(url);
  }

}
