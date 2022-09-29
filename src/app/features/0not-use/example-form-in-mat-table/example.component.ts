import { Observable, of, Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IProduct, IProductOption } from '../../models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductEditDiaglogComponent } from '../edit-dialog/product-edit-diaglog.component';
import { ProductState } from '../../state/product.reducer';
import { Store } from '@ngrx/store';
import {
  getProductsLoaded,
  getProductsLoading,
} from '../../state/product.selectors';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ProductAddDialogComponent } from '../add-dialog/product-add-dialog.component';
import { ProductDeleteDialogComponent } from '../delete-dialog/product-delete-dialog.component';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ProductOptionDeleteDialogComponent } from '../option-delete-dialog/product-option-delete-dialog.component';
import { ProductOptionAddDialogComponent } from '../option-add-dialog/product-option-add-dialog.component';
import { ProductOptionEditDialogComponent } from '../option-edit-dialog/product-option-edit-dialog.component';

import * as ProductActions from '../../state/product.actions';

@Component({
  selector: 'example',
  templateUrl: './example.html',
})
export class ProductManagementComponent implements OnInit, OnDestroy {
  products$: Observable<IProduct[]> = of([]);
  isLoading$: Observable<boolean> = of(false);
  memberType = 'gold';

  form!: FormGroup;

  // Mat-Table
  @ViewChild(MatTable) table!: MatTable<any>;
  dataSource = new MatTableDataSource<IProduct[]>();
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
        if (data !== null) {
          data.forEach((d: IProduct) => {
            const productForm = this.form.get('products') as FormArray;
            productForm.push(this.createProductForm(d));
          });
        }
      });
  }

  setupForm() {
    this.form = this.fb.group({
      products: this.fb.array([]),
    });
  }

  addProductForm(product: IProduct | null) {
    const productForm = this.form.get('products') as FormArray;
    productForm.push(this.createProductForm(product!));
    this.table.renderRows();
  }

  createProductForm(product: IProduct): FormGroup {
    // console.log(product);

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

  openEditProductDialog(product: IProduct, index: number) {
    console.log(index);

    const dialogRef = this.dialog.open(ProductEditDiaglogComponent, {
      data: { ...product },
      width: '450px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const productForm = this.form.get('products') as FormArray;
        productForm.controls[index].get('id')?.setValue(product.id);
        productForm.controls[index].get('name')?.setValue(result.name);
        productForm.controls[index].get('price')?.setValue(result.price);
        productForm.controls[index].get('status')?.setValue(result.status);
      }
    });
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

        // this.addProductForm(product);
        this.store.dispatch(ProductActions.addProducts({ product }));
        const productForm = this.form.get('products') as FormArray;
        this.table.renderRows();
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
        (this.form.get('products') as FormArray).removeAt(index);
        this.table.renderRows();
        console.log(`Delete product ${product.name} success`);
      }
    });
  }

  openAddProductOptionDialog(product: any, index: number) {
    const dialogRef = this.dialog.open(ProductOptionAddDialogComponent, {
      data: { ...product },
      width: '450px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // console.log(result);
        const productForm = this.form.get('products') as FormArray;
        const productOptionForm = productForm.controls[index].get(
          'productOptions'
        ) as FormArray;

        const optionForm = this.fb.group({
          description: [result.description],
          memberTypes: [result.memberTypes],
          addonPrice: [result.addonPrice],
          status: [result.status],
        });
        productOptionForm.push(optionForm);
        this.table.renderRows();
      }
    });
  }

  openEditProductOptionDialog(
    product: any,
    productIndex: number,
    optionIndex: number
  ) {
    const dialogRef = this.dialog.open(ProductOptionEditDialogComponent, {
      data: { ...product, index: productIndex, optionIndex },
      width: '450px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const productForm = this.form.get('products') as FormArray;
        const productOptionForm = productForm.controls[productIndex].get(
          'productOptions'
        ) as FormArray;

        productOptionForm.controls[optionIndex].setValue({
          description: result.description,
          memberTypes: result.memberTypes,
          addonPrice: result.addonPrice,
          status: result.status,
        });
      }
    });
  }

  openDeleteProductOptionDialog(
    product: any,
    productIndex: number,
    optionIndex: number
  ) {
    const dialogRef = this.dialog.open(ProductOptionDeleteDialogComponent, {
      data: { ...product, index: productIndex, optionIndex },
      width: '450px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const productSelect = this.form.get('products') as FormArray;
        const optionSelect = productSelect.controls[productIndex].get(
          'productOptions'
        ) as FormArray;
        optionSelect.removeAt(optionIndex);
        this.table.renderRows();
      }
    });
  }
}
