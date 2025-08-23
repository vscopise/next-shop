"use client";

import { useEffect, useState } from "react";
import { getProductBySlug } from "@/actions";
import { Product } from "@/interfaces";
import {
  AddToCart,
  ProductCategories,
  ProductStock,
  ProductPrice,
  ProductTags,
  //ProductVariations,
} from "@/components";

interface Props {
  product: Product;
}

export const UpdatedProductDetails = ({ product }: Props) => {
  const [loading, setLoading] = useState(true);
  const [updatedProduct, setUpdatedProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const newProduct = await getProductBySlug(product.slug);

        if (!newProduct) throw new Error("Error al obtener el producto");

        setUpdatedProduct(newProduct);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [product.slug]);

  return (
    <>
      {/* Price*/}
      {loading ? (
        <div className="flex gap-2 mb-5 items-baseline bg-gray-200 animate-pulse">
          &nbsp;
        </div>
      ) : (
        <ProductPrice product={updatedProduct!} />
      )}
      {/* Stock */}
      {loading ? (
        <div className="mb-3 bg-gray-200 animate-pulse">&nbsp;</div>
      ) : (
        <ProductStock product={updatedProduct!} />
      )}
      {/* Descripción */}
      {"" != product.short_description && (
        <>
          <h3 className="font-bold text-sm">Descripción</h3>
          <div
            className="font-light mb-3"
            dangerouslySetInnerHTML={{ __html: product.short_description }}
          />
        </>
      )}
      {/* Variaciones */}
      {product.type === "variable" ? <div>variable</div> : null}
      {/* product.type === "variable" && (
        <ProductVariations product={updatedProduct!} loading={loading} />
      ) */}
      {/* Agregar al carro */}
      {loading ? (
        <div className="mb-3 bg-gray-200 animate-pulse">&nbsp;</div>
      ) : (
        <AddToCart product={updatedProduct!} />
      )}
      {/* Categorías */}
      {loading ? (
        <div className="mb-3 bg-gray-200 animate-pulse">&nbsp;</div>
      ) : (
        <ProductCategories product={updatedProduct!} />
      )}
      {/* Etiquetas */}
      {loading ? (
        <div className="mb-3 bg-gray-200 animate-pulse">&nbsp;</div>
      ) : (
        <ProductTags product={updatedProduct!} />
      )}
    </>
  );
};
