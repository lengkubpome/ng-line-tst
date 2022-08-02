export interface IProduct {
  id: string;
  name: string;
  price: number;
  priceChange?: number;
  changeDate?: Date;
  status: string;
  order?: number;
  productOptions?: IProductOption[];
}

export interface IProductOption {
  // product_id: string;
  memberType: string | string[];
  addonPrice: number;
  description: string;
  status: string;
  order?: number;
  // color?: {
  //   font: string;
  //   background: string;
  // };
}
