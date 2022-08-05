import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable()
export class ProductValidator {
  constructor() {}

  public priceNotZero(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value === 0 || control.value === null) {
        return { eject: true };
      }
      return null;
    };
  }
}
