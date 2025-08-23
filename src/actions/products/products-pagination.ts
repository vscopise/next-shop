"use server";

import { Product } from "@/interfaces";

interface ProductsResponse {
  products: Product[];
  totalPages: number;
}

export async function getPaginatedProducts(
  page: number = 1,
  perPage: number = 10
): Promise<ProductsResponse> {
  const apiUrl = process.env.WC_API_URL!;
  const consumerKey = process.env.WC_CONSUMER_KEY!;
  const consumerSecret = process.env.WC_CONSUMER_SECRET!;

  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    "base64"
  );

  const url = `${apiUrl}/products?page=${page}&per_page=${perPage}`;

  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return { products: [], totalPages: 0 };
  }

  const products = await response.json();
  const totalPages = Number(response.headers.get("x-wp-totalpages") || "0");

  return {
    products: products,
    totalPages: totalPages,
  };
}
