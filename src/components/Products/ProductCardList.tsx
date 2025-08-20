import { Product } from "@/lib/features/cart/types";
import ProductCard from "./ProductCard";

const ProductCardList: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div className="lg:col-span-2 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 auto-rows-min">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default ProductCardList;
