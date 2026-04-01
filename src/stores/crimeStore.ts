import { create } from 'zustand';
import { CrimeCategory, DataYear } from '@/data/crimeData';

export type CrimeViewMode = 'heatmap' | 'off';

interface CrimeStore {
  /** Master visibility toggle */
  viewMode: CrimeViewMode;
  setViewMode: (mode: CrimeViewMode) => void;

  /** Selected year for NCRB data */
  selectedYear: DataYear;
  setSelectedYear: (year: DataYear) => void;

  /** Active crime category filters (empty = show all) */
  activeCategories: Set<CrimeCategory>;
  toggleCategory: (cat: CrimeCategory) => void;
  resetCategories: () => void;

  /** Panel open state */
  isPanelOpen: boolean;
  togglePanel: () => void;
}

export const useCrimeStore = create<CrimeStore>((set, get) => ({
  viewMode: 'off',
  setViewMode: (mode) => set({ viewMode: mode }),

  selectedYear: 2023,
  setSelectedYear: (year) => set({ selectedYear: year }),

  activeCategories: new Set<CrimeCategory>(),
  toggleCategory: (cat) => {
    const current = new Set(get().activeCategories);
    if (current.has(cat)) {
      current.delete(cat);
    } else {
      current.add(cat);
    }
    set({ activeCategories: current });
  },
  resetCategories: () => set({ activeCategories: new Set<CrimeCategory>() }),

  isPanelOpen: false,
  togglePanel: () => set((s) => ({ isPanelOpen: !s.isPanelOpen })),
}));
