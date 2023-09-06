import { Component } from '@angular/core';
import { ProductCartService } from '../../product-cart.service';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { ProductCartComponent } from '../product-cart.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  faCartPlus = faCartPlus;

  items!: any[];
  isNew: boolean = false;
  productCategoryId: number = 1;
  showFullMenu:boolean=true;
  filteredItems: any[] = [];
  itemName: any;
  quantity: number = 1;
  price: number = 0;
  filteredCategoryItems: any[] = [];
  // selectedFoodCategoryId: number = 1;
  errorMessage: string = '';

  constructor(public productCartService: ProductCartService) {}

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

  // toggleTypeFilter() {
  //   if (this.foodTypeId == 1) {
  //     this.foodTypeId = 2;
  //     this.isVeg = false;
  //   } else {
  //     this.foodTypeId = 1;
  //     this.isVeg = true;
  //   }
  //   if(this.showFullMenu)
  //   {
  //     this.filteredItems = this.items.filter((item) => {
  //       return (
  //         item.foodTypeId == this.foodTypeId
  //      );
  //     });
  //   }
  //   else{
  //     this.filteredItems = this.items.filter((item) => {
  //       return (
  //         item.foodCategoryId == this.foodCategoryId &&
  //         item.foodTypeId == this.foodTypeId
  //       );
  //     });
  //   }

  // }

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

  // setSelectedFoodCategoryId(selectedFoodCategoryId: number) {
  //   this.selectedFoodCategoryId = selectedFoodCategoryId;
  // }
}
