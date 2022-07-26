import {
  selectProducts,
  selectProductsLoading,
} from './../../state/product.selectors';
import { DatePipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Observable, switchMap, map, Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct, IProductOption } from '@shared/models/product.model';
import { Store } from '@ngrx/store';
import { ProductState } from '../../state/product.reducer';
import { loadProducts } from '../../state/product.actions';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit, OnDestroy {
  products$?: Observable<IProduct[]>;
  isLoading$?: Observable<boolean>;

  time = this.datepipe.transform(new Date(), 'hh:mm น.  dd/MM/yyyy');
  memberType = 'admin';

  // Table
  displayedColumns: string[] = ['product', 'price', 'price_change'];
  dataSource = new MatTableDataSource<any>();

  private destroy$: Subject<any> = new Subject();

  constructor(public datepipe: DatePipe, private store: Store<ProductState>) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(selectProductsLoading);

    this.store
      .select(selectProducts)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => (this.dataSource.data = data));
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this.destroy$.next;
    this.destroy$.complete();
  }
}
