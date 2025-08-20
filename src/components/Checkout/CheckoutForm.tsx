"use client";
import React from "react";
import { Button } from "../Button";

const inputClasses =
  "w-full px-4 py-3 rounded-lg border border-blue-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition";

interface CheckoutFormProps {
  name: string;
  setName: (v: string) => void;
  address: string;
  setAddress: (v: string) => void;
  payment: string;
  setPayment: (v: string) => void;
  handleOrder: () => void;
}

export default function CheckoutForm({
  name,
  setName,
  address,
  setAddress,
  payment,
  setPayment,
  handleOrder,
}: CheckoutFormProps) {
  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputClasses}
      />
      <textarea
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        rows={4}
        className={inputClasses + " resize-none"}
      />
      <select
        value={payment}
        onChange={(e) => setPayment(e.target.value)}
        className={inputClasses + " bg-white"}
      >
        <option value="" disabled>
          Select Payment Method
        </option>
        <option value="Cash">Cash</option>
        <option value="Card">Card</option>
      </select>
      <Button
        onClick={handleOrder}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
      >
        Place Order
      </Button>
    </div>
  );
}
