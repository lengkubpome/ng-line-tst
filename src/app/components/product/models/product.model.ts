export interface IProduct {
  docId?: string;
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
  docId?: string;
  productId: string;
  memberTypes: string[];
  addonPrice: number;
  description: string;
  status: string;
  order: number;
  // color?: {
  //   font: string;
  //   background: string;
  // };
}
