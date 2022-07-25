export interface IProduct {
  product_id: string;
  product_name: string;
  price: number;
  price_change: number;
  change_date: Date;
  status: string;
  price_option?: IProductOption[];
}

export interface IProductOption {
  // product_id: string;
  member_type: string | string[];
  addon_price: number;
  description: string;
  status: string;
  // color?: {
  //   font: string;
  //   background: string;
  // };
}
