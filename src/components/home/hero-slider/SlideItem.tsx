"use client";

import { useEffect, useState } from "react";

import { Slide } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { getMediaById } from "@/actions";

interface Props {
  slide: Slide;
}

export const SlideItem = ({ slide }: Props) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await getMediaById(slide.image_id)
        setImageUrl(response.media!.source_url);
      } catch (err) {
        setError(`No se pudo cargar la imagen - ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [slide.image_id]);

  if (loading)
    return <div className="animate-pulse bg-gray-300 h-full w-full" />;

  if (error) return <p>{error}</p>;

  return (
    <Link href={slide.url}>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Imagen desde WordPress"
          width={1920}
          height={300}
        />
      )}
    </Link>
  );
};
