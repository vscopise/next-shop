"use client";

import { useEffect, useState } from "react";
import { getProductVariations } from "@/actions";
import { Variation } from "@/interfaces";

interface Props {
  productId: number;
}

export const ProductVariations = ({ productId }: Props) => {
  const [variations, setVariations] = useState<Variation[]>([]);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVariations = async () => {
      try {
        const productVariations = await getProductVariations(productId);

        if (null === productVariations)
          throw new Error("Error al obtener las variaciones del producto");

        setVariations(productVariations);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVariations();
  }, [productId]);

  // Agrupar atributos y sus opciones únicas
  const attributesMap: Record<string, string[]> = {};
  variations.forEach((variation) => {
    variation.attributes.forEach((attr) => {
      if (!attributesMap[attr.name]) {
        attributesMap[attr.name] = [];
      }
      if (!attributesMap[attr.name].includes(attr.option)) {
        attributesMap[attr.name].push(attr.option);
      }
    });
  });

  const handleSelect = (attrName: string, option: string) => {
    setSelected((prev) => ({ ...prev, [attrName]: option }));
  };

  // Filtrar variación exacta según selección
  const matchedVariation = variations.find((variation) =>
    variation.attributes.every(
      (attr) => selected[attr.name] && selected[attr.name] === attr.option
    )
  );

  return (
    <>
      {loading ? (
        <div className="mb-3 bg-gray-200 animate-pulse">&nbsp;</div>
      ) : (
         <div className="space-y-4">
      {Object.entries(attributesMap).map(([attrName, options]) => (
        <div key={attrName}>
          <p className="font-bold">{attrName}</p>
          <div className="flex gap-2 mt-1">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(attrName, option)}
                className={`px-3 py-1 rounded border ${
                  selected[attrName] === option ? "bg-blue-500 text-white" : "bg-white"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}

      {matchedVariation && (
        <div className="mt-4 mb-3 p-4 border rounded">
          
          <p>Precio: {matchedVariation.price}</p>
          <p>Stock: {matchedVariation.stock_status}</p>
        </div>
      )}
    </div>
      )}
    </>
  );
};
