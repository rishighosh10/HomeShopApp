import { ProductCartComponent } from './../product-cart.component';
import { Component } from '@angular/core';
import { ProductCartService } from '../../product-cart.service';
import { Router } from '@angular/router';
import { CartItem } from './cart-item';
import { faSquareXmark, faSquarePlus, faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from '../../local-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  faSquareXmark = faSquareXmark;
  faSquarePlus = faSquarePlus;
  faSquareMinus = faSquareMinus;

  emptycart: any;
  cartItems: any[] = [];
  amountPayable: number = 0;

  getTotalQuantity(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  }

  getGST(subtotal: number): number {
    const gstPercentage = 5;
    return (subtotal * gstPercentage) / 100;
  }

  getAmountPayable(subtotal: number): number {
    const gstAmount = this.getGST(subtotal);
    this.amountPayable = subtotal + gstAmount;
    return this.amountPayable;
  }
  isCartEmpty(): boolean {
    return this.cartItems.length === 0;
  }
  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
  }
  // cartItems: CartItem[] = [];

  constructor(
    public productCartService: ProductCartService,
    private router: Router,// private detailsService: DetailsService
    private localStorageService: LocalStorageService,
  ) {
    this.cartItems = productCartService.getCartItemsService();
  }

  ngOnInit() {
    this.cartItems = this.productCartService.getCartItemsService();
  }

  incrementQuantity(item: CartItem): void {
    item.quantity++;
  }

  decrementQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  checkout(){
    if (this.localStorageService.get('role') == 'Customer') {
      this.router.navigateByUrl('/order-details');
      // this.localStorageService.setUserLoggedInStatus(true);
    } else {
      this.router.navigateByUrl('/login');
      // this.localStorageService.setUserLoggedInStatus(false);
    }


  }
}
