"use client";

import { useEffect, useRef } from "react";

type SlotConfig = {
  adUnit: string;
  sizes: number[][];
  divId: string;
};

export function useAdManager({ adUnit, sizes, divId }: SlotConfig) {
  const slotRef = useRef<Slot | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.googletag = window.googletag || { cmd: [] };

    window.googletag.cmd.push(() => {
      // ⛔ Evita redefinir el slot
      if (!slotRef.current) {
        slotRef.current = window.googletag
          .defineSlot(adUnit, sizes, divId)
          ?.addService(window.googletag.pubads()) ?? null;

        window.googletag.pubads().enableSingleRequest();
        window.googletag.enableServices();
        window.googletag.display(divId);
      } else {
        // 🔄 Refresh SPA
        window.googletag.pubads().refresh([slotRef.current]);
      }
    });

    return () => {
      // ❌ NO destruir slots en SPA
      // Google recomienda mantenerlos
    };
  }, [adUnit, sizes, divId]);
}
