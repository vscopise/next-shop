export {};

declare global {
  interface Window {
    googletag: Googletag;
  }

  interface Googletag {
    cmd: Array<() => void>;
    defineSlot: (
      adUnitPath: string,
      size: number[][],
      divId: string
    ) => Slot | null;
    pubads: () => PubAdsService;
    enableServices: () => void;
    display: (divId: string) => void;
    destroySlots: (slots?: Slot[]) => boolean;
  }

  interface Slot {
    addService: (service: PubAdsService) => Slot;
    getSlotElementId: () => string;
  }

  interface PubAdsService {
    refresh: (slots?: Slot[]) => void;
    enableSingleRequest: () => void;
  }
}
