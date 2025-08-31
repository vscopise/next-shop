import { getProductVariations } from "@/actions";
import { Product } from "@/interfaces";
import { clsx } from "clsx";
interface Props {
  product: Product;
}

export const ProductPrice = async ({ product }: Props) => {
  const regularPrice = Number(product.regular_price);
  const salePrice = Number(product.sale_price);

  switch (product.type) {
    case "simple":
      return (
        <Price
          regularPrice={regularPrice}
          salePrice={salePrice}
          onSale={product.on_sale}
        />
      );

    case "variable":
      const variations = await getProductVariations(product.id);

      const prices = variations?.flatMap((v) =>
        [Number(v.regular_price), Number(v.sale_price)].filter(
          (n) => !isNaN(n) && n > 0
        )
      );
      const minPrice = Math.min(...prices!);
      const maxPrice = Math.max(...prices!);

      return (
        <div className={clsx('mb-5 text-2xl',{'font-bold': minPrice === maxPrice})}>
          {minPrice === maxPrice
            ? `$${maxPrice}`
            : `$${minPrice} - $${maxPrice}`}
        </div>
      );

    case "grouped":
      return <div>Grouped</div>;

    case "external":
      return <div>External</div>;
  }
};
interface priceProps {
  regularPrice: number;
  salePrice: number;
  onSale?: boolean;
}
const Price = ({ regularPrice, salePrice, onSale = false }: priceProps) => {
  if (onSale) {
    const discount = Math.round(
      ((regularPrice - salePrice) / regularPrice) * 100
    );
    return (
      <div className="flex gap-2 mb-5 items-baseline">
        <div className="font-bold text-2xl">${salePrice}</div>
        <div className="text-gray-300 text-xl line-through">
          ${regularPrice}
        </div>
        <div className="bg-red-100 rounded px-2 text-red-500 text-sm">
          {discount}% DESC
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex mb-5">
        <span className="text-2xl font-bold">${regularPrice}</span>
      </div>
    );
  }
};
