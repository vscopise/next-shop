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
      {product.type === "variable" && (
        <ProductVariations productId={product.id} />
      )}
      {product.type === "simple" && (
        <div className="mb-5">Stock: {product.stock_quantity} disponibles</div>
      )}
      <div className="flex items-center gap-4">
        {!product.sold_individually && (
          <QuantitySelector
            quantity={quantity}
            onQuantityChanged={setQuantity}
          />
        )}
        <button className="btn-primary mt-3">Agregar al Carro</button>
      </div>
    </>
  );
};
