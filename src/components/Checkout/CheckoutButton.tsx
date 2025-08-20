import Link from "next/link";
import { Button } from "../Button";

export default function CheckoutButton() {
  return (
    <Link href="/checkout">
      <Button>Go to Checkout</Button>
    </Link>
  );
}
