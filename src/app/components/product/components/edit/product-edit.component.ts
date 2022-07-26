import { ProductService } from '@shared/services/product.service';
import { Observable, switchMap, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '@shared/models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductEditDiaglogComponent } from '../edit-diaglog/product-edit-diaglog.component';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  isLoading = true;
  products?: IProduct[];
  products$?: Observable<IProduct[]>;
  memberType = 'gold';

  // Mat
  displayedColumns: string[] = ['product', 'price_change', 'status', 'action'];
  dataSource: any;

  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // this.products$ = this.productService.getProducts().pipe(
    this.productService
      .getProducts()
      .pipe(
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
                    // product_id: o.product_id,
                    member_type: o.member_type,
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

  openEditDialog() {
    const dialogRef = this.dialog.open(ProductEditDiaglogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
