import { IProductHistory } from './../../models/product.model';
import { selectProductOptions } from './../../state/product.selectors';
import { BehaviorSubject, Observable, of, Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IProduct, IProductOption } from '../../models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductEditDiaglogComponent } from '../edit-dialog/product-edit-diaglog.component';
import { ProductState } from '../../state/product.reducer';
import { Store } from '@ngrx/store';
import {
  selectProducts,
  selectProductsLoading,
  selectProductError,
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
  canUpdateProductsPrice = false;

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

    this.isLoading$ = this.store.select(selectProductsLoading);
    this.store
      .select(selectProductOptions)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => (this.productOptions = res));

    this.store
      .select(selectProducts)
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

    this.form
      .get('products')!
      .valueChanges.pipe()
      .subscribe((products: any[]) => {
        let count = 0;
        products.forEach((p1) => {
          const cp = this.products.filter(
            (p2) => p2.id === p1.id && p2.price !== p1.price
          );
          if (cp.length > 0) count++;
        });
        this.canUpdateProductsPrice = count > 0 ? true : false;
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

  onUpdateAllProductPrice() {
    let formProductsPrice = this.form.get('products')?.value as any[];
    formProductsPrice.forEach((p1) => {
      const cp = this.products.filter(
        (p2) => p2.id === p1.id && p2.price !== p1.price
      );

      if (cp.length > 0) {
        const prevProduct = cp[0];
        const updateProduct: IProduct = {
          ...prevProduct!,
          price: p1.price,
          prevChangeDate: new Date(),
          prevPrice: prevProduct.price,
          history: [],
        };

        let historyData: IProductHistory = {
          timestamp: new Date(),
        };
        if (updateProduct.name !== prevProduct.name) {
          historyData.name = prevProduct.name;
        } else if (updateProduct.price !== prevProduct.price) {
          historyData.price = prevProduct.price;
        } else if (updateProduct.status !== prevProduct.status) {
          historyData.status = prevProduct.status;
        }
        updateProduct.history!.push(historyData);

        this.store.dispatch(ProductActions.updateProduct({ updateProduct }));
      }
    });
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
        // product ไม่มี docId
        const _product = this.products.find((p) => p.id === product.id);
        if (_product !== undefined) {
          let updateProduct: IProduct = {
            ..._product,
            name: result.name,
            price: result.price,
            status: result.status,
            prevChangeDate: new Date(),
            prevPrice: product.price,
            history: [],
          };

          let historyData: IProductHistory = {
            timestamp: new Date(),
          };
          if (updateProduct.name !== product.name) {
            historyData.name = product.name;
          } else if (updateProduct.price !== product.price) {
            historyData.price = product.price;
          } else if (updateProduct.status !== product.status) {
            historyData.status = product.status;
          }
          updateProduct.history!.push(historyData);

          this.store.dispatch(ProductActions.updateProduct({ updateProduct }));
        }
      }
    });
  }

  // updateProduct(newProduct: IProduct, oldProduct: IProduct): IProduct {
  //   let updateProduct: IProduct = {
  //     ...oldProduct,
  //     name: newProduct.name,
  //     price: newProduct.price,
  //     status: newProduct.status,
  //     prevChangeDate: new Date(),
  //     prevPrice: newProduct.price,
  //     history: [],
  //   };

  //   let historyData: IProductHistory = {
  //     timestamp: new Date(),
  //   };
  //   if (updateProduct.name !== oldProduct.name) {
  //     historyData.name = oldProduct.name;
  //   } else if (updateProduct.price !== oldProduct.price) {
  //     historyData.price = oldProduct.price;
  //   } else if (updateProduct.status !== oldProduct.status) {
  //     historyData.status = oldProduct.status;
  //   }
  //   updateProduct.history!.push(historyData);
  //   return updateProduct;
  // }

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
