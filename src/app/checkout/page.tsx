"use client";
import { useState, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/reduxHooks";
import {
  selectItems,
  selectTotal,
  selectDiscountAmount,
  selectComputedReward,
} from "@/lib/features/cart/selectors";
import {
  clearCart,
  clearCoupon,
  clearDiscount,
} from "@/lib/features/cart/cartSlice";
import CheckoutForm from "@/components/Checkout/CheckoutForm";
import OrderSummary from "@/components/Checkout/OrderSummary";

export default function CheckoutPage() {
  const { items, total, discount, reward } = useAppSelector((state) => ({
    items: selectItems(state),
    total: selectTotal(state),
    discount: selectDiscountAmount(state),
    reward: selectComputedReward(state),
  }));

  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");

  const handleOrder = useCallback(() => {
    if (!name || !address || !payment)
      return alert("Enter name, address and payment method");

    const order = {
      name,
      address,
      payment,
      items,
      total,
      discount,
      reward,
      date: new Date().toISOString(),
    };
    console.log("Order placed:", order);

    alert("Order confirmed!");
    dispatch(clearCart());
    dispatch(clearCoupon());
    dispatch(clearDiscount());

    setName("");
    setAddress("");
    setPayment("");
    window.location.href = "/";
  }, [name, address, payment, items, total, discount, reward, dispatch]);

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        Checkout
      </h2>

      <CheckoutForm
        name={name}
        setName={setName}
        address={address}
        setAddress={setAddress}
        payment={payment}
        setPayment={setPayment}
        handleOrder={handleOrder}
      />

      <OrderSummary
        items={items}
        discount={discount}
        total={total}
        reward={reward}
      />
    </div>
  );
}
