export interface Hotspot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  description: string;
  vibeQuery?: string;
  /** 1 = major landmark (always visible), 2 = notable neighborhood, 3 = local / niche */
  tier: 1 | 2 | 3;
}

export const HOTSPOTS: Hotspot[] = [
  // Central Delhi
  { id: 'cp', name: 'Connaught Place', lat: 28.6330, lng: 77.2197, description: 'Circular, confusing, overpriced. Business meetings and tourist traps.', vibeQuery: 'Ilahi Arijit Singh', tier: 1 },
  { id: 'indiagate', name: 'India Gate', lat: 28.6129, lng: 77.2295, description: 'Ice cream at 1 AM and patriotic selfies.', vibeQuery: 'Vande Mataram A.R. Rahman', tier: 1 },
  { id: 'janpath', name: 'Janpath', lat: 28.6250, lng: 77.2183, description: 'Bargaining wars and Tibetan market finds.', vibeQuery: 'Aazaadiyan Amit Trivedi', tier: 3 },
  { id: 'chandnichowk', name: 'Chandni Chowk', lat: 28.6600, lng: 77.2300, description: 'History, paranthas, pickpockets. Wear your bag in front.', vibeQuery: 'Kun Faya Kun A.R. Rahman', tier: 1 },
  { id: 'jamamasjid', name: 'Jama Masjid', lat: 28.6507, lng: 77.2334, description: 'Kebabs, history, and spiritual peace in the chaos.', vibeQuery: 'Arziyan Delhi 6', tier: 2 },
  { id: 'daryaganj', name: 'Daryaganj', lat: 28.6502, lng: 77.2398, description: 'Sunday book market legend. Old Delhi literary hub.', vibeQuery: 'Ghar More Pardesiya', tier: 3 },
  { id: 'karolbagh', name: 'Karol Bagh', lat: 28.6500, lng: 77.1900, description: 'If they dont have it, it doesnt exist.', vibeQuery: 'Tera Yaar Hoon Main', tier: 2 },
  { id: 'rajindernagar', name: 'Rajinder Nagar', lat: 28.6430, lng: 77.1800, description: 'UPSC aspirants, PGs, and overpriced momos.', vibeQuery: 'Aarambh Hai Prachand', tier: 2 },
  { id: 'patelnagar', name: 'Patel Nagar', lat: 28.6510, lng: 77.1660, description: 'Students and small businesses holding the economy together.', vibeQuery: 'Apna Time Aayega', tier: 3 },
  { id: 'chanakyapuri', name: 'Chanakyapuri', lat: 28.5990, lng: 77.1830, description: 'Embassies and wide roads. You feel rich just driving through.', vibeQuery: 'Young and Beautiful Lana Del Rey', tier: 2 },

  // South Delhi
  { id: 'hauzkhas', name: 'Hauz Khas', lat: 28.5540, lng: 77.1944, description: 'Lakes, ruins, expensive coffee. Influencer cemetery.', vibeQuery: 'Summertime Sadness Lana Del Rey', tier: 1 },
  { id: 'saket', name: 'Saket', lat: 28.5245, lng: 77.2066, description: 'Select City Walk and nothing else. Mall-dependent personality.', vibeQuery: 'Golden Harry Styles', tier: 2 },
  { id: 'lajpatnagar', name: 'Lajpat Nagar', lat: 28.5697, lng: 77.2427, description: 'Central Market chaos. Best for street shopping and chaat.', vibeQuery: 'London Thumakda', tier: 2 },
  { id: 'sarojininagar', name: 'Sarojini Nagar', lat: 28.5770, lng: 77.1970, description: '100 rupees ka top. Dont ask for the bill.', vibeQuery: 'Cheap Thrills Sia', tier: 2 },
  { id: 'vasantkunj', name: 'Vasant Kunj', lat: 28.5210, lng: 77.1570, description: 'Ambience Mall, DPS kids, and nothing to do after 10 PM.', vibeQuery: 'Love Me Like You Do Ellie Goulding', tier: 2 },
  { id: 'greenpark', name: 'Green Park', lat: 28.5594, lng: 77.2072, description: 'Aurobindo Market vibes and metro station chaos.', vibeQuery: 'Until I Found You Stephen Sanchez', tier: 3 },
  { id: 'malviya', name: 'Malviya Nagar', lat: 28.5340, lng: 77.2100, description: 'PGs, momos carts, and aspiring stand-up comedians.', vibeQuery: 'Choo Lo The Local Train', tier: 3 },
  { id: 'nehruplace', name: 'Nehru Place', lat: 28.5495, lng: 77.2533, description: 'Pirated software capital of India. Tech bro starter pack.', vibeQuery: 'Matrix Theme', tier: 2 },
  { id: 'greaterkailash', name: 'Greater Kailash', lat: 28.5404, lng: 77.2340, description: 'M Block Market. South Delhi snobs and the best kebabs.', vibeQuery: 'Excuses AP Dhillon', tier: 2 },
  { id: 'defcol', name: 'Defence Colony', lat: 28.5723, lng: 77.2335, description: 'Flyover, market, and the OG South Delhi vibe.', vibeQuery: 'Peaches & Cream', tier: 2 },
  { id: 'kalkaji', name: 'Kalkaji', lat: 28.5496, lng: 77.2585, description: 'Lotus Temple adjacent. Temple and dhabas coexist.', vibeQuery: 'Kun Faya Kun', tier: 3 },
  { id: 'nizamuddin', name: 'Nizamuddin', lat: 28.5903, lng: 77.2462, description: 'Dargah, biryani, and Sufi music that hits different at night.', vibeQuery: 'Kun Faya Kun', tier: 2 },
  { id: 'jangpura', name: 'Jangpura', lat: 28.5810, lng: 77.2420, description: 'Bhogal market vibes. The hidden gem of expat food culture.', vibeQuery: 'Afreen Afreen', tier: 3 },
  { id: 'eastofkailash', name: 'East of Kailash', lat: 28.5540, lng: 77.2500, description: 'Quiet, residential, and suspiciously well-maintained parks.', vibeQuery: 'Shaam', tier: 3 },
  { id: 'mehrauli', name: 'Mehrauli', lat: 28.5190, lng: 77.1850, description: 'Qutub Minar, archaeological park, and heritage food walk.', vibeQuery: 'Jashn-E-Bahaara', tier: 2 },
  { id: 'okhla', name: 'Okhla', lat: 28.5350, lng: 77.2720, description: 'Industrial area meets Jamia culture. Birds at Okhla sanctuary.', vibeQuery: 'Kar Har Maidaan Fateh', tier: 3 },
  { id: 'munirka', name: 'Munirka', lat: 28.5530, lng: 77.1730, description: 'JNU adjacent. Momos capital and international food scene.', vibeQuery: 'Aazaadi', tier: 3 },
  { id: 'pasandpur', name: 'Pasandpur', lat: 28.5130, lng: 77.1700, description: 'Deep South Delhi outskirts.', vibeQuery: 'Phir Se Ud Chala', tier: 3 },

  // West Delhi
  { id: 'dwarka', name: 'Dwarka', lat: 28.5823, lng: 77.0500, description: 'Too many sectors, not enough soul. Pacific Mall is the personality.', vibeQuery: 'Namastute Seedhe Maut', tier: 1 },
  { id: 'uttamnagar', name: 'Uttam Nagar', lat: 28.6200, lng: 77.0580, description: 'The most metro-connected place with the least to do near them.', vibeQuery: 'Desi Kalakaar Yo Yo Honey Singh', tier: 3 },
  { id: 'janakpuri', name: 'Janakpuri', lat: 28.6250, lng: 77.0870, description: 'District centre and Unity One mall. Quietly holding West Delhi together.', vibeQuery: 'Excuses AP Dhillon', tier: 2 },
  { id: 'rajouri', name: 'Rajouri Garden', lat: 28.6476, lng: 77.1230, description: 'Foodies paradise and the OG metro hangout spot.', vibeQuery: 'Obsessed Riar Saab', tier: 2 },
  { id: 'tilak', name: 'Tilak Nagar', lat: 28.6400, lng: 77.0960, description: 'Market for everything and heart of Punjabi Delhi.', vibeQuery: 'Tum Tum', tier: 3 },
  { id: 'palam', name: 'Palam', lat: 28.5830, lng: 77.0930, description: 'Airport adjacent but no one is going anywhere.', vibeQuery: 'Ilahi Arijit Singh', tier: 3 },
  { id: 'vikaspuri', name: 'Vikas Puri', lat: 28.6360, lng: 77.0680, description: 'Residential vibes with surprisingly good street food.', vibeQuery: 'Lover Diljit', tier: 3 },
  { id: 'punjabibagh', name: 'Punjabi Bagh', lat: 28.6680, lng: 77.1290, description: 'Club Road, Ring Road, and Punjabi South Delhi energy in West Delhi.', vibeQuery: 'We Rollin Shubh', tier: 2 },
  { id: 'paschimvihar', name: 'Paschim Vihar', lat: 28.6710, lng: 77.1010, description: 'Wide roads, big houses, and silent judgement.', vibeQuery: 'Born To Shine Diljit Dosanjh', tier: 3 },
  { id: 'motiNagar', name: 'Moti Nagar', lat: 28.6570, lng: 77.1490, description: 'Kirti Nagar furniture market adjacent. Underrated food scene.', vibeQuery: 'Morni Banke', tier: 3 },
  { id: 'naraina', name: 'Naraina', lat: 28.6280, lng: 77.1440, description: 'Industrial area by day, food hub by night.', vibeQuery: 'Kaam Bhaari', tier: 3 },
  { id: 'delhicant', name: 'Delhi Cantonment', lat: 28.5920, lng: 77.1530, description: 'Military area. Strict, clean, and off-limits vibes.', vibeQuery: 'Sandese Aate Hai', tier: 2 },

  // East Delhi
  { id: 'laxminagar', name: 'Laxmi Nagar', lat: 28.6310, lng: 77.2779, description: 'Student capital. Momos, PGs, and coaching chaos.', vibeQuery: 'Afsanay Young Stunners', tier: 2 },
  { id: 'mayurvihar', name: 'Mayur Vihar', lat: 28.6000, lng: 77.2980, description: 'Phase 1, 2, 3 — each one thinks its better than the other.', vibeQuery: 'Gumaan Young Stunners', tier: 2 },
  { id: 'preetvihar', name: 'Preet Vihar', lat: 28.6370, lng: 77.2940, description: 'Metro station famous for nothing. But the market is decent.', vibeQuery: 'Class-Sikh Prabh Deep', tier: 3 },
  { id: 'vivekvihar', name: 'Vivek Vihar', lat: 28.6720, lng: 77.3150, description: 'Phase 1 and 2. Quiet residential with surprise street food gems.', vibeQuery: 'Kho Gaye Hum Kahan', tier: 3 },
  { id: 'shahdara', name: 'Shahdara', lat: 28.6738, lng: 77.2940, description: 'Old school East Delhi. If you can drive here, you can drive in a war zone.', vibeQuery: 'Shaktimaan Seedhe Maut', tier: 2 },
  { id: 'ghazipur', name: 'Ghazipur', lat: 28.6230, lng: 77.3260, description: 'Flower market, landfill, and somehow both at once.', vibeQuery: 'Aarambh', tier: 3 },
  { id: 'anandvihar', name: 'Anand Vihar', lat: 28.6480, lng: 77.3160, description: 'ISBT and the gateway to UP. Organised chaos since 1990.', vibeQuery: 'Namastute Seedhe Maut', tier: 2 },
  { id: 'yamunavihar', name: 'Yamuna Vihar', lat: 28.7020, lng: 77.2680, description: 'North-East Delhi raw energy. Authentic local food territory.', vibeQuery: 'Shaktimaan Seedhe Maut', tier: 3 },
  { id: 'dilshadgarden', name: 'Dilshad Garden', lat: 28.6810, lng: 77.3180, description: 'Underrated and proud of it. Metro made it cool.', vibeQuery: 'Bajenge Seedhe Maut', tier: 3 },
  { id: 'ipext', name: 'IP Extension', lat: 28.6310, lng: 77.3100, description: 'Patparganj vibes. Schools, parks, and middle-class dreams.', vibeQuery: 'Tu Aake Dekhle King', tier: 3 },
  { id: 'musamvihar', name: 'Maujpur', lat: 28.6880, lng: 77.2680, description: 'Northeast Delhi resilience. Street markets and local legends.', vibeQuery: 'Machayenge', tier: 3 },

  // North Delhi
  { id: 'northcampus', name: 'North Campus (DU)', lat: 28.6883, lng: 77.2071, description: 'Colleges, protests, and endless momo stalls.', vibeQuery: 'Yaaron KK', tier: 1 },
  { id: 'hudsonlane', name: 'Hudson Lane', lat: 28.6946, lng: 77.1998, description: 'Cafe culture capital for DU students.', vibeQuery: 'Kho Gaye Hum Kahan', tier: 2 },
  { id: 'kamlanagar', name: 'Kamla Nagar', lat: 28.6811, lng: 77.2014, description: 'K-Nags. The only place DU students shop.', vibeQuery: 'Dil Chahta Hai', tier: 3 },
  { id: 'civillines', name: 'Civil Lines', lat: 28.6810, lng: 77.2220, description: 'Old Delhi but make it British. Trees, bungalows, and DU culture.', vibeQuery: 'In Aankhon Ki Masti Ke', tier: 2 },
  { id: 'modeltown', name: 'Model Town', lat: 28.7150, lng: 77.1920, description: 'Parks, markets, and the quiet North Delhi flex.', vibeQuery: 'Iktara Kavita Seth', tier: 2 },
  { id: 'gtbroad', name: 'GT Road Area', lat: 28.6900, lng: 77.2460, description: 'The arterial stretch. Everything and everyone passes through here.', vibeQuery: 'We Rollin Shubh', tier: 3 },
  { id: 'pitampura', name: 'Pitampura', lat: 28.6970, lng: 77.1340, description: 'Netaji Subhash Place metro fame. Malls and coaching centres.', vibeQuery: 'Tu Aake Dekhle King', tier: 2 },
  { id: 'rohini', name: 'Rohini', lat: 28.7380, lng: 77.1020, description: 'Sectors 1 through 50. Adventure Studio fame.', vibeQuery: 'Apna Bana Le Arijit Singh', tier: 1 },
  { id: 'shalimarbagh', name: 'Shalimar Bagh', lat: 28.7170, lng: 77.1560, description: 'Ring Road adjacent calm vibes.', vibeQuery: 'Kasoor Prateek Kuhad', tier: 2 },
  { id: 'ashokvihar', name: 'Ashok Vihar', lat: 28.6900, lng: 77.1660, description: 'Phase 1-4, market streets, and quiet afternoons.', vibeQuery: 'Kho Gaye Hum Kahan', tier: 3 },
  { id: 'ranibagh', name: 'Rani Bagh', lat: 28.6850, lng: 77.1350, description: 'Bustling market and heavy traffic.', vibeQuery: 'Brown Munde AP Dhillon', tier: 3 },
  { id: 'roshannagar', name: 'Roshan Nagar', lat: 28.6738, lng: 77.1953, description: 'Classic old Delhi vibes near the gardens.', vibeQuery: 'Safar Arijit Singh', tier: 3 },

  // South-East / NCR
  { id: 'noida', name: 'Noida', lat: 28.5355, lng: 77.3910, description: 'Technically UP, but thinks its the future. IT parks and Fortuners.', vibeQuery: 'Naezy Aafat', tier: 1 },
  { id: 'noida18', name: 'Noida Sector 18', lat: 28.5708, lng: 77.3228, description: 'Atta Market chaos meeting DLF Mall of India.', vibeQuery: 'Blinding Lights The Weeknd', tier: 2 },
  { id: 'noidaext', name: 'Noida Extension', lat: 28.6015, lng: 77.4435, description: 'Skyscrapers in the middle of nowhere.', vibeQuery: 'Middle of the Night Elley Duhé', tier: 3 },
  { id: 'gurgaon', name: 'Gurgaon', lat: 28.4595, lng: 77.0266, description: 'Millennium City. More malls per capita than trees.', vibeQuery: 'Brown Munde AP Dhillon', tier: 1 },
  { id: 'cyberhub', name: 'Cyber Hub Gurgaon', lat: 28.4950, lng: 77.0890, description: 'Corporate lunches and after-work drinks.', vibeQuery: 'Starboy The Weeknd', tier: 2 },
  { id: 'udyogvihar', name: 'Udyog Vihar', lat: 28.5020, lng: 77.0850, description: 'Corporate offices and traffic jams.', vibeQuery: 'Industry Baby Lil Nas X', tier: 3 },
  { id: 'faridabad', name: 'Faridabad', lat: 28.4089, lng: 77.3178, description: 'Industrial vibes trying to go residential. Crown Mall is the landmark.', vibeQuery: 'Haryanvi Mashup', tier: 1 },
  { id: 'ghaziabad', name: 'Ghaziabad', lat: 28.6692, lng: 77.4538, description: 'Gateway to UP. The real chaos begins here.', vibeQuery: 'Still Rollin Shubh', tier: 1 },
];
