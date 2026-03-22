import { create } from "zustand";
import { Vibe, MOCK_VIBES } from "@/data/mockVibes";
import { TagId } from "@/data/areas";
import { checkContent } from "@/lib/profanityFilter";

interface VibeStore {
  vibes: Vibe[];
  selectedAreaId: string | null;
  activeFilters: TagId[];
  submissions: { time: number }[];

  selectArea: (areaId: string | null) => void;
  toggleFilter: (tag: TagId) => void;
  clearFilters: () => void;
  getVibesForArea: (areaId: string) => Vibe[];
  upvote: (vibeId: string) => void;
  downvote: (vibeId: string) => void;
  addVibe: (areaId: string, tags: TagId[], description: string) => { success: boolean; error?: string };
  reportVibe: (vibeId: string) => void;
}

export const useVibeStore = create<VibeStore>((set, get) => ({
  vibes: [...MOCK_VIBES],
  selectedAreaId: null,
  activeFilters: [],
  submissions: [],

  selectArea: (areaId) => set({ selectedAreaId: areaId }),

  toggleFilter: (tag) =>
    set((s) => ({
      activeFilters: s.activeFilters.includes(tag)
        ? s.activeFilters.filter((t) => t !== tag)
        : [...s.activeFilters, tag],
    })),

  clearFilters: () => set({ activeFilters: [] }),

  getVibesForArea: (areaId) => {
    const { vibes, activeFilters } = get();
    let filtered = vibes.filter((v) => v.areaId === areaId && !v.reported);
    if (activeFilters.length > 0) {
      filtered = filtered.filter((v) => v.tags.some((t) => activeFilters.includes(t)));
    }
    return filtered.sort((a, b) => b.votes - a.votes);
  },

  upvote: (vibeId) =>
    set((s) => ({
      vibes: s.vibes.map((v) => (v.id === vibeId ? { ...v, votes: v.votes + 1 } : v)),
    })),

  downvote: (vibeId) =>
    set((s) => ({
      vibes: s.vibes.map((v) => (v.id === vibeId ? { ...v, votes: v.votes - 1 } : v)),
    })),

  addVibe: (areaId, tags, description) => {
    const { submissions } = get();
    const now = Date.now();
    const hourAgo = now - 3600000;
    const recentSubmissions = submissions.filter((s) => s.time > hourAgo);

    if (recentSubmissions.length >= 5) {
      return { success: false, error: "Slow down! Max 5 vibes per hour." };
    }

    const contentCheck = checkContent(description);
    if (!contentCheck.allowed) {
      return { success: false, error: contentCheck.reason };
    }

    if (description.trim().length === 0) {
      return { success: false, error: "Say something! Empty vibes aren't vibes." };
    }
    if (description.length > 120) {
      return { success: false, error: "Keep it under 120 characters." };
    }
    if (tags.length === 0) {
      return { success: false, error: "Pick at least one tag." };
    }

    const newVibe: Vibe = {
      id: `v-${Date.now()}`,
      areaId,
      tags,
      description: description.trim(),
      votes: 0,
      createdAt: new Date().toISOString().split("T")[0],
      reported: false,
    };

    set((s) => ({
      vibes: [newVibe, ...s.vibes],
      submissions: [...recentSubmissions, { time: now }],
    }));

    return { success: true };
  },

  reportVibe: (vibeId) =>
    set((s) => ({
      vibes: s.vibes.map((v) => (v.id === vibeId ? { ...v, reported: true } : v)),
    })),
}));
