import { Observable, Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '@shared/models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductEditDiaglogComponent } from '../edit-dialog/product-edit-diaglog.component';
import { ProductState } from '../../state/product.reducer';
import { Store } from '@ngrx/store';
import {
  selectProducts,
  selectProductsLoading,
} from '../../state/product.selectors';
import { MatTableDataSource } from '@angular/material/table';
import { ProductAddDialogComponent } from '../add-dialog/product-add-dialog.component';
import { ProductDeleteDialogComponent } from '../delete-dialog/product-delete-dialog.component';
@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
})
export class ProductManagementComponent implements OnInit, OnDestroy {
  products$?: Observable<IProduct[]>;
  isLoading$?: Observable<boolean>;
  memberType = 'gold';

  // Mat
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['product', 'price_change', 'action'];

  private destroy$: Subject<any> = new Subject();

  constructor(private store: Store<ProductState>, public dialog: MatDialog) {}

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this.destroy$.next;
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(selectProductsLoading);

    this.store
      .select(selectProducts)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => (this.dataSource.data = data));
  }

  openEditProductDialog() {
    const dialogRef = this.dialog.open(ProductEditDiaglogComponent, {
      width: '450px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAddProductDialog() {
    const dialogRef = this.dialog.open(ProductAddDialogComponent, {
      width: '450px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDeleteProductDialog() {
    const dialogRef = this.dialog.open(ProductDeleteDialogComponent, {
      width: '450px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
