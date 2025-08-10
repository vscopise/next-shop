"use server";

import { Product } from "@/interfaces";
//import { sleep } from "@/utils";

/* interface ProductsResponse {
  product: Product;
} */

const apiUrl = process.env.WC_API_URL!;
const consumerKey = process.env.WC_CONSUMER_KEY!;
const consumerSecret = process.env.WC_CONSUMER_SECRET!;

function getAuthHeader(): string {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    "base64"
  );
  return `Basic ${auth}`;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const url = `${apiUrl}/products?slug=${slug}`;

  //  await sleep(3);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: getAuthHeader(),
      Accept: "application/json",
    },
  });

  if (!response.ok) return null;

  const data: Product[] = await response.json();
  return data.length > 0 ? data[0] : null;
}
