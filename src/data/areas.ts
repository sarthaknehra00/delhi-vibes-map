export interface Area {
  id: string;
  name: string;
  lat: number;
  lng: number;
  description: string;
  expectation?: string;
  reality?: string;
}

export const AREAS: Area[] = [
  { id: "cp", name: "Connaught Place", lat: 28.6315, lng: 77.2167, description: "The heart of Delhi", expectation: "Fun hangout 😎", reality: "Lost + sweaty + confused 💀" },
  { id: "hauz-khas", name: "Hauz Khas", lat: 28.5494, lng: 77.2001, description: "Where culture meets cocktails", expectation: "Broke but still partying 🍻", reality: "Philosophy + daaru = HKV nights" },
  { id: "chandni-chowk", name: "Chandni Chowk", lat: 28.6506, lng: 77.2300, description: "Old Delhi energy", expectation: "Food so good, hygiene negotiable 🍲", reality: "If you find parking, you’re a god 🚗" },
  { id: "sarojini", name: "Sarojini Nagar", lat: 28.5741, lng: 77.1996, description: "Bargain capital", expectation: "Bargain capital", reality: "Bargain capital" },
  { id: "gurgaon", name: "Gurgaon (Cyber Hub)", lat: 28.4945, lng: 77.0882, description: "Corporate meets nightlife", expectation: "Salary gone in 2 hours 🍻", reality: "LinkedIn by day, daaru by night" },
  { id: "noida", name: "Noida Sec 18", lat: 28.5706, lng: 77.3219, description: "The other side", expectation: "Mini CP but cleaner 😎", reality: "Everything available, nothing special" },
  { id: "dwarka", name: "Dwarka", lat: 28.5921, lng: 77.0460, description: "Endless sectors", expectation: "Endless sectors", reality: "Endless sectors" },
  { id: "rajouri", name: "Rajouri Garden", lat: 28.6468, lng: 77.1222, description: "Market vibes", expectation: "Punjabi energy overload 💥", reality: "Gym + protein + reels 💪" },
  { id: "lajpat", name: "Lajpat Nagar", lat: 28.5700, lng: 77.2373, description: "Central market chaos", expectation: "Central market chaos", reality: "Central market chaos" },
  { id: "karol-bagh", name: "Karol Bagh", lat: 28.6514, lng: 77.1907, description: "Wedding shopping central", expectation: "Wedding shopping battlefield 💍", reality: "Discount ka illusion 🤑" },
  { id: "south-ex", name: "South Extension", lat: 28.5789, lng: 77.2225, description: "Bougie shopping", expectation: "Bougie shopping", reality: "Bougie shopping" },
  { id: "nehru-place", name: "Nehru Place", lat: 28.5491, lng: 77.2533, description: "Tech bazaar", expectation: "Tech bazaar", reality: "Tech bazaar" },
  { id: "paharganj", name: "Paharganj", lat: 28.6448, lng: 77.2129, description: "Backpacker vibes", expectation: "Backpacker vibes", reality: "Backpacker vibes" },
  { id: "greater-kailash", name: "Greater Kailash", lat: 28.5454, lng: 77.2404, description: "South Delhi elite", expectation: "Coffee ₹500, attitude free ☕", reality: "Everyone is ‘just casually rich’ 💎" },
  { id: "janakpuri", name: "Janakpuri", lat: 28.6210, lng: 77.0833, description: "West Delhi represent", expectation: "Family + coaching combo 🏠📚", reality: "Calm but not really" },
  { id: "pitampura", name: "Pitampura", lat: 28.6972, lng: 77.1311, description: "North Delhi hub", expectation: "North Delhi hub", reality: "North Delhi hub" },
  { id: "rohini", name: "Rohini", lat: 28.7157, lng: 77.1102, description: "Sector life", expectation: "Sector life", reality: "Sector life" },
  { id: "vasant-kunj", name: "Vasant Kunj", lat: 28.5196, lng: 77.1581, description: "Mall central", expectation: "Ambience mall = personality trait", reality: "Uber drivers hate this area 🚗💀" },
  { id: "mayur-vihar", name: "Mayur Vihar", lat: 28.5930, lng: 77.2972, description: "East Delhi pride", expectation: "Family area but secretly chaotic 🏠", reality: "Metro dependency = 100% 🚇" },
  { id: "khan-market", name: "Khan Market", lat: 28.6005, lng: 77.2274, description: "Where wallets go to die", expectation: "Where wallets go to die", reality: "Where wallets go to die" },
  { id: "saket", name: "Saket", lat: 28.5192, lng: 77.2130, description: "Mall > personality 🛍️", expectation: "Mall > personality 🛍️", reality: "Dates funded by parents 💳" },
  { id: "defence-colony", name: "Defence Colony", lat: 28.5718, lng: 77.2333, description: "Old money, new ego 🧠", expectation: "Old money, new ego 🧠", reality: "Food good, wallet destroyed 💸" },
  { id: "laxmi-nagar", name: "Laxmi Nagar", lat: 28.636589, lng: 77.274315, description: "CA students + momo = survival 🧾🥟", expectation: "CA students + momo = survival 🧾🥟", reality: "Budget tight, dreams unlimited 💀" },
  { id: "preet-vihar", name: "Preet Vihar", lat: 28.638712, lng: 77.295824, description: "Silent rich, loud weddings 💍", expectation: "Silent rich, loud weddings 💍", reality: "Looks simple, money hidden 💰" },
  { id: "shahdara", name: "Shahdara", lat: 28.6698, lng: 77.284103, description: "Real Delhi starts here 😤", expectation: "Real Delhi starts here 😤", reality: "Traffic + taste both heavy 🚦🍲" },
  { id: "krishna-nagar", name: "Krishna Nagar", lat: 28.659639, lng: 77.282179, description: "Street food > hygiene debate 🍜", expectation: "Street food > hygiene debate 🍜", reality: "Shopping chaos champion 🛍️" },
  { id: "rajiv-chowk", name: "Rajiv Chowk", lat: 28.631649, lng: 77.219575, description: "Human traffic simulator 🚶‍♂️🚶‍♀️", expectation: "Human traffic simulator 🚶‍♂️🚶‍♀️", reality: "If you survive here, you survive anywhere 💀" },
  { id: "sector-29-gurgaon", name: "Sector 29 Gurgaon", lat: 28.466945, lng: 77.06652, description: "Party hard, regret harder 💀", expectation: "Party hard, regret harder 💀", reality: "Weekend = survival test" },
  { id: "golf-course-road", name: "Golf Course Road", lat: 28.438711, lng: 77.102992, description: "Money louder than personality 💎", expectation: "Money louder than personality 💎", reality: "Luxury but no soul 🏢" },
  { id: "noida-sector-62", name: "Noida Sector 62", lat: 28.622934, lng: 77.364026, description: "Corporate sadness zone 💻", expectation: "Corporate sadness zone 💻", reality: "Dreams died in cubicles 🧠" },
  { id: "greater-noida", name: "Greater Noida", lat: 28.474388, lng: 77.503990, description: "Roads wide, life empty 🌫️", expectation: "Roads wide, life empty 🌫️", reality: "Future city… still waiting ⏳" },
  { id: "kamla-nagar", name: "Kamla Nagar", lat: 28.68865, lng: 77.21365, description: "DU crowd + bargaining skills 🧠", expectation: "DU crowd + bargaining skills 🧠", reality: "Street shopping Olympics 🛍️" },
  { id: "gtb-nagar", name: "GTB Nagar", lat: 28.6982, lng: 77.2070, description: "Every 2nd person preparing for something 📚", expectation: "Every 2nd person preparing for something 📚", reality: "Notes > life" },
  { id: "jama-masjid", name: "Jama Masjid Area", lat: 28.6510, lng: 77.2340, description: "Khana top tier, space zero 🥵", expectation: "Khana top tier, space zero 🥵", reality: "Crowd = infinity" },
  { id: "punjabi-bagh", name: "Punjabi Bagh", lat: 28.669304, lng: 77.128382, description: "Cars bigger than roads 🚗", expectation: "Cars bigger than roads 🚗", reality: "Flex culture strong 💪" }
];

export const TAGS = [
  { id: "nightlife", label: "Nightlife", emoji: "🔥" },
  { id: "budget", label: "Budget", emoji: "💸" },
  { id: "luxury", label: "Luxury", emoji: "💎" },
  { id: "student", label: "Student", emoji: "🎓" },
  { id: "food", label: "Food", emoji: "🍜" },
  { id: "corporate", label: "Corporate", emoji: "🏢" },
  { id: "chaos", label: "Chaos", emoji: "🚦" },
  { id: "overhyped", label: "Overhyped", emoji: "🤡" },
  { id: "parking-nightmare", label: "Parking Nightmare", emoji: "🚗💀" },
  { id: "date-spot", label: "Date Spot", emoji: "❤️" },
  { id: "crowded-af", label: "Crowded AF", emoji: "🥵" },
  { id: "peaceful", label: "Peaceful", emoji: "🌿" },
  { id: "scam-zone", label: "Scam Zone", emoji: "🚨" },
] as const;

export type TagId = typeof TAGS[number]["id"];
