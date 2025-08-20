import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EcommerceState, Product } from "../cart/types";



const initialState: EcommerceState = {
  cart: [],
  discount: { type: null, value: 0 },
  coupon: null,
  reward: null,
};

const ecommerceSlice = createSlice({
  name: "ecommerce",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.cart.push(action.payload);
    },
    applyDiscount: (
      state,
      action: PayloadAction<{ type: "percentage" | "flat"; value: number }>
    ) => {
      // If discount is applied, coupon cannot exist
      state.coupon = null;
      state.discount = action.payload;
    },
    applyCoupon: (state, action: PayloadAction<string>) => {
      // If coupon is applied, discount cannot exist
      state.discount = { type: null, value: 0 };
      state.coupon = action.payload;
    },
    clearDiscounts: (state) => {
      state.discount = { type: null, value: 0 };
      state.coupon = null;
    },
    calculateReward: (state) => {
      const subtotal = state.cart.reduce((sum, item) => sum + item.price, 0);

      // Apply coupon
      let total = subtotal;
      if (state.coupon === "SAVE10") {
        total -= 10;
      }

      // Apply discount
      if (state.discount.type === "percentage") {
        total -= (subtotal * state.discount.value) / 100;
      } else if (state.discount.type === "flat") {
        total -= state.discount.value;
      }

      // Reward if > 1000
      state.reward = total > 1000 ? "🍺 Beer or 🥤 Coke" : null;
    },
  },
});

export const {
  addProduct,
  applyDiscount,
  applyCoupon,
  clearDiscounts,
  calculateReward,
} = ecommerceSlice.actions;

export default ecommerceSlice.reducer;
