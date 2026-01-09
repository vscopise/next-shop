export const revalidate = 60;

import { getHomeSlider, getPaginatedProducts } from "@/actions";
import { Pagination, ProductGrid, HeroSlider, AdSlot } from "@/components";
//import { titleFont } from "@/config/fonts";

interface Props {
  searchParams: Promise<{ page: string; take: string; featured: string; }>;
}

export default async function Home({ searchParams }: Props) {
  
  const page = (await searchParams).page ? parseInt((await searchParams).page) : 1;
  const take = (await searchParams).take ? parseInt((await searchParams).take) : 12;
  const featured = (await searchParams).featured === 'true';

  const { products, totalPages } = await getPaginatedProducts(page, take, featured, 'instock');

  const { ok, slides } = await getHomeSlider();

  return (
    <>
      {ok && <HeroSlider slides={slides!} />}

      <ProductGrid products={products} />

      <AdSlot adUnit="/100242293/1banner-en-home-940x100-5"
        sizes={[ [940, 100], [728, 90] ]}
        divId="div-gpt-ad-1767998594977-0"/>

      <Pagination totalPages={totalPages} />
    </>
  );
}
