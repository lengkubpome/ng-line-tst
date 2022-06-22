import { Component, OnInit } from '@angular/core';
import { ProductService } from '@shared/services/product.service';
import { map, mergeMap, Observable, switchMap } from 'rxjs';

interface IProduct {
  product_id: string;
  product_name: string;
  price: number;
  price_change: number;
  change_date: Date;
  status: string;
  price_option?: IProductOption[];
}

interface IProductOption {
  // member_type: string[];
  member_type: string;
  addon_price: number;
  description: string;
  benefits: string;
  // color?: {
  //   font: string;
  //   background: string;
  // };
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products?: IProduct[];
  products$?: Observable<IProduct[]>;
  memberType = 'gold';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService.getProducts().pipe(
      switchMap((products) => {
        return this.productService.getProductOptions().pipe(
          map((options: any[]) => {
            products.forEach((product: IProduct) => {
              product.price_option = [];

              let option = options.filter(
                (o) => o.product_id === product.product_id
              );

              option.forEach((o) => {
                const option = {
                  member_type: o.member_type,
                  addon_price: o.addon_price,
                  description: o.description,
                  benefits: o.benefits,
                };
                product.price_option?.push(option);
              });
            });

            console.log(products);

            return products;
          })
        );
      })
    );
  }
}
