"use server";

import { Media } from "@/interfaces";

interface MediaResponse {
  ok: boolean;
  media?: Media;
}

export async function getMediaById(id: string): Promise<MediaResponse> {
  const apiUrl = process.env.WP_API_URL;
  const url = `${apiUrl}/wp/v2/media/${id}`;

  const response = await fetch(url, { next: { revalidate: 3600 } });

  if (!response.ok) return { ok: false };

  const media = await response.json();

  return {
    ok: true,
    media: media,
  };
}
