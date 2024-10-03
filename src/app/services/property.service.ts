import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Property } from '../models/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  http = inject(HttpClient);

  getAllProperties() {
    const url = 'http://localhost:8080/Techniko/property';
    return this.http.get(url);
  }

  getPropertyById(id: any) {
    const url = `http://localhost:8080/Techniko/property/${id}`;
    return this.http.get(url);
  }

  getPropertiesByUserId(id:any): Observable<Property[]> {
    const url = `http://localhost:8080/Techniko/property/properties/${id}`;
    return this.http.get<Property[]>(`${url}`);
  }

  postProperty(repair: any) {
    const header = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const url = 'http://localhost:8080/Techniko/property';

    return this.http.post(url, JSON.stringify(repair), { headers: header });
  }

  updateProperty(id: any, updatedProperty: any) {
    const url = `http://localhost:8080/Techniko/property/${id}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    return this.http.post(url, JSON.stringify(updatedProperty), { headers });
  }

  deletePropertyById(id: any) {
    const url = `http://localhost:8080/Techniko/property/${id}`;
    return this.http.delete(url);
  }

}
