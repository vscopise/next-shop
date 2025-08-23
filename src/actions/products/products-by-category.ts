"use server";

import { Product } from "@/interfaces";

interface ProductsResponse {
  products: Product[];
  totalPages: number;
}

const apiUrl = process.env.WC_API_URL!;
const consumerKey = process.env.WC_CONSUMER_KEY!;
const consumerSecret = process.env.WC_CONSUMER_SECRET!;

function getAuthHeader(): string {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    "base64"
  );
  return `Basic ${auth}`;
}

// Step 1: Fetch category ID by slug
async function getCategoryIdBySlug(slug: string): Promise<number | null> {
  const url = `${apiUrl}/products/categories?slug=${slug}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: getAuthHeader(),
      Accept: "application/json",
    },
  });

  if (!response.ok) return null;

  const data = await response.json();
  return Array.isArray(data) && data.length > 0 ? data[0].id : null;
}

// Step 2: Fetch Products
export async function getProductsByCategory(
  categorySlug: string,
  page: number = 1,
  perPage: number = 10
): Promise<ProductsResponse> {
  const categoryId = await getCategoryIdBySlug(categorySlug);

  if (!categoryId) {
    return { products: [], totalPages: 0 };
  }

  const url = `${apiUrl}/products?category=${categoryId}&page=${page}&per_page=${perPage}`;

  console.log({url})

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: getAuthHeader(),
      Accept: "application/json",
    },
    //next: { revalidate: 60 },
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
