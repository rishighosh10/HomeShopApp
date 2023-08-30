import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  productList: any [] = [];
  cartObj : any ={
    "customerOrderDetailsId": 0,
    "customerOrderId": 0,
    "productId": 0,
    "unitPrice": 0,
    "quantity": 0
  }
  constructor(private ProductService: ProductService){
    this.loadAllProducts();
  }
  ngOnInit(): void {
    debugger;
    this.loadAllProducts();
  }

  loadAllProducts(): void {
    this.ProductService.getAllProduct().subscribe({
      next: (result) => {
        this.productList = result;
        console.log(this.productList);
      },
      // error: (err) => (this.errorMessage = err),
    });
  }

  // loadAllProducts(){
  //   debugger;
  //   this.ProductService.getAllProduct().subscribe((result: any)=>{
  //   this.productList =result.data;
  //   })
  // }

  addItemToCart(productId: number){
    debugger;
    this.cartObj.productId = productId;
    this.ProductService.addToCart(this.cartObj).subscribe((result: any)=>{
      this.productList =result.data;
      })
  }
}
