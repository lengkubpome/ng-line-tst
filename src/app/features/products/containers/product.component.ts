import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductState } from '../state/product.reducer';
import * as ProductActions from '../state/product.actions';

@Component({
  selector: 'app-product',
  template: '<router-outlet></router-outlet>',
})
export class ProductComponent implements OnInit {
  constructor(private store: Store<ProductState>) {}

  ngOnInit() {
    this.store.dispatch(ProductActions.loadProducts());
  }
}
