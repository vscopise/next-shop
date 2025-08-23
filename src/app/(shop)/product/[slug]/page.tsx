export const revalidate = 604800; // 7 días

import { getProductBySlug } from "@/actions";
import {
  ProductSlideshow,
  ProductMobileSlideshow,
  //UpdatedProductDetails,
  ProductPrice,
  ProductStock,
  //AddToCart,
  ProductCategories,
  ProductTags,
  //ProductVariations,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { Metadata } from "next";
//import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/add-to-cart/AddToCart";

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
  //const product = initialData.products.find((product) => product.slug === slug);
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }
  //const product = products[0];
  //console.log({product})
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
          <h1
            className={`${titleFont.className} antialiased font-bold text-4xl mb-5`}
          >
            {product.name}
          </h1>
          <ProductPrice product={product} />
          <ProductStock product={product} />
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
          
          <AddToCart product={product} />
          
          <ProductCategories product={product} />
          <ProductTags product={product} />

          {/* <UpdatedProductDetails product={product} /> */}
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
