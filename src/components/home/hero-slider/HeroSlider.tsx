'use client';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import "./slider.css";
import Link from "next/link";
import { Slides } from "@/interfaces";

interface Props {
  slides: Slides[] | null;
}

export const HeroSlider = ({ slides }: Props) => {
  if (!slides) return;

  return (
    <div className="flex mb-12">
      <Swiper
        navigation={true}
        autoplay={{ delay: 6000 }}
        modules={[FreeMode, Navigation, Autoplay, Pagination]}
        pagination={{
          dynamicBullets: true,
        }}
        className="hero-slider"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Link href={slide.link}>
              <Image src={slide.image} alt="" width={1920} height={300} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
