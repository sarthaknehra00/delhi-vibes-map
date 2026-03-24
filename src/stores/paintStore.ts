import { create } from "zustand";
import { CategoryId } from "@/data/categories";
import { SEED_ZONES } from '@/data/seedZones';
import { cellKey, latLngToCell, getCellsInBrush } from "@/lib/gridUtils";

export interface GridCell {
  row: number;
  col: number;
  votes: Partial<Record<CategoryId, number>>;
}

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

// Form a dense Voronoi map across the entire bounds of the Delhi NCR grid
function createSeededCells(): Map<string, GridCell> {
  const map = new Map<string, GridCell>();
  
  // Delhi NCR approximate bounding box
  const minLat = 28.30;
  const maxLat = 28.95;
  const minLng = 76.80;
  const maxLng = 77.45;
  
  const minCell = latLngToCell(minLat, minLng);
  const maxCell = latLngToCell(maxLat, maxLng);
  
  // Precompute grid indices for seeds to save math in the hot loop
  const seedsWithCoords = SEED_ZONES.map(z => ({
    ...z,
    center: latLngToCell(z.lat, z.lng)
  }));

  for (let r = minCell.row; r <= maxCell.row; r++) {
    for (let c = minCell.col; c <= maxCell.col; c++) {
      let closestCategory: CategoryId = 'normies';
      let minDistance = Infinity;

      // Nearest-neighbor (Voronoi) mapping weighted by the zone's influence radius
      for (const zone of seedsWithCoords) {
        // Calculate squared Euclidean distance to this grid point
        const distSq = Math.pow(r - zone.center.row, 2) + Math.pow(c - zone.center.col, 2);
        
        // Weight by the radius (larger radius = stronger 'gravitational' pull)
        const weightedDist = distSq / (zone.radius * zone.radius);
        
        if (weightedDist < minDistance) {
          minDistance = weightedDist;
          closestCategory = zone.category;
        }
      }

      // Add the cell to the map with 10 votes to solidify the dominant category
      const key = `${r},${c}`;
      map.set(key, { row: r, col: c, votes: { [closestCategory]: 10 } });
    }
  }
  
  return map;
}

export const usePaintStore = create<PaintStore>((set, get) => ({
  cells: createSeededCells(), // Starting empty for Next.js app, will sync from DB
  selectedCategory: "middleClass",
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
