"use server";

import { Slide } from "@/interfaces";

interface SlidesResponse {
  ok: boolean;
  slides?: Slide[];
}

export async function getHomeSlider(): Promise<SlidesResponse> {
  const apiUrl = process.env.WP_API_URL!;
  const url = `${apiUrl}/hero-slider/v1/slides`;

  const response = await fetch(url, { next: { revalidate: 60 } });

  if (!response.ok) return { ok: false };

  const slides = await response.json();

  return {
    ok: true,
    slides: slides,
  };
}
