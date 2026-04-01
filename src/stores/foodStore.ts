import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SEED_RESTAURANTS } from '@/data/seedRestaurants';
import { HOTSPOTS, Hotspot } from '@/data/hotspots';

export interface Restaurant {
  id: string;
  name: string;
  hotspotId: string;
  category: 'Street Food' | 'Cafes' | 'Fine Dining' | 'Hidden Gems';
  votes: number;
  description: string;
  addedBy: string;
}

interface FoodState {
  restaurants: Restaurant[];
  dynamicHotspots: Hotspot[];
  selectedHotspotId: string | null;
  setSelectedHotspot: (id: string | null) => void;
  getHotspot: (id: string | null) => Hotspot | undefined;
  addDynamicHotspot: (hotspot: Hotspot, initialRestaurants: Restaurant[]) => void;
  addRestaurant: (res: Omit<Restaurant, 'id' | 'votes'>) => void;
  voteRestaurant: (id: string, delta: number) => void;
  getTop5ForHotspot: (hotspotId: string) => Restaurant[];
}

export const useFoodStore = create<FoodState>()(
  persist(
    (set, get) => ({
      restaurants: SEED_RESTAURANTS,
      dynamicHotspots: [],
      selectedHotspotId: null,
      
      setSelectedHotspot: (id) => set({ selectedHotspotId: id }),

      getHotspot: (id) => {
        if (!id) return undefined;
        const mapped = HOTSPOTS.find(h => h.id === id);
        if (mapped) return mapped;
        return get().dynamicHotspots.find(h => h.id === id);
      },

      addDynamicHotspot: (hotspot, initialRestaurants) => set((state) => ({
        dynamicHotspots: [...state.dynamicHotspots.filter(h => h.id !== hotspot.id), hotspot],
        restaurants: [
          ...state.restaurants.filter(r => r.hotspotId !== hotspot.id),
          ...initialRestaurants
        ]
      })),
      
      addRestaurant: (res) => set((state) => ({
        restaurants: [
          ...state.restaurants,
          {
            ...res,
            id: Math.random().toString(36).substring(7),
            votes: 1
          }
        ]
      })),

      voteRestaurant: (id, delta) => set((state) => ({
        restaurants: state.restaurants.map((r) =>
          r.id === id ? { ...r, votes: r.votes + delta } : r
        )
      })),

      getTop5ForHotspot: (hotspotId) => {
        return get().restaurants
          .filter((r) => r.hotspotId === hotspotId)
          .sort((a, b) => b.votes - a.votes)
          .slice(0, 5);
      }
    }),
    {
      name: 'delhi-food-store'
    }
  )
);
