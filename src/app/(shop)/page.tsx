import { ProductGrid } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";

const products = initialData.products;

export default function Home() {
  return (
    <>
      <h1 className={`${titleFont.className}`}>Todos los productos</h1>
      <ProductGrid products={products} />
    </>
  );
}
