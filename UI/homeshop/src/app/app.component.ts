import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'homeshop';
  cartProducts: any[] = [];
  constructor(private ProductService: ProductService){
    this.ProductService.cartAddedsubject.subscribe(res=> {

    })
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  loadCart(){
    this.ProductService.getCartItemsByCustId(1).subscribe((res: any)=>{
      this.cartProducts = res.data;
      debugger;
    })
  }
}
