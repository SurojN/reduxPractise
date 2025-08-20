"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/reduxHooks";
import { applyCoupon, clearCoupon } from "@/lib/features/cart/cartSlice";
import { selectActiveCoupon } from "@/lib/features/cart/selectors";
import { coupons } from "@/lib/data/products";
import { Button } from "../Button";

export default function CouponForm() {
  const dispatch = useAppDispatch();
  const activeCoupon = useAppSelector(selectActiveCoupon);
  const [couponCode, setCouponCode] = useState("");

  const applyCouponHandler = () => {
    const entry = (coupons as any)[couponCode.trim().toUpperCase()];
    if (!entry) return alert("Invalid coupon");
    dispatch(applyCoupon({ mode: "coupon", ...entry }));
    setCouponCode("");
  };

  return (
    <div>
      <div className="font-semibold text-gray-800 mb-2">Coupon</div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <input
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Coupon code (e.g. SAVE200, OFF10)"
          className="p-3 border border-gray-400 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-500"
        />
        <Button
          onClick={applyCouponHandler}
          className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Apply Coupon
        </Button>
      </div>
      {activeCoupon && (
        <div className="mt-2 text-sm text-gray-700">
          Active coupon: <b>{activeCoupon.code}</b> ({activeCoupon.type}{" "}
          {activeCoupon.value})
          <Button
            onClick={() => dispatch(clearCoupon())}
            className="ml-2 text-blue-600 hover:underline"
          >
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}
