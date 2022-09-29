import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProductOption } from '../../models/product.model';
import { ProductValidator } from '../../validators/product.validator';

interface PRODUCT_OPTIONS {
  id: string;
  name: string;
  options: IProductOption[];
  price: number;
  status: string;
  index: number;
}

const memberTypes = [
  { value: 'platinum', name: 'ระดับแพทตินัม' },
  { value: 'gold', name: 'ระดับโกลด์' },
  { value: 'silver', name: 'ระดับซิลเวอร์' },
  { value: 'normal', name: 'ระดับปกติ' },
];

@Component({
  selector: 'app-product-option-add-dialog',
  templateUrl: './product-option-add-dialog.component.html',
  styleUrls: ['./product-option-add-dialog.component.scss'],
})
export class ProductOptionAddDialogComponent implements OnInit {
  form!: FormGroup;
  memberTypes = memberTypes;
  constructor(
    public dialogRef: MatDialogRef<ProductOptionAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: PRODUCT_OPTIONS,
    private fb: FormBuilder,
    private productValidator: ProductValidator
  ) {}

  ngOnInit() {
    console.log(this.data);

    this.form = this.fb.group({
      description: [, Validators.required],
      addonPrice: [
        0,
        {
          validators: [
            this.productValidator.priceNotZero(),
            Validators.required,
          ],
        },
      ],
      memberTypes: this.fb.array([], [Validators.required]),
      status: ['active'],
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
}
