"use client";

import DiscountForm from "@/components/Discount/DiscountForm";

export default function DiscountPage() {
  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 16 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
        Apply Discount / Coupon
      </h2>
      <DiscountForm />
    </div>
  );
}
