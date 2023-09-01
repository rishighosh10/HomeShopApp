import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  set(key: string, value: string) {
    localStorage.setItem(key, value);
    this.isLoggedIn.next(true);
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  private isLoggedIn: BehaviorSubject<boolean>;
  constructor() {
    this.isLoggedIn = new BehaviorSubject<boolean>(false);
  }

  setUserLoggedInStatus(value: boolean) {
    this.isLoggedIn.next(value);
  }

  getUserLoggedInStatus(): Observable<any> {
    return this.isLoggedIn.asObservable();
  }

  logout() {
    localStorage.clear();
    this.isLoggedIn.next(false);
  }
}
