import { getPaginationProducts } from "@/actions";
import { Pagination, ProductGrid } from "@/components";
import { titleFont } from "@/config/fonts";
//import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{ page: string; take: string }>;
}

export default async function Home({ searchParams }: Props) {
  const { page, take } = await searchParams;

  const actualPage = page ? parseInt(page) : 1;
  const actualTake = take ? parseInt(take) : 12;
  

  const {products, totalPages} = await getPaginationProducts({
    page: actualPage,
    take: actualTake,
  });
  //const allProducts = await getAllProducts();
  //const totalPages = allProducts.length;

  //if (products.length === 0) redirect("/");

  return (
    <>
      <h1 className={`${titleFont.className}`}>Todos los productos</h1>
      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
