/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomersOrderService } from './customer-order.service';

describe('Service: CustomerOrder', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomersOrderService]
    });
  });

  it('should ...', inject([CustomersOrderService], (service: CustomersOrderService) => {
    expect(service).toBeTruthy();
  }));
});
