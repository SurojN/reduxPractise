// src/app/api/orders/route.ts
import { products } from "@/lib/data/products";

export async function GET() {
  console.log("Fetching products data", "orders/route.ts");
  return new Response(JSON.stringify(products), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request) {
  const order = await req.json();
  console.log("Received order:", order);
  return new Response(
    JSON.stringify({ success: true, message: "Order received", order }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
