// Product type

import { Product } from "../features/cart/types";

export const products: readonly Product[] = [
  { id: 1, name: "Wireless Mouse", price: 200 },
  { id: 2, name: "Mechanical Keyboard", price: 550 },
  { id: 3, name: '27" Monitor', price: 1800 },
  { id: 4, name: "USB-C Hub", price: 300 },
  { id: 5, name: "Noise-cancel Headphones", price: 2200 },
] as const;

// Coupon type
export type Coupon = {
  code: string;
  type: "flat" | "percentage";
  value: number;
};

export const coupons: Record<string, Coupon> = {
  SAVE50: { code: "SAVE50", type: "flat", value: 50 },
  SAVE200: { code: "SAVE200", type: "flat", value: 200 },
  OFF10: { code: "OFF10", type: "percentage", value: 10 },
};
