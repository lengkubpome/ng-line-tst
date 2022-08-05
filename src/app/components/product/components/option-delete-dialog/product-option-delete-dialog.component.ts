import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProduct, IProductOption } from '../../models/product.model';

interface PRODUCT_OPTIONS {
  id: string;
  name: string;
  productOptions: IProductOption[];
  price: number;
  status: string;
  index: number;
  optionIndex: number;
}

@Component({
  selector: 'app-product-option-delete-dialog',
  templateUrl: './product-option-delete-dialog.component.html',
  styleUrls: ['./product-option-delete-dialog.component.scss'],
})
export class ProductOptionDeleteDialogComponent implements OnInit {
  form!: FormGroup;
  productOption!: IProductOption;

  memberTypes = [
    { value: 'platinum', name: 'ระดับแพทตินัม' },
    { value: 'gold', name: 'ระดับโกลด์' },
    { value: 'silver', name: 'ระดับซิลเวอร์' },
    { value: 'normal', name: 'ระดับปกติ' },
  ];

  constructor(
    public dialogRef: MatDialogRef<ProductOptionDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: PRODUCT_OPTIONS
  ) {}

  ngOnInit() {
    this.productOption = this.data.productOptions[this.data.optionIndex];
    console.log(this.productOption);
    console.log(this.productOption.memberTypes);
  }

  onCheckboxChange(e: MatCheckboxChange) {
    e.source.checked = !e.checked;
  }

  calculatePrice(n1: any, n2: any): number {
    const sum = parseFloat(n1) + parseFloat(n2);
    return isNaN(sum) ? parseFloat(n2) : sum;
  }
}
