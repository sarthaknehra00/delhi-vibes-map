export interface Category {
  id: CategoryId;
  label: string;
  color: string;
  colorRgba: string;
  emoji: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "rich",
    label: "Rich / Elite",
    color: "#10b981", // Emerald
    colorRgba: "rgba(16, 185, 129, 0.45)",
    emoji: "💎",
    description: "Posh houses, imported cars, and generational wealth",
  },
  {
    id: "middleClass",
    label: "Middle Class",
    color: "#3b82f6", // Blue
    colorRgba: "rgba(59, 130, 246, 0.45)",
    emoji: "🏡",
    description: "Family hubs, 2BHK dreams, and decent street food",
  },
  {
    id: "poor",
    label: "Poor / Working Class",
    color: "#f59e0b", // Amber
    colorRgba: "rgba(245, 158, 11, 0.45)",
    emoji: "🏗️",
    description: "The backbone of the city. Dense and chaotic.",
  },
  {
    id: "corporate",
    label: "Corporate Suits",
    color: "#6366f1", // Indigo
    colorRgba: "rgba(99, 102, 241, 0.45)",
    emoji: "🏢",
    description: "Glass towers, traffic jams, and overpriced coffee",
  },
  {
    id: "students",
    label: "Students",
    color: "#ec4899", // Pink
    colorRgba: "rgba(236, 72, 153, 0.45)",
    emoji: "🎓",
    description: "PGs, momos, and late-night study panic",
  },
  {
    id: "tourist",
    label: "Tourists",
    color: "#8b5cf6", // Purple
    colorRgba: "rgba(139, 92, 246, 0.45)",
    emoji: "📸",
    description: "Monuments, selfies, and aggressive auto drivers",
  },
  {
    id: "sketchy",
    label: "Sketchy / Unsafe",
    color: "#ef4444", // Red
    colorRgba: "rgba(239, 68, 68, 0.45)",
    emoji: "⚠️",
    description: "Do not visit after dark. Seriously.",
  },
  {
    id: "normies",
    label: "Normies",
    color: "#6b7280", // Gray
    colorRgba: "rgba(107, 114, 128, 0.45)",
    emoji: "🙂",
    description: "Just normal residential zones. Nothing crazy.",
  },
];

export type CategoryId =
  | "rich"
  | "middleClass"
  | "poor"
  | "corporate"
  | "students"
  | "tourist"
  | "sketchy"
  | "normies";

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c])
) as Record<CategoryId, Category>;
