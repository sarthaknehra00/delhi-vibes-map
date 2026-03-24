import { CategoryId } from './categories';

interface SeedZone {
  lat: number;
  lng: number;
  radius: number; // in grid cells (approx 0.005 degrees per cell)
  category: CategoryId;
}

// Deep socio-economic research mapping for Delhi NCR
export const SEED_ZONES: SeedZone[] = [
  // --- RICH / ELITE (Emerald) ---
  { lat: 28.5535, lng: 77.2588, radius: 4, category: 'rich' }, // GK / South Ext
  { lat: 28.5415, lng: 77.1554, radius: 4, category: 'rich' }, // Vasant Vihar
  { lat: 28.5750, lng: 77.2210, radius: 3, category: 'rich' }, // Defence Colony / Lodhi / Amrita Shergill Marg
  { lat: 28.5950, lng: 77.1900, radius: 4, category: 'rich' }, // Chanakyapuri (Diplomatic Enclave)
  { lat: 28.4550, lng: 77.0980, radius: 4, category: 'rich' }, // Golf Course Road, Gurgaon
  { lat: 28.5420, lng: 77.2020, radius: 3, category: 'rich' }, // Hauz Khas Enclave
  { lat: 28.5550, lng: 77.2650, radius: 3, category: 'rich' }, // New Friends Colony

  // --- CORPORATE SUITS (Indigo) ---
  { lat: 28.4900, lng: 77.0880, radius: 4, category: 'corporate' }, // Cyber City Enclave, DLF Phase 2/3
  { lat: 28.4590, lng: 77.0260, radius: 3, category: 'corporate' }, // Sector 29 / 44, Gurgaon
  { lat: 28.6130, lng: 77.3680, radius: 4, category: 'corporate' }, // Noida Sector 62 / Electronic City
  { lat: 28.6315, lng: 77.2167, radius: 3, category: 'corporate' }, // Connaught Place (Inner Core)
  { lat: 28.5300, lng: 77.2600, radius: 3, category: 'corporate' }, // Nehru Place (IT Hub) / Okhla Phase 3

  // --- MIDDLE CLASS (Blue) ---
  { lat: 28.6250, lng: 77.0870, radius: 6, category: 'middleClass' }, // Janakpuri
  { lat: 28.6476, lng: 77.1230, radius: 4, category: 'middleClass' }, // Rajouri Garden / Punjabi Bagh
  { lat: 28.5820, lng: 77.0500, radius: 6, category: 'middleClass' }, // Dwarka Subcity
  { lat: 28.6970, lng: 77.1350, radius: 5, category: 'middleClass' }, // Pitampura / Rohini Sec 3+
  { lat: 28.6370, lng: 77.2940, radius: 4, category: 'middleClass' }, // Preet Vihar / Laxmi Nagar (Part)
  { lat: 28.6000, lng: 77.2980, radius: 4, category: 'middleClass' }, // Mayur Vihar Phase 1 & 2
  { lat: 28.5850, lng: 77.0800, radius: 5, category: 'middleClass' }, // Palam (Requested directly by user)
  { lat: 28.6200, lng: 77.0580, radius: 4, category: 'middleClass' }, // Uttam Nagar

  // --- POOR / WORKING CLASS (Amber) ---
  { lat: 28.6480, lng: 77.3160, radius: 5, category: 'poor' }, // Anand Vihar / Ghazipur borders
  { lat: 28.6650, lng: 77.2650, radius: 4, category: 'poor' }, // Seelampur / Jaffrabad
  { lat: 28.7300, lng: 77.1700, radius: 5, category: 'poor' }, // Jahangirpuri
  { lat: 28.5200, lng: 77.2800, radius: 4, category: 'poor' }, // Tughlakabad Extension / Sangam Vihar
  { lat: 28.6180, lng: 77.0000, radius: 5, category: 'poor' }, // Najafgarh outskirts
  { lat: 28.6600, lng: 77.3000, radius: 3, category: 'poor' }, // Nand Nagri / Trilokpuri
  
  // --- STUDENTS (Pink) ---
  { lat: 28.6921, lng: 77.2065, radius: 4, category: 'students' }, // North Campus / Hudson Lane
  { lat: 28.5800, lng: 77.1650, radius: 3, category: 'students' }, // South Campus / Satya Niketan
  { lat: 28.7100, lng: 77.2100, radius: 3, category: 'students' }, // Mukherjee Nagar (UPSC)
  { lat: 28.6350, lng: 77.2750, radius: 3, category: 'students' }, // Laxmi Nagar core (CA hubs)
  { lat: 28.5400, lng: 77.3300, radius: 3, category: 'students' }, // Noida Knowledge Parks (Amity area)
  
  // --- TOURIST (Purple) ---
  { lat: 28.6120, lng: 77.2300, radius: 2, category: 'tourist' }, // India Gate
  { lat: 28.6500, lng: 77.2300, radius: 3, category: 'tourist' }, // Red Fort / Jama Masjid / Chandni Chowk
  { lat: 28.5240, lng: 77.1850, radius: 2, category: 'tourist' }, // Qutub Minar
  { lat: 28.5530, lng: 77.2500, radius: 2, category: 'tourist' }, // Lotus Temple
  { lat: 28.5930, lng: 77.2500, radius: 2, category: 'tourist' }, // Humayun's Tomb
  { lat: 28.6250, lng: 77.2080, radius: 2, category: 'tourist' }, // Bangla Sahib

  // --- SKETCHY / UNSAFE (Red) ---
  { lat: 28.6430, lng: 77.2200, radius: 2, category: 'sketchy' }, // GB Road (Notorious)
  { lat: 28.6738, lng: 77.2940, radius: 3, category: 'sketchy' }, // Shahdara back-alleys at night (Requested area vibe)
  { lat: 28.7400, lng: 77.0500, radius: 5, category: 'sketchy' }, // Bawana / Outer Narela industrial belts
  { lat: 28.4300, lng: 77.1100, radius: 4, category: 'sketchy' }, // Gurgaon-Faridabad secluded highway stretches
  { lat: 28.5130, lng: 77.1700, radius: 3, category: 'sketchy' }, // Deep Mahipalpur / Chhatarpur borders late night
  { lat: 28.5700, lng: 77.3000, radius: 3, category: 'sketchy' }, // Kalyanpuri / Kondli

  // --- NORMIES (Gray) ---
  { lat: 28.4000, lng: 77.3000, radius: 8, category: 'normies' }, // Faridabad proper
  { lat: 28.6600, lng: 77.4000, radius: 8, category: 'normies' }, // Ghaziabad / Indirapuram
  { lat: 28.5800, lng: 77.4000, radius: 7, category: 'normies' }, // Noida Extension / Greater Noida West
  { lat: 28.7000, lng: 77.0000, radius: 6, category: 'normies' }, // Bahadurgarh borders
];
