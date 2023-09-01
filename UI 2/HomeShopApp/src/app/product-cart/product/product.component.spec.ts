import { ComponentFixture, TestBed } from '@angular/core/testing';

import { productComponent } from './product.component';

describe('productComponent', () => {
  let component: productComponent;
  let fixture: ComponentFixture<productComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [productComponent]
    });
    fixture = TestBed.createComponent(productComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
