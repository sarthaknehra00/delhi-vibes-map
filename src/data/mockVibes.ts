import { TagId } from "./areas";

export interface Vibe {
  id: string;
  areaId: string;
  tags: TagId[];
  description: string;
  votes: number;
  createdAt: string;
  reported: boolean;
}

export const MOCK_VIBES: Vibe[] = [
  { id: "v1", areaId: "cp", tags: ["nightlife", "luxury"], description: "Where your wallet cries but your Instagram thrives ✨", votes: 42, createdAt: "2026-03-20", reported: false },
  { id: "v2", areaId: "cp", tags: ["corporate", "food"], description: "Lunch meetings that are just excuses to eat at Wenger's", votes: 38, createdAt: "2026-03-19", reported: false },
  { id: "v3", areaId: "cp", tags: ["chaos"], description: "Every lane looks the same but somehow you're always lost", votes: 55, createdAt: "2026-03-18", reported: false },
  { id: "v4", areaId: "hauz-khas", tags: ["nightlife", "student"], description: "Art galleries by day, questionable decisions by night", votes: 67, createdAt: "2026-03-20", reported: false },
  { id: "v5", areaId: "hauz-khas", tags: ["food", "budget"], description: "Deer park picnics > your overpriced brunch", votes: 44, createdAt: "2026-03-19", reported: false },
  { id: "v6", areaId: "chandni-chowk", tags: ["food", "chaos"], description: "You haven't lived until you've been elbowed for paranthe", votes: 89, createdAt: "2026-03-20", reported: false },
  { id: "v7", areaId: "chandni-chowk", tags: ["budget", "chaos"], description: "GPS gives up here. So does your sense of direction.", votes: 73, createdAt: "2026-03-18", reported: false },
  { id: "v8", areaId: "sarojini", tags: ["budget"], description: "₹100 mein teen tops, fight karna padega but worth it", votes: 91, createdAt: "2026-03-20", reported: false },
  { id: "v9", areaId: "sarojini", tags: ["chaos", "budget"], description: "Sunday here is basically a survival sport", votes: 62, createdAt: "2026-03-19", reported: false },
  { id: "v10", areaId: "gurgaon", tags: ["corporate", "nightlife", "luxury"], description: "Techbros pretending to be chill at overpriced cafes", votes: 58, createdAt: "2026-03-20", reported: false },
  { id: "v11", areaId: "gurgaon", tags: ["luxury", "nightlife"], description: "Cyber Hub at 9pm: LinkedIn by day, Tinder by night", votes: 76, createdAt: "2026-03-19", reported: false },
  { id: "v12", areaId: "noida", tags: ["student", "budget"], description: "Aamchi Mumbai has nothing on Noida's 'planned' chaos", votes: 34, createdAt: "2026-03-20", reported: false },
  { id: "v13", areaId: "dwarka", tags: ["student", "budget"], description: "Every sector is the same. You just accept it.", votes: 45, createdAt: "2026-03-18", reported: false },
  { id: "v14", areaId: "khan-market", tags: ["luxury"], description: "Water costs ₹200 here. Water.", votes: 102, createdAt: "2026-03-20", reported: false },
  { id: "v15", areaId: "khan-market", tags: ["luxury", "food"], description: "Only place where 'casual lunch' means ₹3000 minimum", votes: 88, createdAt: "2026-03-19", reported: false },
  { id: "v16", areaId: "nehru-place", tags: ["budget", "chaos"], description: "Need a graphics card? Also available: existential crisis", votes: 51, createdAt: "2026-03-17", reported: false },
  { id: "v17", areaId: "rajouri", tags: ["food", "budget"], description: "Chole bhature at 7am hits different here", votes: 63, createdAt: "2026-03-20", reported: false },
  { id: "v18", areaId: "lajpat", tags: ["chaos", "budget"], description: "The AC market is neither organized nor air-conditioned", votes: 47, createdAt: "2026-03-19", reported: false },
  { id: "v19", areaId: "paharganj", tags: ["budget", "chaos"], description: "Foreigners think it's authentic Delhi. They're not wrong.", votes: 39, createdAt: "2026-03-18", reported: false },
  { id: "v20", areaId: "greater-kailash", tags: ["luxury", "food"], description: "M Block market: where moms lunch and credit cards weep", votes: 54, createdAt: "2026-03-20", reported: false },
];
