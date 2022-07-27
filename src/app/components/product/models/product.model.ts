export interface IProduct {
  id: string;
  name: string;
  price: number;
  priceChange?: number;
  changeDate?: Date;
  status: string;
  priceOption?: IProductOption[];
}

export interface IProductOption {
  // product_id: string;
  memberType: string | string[];
  addonPrice: number;
  description: string;
  status: string;
  // color?: {
  //   font: string;
  //   background: string;
  // };
}
