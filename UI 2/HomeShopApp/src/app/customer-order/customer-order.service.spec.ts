/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomerOrderService } from './customer-order.service';

describe('Service: CustomerOrder', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerOrderService]
    });
  });

  it('should ...', inject([CustomerOrderService], (service: CustomerOrderService) => {
    expect(service).toBeTruthy();
  }));
});
