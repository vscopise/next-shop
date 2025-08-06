"use server";

import { Product } from "@/interfaces";

/* interface PaginationOptions {
  page?: number;
  take?: number;
} */

interface ProductsResponse {
  products: Product[];
  totalPages: number;
  currentPage: number;
}

export async function getPaginationProducts (
  page:number = 1,
  perPage:number = 12,
): Promise<ProductsResponse> {

  const baseUrl = "https://wp.lr.uy/wp-json/wc/v3/products/";
  const consumerKey = process.env.WC_CONSUMER_KEY!;
  const consumerSecret = process.env.WC_CONSUMER_SECRET!;
  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    "base64"
  );

  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  //try {
    const response = await fetch(`${baseUrl}?page=${page}&per_page=${perPage}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`WooCommerce API error ${response.status}`);
    }
    
    //const totalProducts = parseInt(response.headers.get("X-WP-Total") || "0", 10);
    //
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0', 10);
    const products = await response.json();
    
    

    return {
      products: products,
      totalPages: totalPages,
      currentPage: page,
    };
/*   } catch (err) {
    console.error("WooCommerce fetch error:", err);
    //return [];
  } */
};
