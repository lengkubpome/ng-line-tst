import { Observable, Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IProduct, IProductOption } from '../../models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductEditDiaglogComponent } from '../edit-dialog/product-edit-diaglog.component';
import { ProductState } from '../../state/product.reducer';
import { Store } from '@ngrx/store';
import {
  selectProducts,
  selectProductsLoading,
} from '../../state/product.selectors';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ProductAddDialogComponent } from '../add-dialog/product-add-dialog.component';
import { ProductDeleteDialogComponent } from '../delete-dialog/product-delete-dialog.component';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
})
export class ProductManagementComponent implements OnInit, OnDestroy {
  products$?: Observable<IProduct[]>;
  isLoading$?: Observable<boolean>;
  memberType = 'gold';

  form!: FormGroup;

  // Mat-Table
  @ViewChild(MatTable) table!: MatTable<any>;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['product', 'price_change', 'action'];

  private destroy$: Subject<any> = new Subject();

  constructor(
    private store: Store<ProductState>,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this.destroy$.next;
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.setupForm();

    this.isLoading$ = this.store.select(selectProductsLoading);

    this.store
      .select(selectProducts)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        data.forEach((d: IProduct) => {
          const productForm = this.form.get('products') as FormArray;
          productForm.push(this.createProductForm(d));
        });
      });
  }

  get products(): FormArray {
    return this.form.get('products') as FormArray;
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
    let productForm = this.fb.group({
      id: [product.id],
      name: [product.name],
      price: [product.price],
      status: [product.status],
      options: this.fb.array([]),
    });

    // Add options
    const options = product.priceOption;
    options?.forEach((o: IProductOption) => {
      const optionForm = this.fb.group({
        description: [o.description],
        memberType: [o.memberType],
        addonPrice: [{ value: o.addonPrice, disabled: true }],
        status: [o.status],
      });
      (productForm.get('options') as FormArray).push(optionForm);
    });

    return productForm;
  }

  addProduct() {
    const product: IProduct = {
      id: 'P003',
      name: 'Product Test',
      price: 78,
      status: 'active',
      priceOption: [],
    };

    this.addProductForm(product);
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
        productForm.controls[index].get('id')?.setValue(result.id);
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
      console.log(`Dialog result: ${result}`);
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
}