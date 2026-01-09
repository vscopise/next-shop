export const revalidate = 604800; // 7 días

import { getProductBySlug } from "@/actions";
import {
  ProductSlideshow,
  ProductMobileSlideshow,
  //UpdatedProductDetails,
  //ProductStock,
  //AddToCart,
  ProductInfo,
  //ProductVariations,
} from "@/components";
import { Metadata } from "next";
//import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;

  const product = await getProductBySlug(slug);

  return {
    title: product!.name,
    description: product!.short_description,
    openGraph: {
      title: product!.name,
      description: product!.short_description,
      images: [product!.images[0].src],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }
  return (
    <>
      <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Slideshow */}
        <div className="">
          {/* Mobile Slideshow */}
          <ProductMobileSlideshow
            images={product.images}
            className="block md:hidden"
          />

          {/* Desktop Slideshow */}
          <ProductSlideshow
            images={product.images}
            className="hidden md:block"
          />
        </div>

        {/* Detalles */}
        <div className="col-span-1 px-5">
          <ProductInfo product={product} />
        </div>
      </div>
      <div className="mb-5">
        <h3 className="font-bold text-2xl text-center mb-5">Descripción</h3>
        <div
          className="font-light"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </div>
    </>
  );
}
