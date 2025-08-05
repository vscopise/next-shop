"use client";

import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoRemoveCircleOutline } from "react-icons/io5";


export const QuantitySelector = () => {
  const [count, setCount] = useState(1);

  const onQuantityChanged = (value: number) => {
    if (count + value < 1) return;
    setCount(count + value);
  };

  return (
    <div className="flex">
      <button onClick={() => onQuantityChanged(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">
        {count}
      </span>
      <button onClick={() => onQuantityChanged(+1)}>
        <IoMdAddCircleOutline size={30} />
      </button>
    </div>
  );
};
