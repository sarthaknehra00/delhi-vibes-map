// Same exact categories from the Vite app
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
    label: "Rich / Posh",
    color: "#2ecc71",
    colorRgba: "rgba(46, 204, 113, 0.45)",
    emoji: "💎",
    description: "Where the wallets are fat and the attitudes are bigger",
  },
  {
    id: "cool",
    label: "Cool / Hip",
    color: "#f1c40f",
    colorRgba: "rgba(241, 196, 15, 0.45)",
    emoji: "😎",
    description: "Artsy cafes, fixie bikes, and people who 'just moved here'",
  },
  {
    id: "tourist",
    label: "Tourists",
    color: "#e74c3c",
    colorRgba: "rgba(231, 76, 60, 0.45)",
    emoji: "📸",
    description: "Selfie sticks, overpriced food, and 'excuse me where is...'",
  },
  {
    id: "suits",
    label: "Corporate / Suits",
    color: "#3498db",
    colorRgba: "rgba(52, 152, 219, 0.45)",
    emoji: "🏢",
    description: "LinkedIn warriors grinding 9-to-whenever-the-boss-leaves",
  },
  {
    id: "students",
    label: "Students",
    color: "#8e44ad",
    colorRgba: "rgba(142, 68, 173, 0.45)",
    emoji: "🎓",
    description: "Broke, caffeinated, and always 'preparing for something'",
  },
  {
    id: "normies",
    label: "Normies",
    color: "#95a5a6",
    colorRgba: "rgba(149, 165, 166, 0.45)",
    emoji: "🙂",
    description: "Regular humans doing regular human things",
  },
  {
    id: "sketchy",
    label: "Sketchy / Unsafe",
    color: "#2c3e50",
    colorRgba: "rgba(44, 62, 80, 0.45)",
    emoji: "⚠️",
    description: "Don't walk here at 2am. Or maybe even 2pm.",
  },
];

export type CategoryId =
  | "rich"
  | "cool"
  | "tourist"
  | "suits"
  | "students"
  | "normies"
  | "sketchy";

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c])
) as Record<CategoryId, Category>;
