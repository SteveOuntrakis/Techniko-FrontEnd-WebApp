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

  getPropertyById() {
    const url = 'http://localhost:8080/Techniko/property/1';
    return this.http.get(url);
  }

  getPropertiesByUserId(): Observable<Property[]> {
    const url = 'http://localhost:8080/Techniko/property/properties/1';
    return this.http.get<Property[]>(`${url}`);
  }

  postProperty(repair: any) {
    const header = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const url = 'http://localhost:8080/Techniko/property';

    return this.http.post(url, JSON.stringify(repair), { headers: header });
  }


}
