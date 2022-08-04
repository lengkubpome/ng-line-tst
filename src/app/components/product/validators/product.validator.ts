import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

@Injectable()
export class ProductValidator {
  constructor() {}

  public priceNotZero(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value === 0 || control.value === 'e') {
        console.log('Check X');

        return { x: true };
      }
      console.log('Check Y');
      return null;
    };
  }
}
