import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
//import { AdminModule } from './admin/admin.module';
import { SignupModule } from './signup/signup.module';
import { LoginModule } from './login/login.module';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
//import { AdminComponent } from './admin/admin.component';
//import { AddAdminComponent } from './admin/add-admin/add-admin.component';
// import { AddMenuComponent } from './admin/add-menu/add-menu.component';
// import { AdminListComponent } from './admin/admin-list/admin-list.component';
// import { CustomerListComponent } from './admin/customer-list/customer-list.component';
// import { EditMenuComponent } from './admin/edit-menu/edit-menu.component';
// import { MenuListComponent } from './admin/menu-list/menu-list.component';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { CartComponent } from './product-cart/cart/cart.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
//import { OrderListComponent } from './admin/order-list/order-list.component';
//import { AdminOrderDetailsComponent } from './admin/admin-order-details/admin-order-details.component';
import { DatePipe } from '@angular/common';
import { CustomersOrderComponent } from './customer-order/customer-order.component';
import { ProductComponent } from './product-cart/product/product.component';
//import { PaymentComponent } from './order-details/payment/payment.component';
// import { productCartComponent } from './product-cart/product-cart.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  // {
  //   path: 'admin',
  //   component: AdminComponent,
  //   children: [
  //     {
  //       path: 'add-admin',
  //       component: AddAdminComponent,
  //     },
  //     {
  //       path: 'admin-list',
  //       component: AdminListComponent,
  //     },
  //     {
  //       path: 'product-list',
  //       component: MenuListComponent,
  //     },
  //     {
  //       path: 'add-product',
  //       component: AddMenuComponent,
  //     },
  //     {
  //       path: 'edit-product',
  //       component: EditMenuComponent,
  //     },
  //     {
  //       path: 'customer-list',
  //       component: CustomerListComponent,
  //     },
  //     {
  //       path: 'order-list',
  //       component: OrderListComponent,
  //     },
  //     {
  //       path: 'admin-order-details',
  //       component: AdminOrderDetailsComponent,
  //     }
  //   ],
  // },
  { path: 'order-details', component: OrderDetailsComponent },
  { path: 'customers-order', component: CustomersOrderComponent },
  //{ path: 'payment', component: PaymentComponent },
  { path: '', component: ProductCartComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ProductCartComponent,
    ProductComponent,
    CartComponent,
    OrderDetailsComponent,
    CustomersOrderComponent,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    SignupModule,
    LoginModule,
    RouterModule.forRoot(routes),
  ],
})
export class AppModule {}
