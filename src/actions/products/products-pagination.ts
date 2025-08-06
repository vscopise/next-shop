"use server";

import { Product } from "@/interfaces";

interface PaginationOptions {
  page?: number;
  perPage?: number;
}

interface ProductsResponse {
  products: Product[];
  totalPages: number;
  currentPage: number;
}

export async function getProducts({
  page = 1,
  perPage = 10,
}: PaginationOptions): Promise<ProductsResponse> {
  try {
    const url = `${process.env.SERVER_URL}/products`;
    const consumerKey = process.env.WC_CONSUMER_KEY!;
    const consumerSecret = process.env.WC_CONSUMER_SECRET!;
    const credentials = Buffer.from(
      `${consumerKey}:${consumerSecret}`
    ).toString("base64");

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;

    //console.log(`${url}?page=${page}&per_page=${perPage}`);
    const response = await fetch(`${url}?page=${page}&per_page=${perPage}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`WooCommerce API error ${response.status}`);
    }

    const totalPages = parseInt(
      response.headers.get("X-WP-TotalPages") || "0",
      10
    );
    const products = await response.json();

    return {
      products: products,
      totalPages: totalPages,
      currentPage: page,
    };
  } catch (err) {
    console.error("WooCommerce fetch error:", err);
    return {
      products: [],
      totalPages: 0,
      currentPage: 0,
    };
  }
}
