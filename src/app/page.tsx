"use client";
import DiscountForm from "@/components/Discount/DiscountForm";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/reduxHooks";
import {
  selectComputedReward,
  selectProducts,
} from "@/lib/features/cart/selectors";
import CheckoutButton from "@/components/Checkout/CheckoutButton";
import ProductCardList from "@/components/Products/ProductCardList";
import ProductCart from "@/components/Products/ProductCart";
import { useEffect } from "react";
import { fetchProducts } from "@/lib/features/cart/productSlice";

export default function Home() {
  const reward = useAppSelector(selectComputedReward);
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();

  console.log(products, "this is prods");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen p-8 sm:p-20 bg-gray-100">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        Welcome to MoneySpend
      </h1>

      <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Products Grid */}
        <ProductCardList products={[...products]} />

        {/* Cart & Discounts */}
        <div className="h-full flex flex-col gap-6 bg-white shadow-lg rounded-lg p-6">
          <ProductCart />
          <DiscountForm />
          {reward && (
            <div className="text-green-600 font-semibold mt-4 p-2 border border-green-300 rounded bg-green-50">
              🎁 Reward Unlocked: {reward}
            </div>
          )}
          <CheckoutButton />
        </div>
      </div>
    </div>
  );
}
