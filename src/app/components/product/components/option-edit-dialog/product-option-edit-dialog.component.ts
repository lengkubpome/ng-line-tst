import { IProduct } from 'app/components/product/models/product.model';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProductOption } from '../../models/product.model';
import { ProductValidator } from '../../validators/product.validator';

interface PRODUCT_OPTIONS {
  product: IProduct;
  selectOption: IProductOption;
}

const memberTypes = [
  { value: 'platinum', name: 'ระดับแพทตินัม' },
  { value: 'gold', name: 'ระดับโกลด์' },
  { value: 'silver', name: 'ระดับซิลเวอร์' },
  { value: 'normal', name: 'ระดับปกติ' },
];

@Component({
  selector: 'app-product-option-edit-dialog',
  templateUrl: './product-option-edit-dialog.component.html',
  styleUrls: ['./product-option-edit-dialog.component.scss'],
})
export class ProductOptionEditDialogComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  memberTypes = memberTypes;
  productOption!: IProductOption;

  constructor(
    public dialogRef: MatDialogRef<ProductOptionEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: PRODUCT_OPTIONS,
    private fb: FormBuilder,
    private productValidator: ProductValidator
  ) {}

  ngOnInit() {
    this.productOption = this.data.selectOption;
    console.log(this.productOption);

    this.form = this.fb.group({
      description: [this.productOption.description, Validators.required],
      addonPrice: [
        this.productOption.addonPrice,
        {
          validators: [
            this.productValidator.priceNotZero(),
            Validators.required,
          ],
        },
      ],
      memberTypes: this.fb.array([], [Validators.required]),
      status: [this.productOption.status],
    });

    // เพิ่มข้อมูลเข้า Form หลัก
    const checkArray: FormArray = this.form.get('memberTypes') as FormArray;
    this.productOption.memberTypes.forEach((type) => {
      checkArray.push(new FormControl(type));
    });
  }

  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.form.get('memberTypes') as FormArray;

    if (e.checked) {
      checkArray.push(new FormControl(e.source.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.source.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  calculatePrice(n1: string, n2: string): number {
    const sum = parseFloat(n1) + parseFloat(n2);
    return isNaN(sum) ? parseFloat(n2) : sum;
  }

  onCheck() {
    console.log(this.form.value);
  }
}
