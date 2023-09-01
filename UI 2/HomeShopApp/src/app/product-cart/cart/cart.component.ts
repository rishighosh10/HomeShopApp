import { productCartComponent } from './../product-cart.component';
import { Component } from '@angular/core';
import { productCartOrderService } from '../../product-cart.service';
import { Router } from '@angular/router';
import { CartItem } from './cart-item';
//import { faSquareXmark, faSquarePlus, faSquareMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  // faSquareXmark = faSquareXmark;
  // faSquarePlus = faSquarePlus;
  // faSquareMinus = faSquareMinus;

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
    const gstPercentage = 5; // Change this if your GST rate is different
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
    public productCartOrderService: productCartOrderService,
    private router: Router // private detailsService: DetailsService
  ) {
    this.cartItems = productCartOrderService.getCartItemsService();
  }

  ngOnInit() {
    this.cartItems = this.productCartOrderService.getCartItemsService();
  }

  incrementQuantity(item: CartItem): void {
    item.quantity++;
  }

  decrementQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  // checkout() {
  //   // Get the cart data
  //   const cartItems = this.cartItems;

  //   // Save the cart data in the DataService
  //   this.detailsService.setCartData(cartItems);

  //   // Navigate to the details component
  //   this.router.navigate(['/details']);
  // }

  // goToDetails(): void {
  //   const cartItems = this.menuCartOrderService.getCartItemsService();
  //   const Amountpayable = this.amountPayable;
  //   //  this.cartService.AmountPayable=Amountpayable;
  //   this.router.navigate(['/details'], { state: { cartItems, Amountpayable } });
  // }

  // proceedToOrderDetails() {
  //   this.router.navigate(['/details'], { state: { amountPayable: this.amountPayable } });
  // }
}
