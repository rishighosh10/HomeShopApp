/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { productCartOrderService } from './product-cart.service';

describe('Service: ProductCart', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [productCartOrderService]
    });
  });

  it('should ...', inject([productCartOrderService], (service: productCartOrderService) => {
    expect(service).toBeTruthy();
  }));
});
