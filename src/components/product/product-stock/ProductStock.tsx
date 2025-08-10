import { Product } from "@/interfaces";

interface Props {
  product: Product;
}
export const ProductStock = ({ product }: Props) => {
  const stock = product.stock_status;
  const stockQuantity = product.stock_quantity;
  return (
    <div className="mb-3">
      {stock === "outofstock" && <p className="text-red-400">Sin Stock</p>}
      {stock === "instock" && <p className="text-green-600">Stock disponible ({stockQuantity})</p>}
    </div>
  );
};
