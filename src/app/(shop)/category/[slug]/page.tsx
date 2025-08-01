import { ProductGrid } from "@/components";
import { initialData } from "@/seed/seed";
//import { notFound } from "next/navigation";

interface Props {
  /* params: {
    slug: string;
  }; */

  params: Promise<{ slug: string }>; 
}

const seedProducts = initialData.products;

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const products = seedProducts.filter((p) =>
    p.categories.some((cat) => cat.slug === slug)
  );


  /* if (id === "kids") {
    notFound();
  } */

  return (
    <div>
      <h1>Hello Category Page {slug}</h1>
      <ProductGrid products={products} />
    </div>
  );
}
