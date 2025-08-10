import { Product } from "@/interfaces";
import Link from "next/link";

interface Props {
  product: Product;
}

export const ProductCategories = ({ product }: Props) => {
  const categories = product.categories;
  return (
    <div className="text-sm border-t-1 border-dashed border-t-gray-300 pt-3 mt-3">
      Categorías:{" "}
      {categories.map((cat, index) => (
        <Link key={cat.id} href={`/category/${cat.slug}`}>
          {cat.name}
          {index < categories.length - 1 && ", "}
        </Link>
      ))}
    </div>
  );
};
