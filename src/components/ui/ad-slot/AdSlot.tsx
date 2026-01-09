"use client";

import { useAdManager } from "@/hooks/useAdManager";

interface Props {
  adUnit: string; // ej: "/1234567/home"
  sizes: number[][];
  divId: string;
}

export const AdSlot = (props: Props) => {
  useAdManager(props);
  return <div id={props.divId} />;
}