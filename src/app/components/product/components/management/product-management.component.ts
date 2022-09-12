import { getProductOptions } from './../../state/product.selectors';
import { BehaviorSubject, Observable, of, Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IProduct, IProductOption } from '../../models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductEditDiaglogComponent } from '../edit-dialog/product-edit-diaglog.component';
import { ProductState } from '../../state/product.reducer';
import { Store } from '@ngrx/store';
import {
  getProducts,
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
  private destroy$: Subject<any> = new Subject();
  // Mat-Table
  @ViewChild(MatTable) table!: MatTable<any>;
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  displayedColumns: string[] = ['product', 'price_change', 'action'];

  isLoading$: Observable<boolean> = of(false);
  memberType = 'gold';

  form: FormGroup = new FormGroup({});

  products: IProduct[] = [];
  productOptions: IProductOption[] = [];

  constructor(
    private store: Store<ProductState>,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  get formProduct(): FormArray {
    return this.form.get('products') as FormArray;
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.destroy$.next;
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.setupForm();

    this.isLoading$ = this.store.select(getProductsLoading);
    this.store
      .select(getProductOptions)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => (this.productOptions = res));

    this.store
      .select(getProducts)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.emptyTable();
        if (res !== null) {
          this.products = res;
          res.forEach((d: IProduct) => {
            this.formProduct.push(this.createProductForm(d));
            this.dataSource.next(this.formProduct.controls);
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
    while (this.formProduct.length !== 0) {
      this.formProduct.removeAt(0);
    }
  }

  createProductForm(product: IProduct): FormGroup {
    let productForm = this.fb.group({
      id: [product.id],
      name: [product.name],
      price: [product.price],
      status: [product.status],
    });

    return productForm;
  }

  onCheck() {
    let changeProducts = this.form.get('products')?.value;
  }

  calculatePrice(n1: string, n2: any): number {
    const sum = parseFloat(n1) + parseFloat(n2);
    return isNaN(sum) ? parseFloat(n2) : sum;
  }

  checkProductOptionOrder(option: IProductOption): string {
    let options = this.productOptions.filter(
      (o) => o.productId === option.productId
    );
    if (option.order === Math.max(...options.map((o) => o.order))) {
      return 'last';
    } else if (option.order === Math.min(...options.map((o) => o.order))) {
      return 'first';
    }
    return '';
  }

  upOrderProductOption(option: IProductOption) {
    let options = this.productOptions.filter(
      (o) => o.productId === option.productId
    );
    let index = options.findIndex((o) => o.order === option.order);
    const option1: IProductOption = {
      ...options[index],
      order: options[index - 1].order,
    };
    const option2: IProductOption = {
      ...options[index - 1],
      order: options[index].order,
    };
    this.store.dispatch(
      ProductActions.swapProductOption({
        option1,
        option2,
      })
    );
  }
  downOrderProductOption(option: IProductOption) {
    let options = this.productOptions.filter(
      (o) => o.productId === option.productId
    );
    let index = options.findIndex((o) => o.order === option.order);
    const option1: IProductOption = {
      ...options[index],
      order: options[index + 1].order,
    };
    const option2: IProductOption = {
      ...options[index + 1],
      order: options[index].order,
    };
    this.store.dispatch(
      ProductActions.swapProductOption({
        option1,
        option2,
      })
    );
  }

  openAddProductDialog() {
    const dialogRef = this.dialog.open(ProductAddDialogComponent, {
      width: '450px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const product: IProduct = {
          id: (result.id as string).toLowerCase(),
          name: result.name,
          price: result.price,
          status: 'active',
        };

        this.store.dispatch(ProductActions.addProduct({ product }));
      }
    });
  }

  openEditProductDialog(product: IProduct) {
    const dialogRef = this.dialog.open(ProductEditDiaglogComponent, {
      data: { ...product },
      width: '450px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const _product = this.products.find((p) => p.id === product.id);
        const updateProduct: IProduct = {
          ..._product!,
          name: result.name,
          price: result.price,
          status: result.status,
          prevChangeDate: new Date(),
          prevPrice: product.price,
        };

        this.store.dispatch(ProductActions.updateProduct({ updateProduct }));
      }
    });
  }

  openDeleteProductDialog(product: IProduct) {
    const dialogRef = this.dialog.open(ProductDeleteDialogComponent, {
      data: { ...product },
      width: '450px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const _product = this.products.find((p) => p.id === product.id);
        this.store.dispatch(
          ProductActions.deleteProduct({ product: _product! })
        );
      }
    });
  }

  openAddProductOptionDialog(product: IProduct) {
    const dialogRef = this.dialog.open(ProductOptionAddDialogComponent, {
      data: { ...product },
      width: '450px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let options = this.productOptions.filter(
          (o) => o.productId === product.id
        );
        const newOrder = Math.max(...options.map((o) => o.order));

        const option: IProductOption = {
          order: newOrder + 1,
          productId: product.id,
          description: res.description,
          memberTypes: res.memberTypes,
          addonPrice: res.addonPrice,
          status: res.status,
        };

        this.store.dispatch(ProductActions.addProductOption({ option }));
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
          ProductActions.updateProductOption({
            updateOption,
          })
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

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.store.dispatch(
          ProductActions.deleteProductOption({
            deleteOption: option,
          })
        );
      }
    });
  }
}
