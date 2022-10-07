import { IProduct } from './../../models/product.model';
import { selectProducts } from './../../state/product.selectors';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductState } from '../../state/product.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-product-add-dialog',
  templateUrl: './product-add-dialog.component.html',
  styleUrls: ['./product-add-dialog.component.scss'],
})
export class ProductAddDialogComponent implements OnInit, OnDestroy {
  private destroy$: Subject<any> = new Subject();
  form: FormGroup = new FormGroup({});
  products: IProduct[] = [];

  constructor(
    private store: Store<ProductState>,
    public dialogRef: MatDialogRef<ProductAddDialogComponent>,
    private fb: FormBuilder
  ) {}

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.destroy$.next;
    this.destroy$.complete();
  }

  ngOnInit() {
    this.form = this.fb.group({
      id: [, [Validators.required]],
      name: [, [Validators.required]],
      price: [, [Validators.required]],
    });

    this.store
      .select(selectProducts)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res !== null) {
          this.products = res;
        }
      });

    this.form.get('id')?.valueChanges.subscribe((value: string) => {
      const duplicateId = this.products.filter(
        (p) => p.id.toUpperCase().trim() === value.toUpperCase().trim()
      );
      duplicateId.length > 0
        ? this.form.get('id')?.setErrors({ duplicate: true })
        : null;
    });
  }
}
