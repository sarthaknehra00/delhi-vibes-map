export const CELL_SIZE_DEG = 0.003; // ~300m at Delhi's latitude

export interface GridCell {
  row: number;
  col: number;
  votes: Record<string, number>;
}

export function latLngToCell(lat: number, lng: number): { row: number; col: number } {
  return {
    row: Math.floor(lat / CELL_SIZE_DEG),
    col: Math.floor(lng / CELL_SIZE_DEG),
  };
}

export function cellKey(row: number, col: number): string {
  return `${row}:${col}`;
}

export function parseCellKey(key: string): { row: number; col: number } {
  const [row, col] = key.split(":").map(Number);
  return { row, col };
}

export function cellToPolygon(row: number, col: number): [number, number][] {
  const south = row * CELL_SIZE_DEG;
  const west = col * CELL_SIZE_DEG;
  const north = south + CELL_SIZE_DEG;
  const east = west + CELL_SIZE_DEG;
  return [
    [west, south],
    [east, south],
    [east, north],
    [west, north],
    [west, south],
  ];
}

export function getCellsInBrush(
  centerRow: number,
  centerCol: number,
  brushSize: "small" | "medium" | "large"
): { row: number; col: number }[] {
  const radius = brushSize === "small" ? 0 : brushSize === "medium" ? 1 : 2;
  const cells: { row: number; col: number }[] = [];
  for (let dr = -radius; dr <= radius; dr++) {
    for (let dc = -radius; dc <= radius; dc++) {
      if (dr * dr + dc * dc <= radius * radius + radius) {
        cells.push({ row: centerRow + dr, col: centerCol + dc });
      }
    }
  }
  return cells;
}

export function getDominantCategory(votes: Record<string, number>): string | null {
  let maxVotes = 0;
  let dominant: string | null = null;
  for (const [category, count] of Object.entries(votes)) {
    if (count > maxVotes) {
      maxVotes = count;
      dominant = category;
    }
  }
  return dominant;
}
