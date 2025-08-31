import { Product } from "@/interfaces";
import { ProductGridItem } from "./ProductGridItem";
//import { getProductVariations } from "@/actions";

interface Props {
  products: Product[];
}

export const ProductGrid =  ({ products }: Props) => {
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
      {products.map((product) => {
        //const variations =  getProductVariations(product.id)
        //console.log({variations});

        return <ProductGridItem key={product.id} product={product} />;
      })}
    </div>
  );
};
