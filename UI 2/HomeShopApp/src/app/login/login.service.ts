import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { ILogin } from './login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private customerLoginUrlApi = 'https://localhost:44359/api/Auth/CustomerLogin'

  constructor(private http: HttpClient) {}

  loginService(login: any): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    let isAdmin = login.isAdmin;
    delete login.isAdmin;
    let body = JSON.stringify(login);
    console.log(body)


      return this.http.post(this.customerLoginUrlApi, body, {'headers': headers})
  }
}
