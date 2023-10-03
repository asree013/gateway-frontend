import { Products } from "../interface/woocommerce.model";

export class StockCreate {
  sku: string;
  picture: string;
  name_product: string;
  stock_internal: number;
  stock_external: number;
  total: number;
  price: number;
  p1: number;
  p2: number;
  p3: number;
  p4: number;
  product_id: number;
  branch_id: number;
}

export class ProductStockCreate {
  name: string;
  description: string;
  sku: string;
  picture: string;
  name_product: string;
  stock_internal: number;
  stock_external: number;
  total: number;
  price: number;
  p1: number;
  p2: number;
  p3: number;
  p4: number;
  product_id: number;
  branch_id: number;
}

export class Stocks {
  id: number;
  name_product: string;
  stock_internal: number;
  stock_external: number;
  sell_total: number;
  price: number;
  p1: number;
  p2: number;
  p3: number;
  p4: number;
  product_id: number;
  branch_id: number;
  sku: string;
  picture: string;
  br_name: string;
  create_at: Date;
  update_at: Date;
}

export class StockList {
  id: number;
  name_product: string;
  stock_internal: number;
  stock_external: number;
  total: number;
  price: number;
  p1: number;
  p2: number;
  p3: number;
  p4: number;
  product_id: number;
  branch_id: number;
  sku: string;
  picture: string;
  br_name: string;
  quantity: number
}

export class StockQuantity {
  id: number;
  name: string;
  picture: string;
  sku: string;
  all_front_quantity: number;
  all_back_quantity: number;
  create_date: Date;
  update_date: Date;
}

export class StockQuantityRelate {
  id: number;
  name: string;
  front: number;
  back: number;
  stocks: Stocks[]
}

export class ModalStockQuantity {
  modalStock: boolean
  element: StockQuantity
}
