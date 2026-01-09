"use client";

import { getProductVariations } from "@/actions";
import { ProductPrice } from "@/components";
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

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-square">
          {product.images.length > 0 && (
            <Image
              src={displayImage.src}
              alt={displayImage.alt}
              fill
              className="object-cover"
              onMouseEnter={() => {
                if (product.images.length > 1) {
                  setDisplayImage(product.images[1]);
                }
              }}
              onMouseLeave={() => setDisplayImage(product.images[0])}
            />
          )}
        </div>
      </Link>
      <div className="p-4 flex flex-col">
        <Link className="hover:text-blue-600" href={`/product/${product.slug}`}>
          {product.name}
        </Link>
        <ProductPrice product={product} variations={variations} />
      </div>
    </div>
  );
};
