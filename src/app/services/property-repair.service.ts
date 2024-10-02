import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PropertyRepair } from '../models/propertyRepair';

@Injectable({
  providedIn: 'root'
})
export class PropertyRepairService {

  http = inject(HttpClient);

  getAllPropertyRepairs() {
    const url = 'http://localhost:8080/Techniko/propertyRepair';
    return this.http.get(url);
  }

  getPropertyRepairsById() {
    const url = 'http://localhost:8080/Techniko/propertyRepair/1';
    return this.http.get(url);
  }

  postPropertyRepair(repair: any) {
    const header = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const url = 'http://localhost:8080/Techniko/propertyRepair';

    return this.http.post(url, JSON.stringify(repair), { headers: header });
  }

  findPendingStatus() {
    const url = 'http://localhost:8080/Techniko/propertyRepair/pending';
    return this.http.get(url);
  }
  
  findRepairsByProperty() {
    const url = 'http://localhost:8080/Techniko/propertyRepair/property/1';
    return this.http.get(url);
  }

   findPendingRepairsByProperty() : Observable<PropertyRepair[]> {
    const url = 'http://localhost:8080/Techniko/propertyRepair/pending/1';
    return this.http.get<PropertyRepair[]>(`${url}`);
  }
}
