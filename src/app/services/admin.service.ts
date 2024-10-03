import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  http = inject(HttpClient);


  getAllAdmins(){
    const url ='http://localhost:8080/Techniko/admin';
    return this.http.get(url);
  }

  postAdmin(admin: any){
    const header = new HttpHeaders()
    .set('Content-Type','application/json');

    const url = 'http://localhost:8080/Techniko/admin';

    return this.http.post(url,JSON.stringify(admin),{headers: header});
    
  }

  getAdminById(id:any) {
    const url = `http://localhost:8080/Techniko/admin/${id}`;
    return this.http.get(url);
  }

  updateAdmin(id:any, admin: any) {
    const header = new HttpHeaders()
    .set('Content-Type', 'application/json');
    const url = `http://localhost:8080/Techniko/admin/${id}`;
    return this.http.post(url, JSON.stringify(admin), {headers: header});
  }

  deleteAdminById(id: any) {
    const url = `http://localhost:8080/Techniko/admin/${id}`;
    return this.http.delete(url);
  }

}
