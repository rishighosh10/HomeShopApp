import { Component, Input, OnInit } from '@angular/core';
import { ProductCartService } from '../../../product-cart.service';
import { ProductItem } from '../product';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {


  errorMessage: string = '';
  quantity: number = 1;
  faCartPlus = faCartPlus;

  constructor(public productCartService: ProductCartService) {
    this.Id = productCartService.getSelectedProductId();
  }

  ngOnInit() {
    this.getproductDataById();
  }

  Id: number = 6;
  Item!: ProductItem;

  getproductDataById(): void {
    this.productCartService.getproductDataByIdService(this.Id).subscribe({
      next: (productData: ProductItem) => {
        this.Item = productData;
        console.log(this.Item);
      },
      error: (err: string) => (this.errorMessage = err),
    });
  }

  getproductCategoryName(productCategoryId: number): string {
    if (productCategoryId == 1) return 'electronics';
    else if (productCategoryId == 4) return 'jewellery';
    else if (productCategoryId == 5) return 'dress';
    else return '';
  }
  addToCart(productId: number, itemName: string, price: number): void {
    this.productCartService.addItemToCartService(
      productId,
      itemName,
      this.quantity,
      price
    );
  }

  showProductList(){
    this.productCartService.setShowProductDetail(false);
    this.productCartService.setShowProductList(true);
    this.productCartService.setSelectedProductId(0);
  }

}
