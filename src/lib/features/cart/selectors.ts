import { RootState } from "@/lib/store/store";
import { CartItem } from "./types";

export const selectItems = (s: RootState) => s.cart.items;
export const selectActiveCoupon = (s: RootState) => s.cart.coupon;
export const selectActiveDiscount = (s: RootState) => s.cart.discount;
export const selectReward = (s: RootState) => s.cart.reward;
export const selectProducts = (s: RootState) => s.products.items;

export const selectSubtotal = (s: RootState) =>
  s.cart.items.reduce(
    (sum: number, it: CartItem) => sum + it.price * it.qty,
    0
  );

export const selectDiscountAmount = (s: RootState) => {
  const subtotal = selectSubtotal(s);
  const d = s.cart.discount;
  const c = s.cart.coupon;

  if (c) {
    if (c.type === "percentage") return (subtotal * c.value) / 100;
    return c.value;
  }
  if (d) {
    if (d.type === "percentage") return (subtotal * d.value) / 100;
    return d.value;
  }
  return 0;
};

export const selectTotal = (s: RootState) => {
  const subtotal = selectSubtotal(s);
  const less = selectDiscountAmount(s);
  const total = Math.max(0, subtotal - less);
  return total;
};

export const selectComputedReward = (s: RootState) => {
  const total = selectTotal(s);
  return total > 1000 ? "🍺 Beer or 🥤 Coke" : null;
};
