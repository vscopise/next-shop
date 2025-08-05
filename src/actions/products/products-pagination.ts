"use server";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginationProducts = async ({
  page = 1,
  take = 12,
}: PaginationOptions) => {
  const baseUrl = "https://wp.lr.uy/wp-json/wc/v3/products/";
  const consumerKey = process.env.WC_CONSUMER_KEY!;
  const consumerSecret = process.env.WC_CONSUMER_SECRET!;
  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    "base64"
  );

  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    const res = await fetch(`${baseUrl}?page=${page}&per_page=${take}`, {
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

    return await res.json();
  } catch (err) {
    console.error("WooCommerce fetch error:", err);
    return [];
  }
};
