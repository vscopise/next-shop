"use client";

import { useEffect, useState } from "react";
import { Product } from "@/interfaces";
import { getProductBySlug } from "@/actions";
import clsx from "clsx";

interface Props {
  product: Product;
}
export const ProductStock = ({ product }: Props) => {
  const [loading, setLoading] = useState(true);
  const [stock, setStock] = useState("");
  const [stockQuantity, setstockQuantity] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const newProduct = await getProductBySlug(product.slug);

        if (null === newProduct)
          throw new Error("Error al obtener el producto");

        setStock(newProduct!.stock_status);
        setstockQuantity(newProduct!.stock_quantity!);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [product.slug]);

  return (
    <>
      {loading ? (
        <div className="mb-3 bg-gray-200 animate-pulse">&nbsp;</div>
      ) : (
        <div className="mb-3">
          <p
            className={clsx(
              { "text-red-400": stock === "outofstock" },
              { "text-green-600": stock === "instock" }
            )}
          >
            {stock === "instock"
              ? `Stock disponible (${stockQuantity})`
              : "Sin Stock"}
          </p>
        </div>
      )}
    </>
  );
};
