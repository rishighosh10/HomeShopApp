import { Component } from '@angular/core';
import { ProductCartService } from '../../product-cart.service';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { ProductCartComponent } from '../product-cart.component';
import {  Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],

})
export class ProductComponent {
@Input() maxRating = 5;
@Input() currentRating: any = 0;
@Output() ratingClicked = new EventEmitter<number>();
stars: number[] = [];

@Input() initialLikeCount = 0;
isLiked = false;
likeCount = this.initialLikeCount;


  faCartPlus = faCartPlus;
  showProductDetail: boolean = this.productCartService.getShowProductDetail();
  showProductList: boolean = this.productCartService.getShowProductList();
  selectedProductId = 0;


  items!: any[];
  isNew: boolean = false;
  productCategoryId: number = 1;
  showFullMenu:boolean=true;
  filteredItems: any[] = [];
  itemName: any;
  quantity: number = 1;
  price: number = 0;
  filteredCategoryItems: any[] = [];
  errorMessage: string = '';

  constructor(public productCartService: ProductCartService) {
    this.stars = Array(this.maxRating).fill(0).map((_, i) => i + 1);
  }


  ngOnInit() {
    this.getproductData();
  }

  getproductData(): void {
    this.productCartService.getproductDataService().subscribe({
      next: (productData: any[]) => {
        this.items = productData;
        this.items = this.items.filter((item) => item.isActive === true);
        this.filteredItems = this.items;
        console.log(this.items);
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

  onCategoryChange(productCategoryId: number): void {
    this.productCategoryId = productCategoryId;
    this.filteredItems = this.items.filter((item) => {
      return (
        item.productCategoryId == this.productCategoryId
      );
    });
    this.showFullMenu=false;
  }

  showAllItems() {
    this.filteredItems = this.items;
    this.showFullMenu=true;
  }

  showProductDetails(productId: number){
    this.productCartService.setSelectedProductId(productId);
    this.showProductDetail = true;
    this.showProductList = false;

    this.productCartService.setShowProductDetail(true);
    this.productCartService.setShowProductList(false);

  }
  rate(rating: number) {
    this.currentRating = rating;
    this.ratingClicked.emit(rating);
  }
  toggleLike() {
    this.isLiked = !this.isLiked;
    this.likeCount += this.isLiked ? 1 : -1;
  }
}
