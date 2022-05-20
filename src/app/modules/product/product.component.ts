import { Component, OnInit } from '@angular/core';
import { ProductService } from '@shared/services/product.service';

interface IProduct {
  product_id: string;
  product_name: string;
  price: number;
  price_prev: number;
  change_date: Date;
  status: string;
  price_option: any;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products?: IProduct[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: IProduct[]) => {
      this.products = data;
    });
  }
}
