"use client";

import { useEffect, useState } from "react";
import { titleFont } from "@/config/fonts";
import Link from "next/link";
import Image from "next/image";
import { IoCartOutline, IoSearchCircleOutline } from "react-icons/io5";
import { useUIStore } from "@/store";

export const TopMenu = () => {
  const closeMenu = useUIStore((state) => state.openSideMenu);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [scrolled, setScrolled] = useState(false);

  return (
    <nav
      className={`sticky top-0 left-0 z-50 transition-all duration-300 flex px-5 justify-between items-center w-full ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <div className="flex">
        <Link href="/">
          <Image src="../logo.svg" alt="Next Shop" width={30} height={30} />
        </Link>
        <Link href="/">
          <span className={`${titleFont.className} font-bold pl-2 antialiased`}>
            Next Shop
          </span>
        </Link>
      </div>

      {/* Center Menu */}
      <div className="hidden sm:block">
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/category/men"
        >
          Hombres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/category/women"
        >
          Mujeres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/category/accessories"
        >
          Accesorios
        </Link>
      </div>

      {/* Search, Cart, Menu */}
      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchCircleOutline className="w-5 h-5" />
        </Link>
        <Link href="/cart" className="mx-2">
          <div className="relative">
            <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
              3
            </span>
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        <button
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          onClick={closeMenu}
        >
          Menú
        </button>
      </div>
    </nav>
  );
};
