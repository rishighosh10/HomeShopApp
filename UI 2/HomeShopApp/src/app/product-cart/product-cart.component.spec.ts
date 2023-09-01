import { ComponentFixture, TestBed } from '@angular/core/testing';

import { productCartComponent } from './product-cart.component';

describe('MenuCartComponent', () => {
  let component: productCartComponent;
  let fixture: ComponentFixture<productCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [productCartComponent]
    });
    fixture = TestBed.createComponent(productCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
