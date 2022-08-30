import { BehaviorSubject, Observable, of, Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IProduct, IProductOption } from '../../models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductEditDiaglogComponent } from '../edit-dialog/product-edit-diaglog.component';
import { ProductState } from '../../state/product.reducer';
import { Store } from '@ngrx/store';
import {
  getProductsLoaded,
  getProductsLoading,
  getProductError,
} from '../../state/product.selectors';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ProductAddDialogComponent } from '../add-dialog/product-add-dialog.component';
import { ProductDeleteDialogComponent } from '../delete-dialog/product-delete-dialog.component';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { ProductOptionDeleteDialogComponent } from '../option-delete-dialog/product-option-delete-dialog.component';
import { ProductOptionAddDialogComponent } from '../option-add-dialog/product-option-add-dialog.component';
import { ProductOptionEditDialogComponent } from '../option-edit-dialog/product-option-edit-dialog.component';

import * as ProductActions from '../../state/product.actions';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
})
export class ProductManagementComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean> = of(false);
  memberType = 'gold';

  form: FormGroup = new FormGroup({});

  // Mat-Table
  @ViewChild(MatTable) table!: MatTable<any>;
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  displayedColumns: string[] = ['product', 'price_change', 'action'];

  private destroy$: Subject<any> = new Subject();

  constructor(
    private store: Store<ProductState>,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  get products(): FormArray {
    return this.form.get('products') as FormArray;
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this.destroy$.next;
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.setupForm();

    this.isLoading$ = this.store.select(getProductsLoading);

    this.store
      .select(getProductsLoaded)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        console.log(data);

        this.emptyTable();
        if (data !== null) {
          data.forEach((d: IProduct) => {
            this.products.push(this.createProductForm(d));
            this.dataSource.next(this.products.controls);
          });
        }
      });
  }

  setupForm() {
    this.form = this.fb.group({
      products: this.fb.array([]),
    });
  }

  emptyTable() {
    while (this.products.length !== 0) {
      this.products.removeAt(0);
    }
  }

  createProductForm(product: IProduct): FormGroup {
    let productForm = this.fb.group({
      id: [product.id],
      name: [product.name],
      price: [product.price],
      status: [product.status],
      productOptions: this.fb.array([]),
    });

    // Add Product Options
    const options = product.productOptions;
    options?.forEach((o: IProductOption) => {
      const optionForm = this.fb.group({
        description: [o.description],
        memberTypes: [o.memberTypes],
        addonPrice: [o.addonPrice],
        status: [o.status],
        order: [o.order],
      });
      (productForm.get('productOptions') as FormArray).push(optionForm);
    });

    return productForm;
  }

  onCheck() {
    console.log(this.form.value);
  }

  calculatePrice(n1: string, n2: string): number {
    const sum = parseFloat(n1) + parseFloat(n2);
    return isNaN(sum) ? parseFloat(n2) : sum;
  }

  openAddProductDialog() {
    const dialogRef = this.dialog.open(ProductAddDialogComponent, {
      width: '450px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const product: IProduct = {
          id: result.id,
          name: result.name,
          price: result.price,
          status: 'active',
          productOptions: [],
        };

        this.store.dispatch(ProductActions.addProduct({ product }));
      }
    });
  }

  openEditProductDialog(product: IProduct, index: number) {
    const dialogRef = this.dialog.open(ProductEditDiaglogComponent, {
      data: { ...product },
      width: '450px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.products.controls[index].get('id')?.setValue(product.id);
        this.products.controls[index].get('name')?.setValue(result.name);
        this.products.controls[index].get('price')?.setValue(result.price);
        this.products.controls[index].get('status')?.setValue(result.status);

        const updateProduct: IProduct = {
          ...product,
          name: result.name,
          price: result.price,
          status: result.status,
        };

        this.store.dispatch(ProductActions.updateProduct({ updateProduct }));
      }
    });
  }

  openDeleteProductDialog(product: IProduct, index: number) {
    const dialogRef = this.dialog.open(ProductDeleteDialogComponent, {
      data: { ...product },
      width: '450px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(ProductActions.deleteProduct({ id: result.id }));
      }
    });
  }

  openAddProductOptionDialog(product: any) {
    const dialogRef = this.dialog.open(ProductOptionAddDialogComponent, {
      data: { ...product },
      width: '450px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const option: IProductOption = {
          productId: result.productId,
          description: result.description,
          memberTypes: result.memberTypes,
          addonPrice: result.addonPrice,
          status: result.status,
        };

        this.store.dispatch(
          ProductActions.addProductOption({ product, option })
        );
      }
    });
  }

  openEditProductOptionDialog(product: IProduct, option: IProductOption) {
    const dialogRef = this.dialog.open(ProductOptionEditDialogComponent, {
      data: { product, selectOption: option },
      width: '450px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const updateOption: IProductOption = {
          ...option,
          description: result.description,
          memberTypes: result.memberTypes,
          addonPrice: result.addonPrice,
          status: result.status,
        };

        this.store.dispatch(
          ProductActions.updateProductOption({ product, updateOption })
        );
      }
    });
  }

  openDeleteProductOptionDialog(product: IProduct, option: IProductOption) {
    const dialogRef = this.dialog.open(ProductOptionDeleteDialogComponent, {
      data: { product, selectOption: option },
      width: '450px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          ProductActions.deleteProductOption({ product, deleteOption: option })
        );
      }
    });
  }
}
