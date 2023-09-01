import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersOrderComponent } from './customer-order.component';

describe('CustomerOrderComponent', () => {
  let component: CustomersOrderComponent;
  let fixture: ComponentFixture<CustomersOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomersOrderComponent]
    });
    fixture = TestBed.createComponent(CustomersOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
