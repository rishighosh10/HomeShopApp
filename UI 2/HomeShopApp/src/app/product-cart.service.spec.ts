/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductCartService } from './product-cart.service';

describe('Service: ProductCart', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductCartService]
    });
  });

  it('should ...', inject([ProductCartService], (service: ProductCartService) => {
    expect(service).toBeTruthy();
  }));
});
