import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-delete-dialog',
  templateUrl: './product-delete-dialog.component.html',
  styleUrls: ['./product-delete-dialog.component.scss'],
})
export class ProductDeleteDialogComponent implements OnInit {
  product = 'product name';
  constructor() {}

  ngOnInit() {}
}
