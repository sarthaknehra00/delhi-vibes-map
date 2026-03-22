export interface Area {
  id: string;
  name: string;
  lat: number;
  lng: number;
  description: string;
}

export const AREAS: Area[] = [
  { id: "cp", name: "Connaught Place", lat: 28.6315, lng: 77.2167, description: "The heart of Delhi" },
  { id: "hauz-khas", name: "Hauz Khas", lat: 28.5494, lng: 77.2001, description: "Where culture meets cocktails" },
  { id: "chandni-chowk", name: "Chandni Chowk", lat: 28.6506, lng: 77.2300, description: "Old Delhi energy" },
  { id: "sarojini", name: "Sarojini Nagar", lat: 28.5741, lng: 77.1996, description: "Bargain capital" },
  { id: "gurgaon", name: "Gurgaon (Cyber Hub)", lat: 28.4945, lng: 77.0882, description: "Corporate meets nightlife" },
  { id: "noida", name: "Noida Sec 18", lat: 28.5706, lng: 77.3219, description: "The other side" },
  { id: "dwarka", name: "Dwarka", lat: 28.5921, lng: 77.0460, description: "Endless sectors" },
  { id: "rajouri", name: "Rajouri Garden", lat: 28.6468, lng: 77.1222, description: "Market vibes" },
  { id: "lajpat", name: "Lajpat Nagar", lat: 28.5700, lng: 77.2373, description: "Central market chaos" },
  { id: "karol-bagh", name: "Karol Bagh", lat: 28.6514, lng: 77.1907, description: "Wedding shopping central" },
  { id: "south-ex", name: "South Extension", lat: 28.5789, lng: 77.2225, description: "Bougie shopping" },
  { id: "nehru-place", name: "Nehru Place", lat: 28.5491, lng: 77.2533, description: "Tech bazaar" },
  { id: "paharganj", name: "Paharganj", lat: 28.6448, lng: 77.2129, description: "Backpacker vibes" },
  { id: "greater-kailash", name: "Greater Kailash", lat: 28.5454, lng: 77.2404, description: "South Delhi elite" },
  { id: "janakpuri", name: "Janakpuri", lat: 28.6210, lng: 77.0833, description: "West Delhi represent" },
  { id: "pitampura", name: "Pitampura", lat: 28.6972, lng: 77.1311, description: "North Delhi hub" },
  { id: "rohini", name: "Rohini", lat: 28.7157, lng: 77.1102, description: "Sector life" },
  { id: "vasant-kunj", name: "Vasant Kunj", lat: 28.5196, lng: 77.1581, description: "Mall central" },
  { id: "mayur-vihar", name: "Mayur Vihar", lat: 28.5930, lng: 77.2972, description: "East Delhi pride" },
  { id: "khan-market", name: "Khan Market", lat: 28.6005, lng: 77.2274, description: "Where wallets go to die" },
];

export const TAGS = [
  { id: "nightlife", label: "Nightlife", emoji: "🔥" },
  { id: "budget", label: "Budget", emoji: "💸" },
  { id: "luxury", label: "Luxury", emoji: "💎" },
  { id: "student", label: "Student", emoji: "🎓" },
  { id: "food", label: "Food", emoji: "🍜" },
  { id: "corporate", label: "Corporate", emoji: "🏢" },
  { id: "chaos", label: "Chaos", emoji: "🚦" },
] as const;

export type TagId = typeof TAGS[number]["id"];
