"use client";

import { getProductVariations } from "@/actions";
import { Product, Variation } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);
  const [variations, setVariations] = useState<Variation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVariations = async () => {
      try {
        const variations = await getProductVariations(product.id);

        if (null === variations)
          throw new Error("Error al obtener las variaciones");

        setVariations(variations);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVariations();
  }, [product.id]);

  const prices = variations?.flatMap((v) =>
    [Number(v.regular_price), Number(v.sale_price)].filter(
      (n) => !isNaN(n) && n > 0
    )
  );
  const minPrice = Math.min(...prices!);
  const maxPrice = Math.max(...prices!);

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        {product.images.length > 0 && (
          <Image
            src={displayImage.src}
            alt={displayImage.alt}
            className="w-full object-cover rounded"
            width={500}
            height={500}
            onMouseEnter={() => {
              if (product.images.length > 1) {
                setDisplayImage(product.images[1]);
              }
            }}
            onMouseLeave={() => setDisplayImage(product.images[0])}
          />
        )}
      </Link>
      <div className="p-4 flex flex-col">
        <Link className="hover:text-blue-600" href={`/product/${product.slug}`}>
          {product.name}
        </Link>
        <div className="flex gap-2">
          {product.type === "simple" && product.on_sale && (
            <>
              <div className="font-bold">${product.sale_price}</div>
              <div className="line-through text-gray-500">
                ${product.regular_price}
              </div>
            </>
          )}
          {product.type === "simple" && !product.on_sale && (
            <div className="font-bold">${product.regular_price}</div>
          )}
          {product.type === "variable" && loading && (
            <div className="bg-gray-200 animate-pulse">&nbsp;</div>
          )}
          {product.type === "variable" && !loading && (
            <div className="font-bold">{`$${minPrice} - $${maxPrice}`}</div>
          )}
        </div>
      </div>
    </div>
  );
};
