import { IProduct } from '../../models/product.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-delete-dialog',
  templateUrl: './product-delete-dialog.component.html',
  styleUrls: ['./product-delete-dialog.component.scss'],
})
export class ProductDeleteDialogComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  confirmName = false;

  private destroy$: Subject<any> = new Subject();

  constructor(
    public dialogRef: MatDialogRef<ProductDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProduct,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [, [Validators.required]],
    });

    this.form
      .get('name')
      ?.valueChanges.pipe(takeUntil(this.destroy$), debounceTime(200))
      .subscribe((value) => {
        if (value === this.data.name) {
          this.confirmName = true;
        } else {
          this.confirmName = false;
        }
      });
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this.destroy$.next;
    this.destroy$.complete();
  }
}
