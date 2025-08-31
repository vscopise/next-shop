"use server";

import { Variation } from "@/interfaces";

const apiUrl = process.env.WC_API_URL!;
const consumerKey = process.env.WC_CONSUMER_KEY!;
const consumerSecret = process.env.WC_CONSUMER_SECRET!;

function getAuthHeader(): string {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    "base64"
  );
  return `Basic ${auth}`;
}

export async function getProductVariations(
  productId: number
): Promise<Variation[] | null> {
  const url = `${apiUrl}/products/${productId}/variations/`;

  //console.log({url})

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: getAuthHeader(),
      Accept: "application/json",
    },
  });

  if (!response.ok) return null;

  const data: Variation[] = await response.json();
  return data.length > 0 ? data : null;
}