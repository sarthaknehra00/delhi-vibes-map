import { create } from 'zustand';
import { MarketDataItem } from '@/data/marketData';

interface MarketStore {
  /** Master toggle for the Explorer panel */
  isExplorerOpen: boolean;
  toggleExplorer: () => void;
  setExplorerOpen: (open: boolean) => void;

  /** Selected category in the first view of the panel */
  selectedCategoryId: string | null;
  setSelectedCategory: (id: string | null) => void;

  /** 
   * Active market currently focused on the map.
   * This drives the `MarketLayers` rendering.
   */
  focusedMarket: MarketDataItem | null;
  setFocusedMarket: (market: MarketDataItem | null) => void;

  /**
   * Action to fly the map camera to a specific market.
   * The actual map.flyTo is handled in `MapContainer` listening to this trigger.
   */
  flyToTrigger: { market: MarketDataItem | null; timestamp: number };
  triggerFlyTo: (market: MarketDataItem | null) => void;
  
  resetView: () => void;
}

export const useMarketStore = create<MarketStore>((set) => ({
  isExplorerOpen: false,
  toggleExplorer: () => set((s) => {
    // If closing, also clear focus
    if (s.isExplorerOpen) {
      return { isExplorerOpen: false, focusedMarket: null, selectedCategoryId: null };
    }
    return { isExplorerOpen: true };
  }),
  setExplorerOpen: (open) => set({ 
    isExplorerOpen: open,
    ...(open ? {} : { focusedMarket: null, selectedCategoryId: null })
  }),

  selectedCategoryId: null,
  setSelectedCategory: (id) => set({ selectedCategoryId: id }),

  focusedMarket: null,
  setFocusedMarket: (market) => set({ focusedMarket: market }),

  flyToTrigger: { market: null, timestamp: 0 },
  triggerFlyTo: (market) => set({ 
    focusedMarket: market, 
    flyToTrigger: { market, timestamp: Date.now() } 
  }),

  resetView: () => set({
    selectedCategoryId: null,
    focusedMarket: null,
    flyToTrigger: { market: null, timestamp: Date.now() }
  })
}));
