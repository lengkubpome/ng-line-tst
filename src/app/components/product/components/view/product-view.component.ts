import {
  getProducts,
  getProductsLoading,
} from './../../state/product.selectors';
import { DatePipe } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  IProduct,
  IProductOption,
} from 'app/components/product/models/product.model';
import { Store } from '@ngrx/store';
import { ProductState } from '../../state/product.reducer';
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
  memberType = 'platinum';

  // Table
  displayedColumns: string[] = ['product', 'price', 'priceChange'];
  dataSource = new MatTableDataSource<any>();

  private destroy$: Subject<any> = new Subject();

  constructor(public datepipe: DatePipe, private store: Store<ProductState>) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(getProductsLoading);

    this.store
      .select(getProducts)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        // console.log(data);
        if (data !== null) this.dataSource.data = data;
      });
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this.destroy$.next;
    this.destroy$.complete();
  }
}
