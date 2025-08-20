export type Discount =
  | { mode: "discount"; type: "percentage"; value: number }
  | { mode: "discount"; type: "flat"; value: number };

export type Coupon =
  | { mode: "coupon"; code: string; type: "percentage"; value: number }
  | { mode: "coupon"; code: string; type: "flat"; value: number };

export interface CartItem {
  id: number; // product id
  name: string;
  price: number;
  qty: number;
}

export interface ProductsState {
  items: Product[];
  loading: boolean;
}
export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface EcommerceState {
  cart: Product[];
  discount: {
    type: "percentage" | "flat" | null;
    value: number;
  };
  coupon: string | null;
  reward: string | null;
}

export interface CartState {
  items: CartItem[];
  discount: Discount | null;
  coupon: Coupon | null;
  reward: string | null;
}

export interface Product {
  id: number;
  name: string;
  price: number;
}
