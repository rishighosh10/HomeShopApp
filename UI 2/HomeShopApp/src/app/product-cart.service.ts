import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, tap, throwError, map } from 'rxjs';
import { CartItem } from './product-cart/cart/cart-item';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProductCartService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  //#region Menu Area

  private productApiUrl = 'https://localhost:7168/api/Products';

  getproductDataService(): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + this.localStorageService.get('token'),
    };
    return this.http
      .get<any>(this.productApiUrl, { headers: headers })
      .pipe(catchError(this.handleError));
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

  filteredItems: any[] = []; // your menu items array

  filteredCategoryItems: any[] = []; // filtered items

  // filterItemsByCategoryId(foodCategoryId: number): void {
  //   this.filteredCategoryItems = this.filteredItems.filter(item => item.foodCategoryId === foodCategoryId);
  // }

  //#region Cart Area

  cartItems: CartItem[] = [];
  AmountPayable!: number;

  addItemToCartService(
    productId: number,
    itemName: string,
    quantity: number,
    price: number
  ): void {
    const newItem: CartItem = { productId, itemName, quantity, price };
    this.cartItems.push(newItem);
  }

  getCartItemsService(): CartItem[] {
    return this.cartItems;
  }
  // getAmountPayable():number{
  //   return this.getAmountPayable();
  //}

  getAmountService(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  }

  getGstService(): number {
    let total = 0;
    let gst = 0;
    for (const i of this.cartItems) {
      total += i.price * i.quantity;
      gst = (total * 5) / 100;
    }
    return gst;
  }

  getFinalAmountService(): number {
    let Amount = 0;
    let total = 0;
    let gst = 0;
    for (const i of this.cartItems) {
      total += i.price * i.quantity;
      gst = (total * 5) / 100;
      Amount = total + gst;
    }
    return Amount;
  }

  //#region Cart Area
}

