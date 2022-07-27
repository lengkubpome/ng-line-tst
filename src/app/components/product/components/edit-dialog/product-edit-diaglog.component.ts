import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../../models/product.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-edit-diaglog',
  templateUrl: './product-edit-diaglog.component.html',
  styleUrls: ['./product-edit-diaglog.component.scss'],
})
export class ProductEditDiaglogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProductEditDiaglogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProduct,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      id: [this.data.id, [Validators.required]],
      name: [this.data.name, [Validators.required]],
      price: [this.data.price, [Validators.required]],
      status: [this.data.status],
    });
  }
}
