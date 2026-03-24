export interface Hotspot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  description: string;
}

export const HOTSPOTS: Hotspot[] = [
  // Central Delhi
  { id: 'cp', name: 'Connaught Place', lat: 28.6330, lng: 77.2197, description: 'Circular, confusing, overpriced. Business meetings and tourist traps.' },
  { id: 'chandnichowk', name: 'Chandni Chowk', lat: 28.6600, lng: 77.2300, description: 'History, paranthas, pickpockets. Wear your bag in front.' },
  { id: 'karolbagh', name: 'Karol Bagh', lat: 28.6500, lng: 77.1900, description: 'If they dont have it, it doesnt exist.' },
  { id: 'rajindernagar', name: 'Rajinder Nagar', lat: 28.6430, lng: 77.1800, description: 'UPSC aspirants, PGs, and overpriced momos.' },
  { id: 'patelnagar', name: 'Patel Nagar', lat: 28.6510, lng: 77.1660, description: 'Students and small businesses holding the economy together.' },
  { id: 'chanakyapuri', name: 'Chanakyapuri', lat: 28.5990, lng: 77.1830, description: 'Embassies and wide roads. You feel rich just driving through.' },

  // South Delhi
  { id: 'hauzkhas', name: 'Hauz Khas', lat: 28.5540, lng: 77.1944, description: 'Lakes, ruins, expensive coffee. Influencer cemetery.' },
  { id: 'saket', name: 'Saket', lat: 28.5245, lng: 77.2066, description: 'Select City Walk and nothing else. Mall-dependent personality.' },
  { id: 'lajpatnagar', name: 'Lajpat Nagar', lat: 28.5697, lng: 77.2427, description: 'Central Market chaos. Best for street shopping and chaat.' },
  { id: 'sarojininagar', name: 'Sarojini Nagar', lat: 28.5770, lng: 77.1970, description: '100 rupees ka top. Dont ask for the bill.' },
  { id: 'vasantkunj', name: 'Vasant Kunj', lat: 28.5210, lng: 77.1570, description: 'Ambience Mall, DPS kids, and nothing to do after 10 PM.' },
  { id: 'greenpark', name: 'Green Park', lat: 28.5594, lng: 77.2072, description: 'Aurobindo Market vibes and metro station chaos.' },
  { id: 'malviya', name: 'Malviya Nagar', lat: 28.5340, lng: 77.2100, description: 'PGs, momos carts, and aspiring stand-up comedians.' },
  { id: 'nehruplace', name: 'Nehru Place', lat: 28.5495, lng: 77.2533, description: 'Pirated software capital of India. Tech bro starter pack.' },
  { id: 'greaterkailash', name: 'Greater Kailash', lat: 28.5404, lng: 77.2340, description: 'M Block Market. South Delhi snobs and the best kebabs.' },
  { id: 'defcol', name: 'Defence Colony', lat: 28.5723, lng: 77.2335, description: 'Flyover, market, and the OG South Delhi vibe.' },
  { id: 'kalkaji', name: 'Kalkaji', lat: 28.5496, lng: 77.2585, description: 'Lotus Temple adjacent. Temple and dhabas coexist.' },

  // West Delhi
  { id: 'dwarka', name: 'Dwarka', lat: 28.5823, lng: 77.0500, description: 'Too many sectors, not enough soul. Pacific Mall is the personality.' },
  { id: 'uttamnagar', name: 'Uttam Nagar', lat: 28.6200, lng: 77.0580, description: 'The most metro-connected place with the least to do near them.' },
  { id: 'janakpuri', name: 'Janakpuri', lat: 28.6250, lng: 77.0870, description: 'District centre and Unity One mall. Quietly holding West Delhi together.' },
  { id: 'rajouri', name: 'Rajouri Garden', lat: 28.6476, lng: 77.1230, description: 'Foodies paradise and the OG metro hangout spot.' },
  { id: 'tilak', name: 'Tilak Nagar', lat: 28.6400, lng: 77.0960, description: 'Market for everything and heart of Punjabi Delhi.' },
  { id: 'palam', name: 'Palam', lat: 28.5830, lng: 77.0930, description: 'Airport adjacent but no one is going anywhere.' },
  { id: 'vikaspuri', name: 'Vikas Puri', lat: 28.6360, lng: 77.0680, description: 'Residential vibes with surprisingly good street food.' },
  { id: 'punjabibagh', name: 'Punjabi Bagh', lat: 28.6680, lng: 77.1290, description: 'Club Road, Ring Road, and Punjabi South Delhi energy in West Delhi.' },
  { id: 'paschimvihar', name: 'Paschim Vihar', lat: 28.6710, lng: 77.1010, description: 'Wide roads, big houses, and silent judgement.' },

  // East Delhi
  { id: 'laxminagar', name: 'Laxmi Nagar', lat: 28.6310, lng: 77.2779, description: 'Student capital. Momos, PGs, and coaching chaos.' },
  { id: 'mayurvihar', name: 'Mayur Vihar', lat: 28.6000, lng: 77.2980, description: 'Phase 1, 2, 3 — each one thinks its better than the other.' },
  { id: 'preetvihar', name: 'Preet Vihar', lat: 28.6370, lng: 77.2940, description: 'Metro station famous for nothing. But the market is decent.' },
  { id: 'vivekvihar', name: 'Vivek Vihar', lat: 28.6720, lng: 77.3150, description: 'Phase 1 and 2. Quiet residential with surprise street food gems.' },
  { id: 'shahdara', name: 'Shahdara', lat: 28.6738, lng: 77.2940, description: 'Old school East Delhi. If you can drive here, you can drive in a war zone.' },
  { id: 'ghazipur', name: 'Ghazipur', lat: 28.6230, lng: 77.3260, description: 'Flower market, landfill, and somehow both at once.' },
  { id: 'anandvihar', name: 'Anand Vihar', lat: 28.6480, lng: 77.3160, description: 'ISBT and the gateway to UP. Organised chaos since 1990.' },
  { id: 'yamunavihar', name: 'Yamuna Vihar', lat: 28.7020, lng: 77.2680, description: 'North-East Delhi raw energy. Authentic local food territory.' },
  { id: 'dilshadgarden', name: 'Dilshad Garden', lat: 28.6810, lng: 77.3180, description: 'Underrated and proud of it. Metro made it cool.' },
  { id: 'ipext', name: 'IP Extension', lat: 28.6310, lng: 77.3100, description: 'Patparganj vibes. Schools, parks, and middle-class dreams.' },

  // North Delhi
  { id: 'civillines', name: 'Civil Lines', lat: 28.6810, lng: 77.2220, description: 'Old Delhi but make it British. Trees, bungalows, and DU culture.' },
  { id: 'modeltown', name: 'Model Town', lat: 28.7150, lng: 77.1920, description: 'Parks, markets, and the quiet North Delhi flex.' },
  { id: 'gtbroad', name: 'GT Road Area', lat: 28.6900, lng: 77.2460, description: 'The arterial stretch. Everything and everyone passes through here.' },
  { id: 'pitampura', name: 'Pitampura', lat: 28.6970, lng: 77.1340, description: 'Netaji Subhash Place metro fame. Malls and coaching centres.' },
  { id: 'rohini', name: 'Rohini', lat: 28.7380, lng: 77.1020, description: 'Sectors 1 through 50. Adventure Studio fame.' },
  { id: 'shalimarbagh', name: 'Shalimar Bagh', lat: 28.7170, lng: 77.1560, description: 'Ring Road adjacent calm vibes.' },
  { id: 'ashokvihar', name: 'Ashok Vihar', lat: 28.6900, lng: 77.1660, description: 'Phase 1-4, market streets, and quiet afternoons.' },

  // South-East / NCR
  { id: 'noida', name: 'Noida', lat: 28.5355, lng: 77.3910, description: 'Technically UP, but thinks its the future. IT parks and Fortuners.' },
  { id: 'gurgaon', name: 'Gurgaon', lat: 28.4595, lng: 77.0266, description: 'Millennium City. More malls per capita than trees.' },
  { id: 'faridabad', name: 'Faridabad', lat: 28.4089, lng: 77.3178, description: 'Industrial vibes trying to go residential. Crown Mall is the landmark.' },
  { id: 'ghaziabad', name: 'Ghaziabad', lat: 28.6692, lng: 77.4538, description: 'Gateway to UP. The real chaos begins here.' },

  // Additional notable areas
  { id: 'delhicant', name: 'Delhi Cantonment', lat: 28.5920, lng: 77.1530, description: 'Military area. Strict, clean, and off-limits vibes.' },
  { id: 'daryaganj', name: 'Daryaganj', lat: 28.6502, lng: 77.2398, description: 'Sunday book market legend. Old Delhi literary hub.' },
  { id: 'motiNagar', name: 'Moti Nagar', lat: 28.6570, lng: 77.1490, description: 'Kirti Nagar furniture market adjacent. Underrated food scene.' },
  { id: 'naraina', name: 'Naraina', lat: 28.6280, lng: 77.1440, description: 'Industrial area by day, food hub by night.' },
  { id: 'musamvihar', name: 'Maujpur', lat: 28.6880, lng: 77.2680, description: 'Northeast Delhi resilience. Street markets and local legends.' },
  { id: 'nizamuddin', name: 'Nizamuddin', lat: 28.5903, lng: 77.2462, description: 'Dargah, biryani, and Sufi music that hits different at night.' },
  { id: 'jangpura', name: 'Jangpura', lat: 28.5810, lng: 77.2420, description: 'Bhogal market vibes. The hidden gem of expat food culture.' },
  { id: 'eastofkailash', name: 'East of Kailash', lat: 28.5540, lng: 77.2500, description: 'Quiet, residential, and suspiciously well-maintained parks.' },
  { id: 'okhla', name: 'Okhla', lat: 28.5350, lng: 77.2720, description: 'Industrial area meets Jamia culture. Birds at Okhla sanctuary.' },
  { id: 'mehrauli', name: 'Mehrauli', lat: 28.5190, lng: 77.1850, description: 'Qutub Minar, archaeological park, and heritage food walk.' },
  { id: 'munirka', name: 'Munirka', lat: 28.5530, lng: 77.1730, description: 'JNU adjacent. Momos capital and international food scene.' },
];
