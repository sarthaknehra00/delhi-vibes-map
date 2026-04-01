/**
 * Market Explorer Data Source
 * Contains categorized, specialized markets across Delhi NCR.
 * Built for smooth flyTo navigation and geometric highlights.
 */

export interface MarketCategory {
  id: string;
  label: string;
  icon: string; // Emoji
  description: string;
  color: string;
}

export interface MarketDataItem {
  id: string;
  category_id: string;
  market_name: string;
  description: string;
  coordinates: [number, number]; // [lng, lat]
  zoom_level: number;
  area_polygon: number[][][]; // GeoJSON Polygon footprint
  importance: 'high' | 'medium';
}

export const MARKET_CATEGORIES: MarketCategory[] = [
  { id: 'clothing', label: 'Clothing & Fashion', icon: '🧥', color: '#ec4899', description: 'Street fashion, ethnic wear, fabrics & textiles' },
  { id: 'jewelry', label: 'Jewelry & Precious', icon: '💍', color: '#fbbf24', description: 'Gold, silver, diamonds & artificial jewelry' },
  { id: 'electronics', label: 'Electronics & Tech', icon: '💻', color: '#3b82f6', description: 'Computers, mobiles, cameras & repair parts' },
  { id: 'automotive', label: 'Automotive & Transport', icon: '🚲', color: '#a855f7', description: 'Cycles, spare parts, tires & accessories' },
  { id: 'furniture', label: 'Furniture & Home', icon: '🪑', color: '#f97316', description: 'Wooden furniture, decor & kitchenware' },
  { id: 'food', label: 'Food & Grocery', icon: '🥦', color: '#22c55e', description: 'Wholesale grain, spices, fruit & vegetable mandis' },
  { id: 'wholesale', label: 'General Wholesale', icon: '🏬', color: '#6366f1', description: 'Packaging, plastic, stationery & general goods' },
  { id: 'specialty', label: 'Specialty & Cultural', icon: '🎨', color: '#eab308', description: 'Handicrafts, antiques, books & flowers' },
  { id: 'industrial', label: 'Industrial & Hardware', icon: '🏗️', color: '#64748b', description: 'Hardware, electrical, sanitary & construction' },
];

// Helper to generate a rough rectangular polygon around a point
function generateBounds(lng: number, lat: number, radiusDegrees: number): number[][][] {
  return [[
    [lng - radiusDegrees, lat - radiusDegrees],
    [lng + radiusDegrees, lat - radiusDegrees],
    [lng + radiusDegrees, lat + radiusDegrees],
    [lng - radiusDegrees, lat + radiusDegrees],
    [lng - radiusDegrees, lat - radiusDegrees],
  ]];
}

