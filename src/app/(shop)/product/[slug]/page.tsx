import { ProductPrice, QuantitySelector, ProductSlideshow, ProductMobileSlideshow } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = initialData.products.find((product) => product.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">


      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">
      
        {/* Mobile Slideshow */}
        <ProductMobileSlideshow images={product.images} className="block md:hidden" />
        
        {/* Desktop Slideshow */}
        <ProductSlideshow images={product.images} className="hidden md:block" />
      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.name}
        </h1>
        {/* Precio */}
        <ProductPrice product={product} />

        {/* Selector de Cantidad */}
        {!product.sold_individually && <QuantitySelector />}

        {/* Agregar al carro */}
        <button className="btn-primary my-5">Agregar al Carro</button>

        {/* Descripción */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <div
          className="font-light text-sm"
          dangerouslySetInnerHTML={{ __html: product.short_description }}
        />
      </div>
    </div>
  );
}
