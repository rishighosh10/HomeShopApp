import { Component } from '@angular/core';
import { CustomersOrderService } from './customer-order.service';
import { LocalStorageService } from '../local-storage.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-customers-order',
  templateUrl: './Customer-order.component.html',
  styleUrls: ['./Customer-order.component.css'],
})
export class CustomersOrderComponent {
  orders: any[] = [];
  custId: number = -1;
  faStar=faStar;




  constructor(private CustomersOrderService: CustomersOrderService, private localStorageService: LocalStorageService) {
    this.custId = Number(this.localStorageService?.get('customerId'));
  }

  ngOnInit(): void {
    this.CustomersOrderService.getCustomersOrderService(this.custId).subscribe({
      next: (CustomersOrder) => {
        this.orders = CustomersOrder;
        console.log(this.orders);
      },
    });
  }


  orderRating(orderId: number, rate: number){
    let custRating: any = {
      customerOrderId: orderId,
      rating: rate,
    };
    this.CustomersOrderService.patchOrderRatingService(orderId, custRating)
    .subscribe((data) =>{
        console.log(data);
        this.ngOnInit();
  });
 }
}

