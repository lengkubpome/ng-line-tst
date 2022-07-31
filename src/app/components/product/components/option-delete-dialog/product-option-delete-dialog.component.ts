import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProduct, IProductOption } from '../../models/product.model';

interface PRODUCT_OPTIONS {
  id: string;
  name: string;
  productOptions: IProductOption[];
  price: number;
  status: string;
  index: number;
}

@Component({
  selector: 'app-product-option-delete-dialog',
  templateUrl: './product-option-delete-dialog.component.html',
  styleUrls: ['./product-option-delete-dialog.component.scss'],
})
export class ProductOptionDeleteDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ProductOptionDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: PRODUCT_OPTIONS
  ) {}

  ngOnInit() {
    console.log(this.data);
  }
}
