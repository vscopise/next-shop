"use client";

import { Slide } from "@/interfaces";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import './slider.css';

import { SlideItem } from "./SlideItem";

interface Props {
  slides: Slide[];
}

export const HeroSlider = ({ slides }: Props) => {

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
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <SlideItem slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
