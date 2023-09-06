import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartItem } from '../product-cart/cart/cart-item';
import { Component, OnInit } from '@angular/core';
import { ProductCartService } from '../product-cart.service';
import { OrderDetailsService } from './order-details.service';
import { LocalStorageService } from '../local-storage.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  faCreditCard,
  faEnvelope,
  faLock,
  faMoneyBill,
  faPhone,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import {
  ICustomerOrder,
  ICustomerOrderDetails,
  //IGuestOrder,
  //IGuestOrderDetails,
} from './order';
import { v4 as uuidv4 } from 'uuid';
//import { IGuest } from './guest';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent {
  cartItems: any[];
  amount!: number;
  gst!: number;
  finalAmount!: number;
  guestTablereturn: any[] = [];
  isCustomer = false;
  guestId: any;
  customerId: any;
  customerName: any;
  customerContact: any;

  faUserCircle = faUserCircle;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faLock = faLock;
  faCreditCard = faCreditCard;
  faMoneyBill = faMoneyBill;

  products: { ProductId: number; Name: String; Qty: number; Price: number }[] =
    [];
  selectedMethod: string = '';
  payment: any[] = ['credit', 'cash', 'debit'];
  paypal = document.getElementById('paypal') as HTMLInputElement | null;
  credit = document.getElementById('credit') as HTMLInputElement | null;
  cash = document.getElementById('cash') as HTMLInputElement | null;

  // amountPayable: any=CartComponent.amountPayable;
  radioChangeHandler(event: any) {
    this.selectedMethod = event.target.value;
  }

  orderDetailsForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    contact: new FormControl<number>(-1),
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private productCartService: ProductCartService,
    private orderDetailsService: OrderDetailsService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.cartItems = productCartService.getCartItemsService();
    //console.log(this.cartItems);
    // this.AmountPayable=this.cartService.AmountPayable;
    if (this.localStorageService.get('role') == 'Customer') {
      this.isCustomer = true;
      this.customerId = this.localStorageService.get('customerId');
      this.customerName = this.localStorageService.get('name');
      this.customerContact = this.localStorageService.get('contact');
      // console.log(this.isCustomer);
      console.log(this.customerName + '  ---  ' + this.customerContact);
    }
  }
  ngOnInit() {
    if (this.cartItems.length == 0) {
      this.router.navigateByUrl('#');
    }

    // this.getGuestId();

    if (!this.isCustomer) {
      this.orderDetailsForm = this.formBuilder.group({
        name: [, Validators.required],
        contact: [, [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      });
    } else {
      this.orderDetailsForm = this.formBuilder.group({
        name: [{ value: this.customerName, disabled: true }],
        contact: [{ value: this.customerContact, disabled: true }],
      });
    }

    //only number will be add
    // const CartItem = this.orderDetailsService.getOrderDetailsCartData();

    // Use the cart data as needed in the details component
    // console.log(CartItem);
    // const cartData = this.orderDetailsService.getOrderDetailsCartData();
    // Convert the cart data to the desired format
    this.products = this.cartItems.map((item) => {
      return {
        ProductId: item.productId,
        Name: item.itemName,
        Qty: item.quantity,
        Price: item.price,
      };
    });
    // this.AmountPayable=this.cartService.AmountPayable;
    this.amount = this.productCartService.getAmountService();
    this.gst = this.productCartService.getGstService();
    this.finalAmount = this.productCartService.getFinalAmountService();
  }

  // getGuestId(): void {
  //   this.orderDetailsService.getGuestData().subscribe(
  //     (data: any) => {
  //       this.guestTablereturn = data;
  //     },
  //     (error: any) => {
  //       console.error('Error:', error);
  //     }
  //   );
  // }

  get f() {
    return this.orderDetailsForm.controls;
  }
  orderDetailsFormSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.orderDetailsForm.invalid) {
      return;
    }
  }

  placeOrder() {
    if (this.isCustomer) {
      let customerOrder: ICustomerOrder = {
        amount: this.finalAmount,
        paymentMethod: this.selectedMethod,
        transactionId: uuidv4(),
        orderStatus: 'Pending',
        customerId: this.customerId,
      };

      this.orderDetailsService
        .addCustomerOrderService(customerOrder)
        .subscribe((data) => {
          console.log(data);

          this.products.forEach((element) => {
            let customerOrderDetails: ICustomerOrderDetails = {
              customerOrderId: data.customerOrderId,
              productId: element.ProductId,
              unitPrice: element.Price,
              quantity: element.Qty,
            };

            this.orderDetailsService
              .addCustomerOrderDetailsService(customerOrderDetails)
              .subscribe((data) => {
                console.log(data);
                this.router.navigateByUrl('/payment');
              });
          });
        });
    }
    // else {
    //   // let guest: IGuest = {
    //     name: this.orderDetailsForm.get('name')?.value,
    //     contact: this.orderDetailsForm.get('contact')?.value,
    //   };
    //   this.orderDetailsService.addGuestService(guest).subscribe((data) => {
    //     console.log(data);
    //     this.guestId = data.guestId;

    //     let guestOrder: IGuestOrder = {
    //       orderDate: new Date(),
    //       amount: this.finalAmount,
    //       paymentMethod: this.selectedMethod,
    //       transactionId: uuidv4(),
    //       orderStatus: 'Pending',
    //       guestId: this.guestId,
    //     };

    //     this.orderDetailsService
    //       .addGuestOrderService(guestOrder)
    //       .subscribe((data) => {
    //         console.log(data);

    //         this.products.forEach((element) => {
    //           let guestOrderDetails: IGuestOrderDetails = {
    //             guestOrderId: data.guestOrderId,
    //             foodMenuId: element.FoodMenuId,
    //             unitPrice: element.Price,
    //             quantity: element.Qty,
    //           };
    //           this.orderDetailsService
    //             .addGuestOrderDetailsService(guestOrderDetails)
    //             .subscribe((data) => {
    //               console.log(data);
    //     //           this.router.navigateByUrl('/payment');
    //             });
    //         });
    //       });
    //   });
    // }
  }
}

