import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CartState, Coupon, Discount } from "./types";
import build from "next/dist/build";

// Async thunks for API integration
export const fetchCartData = createAsyncThunk(
  "cart/fetchCartData",
  async () => {
    console.log("cartSlice");
    const res = await fetch("/api/orders");
    return (await res.json()) as { id: number; name: string; price: number }[];
  }
);

export const submitOrder = createAsyncThunk(
  "cart/submitOrder",
  async (cart: CartState["items"]) => {
    const res = await fetch("/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cart),
    });
    return await res.json();
  }
);

const initialState: CartState = {
  items: [],
  discount: null,
  coupon: null,
  reward: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{
        id: number;
        name: string;
        price: number;
        qty?: number;
      }>
    ) => {
      const { id, name, price, qty = 1 } = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (existing) existing.qty += qty;
      else state.items.push({ id, name, price, qty });
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    setQty: (state, action: PayloadAction<{ id: number; qty: number }>) => {
      const it = state.items.find((i) => i.id === action.payload.id);
      if (!it) return;
      it.qty = Math.max(0, Math.floor(action.payload.qty || 0));
      if (it.qty === 0) state.items = state.items.filter((i) => i.id !== it.id);
    },
    increaseQty: (state, action: PayloadAction<number>) => {
      const it = state.items.find((i) => i.id === action.payload);
      if (it) it.qty += 1;
    },
    decreaseQty: (state, action: PayloadAction<number>) => {
      const it = state.items.find((i) => i.id === action.payload);
      if (it) {
        it.qty = Math.max(0, it.qty - 1);
        if (it.qty === 0)
          state.items = state.items.filter((i) => i.id !== it.id);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    applyDiscount: (state, action: PayloadAction<Discount>) => {
      state.coupon = null;
      state.discount = action.payload;
    },
    clearDiscount: (state) => {
      state.discount = null;
    },
    applyCoupon: (state, action: PayloadAction<Coupon>) => {
      state.discount = null;
      state.coupon = action.payload;
    },
    clearCoupon: (state) => {
      state.coupon = null;
    },
    setReward: (state, action: PayloadAction<string | null>) => {
      state.reward = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartData.fulfilled, (state, action) => {
      action.payload.forEach((item) => {
        const existing = state.items.find((i) => i.id === item.id);
        if (!existing) {
          state.items.push({ ...item, qty: 1 });
        }
      });
    });
    builder.addCase(submitOrder.fulfilled, (state, action) => {
      console.log("Order submitted:", action.payload);
      state.items = []; // clear cart after checkout
    });
  },
});

export const {
  addItem,
  removeItem,
  setQty,
  increaseQty,
  decreaseQty,
  clearCart,
  applyDiscount,
  clearDiscount,
  applyCoupon,
  clearCoupon,
  setReward,
} = cartSlice.actions;

export default cartSlice.reducer;
