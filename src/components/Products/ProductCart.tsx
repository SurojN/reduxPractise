"use client";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/reduxHooks";
import { selectItems } from "@/lib/features/cart/selectors";
import {
  removeItem,
  increaseQty,
  decreaseQty,
} from "@/lib/features/cart/cartSlice";
import { Button } from "../Button";
import { CartItem } from "@/lib/features/cart/types";

export default function ProductCart() {
  const items = useAppSelector(selectItems);
  const dispatch = useAppDispatch();

  if (items.length === 0)
    return <div className="text-center text-gray-500">Your cart is empty</div>;

  return (
    <div className="flex flex-col gap-4 p-6 border border-blue-300 rounded-lg bg-white shadow-md">
      <h2 className="font-semibold text-xl text-gray-800">Cart</h2>
      {items.map((item: CartItem) => (
        <div
          key={item.id}
          className="flex justify-between items-center p-4 border-b border-gray-200"
        >
          <div>
            <div className="font-medium text-gray-800">{item.name}</div>
            <div className="text-gray-600">
              Rs. {item.price} x {item.qty}
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              className="text-gray-600"
              onClick={() => dispatch(decreaseQty(item.id))}
            >
              -
            </Button>
            <Button
              className="text-gray-600"
              onClick={() => dispatch(increaseQty(item.id))}
            >
              +
            </Button>
            <Button
              className="text-red-500"
              onClick={() => dispatch(removeItem(item.id))}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
