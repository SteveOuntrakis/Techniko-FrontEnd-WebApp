import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PropertyRepair } from '../models/propertyRepair';

@Injectable({
  providedIn: 'root'
})
export class PropertyRepairService {

  http = inject(HttpClient);

  getAllPropertyRepairs(): Observable<PropertyRepair[]> {
    const url = 'http://localhost:8080/Techniko/propertyRepair';
    return this.http.get<PropertyRepair[]>(url);
  }

  getPropertyRepairsById(id : number): Observable<PropertyRepair> {
    const url = `http://localhost:8080/Techniko/propertyRepair/${id}`;
    return this.http.get<PropertyRepair>(url);
  }

  postPropertyRepair(repair: PropertyRepair): Observable<PropertyRepair> {
    const header = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const url = 'http://localhost:8080/Techniko/propertyRepair';

    return this.http.post<PropertyRepair>(url, JSON.stringify(repair), { headers: header });
  }

  findPendingStatus() : Observable<PropertyRepair[]>{
    const url = 'http://localhost:8080/Techniko/propertyRepair/pending';
    return this.http.get<PropertyRepair[]>(url);
  }
  
  findRepairsByProperty(id : number): Observable<PropertyRepair[]> {
    const url = `http://localhost:8080/Techniko/propertyRepair/property/${id}`;
    return this.http.get<PropertyRepair[]>(url);
  }

   findPendingRepairsByProperty(id : number) : Observable<PropertyRepair[]> {
    const url = `http://localhost:8080/Techniko/propertyRepair/pending/${id}`;
    return this.http.get<PropertyRepair[]>(`${url}`);
  }

  deletePropertyRepairById(id: number) {
    const url = `http://localhost:8080/Techniko/propertyRepair/${id}`;
    return this.http.delete(url);
  }
}
