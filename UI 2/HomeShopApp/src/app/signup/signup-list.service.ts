import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupListService {
  private custUrlApi = 'https://localhost:7168/api/Auth/Register';

  constructor(private http: HttpClient) {}

  addCustService(cust: any): Observable<any> {
    console.log(cust);
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(cust);
    console.log(body);
    return this.http.post(this.custUrlApi, body, { headers: headers });
  }
  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
