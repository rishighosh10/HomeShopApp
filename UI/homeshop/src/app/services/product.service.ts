import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public cartAddedsubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  getAllProduct(): Observable<any[]> {
    debugger;
    const headers = {
      'content-type': 'application/json',
    };
    return this.http.get<any[]>("https://localhost:44359/api/Products");
  }

  addToCart(obj: any): Observable<any>{
    debugger;
    return this.http.post<any>("https://localhost:44359/api/CustomerOrderDetails",obj);
  }
  getCartItemsByCustId(custId: number) : Observable<any> {
    return this.http.get<any[]>("https://localhost:44359/api/CustomerOrders" + custId);
  }
}
