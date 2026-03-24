import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SEED_RESTAURANTS } from '@/data/seedRestaurants';

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
  selectedHotspotId: string | null;
  setSelectedHotspot: (id: string | null) => void;
  addRestaurant: (res: Omit<Restaurant, 'id' | 'votes'>) => void;
  voteRestaurant: (id: string, delta: number) => void;
  getTop5ForHotspot: (hotspotId: string) => Restaurant[];
}

export const useFoodStore = create<FoodState>()(
  persist(
    (set, get) => ({
      restaurants: SEED_RESTAURANTS,
      selectedHotspotId: null,
      
      setSelectedHotspot: (id) => set({ selectedHotspotId: id }),
      
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
