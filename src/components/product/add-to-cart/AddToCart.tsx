"use client";

import { useState } from "react";
import { Product } from "@/interfaces";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [count, setCount] = useState(1);

  const onQuantityChanged = (value: number) => {
    if (count + value < 1) return;
    if (count + value > product!.stock_quantity!) return;
    setCount(count + value);
  };
  return (
    <div className="flex items-center gap-4">
      {!product.sold_individually && (
        <div className="flex items-center rounded-lg overflow-hidden">
          <button onClick={() => onQuantityChanged(-1)}>
            <IoRemoveCircleOutline size={30} />
          </button>
          <span className="w-5 mx-3 px-2 bg-gray-100 text-center rounded">
            {count}
          </span>
          <button onClick={() => onQuantityChanged(+1)}>
            <IoMdAddCircleOutline size={30} />
          </button>
        </div>
      )}
      <button className="btn-primary">Agregar al Carro</button>
    </div>
  );
};
