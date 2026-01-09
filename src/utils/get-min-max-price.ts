import { Variation } from "@/interfaces";

export const getMinMaxPrice = (variations: Variation[]) => {
  const prices = variations.flatMap((v) =>
    [+v.regular_price, +v.sale_price].filter((n) => !isNaN(n) && n > 0)
  );

  if (!prices.length) return null;

  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
};
