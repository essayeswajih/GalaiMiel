import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartProduitComponent } from './cart-produit.component';

describe('CartProduitComponent', () => {
  let component: CartProduitComponent;
  let fixture: ComponentFixture<CartProduitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartProduitComponent]
    });
    fixture = TestBed.createComponent(CartProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
