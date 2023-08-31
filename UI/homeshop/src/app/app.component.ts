import { Component } from '@angular/core';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'homeshop';
  constructor(private ProductService: ProductService){
    this.ProductService.cartAddedsubject.subscribe(res=> {

    })
  }
}
