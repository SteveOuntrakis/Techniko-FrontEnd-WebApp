import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  http = inject(HttpClient);


  getAllAdmins():Observable<Admin[]>{
    const url ='http://localhost:8080/Techniko/admin';
    return this.http.get<Admin[]>(url);
  }

  postAdmin(admin: Admin):Observable<Admin>{
    const header = new HttpHeaders()
    .set('Content-Type','application/json');

    const url = 'http://localhost:8080/Techniko/admin';

    return this.http.post<Admin>(url,JSON.stringify(admin),{headers: header});
    
  }

  getAdminById(id:number):Observable<Admin> {
    const url = `http://localhost:8080/Techniko/admin/${id}`;
    return this.http.get<Admin>(url);
  }

  updateAdmin(id:number, admin: Admin):Observable<Admin> {
    const header = new HttpHeaders()
    .set('Content-Type', 'application/json');
    const url = `http://localhost:8080/Techniko/admin/${id}`;
    return this.http.post<Admin>(url, JSON.stringify(admin), {headers: header});
  }

  deleteAdminById(id: number) {
    const url = `http://localhost:8080/Techniko/admin/${id}`;
    return this.http.delete(url);
  }

}
