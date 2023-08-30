import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProduct(): Observable<any[]> {
    debugger;
    return this.http.get<any[]>(" Give the path name of product in db table");
  }

  addToCart(obj: any): Observable<any>{
    debugger;
    return this.http.post<any>(" Give the path name of product in db table",obj);
  }
}
