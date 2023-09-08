import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { SignupModule } from './signup/signup.module';
import { LoginModule } from './login/login.module';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { CartComponent } from './product-cart/cart/cart.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { DatePipe } from '@angular/common';
import { CustomersOrderComponent } from './customer-order/customer-order.component';
import { ProductComponent } from './product-cart/product/product.component';
import { PaymentComponent } from './order-details/payment/payment/payment.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'order-details', component: OrderDetailsComponent },
  { path: 'customers-order', component: CustomersOrderComponent },
  { path: 'payment', component: PaymentComponent },
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
    PaymentComponent,
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
