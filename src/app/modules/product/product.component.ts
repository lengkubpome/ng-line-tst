import { Component, OnInit } from '@angular/core';
import { ProductService } from '@shared/services/product.service';

interface IProduct {
  product_id: string;
  product_name: string;
  price: number;
  price_prev: number;
  change_date: Date;
  status: string;
  price_option?: IProductOption[];
}

interface IProductOption {
  member_type: string[];
  addon_price: number;
  description: string;
  benefits: string;
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
    this.productService.getProducts().subscribe((data: any[]) => {
      data.map((p) => {
        let productOption: IProductOption[];
        if (p.price_option !== '') {
          let option = p.price_option.replace(/[\n\\.]/g, '');
          let optionArray = option.split('[,]');
          optionArray = optionArray.map((o: any) => {
            let optionData = JSON.parse(o);
            optionData.addon_price = parseFloat(optionData.addon_price);
            return optionData;
          });

          return (p.price_option = optionArray);
        }
      });
      console.log(data);
      this.products = data;
    });
  }
}
