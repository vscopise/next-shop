export const revalidate = 60;

import { getPaginatedProducts } from "@/actions";
import { Pagination, ProductGrid } from "@/components";
import { titleFont } from "@/config/fonts";
import { getIntValue } from "@/utils";

interface Props {
  searchParams: Promise<{ page: string; take: string }>;
}

export default async function Home({ searchParams }: Props) {
  const { page, take } = await searchParams;

  const actualPage = getIntValue(page, 1);
  const actualTake = getIntValue(take, 10);

  const { products, totalPages } = await getPaginatedProducts(actualPage, actualTake);

  return (
    <>
      <h1 className={`${titleFont.className}`}>Todos los productos</h1>
      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
