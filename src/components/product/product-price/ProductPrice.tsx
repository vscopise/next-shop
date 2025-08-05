import { Product } from "@/interfaces";
interface Props {
  product: Product;
}

export const ProductPrice = ({ product }: Props) => {
  const price = Number(product.price);
  const regularPrice = Number(product.regular_price);
  const salePrice = Number(product.sale_price);
  if (product.on_sale) {
    const discount = Math.round(
      ((regularPrice - salePrice) / regularPrice) * 100
    );
    return (
      <div className="flex gap-2 mb-5 items-baseline">
        <div className="font-bold text-2xl">${regularPrice}</div>
        <div className="text-gray-300 text-xl line-through">${salePrice}</div>
        <div className="bg-red-100 rounded px-2 text-red-500 text-sm">
          {discount}% DESC
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex mb-5">
        <span className="text-2xl font-bold">${price}</span>
      </div>
    );
  }
};