export const MARKET_DATA: MarketDataItem[] = [
  // ── CLOTHING & FASHION ──
  {
    id: 'sarojini',
    category_id: 'clothing',
    market_name: 'Sarojini Nagar Market',
    description: 'Famous budget fashion market. Export surplus, trendy clothing, footwear, and accessories at bargain prices.',
    coordinates: [77.1979, 28.5776],
    zoom_level: 15.0, // Reduced from 16.5
    area_polygon: generateBounds(77.1979, 28.5776, 0.002),
    importance: 'high'
  },
  {
    id: 'lajpat',
    category_id: 'clothing',
    market_name: 'Lajpat Nagar (Central Market)',
    description: 'Premier hub for ethnic wear, bridal fabrics, traditional suits, junk jewelry, and home decor.',
    coordinates: [77.2435, 28.5685],
    zoom_level: 14.8, // Reduced from 16.0
    area_polygon: generateBounds(77.2435, 28.5685, 0.0025),
    importance: 'high'
  },
  {
    id: 'chandni_chowk_clothing',
    category_id: 'clothing',
    market_name: 'Chandni Chowk (Kinari & Katra)',
    description: 'Historic lanes specializing in heavy bridal lehengas, zari work, laces, and wholesale fabrics (Katra Neel).',
    coordinates: [77.2315, 28.6560],
    zoom_level: 14.8, // Reduced from 16.0
    area_polygon: generateBounds(77.2315, 28.6560, 0.003),
    importance: 'high'
  },
  {
    id: 'gandhi_nagar',
    category_id: 'clothing',
    market_name: 'Gandhi Nagar Market',
    description: 'Asia\'s largest wholesale textile and readymade garment market. Massive hub for bulk fashion trading.',
    coordinates: [77.2721, 28.6653],
    zoom_level: 14.2, // Reduced from 15.5
    area_polygon: generateBounds(77.2721, 28.6653, 0.004),
    importance: 'high'
  },
  {
    id: 'janpath',
    category_id: 'clothing',
    market_name: 'Janpath Market',
    description: 'Vibrant flea market adjacent to Connaught Place known for Tibetan goods, street fashion, and faux jewelry.',
    coordinates: [77.2190, 28.6255],
    zoom_level: 15.0,
    area_polygon: generateBounds(77.2190, 28.6255, 0.002),
    importance: 'medium'
  },
  {
    id: 'kamla_nagar',
    category_id: 'clothing',
    market_name: 'Kamla Nagar Market',
    description: 'North Campus student hub famous for affordable streetwear, trendy women’s clothing, and college fashion.',
    coordinates: [77.1990, 28.6820],
    zoom_level: 14.8,
    area_polygon: generateBounds(77.1990, 28.6820, 0.002),
    importance: 'medium'
  },
  {
    id: 'palika_bazaar',
    category_id: 'clothing',
    market_name: 'Palika Bazaar',
    description: 'Underground air-conditioned market in CP known for cheap apparel, gaming consoles, and mixed electronics.',
    coordinates: [77.2185, 28.6320],
    zoom_level: 15.2,
    area_polygon: generateBounds(77.2185, 28.6320, 0.0015),
    importance: 'medium'
  },

  // ── JEWELRY & PRECIOUS ──
  {
    id: 'dariba_kalan',
    category_id: 'jewelry',
    market_name: 'Dariba Kalan',
    description: 'Old Delhi\'s legendary 17th-century street dedicated entirely to authentic silver jewelry, perfumes (ittar), and gold.',
    coordinates: [77.2327, 28.6543],
    zoom_level: 15.5, // Reduced from 17.0
    area_polygon: generateBounds(77.2327, 28.6543, 0.0015),
    importance: 'high'
  },
  {
    id: 'karol_bagh_jewelry',
    category_id: 'jewelry',
    market_name: 'Bank Street, Karol Bagh',
    description: 'Modern hub for branded gold and diamond jewelry showrooms, popular for high-end wedding purchases.',
    coordinates: [77.1950, 28.6500],
    zoom_level: 14.8, // Reduced from 16.0
    area_polygon: generateBounds(77.1950, 28.6500, 0.002),
    importance: 'high'
  },
  {
    id: 'south_ext',
    category_id: 'jewelry',
    market_name: 'South Extension (Part 1 & 2)',
    description: 'Upscale market dominating South Delhi for premium bridal wear and high-end diamond and gold jewelry stores.',
    coordinates: [77.2192, 28.5684],
    zoom_level: 15.0,
    area_polygon: generateBounds(77.2192, 28.5684, 0.0015),
    importance: 'high'
  },

  // ── ELECTRONICS & TECH ──
  {
    id: 'nehru_place',
    category_id: 'electronics',
    market_name: 'Nehru Place Hardware Market',
    description: 'India\'s largest IT and electronics hub. Laptops, custom PC builds, components, repairs, and piracy software.',
    coordinates: [77.2520, 28.5494],
    zoom_level: 15.0, // Reduced from 16.5
    area_polygon: generateBounds(77.2520, 28.5494, 0.002),
    importance: 'high'
  },
  {
    id: 'gaffar',
    category_id: 'electronics',
    market_name: 'Gaffar Market',
    description: 'Famous grey market in Karol Bagh. Hub for imported mobile phones, cheap repairs, raw components, and accessories.',
    coordinates: [77.1944, 28.6517],
    zoom_level: 15.4, // Reduced from 17.0
    area_polygon: generateBounds(77.1944, 28.6517, 0.0015),
    importance: 'high'
  },
  {
    id: 'bhagirath_palace',
    category_id: 'electronics',
    market_name: 'Bhagirath Palace',
    description: 'Asia\'s largest wholesale market for electrical goods, lighting fixtures, LEDs, and medical equipment.',
    coordinates: [77.2335, 28.6575],
    zoom_level: 15.0, // Reduced from 16.5
    area_polygon: generateBounds(77.2335, 28.6575, 0.002),
    importance: 'high'
  },

  // ── AUTOMOTIVE ──
  {
    id: 'jhandewalan_cycle',
    category_id: 'automotive',
    market_name: 'Jhandewalan Cycle Market',
    description: 'One of the largest wholesale and retail bicycle markets. Kids bikes, mountain bikes, and spare parts.',
    coordinates: [77.1955, 28.6430],
    zoom_level: 14.8, // Reduced from 16.0
    area_polygon: generateBounds(77.1955, 28.6430, 0.002),
    importance: 'high'
  },
  {
    id: 'kashmere_gate_auto',
    category_id: 'automotive',
    market_name: 'Kashmere Gate Auto Market',
    description: 'Massive wholesale hub for automobile spare parts, car accessories, engine components, and tools.',
    coordinates: [77.2280, 28.6665],
    zoom_level: 14.5, // Reduced from 15.5
    area_polygon: generateBounds(77.2280, 28.6665, 0.003),
    importance: 'high'
  },
  {
    id: 'karol_bagh_bike',
    category_id: 'automotive',
    market_name: 'Karol Bagh Motorcycle Market',
    description: 'Famous for motorcycle customization, Royal Enfield spares, biking gear, and second-hand two-wheelers.',
    coordinates: [77.1965, 28.6505],
    zoom_level: 15.0, // Reduced from 16.5
    area_polygon: generateBounds(77.1965, 28.6505, 0.0015),
    importance: 'high'
  },
  {
    id: 'mayapuri',
    category_id: 'automotive',
    market_name: 'Mayapuri Scrap Market',
    description: 'Asia’s largest industrial and automotive scrap market. Engines, heavy machinery, car shells, and metal salvage.',
    coordinates: [77.1350, 28.6300],
    zoom_level: 13.5,
    area_polygon: generateBounds(77.1350, 28.6300, 0.008),
    importance: 'high'
  },

  // ── FURNITURE & HOME ──
  {
    id: 'kirti_nagar',
    category_id: 'furniture',
    market_name: 'Kirti Nagar Furniture Market',
    description: 'Asia\'s largest furniture market. Thousands of shops offering timber, custom woodwork, and readymade home/office furniture.',
    coordinates: [77.1420, 28.6500],
    zoom_level: 14.0, // Reduced from 15.0
    area_polygon: generateBounds(77.1420, 28.6500, 0.006),
    importance: 'high'
  },
  {
    id: 'panchkuian',
    category_id: 'furniture',
    market_name: 'Panchkuian Road',
    description: 'Historic furniture market known for affordable wooden, cane, and steel furniture connecting CP to Jhandewalan.',
    coordinates: [77.2020, 28.6380],
    zoom_level: 14.8, // Reduced from 16.0
    area_polygon: generateBounds(77.2020, 28.6380, 0.0025),
    importance: 'medium'
  },
  {
    id: 'amar_colony',
    category_id: 'furniture',
    market_name: 'Amar Colony Furniture Market',
    description: 'Eclectic market specializing in antique reproductions, distressed wood, and refurbished colonial-style furniture.',
    coordinates: [77.2400, 28.5600],
    zoom_level: 15.2, // Reduced from 16.5
    area_polygon: generateBounds(77.2400, 28.5600, 0.0015),
    importance: 'medium'
  },
  {
    id: 'jail_road',
    category_id: 'furniture',
    market_name: 'Jail Road Furniture Market',
    description: 'A 2-kilometer stretch in West Delhi offering a massive variety of affordable home and office furniture.',
    coordinates: [77.1000, 28.6250],
    zoom_level: 14.5,
    area_polygon: generateBounds(77.1000, 28.6250, 0.003),
    importance: 'medium'
  },

  // ── FOOD & GROCERY ──
  {
    id: 'khari_baoli',
    category_id: 'food',
    market_name: 'Khari Baoli Spice Market',
    description: 'Operating since the 17th century, Asia\'s largest wholesale grocery and spice market. Nuts, herbs, and rare spices.',
    coordinates: [77.2205, 28.6580],
    zoom_level: 15.0, // Reduced from 16.5
    area_polygon: generateBounds(77.2205, 28.6580, 0.002),
    importance: 'high'
  },
  {
    id: 'azadpur_mandi',
    category_id: 'food',
    market_name: 'Azadpur Mandi',
    description: 'Asia\'s largest wholesale fruit and vegetable market, functioning as a national distribution hub.',
    coordinates: [77.1720, 28.7060],
    zoom_level: 13.5, // Reduced from 14.5
    area_polygon: generateBounds(77.1720, 28.7060, 0.008),
    importance: 'high'
  },
  {
    id: 'ghazipur_mandi',
    category_id: 'food',
    market_name: 'Ghazipur Poultry & Meat Market',
    description: 'The primary wholesale market supplying meat, poultry, and fish to the entire Delhi NCR region.',
    coordinates: [77.3300, 28.6250],
    zoom_level: 14.2, // Reduced from 15.5
    area_polygon: generateBounds(77.3300, 28.6250, 0.004),
    importance: 'high'
  },
  {
    id: 'ina_market',
    category_id: 'food',
    market_name: 'INA Market (Food & Groceries)',
    description: 'Famous food bazaar offering imported groceries, fresh regional produce, seafood, and high-quality meats.',
    coordinates: [77.2085, 28.5745],
    zoom_level: 15.2,
    area_polygon: generateBounds(77.2085, 28.5745, 0.0015),
    importance: 'medium'
  },

  // ── SPECIALTY & CULTURAL ──
  {
    id: 'nai_sarak',
    category_id: 'specialty',
    market_name: 'Nai Sarak Book Market',
    description: 'Connecting Chandni Chowk to Chawri Bazar, this street is the biggest wholesale & retail hub for books and stationery.',
    coordinates: [77.2285, 28.6520],
    zoom_level: 15.2, // Reduced from 16.5
    area_polygon: generateBounds(77.2285, 28.6520, 0.002),
    importance: 'high'
  },
  {
    id: 'darya_ganj',
    category_id: 'specialty',
    market_name: 'Daryaganj Sunday Book Market',
    description: 'Legendary weekly market stretching for kilometers, offering second-hand books, novels, and rare editions at throwaway prices.',
    coordinates: [77.2400, 28.6430],
    zoom_level: 14.5, // Reduced from 15.5
    area_polygon: generateBounds(77.2400, 28.6430, 0.004),
    importance: 'high'
  },
  {
    id: 'ghazipur_phool',
    category_id: 'specialty',
    market_name: 'Ghazipur Flower Mandi',
    description: 'Delhi\'s biggest wholesale flower market starting at 3 AM. Exotic imports, marigolds, and wedding floral supplies.',
    coordinates: [77.3270, 28.6270],
    zoom_level: 14.8, // Reduced from 16.0
    area_polygon: generateBounds(77.3270, 28.6270, 0.002),
    importance: 'high'
  },
  {
    id: 'dilli_haat',
    category_id: 'specialty',
    market_name: 'Dilli Haat (INA)',
    description: 'Open-air food plaza and craft bazaar rotating artisans from across India selling authentic regional handicrafts.',
    coordinates: [77.2075, 28.5735],
    zoom_level: 15.5, // Reduced from 17.0
    area_polygon: generateBounds(77.2075, 28.5735, 0.0015),
    importance: 'medium'
  },
  {
    id: 'paharganj',
    category_id: 'specialty',
    market_name: 'Paharganj Main Bazaar',
    description: 'Eclectic backpacker hub opposite New Delhi Railway Station. Leather goods, silver jewelry, hippie clothing, and travel gear.',
    coordinates: [77.2100, 28.6410],
    zoom_level: 14.8,
    area_polygon: generateBounds(77.2100, 28.6410, 0.0025),
    importance: 'high'
  },
  {
    id: 'majnu_ka_tilla',
    category_id: 'specialty',
    market_name: 'Majnu Ka Tilla (MT)',
    description: 'Little Tibet of Delhi. Walkable alleys filled with trendy fashion boutiques, K-pop apparel, and authentic Tibetan cafes.',
    coordinates: [77.2270, 28.7000],
    zoom_level: 15.0,
    area_polygon: generateBounds(77.2270, 28.7000, 0.002),
    importance: 'medium'
  },

  // ── WHOLESALE & INDUSTRIAL ──
  {
    id: 'sadar_bazaar',
    category_id: 'wholesale',
    market_name: 'Sadar Bazaar',
    description: 'Delhi\'s massive central wholesale market for household items, toys, artificial jewelry, packaging, and general merchandise.',
    coordinates: [77.2080, 28.6540],
    zoom_level: 14.2, // Reduced from 15.5
    area_polygon: generateBounds(77.2080, 28.6540, 0.005),
    importance: 'high'
  },
  {
    id: 'wazirpur_industrial',
    category_id: 'industrial',
    market_name: 'Wazirpur Bartan Market',
    description: 'Industrial area renowned across North India as a major wholesale hub for stainless steel utensils and manufacturing equipment.',
    coordinates: [77.1650, 28.6950],
    zoom_level: 14.0, // Reduced from 15.0
    area_polygon: generateBounds(77.1650, 28.6950, 0.005),
    importance: 'high'
  },
  {
    id: 'chawri_bazar',
    category_id: 'wholesale',
    market_name: 'Chawri Bazar',
    description: 'Specialized wholesale market for brass, copper, paper products, and notably, massive collections of wedding invitation cards.',
    coordinates: [77.2260, 28.6490],
    zoom_level: 15.2, // Reduced from 16.5
    area_polygon: generateBounds(77.2260, 28.6490, 0.002),
    importance: 'high'
  },
  {
    id: 'okhla_industrial',
    category_id: 'industrial',
    market_name: 'Okhla Industrial Estate',
    description: 'Vast industrial agglomeration in South Delhi. Garment export houses, pharmaceutical manufacturing, and wholesale machinery.',
    coordinates: [77.2750, 28.5250],
    zoom_level: 13.5,
    area_polygon: generateBounds(77.2750, 28.5250, 0.008),
    importance: 'high'
  }
];
