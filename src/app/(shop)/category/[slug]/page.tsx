export const revalidate = 60;

import { getProductsByCategory } from "@/actions";
import { Pagination, ProductGrid } from "@/components";
import { getIntValue } from "@/utils";

interface Props {
  params: Promise<{ slug: string; page: string; take: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { slug, page, take } = await params;

  const actualPage = getIntValue(page, 1);
  const actualTake = getIntValue(take, 10);

  const { products, totalPages } = await getProductsByCategory(
    slug,
    actualPage,
    actualTake
  );

  return (
    <div>
      <h1>Hello Category Page {slug}</h1>
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
