"use client";

import AddToCartButton from "./AddToCartButton";

export default function ProductCard({
  id,
  name,
  price,
}: {
  id: number;
  name: string;
  price: number;
}) {
  return (
    <div
      className="border border-gray-300 bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
      style={{ height: "fit-content" }}
    >
      <div className="font-semibold text-lg mb-2 text-gray-800">{name}</div>
      <div className="text-gray-600 opacity-85 mb-4">Rs. {price}</div>
      <AddToCartButton id={id} name={name} price={price} />
    </div>
  );
}
