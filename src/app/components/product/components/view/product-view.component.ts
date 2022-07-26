import { DatePipe } from '@angular/common';
import { ProductService } from '@shared/services/product.service';
import { Observable, switchMap, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IProduct, IProductOption } from '@shared/models/product.model';

@Component({
  selector: 'app-product-show',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit {
  isLoading = true;
  time = this.datepipe.transform(new Date(), 'hh:mm น.  dd/MM/yyyy');
  products?: IProduct[];
  products$?: Observable<IProduct[]>;
  memberType = 'admin';

  // Mat
  displayedColumns: string[] = ['product', 'price', 'price_change'];
  dataSource: any;

  constructor(
    private productService: ProductService,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    // this.products$ = this.productService.getProducts().pipe(
    this.productService
      .getProducts()
      .pipe(
        switchMap((products: IProduct[]) => {
          return this.productService.getProductOptions().pipe(
            map((options: any[]) => {
              products.forEach((product: IProduct) => {
                product.price_option = [];

                let option = options.filter(
                  (o) => o.product_id === product.product_id
                );

                option.forEach((o) => {
                  const memberTypes = (o.member_type as string).split(',');

                  const option = {
                    // product_id: o.product_id,
                    member_type: memberTypes,
                    addon_price: o.addon_price,
                    description: o.description,
                    status: o.status,
                  };
                  product.price_option?.push(option);
                });
              });

              console.log(products);
              this.isLoading = false;
              return products;
            })
          );
        })
      )
      .subscribe((data) => (this.dataSource = data));
  }
}
