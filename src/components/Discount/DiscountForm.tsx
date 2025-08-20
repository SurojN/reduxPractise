"use client";
import React from "react";
import DiscountInput from "./DiscountInput";
import CouponForm from "./CuponForm";

export default function DiscountForm() {
  return (
    <div className="border border-blue-300 rounded-lg p-6 bg-white shadow-lg space-y-6">
      <div className="font-bold text-lg text-gray-800">Savings</div>
      <CouponForm />
      <DiscountInput />
      <div className="mt-2 text-xs text-gray-500">
        * Only one can be active: applying coupon clears discount, and vice
        versa.
      </div>
    </div>
  );
}
