import { Product, Variation } from "@/interfaces";
import { getMinMaxPrice } from "@/utils";

interface Props {
  product: Product;
  variations: Variation[];
  style?: string;
}

export const ProductPrice = ({ product, variations, style }: Props) => {
  const { on_sale, price, sale_price, regular_price, type } = product;

  if ("" === price) return;

  if ("simple" === type) {
    if (on_sale) {
      return (
        <div className={`font-bold ${style}`}>
          <div className="text-gray-400 line-through font-size[0.8em]">
            <Currency />
            {regular_price}
          </div>
          <div>
            <Currency />
            {sale_price}
          </div>
        </div>
      );
    }

    return (
      <div className={`font-bold ${style}`}>
        <Currency />
        {price}
      </div>
    );
  }

  if ("variable" === type) {
    const range = getMinMaxPrice(variations);

    if (!range) return null;

    if (range.min === range.max) {
      return (
        <div className={`font-bold ${style}`}>
          <Currency />
          {range.min}
        </div>
      );
    }

    return (
      <div className={`font-bold ${style}`}>
        <Currency />
        {range.min} – <Currency />
        {range.max}
      </div>
    );
  }
};

const Currency = () => <span className="font-semibold">$</span>;
