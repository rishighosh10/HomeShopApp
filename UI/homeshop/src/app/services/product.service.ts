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
    return this.http.get<any[]>("https://localhost:7168/api/Products");
  }

  addToCart(obj: any): Observable<any>{
    debugger;
    return this.http.post<any>("https://localhost:7168/api/CustomerOrderDetails",obj);
  }
  getCartItemsByCustId(customerId: number) {
    return this.http.get("https://localhost:7168/api/CustomerOrders" + customerId);
  }
}
