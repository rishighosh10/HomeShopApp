import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CustomersOrderService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  private customerSOrderUrlApi =
    'https://localhost:44359/api/CustomerOrders/CustomerId';
    private customerRatingUrlApi =
    'https://localhost:44359/api/CustomerOrders';

  getCustomersOrderService(custId: number): Observable<any[]> {
    const headers = {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + this.localStorageService.get('token'),
    };
    return this.http
      .get<any[]>(this.customerSOrderUrlApi + '?custId=' + custId, {
        headers: headers,
      })
      .pipe(
        tap((data) => console.log('All', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }


  patchOrderRatingService(orderId: number ,custRating: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + this.localStorageService.get('token'),
    };
    console.log(custRating);
    const body = JSON.stringify(custRating);
    console.log(body);
    return this.http.patch(this.customerRatingUrlApi + "/" + orderId, body, { headers: headers });
  }

  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {

      errorMessage = `An error occurred: ${err.error.message}`;
    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }


}
