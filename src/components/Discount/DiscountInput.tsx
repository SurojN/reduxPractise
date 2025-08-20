"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/reduxHooks";
import { applyDiscount, clearDiscount } from "@/lib/features/cart/cartSlice";
import { selectActiveDiscount } from "@/lib/features/cart/selectors";
import { Button } from "../Button";

export default function DiscountInput() {
  const dispatch = useAppDispatch();
  const activeDiscount = useAppSelector(selectActiveDiscount);

  const [discountType, setDiscountType] = useState<"percentage" | "flat">(
    "percentage"
  );
  const [discountValue, setDiscountValue] = useState<number>(0);

  const applyDiscountHandler = () => {
    if (discountValue <= 0) return alert("Enter value > 0");
    dispatch(
      applyDiscount({
        mode: "discount",
        type: discountType,
        value: discountValue,
      })
    );
  };

  return (
    <div>
      <div className="font-semibold text-gray-800 mb-2">Discount</div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <select
          value={discountType}
          onChange={(e) => setDiscountType(e.target.value as any)}
          className="p-3 border border-gray-400 rounded-lg bg-gray-100 text-gray-800"
        >
          <option value="percentage">Percentage %</option>
          <option value="flat">Flat</option>
        </select>
        <input
          type="number"
          min={0}
          value={discountValue}
          onChange={(e) => setDiscountValue(Number(e.target.value))}
          placeholder={discountType === "percentage" ? "e.g. 10" : "e.g. 200"}
          className="p-3 border border-gray-400 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-400"
        />
        <Button
          onClick={applyDiscountHandler}
          className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Apply Discount
        </Button>
      </div>
      {activeDiscount && (
        <div className="mt-2 text-sm text-gray-700">
          Active discount: <b>{activeDiscount.type}</b> ({activeDiscount.value})
          <Button
            onClick={() => dispatch(clearDiscount())}
            className="ml-2 text-blue-600 hover:underline"
          >
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}
