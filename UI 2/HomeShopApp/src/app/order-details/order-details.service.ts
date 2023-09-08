import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ICustomerOrder, ICustomerOrderDetails } from './order';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailsService {
  private cartData: any[] = [];
  private guestId: any;

  private customerOrderUrlApi = 'https://localhost:44359/api/CustomerOrders';
  private customerOrderDetailsUrlApi =
    'https://localhost:44359/api/CustomerOrderDetails';


  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

  setOrderDetailsCartData(data: any[]) {
    this.cartData = data;
  }

  getOrderDetailsCartData() {
    return this.cartData;
  }



  addCustomerOrderService(customerOrder: ICustomerOrder): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + this.localStorageService.get('token'),
    };
    const body = JSON.stringify(customerOrder);
    console.log(body);
    return this.http.post(this.customerOrderUrlApi, body, { headers: headers });
  }

  addCustomerOrderDetailsService(
    customerOrderDetails: ICustomerOrderDetails
  ): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + this.localStorageService.get('token'),
    };
    const body = JSON.stringify(customerOrderDetails);
    console.log(body);
    return this.http.post(this.customerOrderDetailsUrlApi, body, {
      headers: headers,
    });
  }

}
