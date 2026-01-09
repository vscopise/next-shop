"use client";

import { useEffect, useState } from "react";

import { Product, Variation } from "@/interfaces";
import { titleFont } from "@/config/fonts";
import { getProductVariations } from "@/actions";
import {
  AddToCart,
  ProductCategories,
  ProductPrice,
  ProductTags,
} from "@/components";

interface Props {
  product: Product;
}

export const ProductInfo = ({ product }: Props) => {
  const [variations, setVariations] = useState<Variation[]>([]);
  const [loading, setLoading] = useState(true);

  const { id, name, short_description } = product;

  useEffect(() => {
    const fetchVariations = async () => {
      try {
        const variations = await getProductVariations(id);

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
  }, [id]);

  return (
    <>
      <h1
        className={`${titleFont.className} antialiased font-bold text-4xl mb-5`}
      >
        {name}
      </h1>
      {loading && <div>cargando...</div>}

      <ProductPrice
        product={product}
        variations={variations}
        style="text-4xl"
      />

      {"" != short_description && (
        <div className="pt-2">
          <div
            className="font-light mb-3"
            dangerouslySetInnerHTML={{ __html: short_description }}
          />
        </div>
      )}
      <AddToCart product={product} />
      <ProductCategories product={product} />
      <ProductTags product={product} />
    </>
  );
};
