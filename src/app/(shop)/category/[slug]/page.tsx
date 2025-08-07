import { getProductsBySlug } from "@/actions";
import { Pagination, ProductGrid } from "@/components";
import { getIntValue } from "@/utils";
//import { initialData } from "@/seed/seed";
//import { notFound } from "next/navigation";

interface Props {
  /* params: {
    slug: string;
  }; */

  params: Promise<{ slug: string; page: string; take: string }>; 
}

//const seedProducts = initialData.products;

export default async function CategoryPage({ params }: Props) {
  const { slug, page, take } = await params;

  /* const products = seedProducts.filter((p) =>
    p.categories.some((cat) => cat.slug === slug)
  ); */
  const actualPage = getIntValue(page, 1);
  const actualTake = getIntValue(take, 10);

const { products, totalPages } = await getProductsBySlug(slug, actualPage, actualTake);
  /* if (id === "kids") {
    notFound();
  } */

  return (
    <div>
      <h1>Hello Category Page {slug}</h1>
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
