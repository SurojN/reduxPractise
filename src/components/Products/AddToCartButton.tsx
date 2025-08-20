import { addItem } from "@/lib/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/hooks/reduxHooks";
import { Button } from "@/components/Button";

export default function AddToCartButton({
  id,
  name,
  price,
}: {
  id: number;
  name: string;
  price: number;
}) {
  const dispatch = useAppDispatch();
  return (
    <Button onClick={() => dispatch(addItem({ id, name, price }))}>
      Add to cart
    </Button>
  );
}
