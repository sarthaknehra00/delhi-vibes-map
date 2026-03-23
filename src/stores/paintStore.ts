import { create } from "zustand";
import { CategoryId } from "@/data/categories";
import { GridCell, cellKey, latLngToCell, getCellsInBrush } from "@/lib/gridUtils";

export type BrushSize = "small" | "medium" | "large";
export type DrawMode = "free" | "pixel" | "navigate"; // Added "navigate" as default
export type Tool = "paint" | "erase";

interface PaintAction {
  cellKeys: string[];
  previousState: Map<string, GridCell>;
}

interface PaintStore {
  cells: Map<string, GridCell>;
  selectedCategory: CategoryId;
  brushSize: BrushSize;
  drawMode: DrawMode;
  activeTool: Tool;
  isDrawing: boolean;
  history: PaintAction[];
  version: number;

  setCategory: (cat: CategoryId) => void;
  setBrushSize: (size: BrushSize) => void;
  setDrawMode: (mode: DrawMode) => void;
  setTool: (tool: Tool) => void;
  startDrawing: () => void;
  stopDrawing: () => void;
  paintAt: (lat: number, lng: number) => void;
  eraseAt: (lat: number, lng: number) => void;
  undo: () => void;
  clearAll: () => void;
}

export const usePaintStore = create<PaintStore>((set, get) => ({
  cells: new Map(), // Starting empty for Next.js app, will sync from DB
  selectedCategory: "cool",
  brushSize: "medium",
  drawMode: "navigate", // Map works normally by default
  activeTool: "paint",
  isDrawing: false,
  history: [],
  version: 0,

  setCategory: (cat) => set({ selectedCategory: cat, drawMode: get().drawMode === "navigate" ? "free" : get().drawMode }),
  setBrushSize: (size) => set({ brushSize: size }),
  setDrawMode: (mode) => set({ drawMode: mode }),
  setTool: (tool) => set({ activeTool: tool }),
  startDrawing: () => set({ isDrawing: true }),
  stopDrawing: () => set({ isDrawing: false }),
  clearAll: () => set({ cells: new Map(), history: [], version: 0 }),

  paintAt: (lat, lng) => {
    const { cells, selectedCategory, brushSize, drawMode } = get();
    if (drawMode === "navigate") return;

    const center = latLngToCell(lat, lng);
    const affectedCells = drawMode === "pixel"
      ? [center]
      : getCellsInBrush(center.row, center.col, brushSize);

    const previousState = new Map<string, GridCell>();
    const cellKeys: string[] = [];

    affectedCells.forEach(({ row, col }) => {
      const key = cellKey(row, col);
      cellKeys.push(key);
      const existing = cells.get(key);
      if (existing) {
        previousState.set(key, { ...existing, votes: { ...existing.votes } });
      }
    });

    const newCells = new Map(cells);
    affectedCells.forEach(({ row, col }) => {
      const key = cellKey(row, col);
      const existing = newCells.get(key) || { row, col, votes: {} };
      existing.votes[selectedCategory] = (existing.votes[selectedCategory] || 0) + 1;
      newCells.set(key, existing);
    });

    set((s) => ({
      cells: newCells,
      history: [...s.history.slice(-20), { cellKeys, previousState }],
      version: s.version + 1,
    }));
  },

  eraseAt: (lat, lng) => {
    const { cells, brushSize, drawMode } = get();
    if (drawMode === "navigate") return;

    const center = latLngToCell(lat, lng);
    const affectedCells = drawMode === "pixel"
      ? [center]
      : getCellsInBrush(center.row, center.col, brushSize);

    const previousState = new Map<string, GridCell>();
    const cellKeysArr: string[] = [];
    const newCells = new Map(cells);

    affectedCells.forEach(({ row, col }) => {
      const key = cellKey(row, col);
      cellKeysArr.push(key);
      const existing = newCells.get(key);
      if (existing) {
        previousState.set(key, { ...existing, votes: { ...existing.votes } });
        newCells.delete(key);
      }
    });

    set((s) => ({
      cells: newCells,
      history: [...s.history.slice(-20), { cellKeys: cellKeysArr, previousState }],
      version: s.version + 1,
    }));
  },

  undo: () => {
    const { history, cells } = get();
    if (history.length === 0) return;

    const lastAction = history[history.length - 1];
    const newCells = new Map(cells);

    lastAction.cellKeys.forEach((key) => {
      const prev = lastAction.previousState.get(key);
      if (prev) {
        newCells.set(key, prev);
      } else {
        newCells.delete(key);
      }
    });

    set((s) => ({
      cells: newCells,
      history: s.history.slice(0, -1),
      version: s.version + 1,
    }));
  },
}));
