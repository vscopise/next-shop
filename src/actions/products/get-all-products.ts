"use server";
import { Product } from "@/interfaces";

export const getAllProducts = async () => {
  const baseUrl = `${process.env.SERVER_URL}/wp-json/wc/v3/products/`;
  const consumerKey = process.env.WC_CONSUMER_KEY!;
  const consumerSecret = process.env.WC_CONSUMER_SECRET!;
  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    "base64"
  );

  let allProducts: Product[] = [];
  let products: Product[] = [];

  let breakLoop = false;
  let page = 1;
  while (!breakLoop) {
    try {
      const res = await fetch(`${baseUrl}?page=${page}`, {
        method: "GET",
        headers: {
          Accept: "/",
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`WooCommerce API error ${res.status}: ${text}`);
      }

        products = await res.json();
    } catch (err) {
      console.error("WooCommerce fetch error:", err);
      return [];
    }
    if (products.length === 0 || !products) {
      breakLoop = true;
    } else {
      allProducts = allProducts.concat(products);
      page = page + 1;
    }
  }

  return allProducts;
};
