"use client";

import { useState } from "react";
import { QuantitySelector, ProductVariations } from "@/components";
import { Product } from "@/interfaces";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  //const [attributes, setAttributes] = useState(product.attributes);
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <ProductVariations productId={product.id} />
      <div className="flex items-center gap-4">
        {!product.sold_individually && (
          <QuantitySelector
            quantity={quantity}
            onQuantityChanged={setQuantity}
          />
        )}
        <button className="btn-primary">Agregar al Carro</button>
      </div>
    </>
  );
};
