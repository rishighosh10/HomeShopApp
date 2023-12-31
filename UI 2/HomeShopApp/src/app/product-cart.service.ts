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

  private productApiUrl = 'https://localhost:44359/api/Products';

  getproductDataService(): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + this.localStorageService.get('token'),
    };
    return this.http
      .get<any>(this.productApiUrl, { headers: headers })
      .pipe(catchError(this.handleError));
  }

  getproductDataByIdService(Id: number): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + this.localStorageService.get('token'),
    };
    return this.http
      .get<any>(this.productApiUrl + '/' + Id, { headers: headers })
      .pipe(catchError(this.handleError));
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

  filteredItems: any[] = []; // your menu items array

  filteredCategoryItems: any[] = []; // filtered items



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

  selectedProductId!: number;

  setSelectedProductId(selectedProductId: number) {
  this.selectedProductId = selectedProductId;
  }

  getSelectedProductId() {
    return this.selectedProductId;
  }

  showProductDetail: boolean = false;
  showProductList: boolean = true;

  setShowProductDetail(showProductDetail: boolean) {
    this.showProductDetail = showProductDetail;
    }

    getShowProductDetail() {
      return this.showProductDetail;
    }
  setShowProductList(showProductList: boolean) {
      this.showProductList = showProductList;
    }

    getShowProductList() {
      return this.showProductList;
    }




  //#region Cart Area
}

