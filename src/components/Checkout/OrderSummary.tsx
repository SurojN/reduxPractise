"use client";
import React from "react";

interface OrderSummaryProps {
  items: any[];
  discount: number;
  total: number;
  reward: string | null;
}

export default function OrderSummary({
  items,
  discount,
  total,
  reward,
}: OrderSummaryProps) {
  return (
    <div className="mt-6 bg-blue-50 p-4 rounded-xl shadow-inner space-y-2 text-blue-900">
      <div className="flex justify-between">
        <span>Items:</span>
        <span>{items.length}</span>
      </div>
      <div className="flex justify-between">
        <span>Discount:</span>
        <span>Rs. {discount}</span>
      </div>
      <div className="flex justify-between font-bold text-lg">
        <span>Total:</span>
        <span>Rs. {total}</span>
      </div>
      {reward && (
        <div className="text-center text-blue-700 font-semibold">
          🎁 Reward: {reward}
        </div>
      )}
    </div>
  );
}
