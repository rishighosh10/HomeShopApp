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
  //private guestOrderUrlApi = 'https://localhost:44332/api/GuestOrders';
  // private guestOrderDetailsUrlApi =
  //   'https://localhost:44332/api/GuestOrderDetails';
  // private guestUrlApi = 'https://localhost:44332/api/Guests';

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

  setOrderDetailsCartData(data: any[]) {
    this.cartData = data;
  }

  getOrderDetailsCartData() {
    return this.cartData;
  }

  //#region Customer Order

  // addAdminService(admin: IAdmin): Observable<any> {
  //   const headers = { 'content-type': 'application/json'}
  //   const body=JSON.stringify(admin);
  //   console.log(body)
  //   return this.http.post(this.adminUrlApi, body, {'headers': headers})
  // }

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

  //#region Guest Order

  // addGuestService(guest: IGuest): Observable<any> {
  //   const headers = {
  //     'content-type': 'application/json',
  //     Authorization: 'Bearer ' + this.localStorageService.get('token'),
  //   };
  //   const body = JSON.stringify(guest);
  //   console.log(body);
  //   return this.http.post(this.guestUrlApi, body, { headers: headers });
  // }

  // addGuestOrderService(guestOrder: IGuestOrder): Observable<any> {
  //   const headers = {
  //     'content-type': 'application/json',
  //     Authorization: 'Bearer ' + this.localStorageService.get('token'),
  //   };
  //   const body = JSON.stringify(guestOrder);
  //   console.log(body);
  //   return this.http.post(this.guestOrderUrlApi, body, { headers: headers });
  // }

  // addGuestOrderDetailsService(
  //   guestOrderDetails: IGuestOrderDetails
  // ): Observable<any> {
  //   const headers = {
  //     'content-type': 'application/json',
  //     Authorization: 'Bearer ' + this.localStorageService.get('token'),
  //   };
  //   const body = JSON.stringify(guestOrderDetails);
  //   console.log(body);
  //   return this.http.post(this.guestOrderDetailsUrlApi, body, {
  //     headers: headers,
  //   });
  // }

  // createGuest(guestData: any) {
  //   return this.http.post('https://localhost:44332/api/guests', guestData);
  // }
  // getGuestData(): Observable<any> {
  //   return this.http.get<any>('https://localhost:44332/api/guests');
  // }

  // createGuestOrder(orderDetails: any): Observable<any> {
  //   // POST the order details to the guestorders table with guestId as foreign key
  //   return this.http.post<any>(
  //     'https://localhost:44332/api/GuestOrders',
  //     orderDetails
  //   );
  // }
}
