import { create } from "zustand";
import { BrutalTruth, MOCK_BRUTAL_TRUTHS } from "@/data/mockBrutalTruths";
import { AreaId } from "@/data/areas";
import { checkContent } from "@/lib/profanityFilter";

interface BrutalTruthStore {
  brutalTruths: BrutalTruth[];
  selectedAreaId: AreaId | null;
  submissions: { time: number }[];

  selectArea: (areaId: AreaId | null) => void;
  getBrutalTruthsForArea: (areaId: AreaId) => BrutalTruth[];
  upvoteBrutalTruth: (truthId: string) => void;
  downvoteBrutalTruth: (truthId: string) => void;
  addBrutalTruth: (areaId: AreaId, content: string) => { success: boolean; error?: string };
  reportBrutalTruth: (truthId: string) => void;
}

export const useBrutalTruthStore = create<BrutalTruthStore>((set, get) => ({
  brutalTruths: [...MOCK_BRUTAL_TRUTHS],
  selectedAreaId: null,
  submissions: [],

  selectArea: (areaId) => set({ selectedAreaId: areaId }),

  getBrutalTruthsForArea: (areaId) => {
    const { brutalTruths } = get();
    return brutalTruths
      .filter((bt) => bt.areaId === areaId && !bt.reported)
      .sort((a, b) => b.votes - a.votes);
  },

  upvoteBrutalTruth: (truthId) =>
    set((s) => ({
      brutalTruths: s.brutalTruths.map((bt) =>
        bt.id === truthId ? { ...bt, votes: bt.votes + 1 } : bt
      ),
    })),

  downvoteBrutalTruth: (truthId) =>
    set((s) => ({
      brutalTruths: s.brutalTruths.map((bt) =>
        bt.id === truthId ? { ...bt, votes: bt.votes - 1 } : bt
      ),
    })),

  addBrutalTruth: (areaId, content) => {
    const { submissions } = get();
    const now = Date.now();
    const hourAgo = now - 3600000; // 1 hour ago
    const recentSubmissions = submissions.filter((s) => s.time > hourAgo);

    if (recentSubmissions.length >= 5) {
      return { success: false, error: "Slow down! Max 5 brutal truths per hour." };
    }

    const contentCheck = checkContent(content);
    if (!contentCheck.allowed) {
      return { success: false, error: contentCheck.reason };
    }

    if (content.trim().length === 0) {
      return { success: false, error: "Say something! Empty truths aren't brutal." };
    }
    if (content.length > 120) {
      return { success: false, error: "Keep it under 120 characters." };
    }

    const newTruth: BrutalTruth = {
      id: `bt-${Date.now()}`,
      areaId,
      content: content.trim(),
      votes: 0,
      createdAt: new Date().toISOString().split("T")[0],
      reported: false,
    };

    set((s) => ({
      brutalTruths: [newTruth, ...s.brutalTruths],
      submissions: [...recentSubmissions, { time: now }],
    }));

    return { success: true };
  },

  reportBrutalTruth: (truthId) =>
    set((s) => ({
      brutalTruths: s.brutalTruths.map((bt) =>
        bt.id === truthId ? { ...bt, reported: true } : bt
      ),
    })),
}));