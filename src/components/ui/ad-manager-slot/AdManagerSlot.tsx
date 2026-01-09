"use client";

import { useEffect } from "react";

interface Props {
  adUnit: string; // ej: "/1234567/home"
  sizes: number[][];
  divId: string;
}

export const AdManagerSlot = ({ adUnit, sizes, divId }: Props) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    window.googletag = window.googletag || { cmd: [] };

    window.googletag.cmd.push(() => {
      const slot = window.googletag
        .defineSlot(adUnit, sizes, divId)
        ?.addService(window.googletag.pubads());

      window.googletag.enableServices();
      window.googletag.display(divId);
    });
  }, [adUnit, sizes, divId]);
  return <div id={divId} />;
};
