export interface Hotspot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  description: string;
  emoji: string;
}

export const HOTSPOTS: Hotspot[] = [
  {
    id: 'cp',
    name: 'Connaught Place',
    lat: 28.6330,
    lng: 77.2197,
    description: 'The heart of Delhi. Circular, confusing, and overpriced. Good for white-shirt business meetings and getting scammed by "guides".',
    emoji: '⚪'
  },
  {
    id: 'dwarka',
    name: 'Dwarka',
    lat: 28.5823,
    lng: 77.0500,
    description: 'A dedicated sub-city for retired uncles and people who think "Pacific Mall" is a personality trait. Too many sectors, not enough soul.',
    emoji: '🏘️'
  },
  {
    id: 'noida',
    name: 'Noida',
    lat: 28.5355,
    lng: 77.3910,
    description: 'Technically UP, but thinks it is the future. Land of IT parks, wide roads, and Fortuners with "Guijar" stickers.',
    emoji: '🏢'
  },
  {
    id: 'shahdara',
    name: 'Shahdara',
    lat: 28.6738,
    lng: 77.2940,
    description: 'Old school East Delhi. If you can drive here, you can drive in a war zone. Famous for commerce and absolute traffic chaos.',
    emoji: '🚦'
  },
  {
    id: 'karolbagh',
    name: 'Karol Bagh',
    lat: 28.6500,
    lng: 77.1900,
    description: 'The AC market is neither organized nor air-conditioned. If they dont have it, it doesnt exist. Land of clones.',
    emoji: '👜'
  },
  {
    id: 'chandnichowk',
    name: 'Chandni Chowk',
    lat: 28.6600,
    lng: 77.2300,
    description: 'History, heritage, and the highest concentration of parathas and pickpockets. Wear your backpack in front.',
    emoji: '🕌'
  },
  {
    id: 'hauzkhas',
    name: 'Hauz Khas Village',
    lat: 28.5540,
    lng: 77.1944,
    description: 'Lakes, ruins, and expensive coffee. Where influencers go to die. The parking is a nightmare.',
    emoji: '🦢'
  }
];
