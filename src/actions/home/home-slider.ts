"use server";

import { Slides } from "@/interfaces";

const apiUrl = process.env.WP_API_URL!;



export async function getHomeSlider():Promise<Slides[] | null> {
  const url = `${apiUrl}/hero-slider`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) return null;

  const data: Slides[] = await response.json();
  return data.length > 0 ? data : null;
}
