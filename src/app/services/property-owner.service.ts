import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropertyOwnerService {

  http = inject(HttpClient);

  getAllPropertyOwners(){
    const url ='http://localhost:8080/Techniko/propertyOwner';
    return this.http.get(url);
  }

  getPropertyOwnerById(id:any){
    const url=`http://localhost:8080/Techniko/propertyOwner/${id}`;
    return this.http.get(url);
  }

  getPropertyOwnerByUsername(){
    const url='http://localhost:8080/Techniko/propertyOwner/getName/Stevoun';
    return this.http.get(url);
  }

  postPropertyOwner(owner: any){
    const header = new HttpHeaders()
    .set('Content-Type','application/json');

    const url = 'http://localhost:8080/Techniko/propertyOwner';

    return this.http.post(url,JSON.stringify(owner),{headers: header});
    
  }

  updatePropertyOwner(id:any, owner: any) {
    const header = new HttpHeaders()
    .set('Content-Type', 'application/json');
    
    const url = `http://localhost:8080/Techniko/propertyOwner/${id}`;
    return this.http.post(url, JSON.stringify(owner), { headers: header });
  }

}
