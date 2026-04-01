/**
 * Urban Intelligence Engine: Area Behavior & Personality Profiles
 * This data powers the dynamic "Intent Engine", predictive crowd states,
 * and time-based insights without querying heavy external AI APIs on every render.
 */

export type TimePhase = 'morning' | 'afternoon' | 'evening' | 'night';

export interface TimeBehavior {
  crowdLevel: number; // 0.0 (empty) to 1.0 (packed)
  safetyScore: number; // 0.0 (unsafe) to 1.0 (secure)
  isActive: boolean; // Is the market/area actually open and functioning?
  insight: string; // "Setup phase. Quiet." or "Chaotic peak hours."
}

export interface AreaProfile {
  areaId: string; // Maps to MarketDataItem.id or Hotspot.id
  type: 'market' | 'hotspot';
  
  // Feature 5: Area Personality Engine
  personality: string; 
  
  // Feature 9: Cost & Affordability Layer
  costLevel: 1 | 2 | 3; // 1 = Budget/Cheap, 2 = Moderate, 3 = Premium
  
  // Feature 3: Purpose-Based Exploration System (Intent Engine)
  intentTags: string[]; 
  
  // Feature 1: Time-Based Area Intelligence
  behavior: Record<TimePhase, TimeBehavior>;
  
  // Feature 7: Advanced Market Intelligence
  advancedIntel?: {
    bestEntryPoints: string[];
    peakHoursText: string;
    shoppingStrategy: string;
  };
}

export const AREA_PROFILES: AreaProfile[] = [
  // ── CLOTHING & FASHION ──
  {
    areaId: 'sarojini',
    type: 'market',
    personality: 'Chaotic Bargain Zone',
    costLevel: 1,
    intentTags: ['cheap shopping', 'street fashion', 'bargain hunting', 'student hub'],
    behavior: {
      morning: { crowdLevel: 0.3, safetyScore: 0.9, isActive: true, insight: 'Shops opening. Best time for peaceful, uncrowded shopping.' },
      afternoon: { crowdLevel: 0.9, safetyScore: 0.7, isActive: true, insight: 'Absolute chaos. Hard to walk, but peak inventory on display.' },
      evening: { crowdLevel: 1.0, safetyScore: 0.6, isActive: true, insight: 'Extreme crowds. Be mindful of belongings. Incredible energy.' },
      night: { crowdLevel: 0.1, safetyScore: 0.4, isActive: false, insight: 'Market closed. Area dead and unlit. Avoid.' }
    },
    advancedIntel: {
      bestEntryPoints: ['Gate 3 (Metro Side)', 'Babu Market Alley'],
      peakHoursText: '3:00 PM - 8:00 PM',
      shoppingStrategy: 'Never accept the first price. Quote 30% of their asking price and walk away to test them.'
    }
  },
  {
    areaId: 'lajpat',
    type: 'market',
    personality: 'Ethnic Fashion Hub',
    costLevel: 2,
    intentTags: ['ethnic wear', 'bridal', 'home decor', 'street food'],
    behavior: {
      morning: { crowdLevel: 0.4, safetyScore: 0.9, isActive: true, insight: 'Pleasant morning shopping. Fresh Mehndi artists setting up.' },
      afternoon: { crowdLevel: 0.8, safetyScore: 0.8, isActive: true, insight: 'Crowded with families. Good time to browse fabrics.' },
      evening: { crowdLevel: 1.0, safetyScore: 0.7, isActive: true, insight: 'Extreme peak. Heavy traffic outside. Street food lines are massive.' },
      night: { crowdLevel: 0.2, safetyScore: 0.6, isActive: false, insight: 'Market winds down by 9:30 PM. Eateries stay open.' }
    },
    advancedIntel: {
      bestEntryPoints: ['Pushpa Central Market Entry', 'Metro Gate 2'],
      peakHoursText: '4:00 PM - 8:30 PM',
      shoppingStrategy: 'For fabrics, skip the main road showrooms and dive into the narrow lanes parallel to the main strip.'
    }
  },
  {
    areaId: 'chandni_chowk_clothing',
    type: 'market',
    personality: 'Historic Bridal Maze',
    costLevel: 2,
    intentTags: ['bridal', 'lehengas', 'fabrics', 'cultural'],
    behavior: {
      morning: { crowdLevel: 0.5, safetyScore: 0.8, isActive: true, insight: 'Historic lanes waking up. Less chaotic, but wholesale starts early.' },
      afternoon: { crowdLevel: 1.0, safetyScore: 0.6, isActive: true, insight: 'Visceral crowd. Moving shoulder-to-shoulder in the Katras.' },
      evening: { crowdLevel: 0.8, safetyScore: 0.6, isActive: true, insight: 'Retail closing down, majestic lighting on the main heritage stretch.' },
      night: { crowdLevel: 0.1, safetyScore: 0.4, isActive: false, insight: 'Shut down. Deserted and poorly lit in the inner lanes.' }
    },
    advancedIntel: {
      bestEntryPoints: ['Town Hall Side', 'Katra Neel Entrance'],
      peakHoursText: '12:00 PM - 6:00 PM',
      shoppingStrategy: 'Ignore the touts explicitly matching you to shops. Head straight to established Katras (courtyards) for real wholesale prices.'
    }
  },
  {
    areaId: 'gandhi_nagar',
    type: 'market',
    personality: 'Wholesale Textile Giant',
    costLevel: 1,
    intentTags: ['wholesale goods', 'readymade garments', 'bulk'],
    behavior: {
      morning: { crowdLevel: 0.7, safetyScore: 0.7, isActive: true, insight: 'Traders arriving. Massive bundles of clothes being transported.' },
      afternoon: { crowdLevel: 1.0, safetyScore: 0.6, isActive: true, insight: 'Absolute gridlock. Porters, extreme noise, and commercial hustle.' },
      evening: { crowdLevel: 0.6, safetyScore: 0.5, isActive: true, insight: 'Transport dispatch phase. Dust and heavy traffic.' },
      night: { crowdLevel: 0.0, safetyScore: 0.3, isActive: false, insight: 'Strictly avoid.' }
    },
    advancedIntel: {
      bestEntryPoints: ['Subhash Road End'],
      peakHoursText: '11:00 AM - 5:00 PM',
      shoppingStrategy: 'This is not a retail market. Minimum order quantities apply. Stick to main lanes to avoid getting lost.'
    }
  },
  {
    areaId: 'janpath',
    type: 'market',
    personality: 'Tourist Fashion Strip',
    costLevel: 1,
    intentTags: ['cheap shopping', 'street fashion', 'jewelry', 'tourist'],
    behavior: {
      morning: { crowdLevel: 0.2, safetyScore: 0.9, isActive: true, insight: 'Quiet. Best time for undisturbed browsing of Tibetan artifacts.' },
      afternoon: { crowdLevel: 0.7, safetyScore: 0.8, isActive: true, insight: 'Tourists and student crowd. Active bargaining happening.' },
      evening: { crowdLevel: 0.9, safetyScore: 0.8, isActive: true, insight: 'Peak energy. The lane is lit up, cafes nearby are full.' },
      night: { crowdLevel: 0.3, safetyScore: 0.8, isActive: false, insight: 'Shops close promptly by 9 PM. Safe to walk.' }
    },
    advancedIntel: {
      bestEntryPoints: ['CP Radial Road 1 Intersection'],
      peakHoursText: '4:00 PM - 8:00 PM',
      shoppingStrategy: 'Prices quoted to tourists are 3-4x the actual value. Be ruthless in bargaining for street clothes.'
    }
  },
  {
    areaId: 'kamla_nagar',
    type: 'market',
    personality: 'Campus Streetwear Hub',
    costLevel: 1,
    intentTags: ['student hub', 'street fashion', 'cheap shopping', 'cafes'],
    behavior: {
      morning: { crowdLevel: 0.3, safetyScore: 0.9, isActive: true, insight: 'Students attending classes. Relaxed shopping.' },
      afternoon: { crowdLevel: 0.8, safetyScore: 0.8, isActive: true, insight: 'Post-college crowd. Very lively, bustling with youth.' },
      evening: { crowdLevel: 0.9, safetyScore: 0.8, isActive: true, insight: 'Peak crowds at Spark Mall circle and momo stalls.' },
      night: { crowdLevel: 0.2, safetyScore: 0.7, isActive: false, insight: 'Market closed, student eateries active.' }
    },
    advancedIntel: {
      bestEntryPoints: ['Bungalow Road', 'Spark Mall Roundabout'],
      peakHoursText: '3:00 PM - 7:30 PM',
      shoppingStrategy: 'Most street apparel has fixed price tags (unlike Sarojini), but you can haggle if buying multiple pieces.'
    }
  },
  {
    areaId: 'palika_bazaar',
    type: 'market',
    personality: 'Underground Tech & Apparel',
    costLevel: 1,
    intentTags: ['electronics', 'cheap shopping', 'piracy', 'hidden gem'],
    behavior: {
      morning: { crowdLevel: 0.2, safetyScore: 0.8, isActive: false, insight: 'Underground complex opens late (11 AM).' },
      afternoon: { crowdLevel: 0.7, safetyScore: 0.7, isActive: true, insight: 'Air-conditioned relief. Crowded corridors, aggressive sales touts.' },
      evening: { crowdLevel: 0.8, safetyScore: 0.6, isActive: true, insight: 'Peak hours. The claustrophobic layout makes it feel intensely crowded.' },
      night: { crowdLevel: 0.0, safetyScore: 0.7, isActive: false, insight: 'Locked down.' }
    },
    advancedIntel: {
      bestEntryPoints: ['Gate 1 (Near F Block CP)'],
      peakHoursText: '2:00 PM - 7:00 PM',
      shoppingStrategy: 'Know exactly what you want. Do not let touts drag you into corner shops. Test electronics before paying.'
    }
  },

  // ── JEWELRY & PRECIOUS ──
  {
    areaId: 'dariba_kalan',
    type: 'market',
    personality: 'Silver & Heritage Lane',
    costLevel: 2,
    intentTags: ['jewelry', 'cultural', 'specialty'],
    behavior: {
      morning: { crowdLevel: 0.4, safetyScore: 0.8, isActive: true, insight: 'Pleasant time to view intricate silverwork and smell fresh ittar.' },
      afternoon: { crowdLevel: 0.8, safetyScore: 0.7, isActive: true, insight: 'Narrow lane gets congested with tourists and buyers.' },
      evening: { crowdLevel: 0.9, safetyScore: 0.7, isActive: true, insight: 'Beautifully glowing windows, very crowded walking.' },
      night: { crowdLevel: 0.0, safetyScore: 0.5, isActive: false, insight: 'Shops closed and secured.' }
    },
    advancedIntel: {
      bestEntryPoints: ['From Chandni Chowk Main Road'],
      peakHoursText: '1:00 PM - 6:00 PM',
      shoppingStrategy: 'Silver prices are generally standardized by weight, but making charges are highly negotiable.'
    }
  },
  {
    areaId: 'karol_bagh_jewelry',
    type: 'market',
    personality: 'Bridal Gold Strip',
    costLevel: 3,
    intentTags: ['jewelry', 'bridal', 'luxury'],
    behavior: {
      morning: { crowdLevel: 0.3, safetyScore: 0.9, isActive: true, insight: 'Showrooms open slowly. Valets cleaning.' },
      afternoon: { crowdLevel: 0.6, safetyScore: 0.9, isActive: true, insight: 'Families conducting heavy bridal purchases indoors.' },
      evening: { crowdLevel: 0.8, safetyScore: 0.8, isActive: true, insight: 'Very active. Traffic on Bank Street is usually stalled.' },
      night: { crowdLevel: 0.1, safetyScore: 0.8, isActive: false, insight: 'Closed and heavily, heavily guarded.' }
    },
    advancedIntel: {
      bestEntryPoints: ['Bank Street Entrance'],
      peakHoursText: '4:00 PM - 8:00 PM',
      shoppingStrategy: 'Compare making charges across 3-4 major multi-story showrooms before committing.'
    }
  },
  {
    areaId: 'south_ext',
    type: 'market',
    personality: 'Premium Retail Block',
    costLevel: 3,
    intentTags: ['luxury', 'jewelry', 'bridal', 'safe shopping'],
    behavior: {
      morning: { crowdLevel: 0.2, safetyScore: 0.95, isActive: false, insight: 'Most premium showrooms do not open until 11 AM.' },
      afternoon: { crowdLevel: 0.5, safetyScore: 0.95, isActive: true, insight: 'Comfortable, air-conditioned boutique hopping. Valet parking active.' },
      evening: { crowdLevel: 0.8, safetyScore: 0.9, isActive: true, insight: 'High society traffic. Brightly lit, very safe, busy restaurants.' },
      night: { crowdLevel: 0.2, safetyScore: 0.8, isActive: false, insight: 'Showrooms closed, but main road remains well-lit and secure.' }
    },
    advancedIntel: {
      bestEntryPoints: ['Part 2 Main Road', 'Part 1 Inner Block'],
      peakHoursText: '5:00 PM - 8:30 PM',
      shoppingStrategy: 'Use the underground pedestrian subway to cross safely between Part 1 and Part 2.'
    }
  },

  // ── ELECTRONICS & TECH ──
  {
    areaId: 'nehru_place',
    type: 'market',
    personality: 'IT & Hustle Hub',
    costLevel: 2,
    intentTags: ['electronics', 'repair', 'wholesale goods', 'tech'],
    behavior: {
      morning: { crowdLevel: 0.4, safetyScore: 0.8, isActive: true, insight: 'Offices opening. Good time for fast repairs before the rush.' },
      afternoon: { crowdLevel: 0.9, safetyScore: 0.8, isActive: true, insight: 'Intense corporate and retail crowd. Loud shouting and haggling.' },
      evening: { crowdLevel: 0.6, safetyScore: 0.7, isActive: true, insight: 'Winding down. Street food vendors extremely active.' },
      night: { crowdLevel: 0.1, safetyScore: 0.5, isActive: false, insight: 'Plaza is mostly abandoned. Limited security.' }
    },
    advancedIntel: {
      bestEntryPoints: ['Main Plaza Steps', 'Paras Cinema Side'],
      peakHoursText: '1:00 PM - 5:00 PM',
      shoppingStrategy: 'Avoid street hawkers selling "cheap" pen drives. Go to authorized basement stores for real parts.'
    }
  },
  {
    areaId: 'gaffar',
    type: 'market',
    personality: 'Tech Grey Market',
    costLevel: 1,
    intentTags: ['electronics', 'repair', 'bargain hunting'],
    behavior: {
      morning: { crowdLevel: 0.3, safetyScore: 0.8, isActive: true, insight: 'Quiet. Best time for complex phone logic-board repairs.' },
      afternoon: { crowdLevel: 0.9, safetyScore: 0.7, isActive: true, insight: 'Packed tightly. Extremely chaotic alleyways.' },
      evening: { crowdLevel: 0.9, safetyScore: 0.6, isActive: true, insight: 'Peak retail. Be warned of pickpockets in the dense crowds.' },
      night: { crowdLevel: 0.0, safetyScore: 0.5, isActive: false, insight: 'Closed.' }
    },
    advancedIntel: {
      bestEntryPoints: ['Arya Samaj Road Entry'],
      peakHoursText: '2:00 PM - 8:00 PM',
      shoppingStrategy: 'Never buy loose imported screens without testing them on the spot. Bargain aggressively.'
    }
  },
  {
    areaId: 'bhagirath_palace',
    type: 'market',
    personality: 'Electrical Wholesale Maze',
    costLevel: 2,
    intentTags: ['electronics', 'wholesale goods', 'home decor'],
    behavior: {
      morning: { crowdLevel: 0.6, safetyScore: 0.8, isActive: true, insight: 'Contractors and electricians buying bulk.' },
      afternoon: { crowdLevel: 0.9, safetyScore: 0.7, isActive: true, insight: 'Insanely crowded narrow alleys full of hanging chandeliers.' },
      evening: { crowdLevel: 0.7, safetyScore: 0.6, isActive: true, insight: 'Stunning visual vibe as thousands of lights are turned on.' },
      night: { crowdLevel: 0.0, safetyScore: 0.4, isActive: false, insight: 'Shut down entirely.' }
    },
    advancedIntel: {
      bestEntryPoints: ['Chandni Chowk Main Road Opposite Red Fort'],
      peakHoursText: '1:00 PM - 6:00 PM',
      shoppingStrategy: 'Lights are cheap, but always double check the transformers/drivers they pack in the box before leaving.'
    }
  },

  // ── AUTOMOTIVE ──
  {
    areaId: 'jhandewalan_cycle',
    type: 'market',
    personality: 'Two-Wheeler District',
    costLevel: 1,
    intentTags: ['automotive', 'wholesale goods'],
    behavior: {
      morning: { crowdLevel: 0.4, safetyScore: 0.8, isActive: true, insight: 'Calm. Good for testing bicycles on the road.' },
      afternoon: { crowdLevel: 0.8, safetyScore: 0.7, isActive: true, insight: 'Busy wholesale loading. Moderate retail crowd.' },
      evening: { crowdLevel: 0.5, safetyScore: 0.7, isActive: true, insight: 'Winding down for the day.' },
      night: { crowdLevel: 0.0, safetyScore: 0.5, isActive: false, insight: 'Closed.' }
    },
    advancedIntel: {
      bestEntryPoints: ['Videocon Tower Side'],
      peakHoursText: '12:00 PM - 5:00 PM',
      shoppingStrategy: 'Walk deep into the market. Shops on the primary entrance charge higher retail margins.'
    }
  },
  {
    areaId: 'mayapuri',
    type: 'market',
    personality: 'Heavy Salvage & Scrap',
    costLevel: 1,
    intentTags: ['automotive', 'industrial', 'repair'],
    behavior: {
      morning: { crowdLevel: 0.6, safetyScore: 0.6, isActive: true, insight: 'Heavy machinery tearing down vehicles. Dust and grease.' },
      afternoon: { crowdLevel: 0.8, safetyScore: 0.6, isActive: true, insight: 'Intense industrial activity. Loud cutting noises.' },
      evening: { crowdLevel: 0.4, safetyScore: 0.5, isActive: true, insight: 'Workers departing. Area becomes desolate.' },
      night: { crowdLevel: 0.0, safetyScore: 0.3, isActive: false, insight: 'Strictly avoid at night.' }
    },
    advancedIntel: {
      bestEntryPoints: ['Phase 2 Main Road'],
      peakHoursText: '10:00 AM - 4:00 PM',
      shoppingStrategy: 'Bring a mechanic. Do not buy scrap engines without visual inspection of the cylinder blocks.'
    }
  },

  // ── FURNITURE ──
  {
    areaId: 'kirti_nagar',
    type: 'market',
    personality: 'Industrial Retail Sprawl',
    costLevel: 2,
    intentTags: ['furniture', 'home decor', 'wholesale goods'],
    behavior: {
      morning: { crowdLevel: 0.3, safetyScore: 0.8, isActive: true, insight: 'Workshops firing up. Good time to browse large furniture without rush.' },
      afternoon: { crowdLevel: 0.7, safetyScore: 0.8, isActive: true, insight: 'Families shopping. Heavy tempo (truck) traffic on narrow roads.' },
      evening: { crowdLevel: 0.6, safetyScore: 0.7, isActive: true, insight: 'Dusty and congested as workshops close down.' },
      night: { crowdLevel: 0.0, safetyScore: 0.4, isActive: false, insight: 'Industrial area at night. Not recommended for roaming.' }
    },
    advancedIntel: {
      bestEntryPoints: ['Main Ring Road Entry', 'Block A'],
      peakHoursText: '12:00 PM - 5:00 PM',
      shoppingStrategy: 'The showrooms on the main road are 3x the price. Go deep into Block A and Block B for the actual carpenters.'
    }
  },
  {
    areaId: 'jail_road',
    type: 'market',
    personality: 'Linear Furniture Stretch',
    costLevel: 1,
    intentTags: ['furniture', 'home decor', 'affordable'],
    behavior: {
      morning: { crowdLevel: 0.3, safetyScore: 0.9, isActive: true, insight: 'Quiet browsing, easy parking.' },
      afternoon: { crowdLevel: 0.6, safetyScore: 0.8, isActive: true, insight: 'Moderate traffic. Families negotiating prices.' },
      evening: { crowdLevel: 0.8, safetyScore: 0.8, isActive: true, insight: 'Traffic jams along the main stretch. Busy sales.' },
      night: { crowdLevel: 0.2, safetyScore: 0.7, isActive: false, insight: 'Closed.' }
    },
    advancedIntel: {
      bestEntryPoints: ['Fateh Nagar Red Light Phase'],
      peakHoursText: '4:00 PM - 8:00 PM',
      shoppingStrategy: 'Check the wood grain carefully; many budget shops use engineered wood disguised as solid teak.'
    }
  },

  // ── FOOD & GROCERY ──
  {
    areaId: 'khari_baoli',
    type: 'market',
    personality: 'Sensory Overload',
    costLevel: 1,
    intentTags: ['wholesale goods', 'spices', 'photography', 'food exploration'],
    behavior: {
      morning: { crowdLevel: 0.8, safetyScore: 0.7, isActive: true, insight: 'Heavy manual labor, unloads arriving. Beautiful morning light for photos.' },
      afternoon: { crowdLevel: 1.0, safetyScore: 0.6, isActive: true, insight: 'Visceral crowd. The air is thick with spice dust. Mask recommended.' },
      evening: { crowdLevel: 0.5, safetyScore: 0.5, isActive: true, insight: 'Wholesale winding down, heavy traffic and carts leaving.' },
      night: { crowdLevel: 0.0, safetyScore: 0.3, isActive: false, insight: 'Closed. Dark narrow alleys, strictly avoid.' }
    },
    advancedIntel: {
      bestEntryPoints: ['Fatehpuri Masjid Side'],
      peakHoursText: '11:00 AM - 4:00 PM',
      shoppingStrategy: 'Buy nuts in bulk from the inner courtyards (Katras) rather than the main road edge for wholesale rates.'
    }
  },
  {
    areaId: 'ina_market',
    type: 'market',
    personality: 'Global Gourmet Hub',
    costLevel: 2,
    intentTags: ['food exploration', 'specialty', 'seafood'],
    behavior: {
      morning: { crowdLevel: 0.5, safetyScore: 0.8, isActive: true, insight: 'Fresh seafood and meats arriving. Best quality selection available now.' },
      afternoon: { crowdLevel: 0.8, safetyScore: 0.8, isActive: true, insight: 'Crowded with expats and chefs buying imported ingredients.' },
      evening: { crowdLevel: 0.9, safetyScore: 0.8, isActive: true, insight: 'Extremely busy. Great street food stalls open outside.' },
      night: { crowdLevel: 0.2, safetyScore: 0.7, isActive: false, insight: 'Market closed, but Metro surroundings remain safe.' }
    },
    advancedIntel: {
      bestEntryPoints: ['Dilli Haat Metro Exit'],
      peakHoursText: '12:00 PM - 6:00 PM',
      shoppingStrategy: 'Negotiate strongly on imported chocolates and cheeses. Check expiry dates meticulously.'
    }
  },

  // ── SPECIALTY & CULTURAL ──
  {
    areaId: 'majnu_ka_tilla',
    type: 'market',
    personality: 'Cultural Enclave',
    costLevel: 2,
    intentTags: ['food exploration', 'date spot', 'hidden gem', 'peaceful place', 'street fashion'],
    behavior: {
      morning: { crowdLevel: 0.2, safetyScore: 0.9, isActive: true, insight: 'Monks charting, quiet cafes opening. Extremely peaceful.' },
      afternoon: { crowdLevel: 0.6, safetyScore: 0.9, isActive: true, insight: 'Students and tourists arriving. Cafes getting full.' },
      evening: { crowdLevel: 0.9, safetyScore: 0.8, isActive: true, insight: 'Peak vibe. Narrow alleys packed with Gen-Z crowds and food aromas.' },
      night: { crowdLevel: 0.4, safetyScore: 0.7, isActive: true, insight: 'Late night Laphing stalls active. Safe within the colony bounds.' }
    },
    advancedIntel: {
      bestEntryPoints: ['Main Pedestrian Footbridge from Ring Road'],
      peakHoursText: '6:00 PM - 9:00 PM',
      shoppingStrategy: 'Explore the narrowest back-alleys for authentic Korean/Tibetan fashion imports without the main-lane markup.'
    }
  },
  {
    areaId: 'paharganj',
    type: 'market',
    personality: 'Bohemian Backpacker Strip',
    costLevel: 1,
    intentTags: ['cheap shopping', 'tourist', 'cultural', 'nightlife cluster'],
    behavior: {
      morning: { crowdLevel: 0.4, safetyScore: 0.7, isActive: true, insight: 'Backpackers waking up. Chole bhature stalls active.' },
      afternoon: { crowdLevel: 0.7, safetyScore: 0.7, isActive: true, insight: 'Busy, noisy, auto-rickshaw chaos.' },
      evening: { crowdLevel: 0.9, safetyScore: 0.6, isActive: true, insight: 'Neon lights, chaotic energy. Leather and silver shops thriving.' },
      night: { crowdLevel: 0.7, safetyScore: 0.5, isActive: true, insight: 'Rooftop cafes open late. Exercise caution in side alleys.' }
    },
    advancedIntel: {
      bestEntryPoints: ['New Delhi Railway Station Side'],
      peakHoursText: '5:00 PM - 10:00 PM',
      shoppingStrategy: 'Excellent for genuine leather and pure silver jewelry if you bargain hard. Beware of touts offering "cheap hotels".'
    }
  },

  // ── WHOLESALE / INDUSTRIAL ──
  {
    areaId: 'sadar_bazaar',
    type: 'market',
    personality: 'The Wholesale Behemoth',
    costLevel: 1,
    intentTags: ['wholesale goods', 'bulk', 'cheap shopping'],
    behavior: {
      morning: { crowdLevel: 0.8, safetyScore: 0.6, isActive: true, insight: 'Maximum hustle. Massive shipments being unloaded.' },
      afternoon: { crowdLevel: 1.0, safetyScore: 0.5, isActive: true, insight: 'Crush density. Impossible to bring a car inside. Guard pockets.' },
      evening: { crowdLevel: 0.7, safetyScore: 0.5, isActive: true, insight: 'Transport gridlock as goods leave for other states.' },
      night: { crowdLevel: 0.0, safetyScore: 0.3, isActive: false, insight: 'Completely closed down.' }
    },
    advancedIntel: {
      bestEntryPoints: ['Qutub Road Side'],
      peakHoursText: '10:00 AM - 4:00 PM',
      shoppingStrategy: 'Do not go for single items. Retailers hate it. Group your purchases into dozens for actual wholesale rates.'
    }
  },

  // ── SOURCED HOTSPOTS ──
  {
    areaId: 'cp', // Connaught Place
    type: 'hotspot',
    personality: 'Historic Commercial Core',
    costLevel: 2,
    intentTags: ['food exploration', 'shopping', 'date spot', 'nightlife cluster', 'safe shopping'],
    behavior: {
      morning: { crowdLevel: 0.2, safetyScore: 0.9, isActive: true, insight: 'Morning walkers, heritage feel. Quiet breakfast spots open.' },
      afternoon: { crowdLevel: 0.8, safetyScore: 0.9, isActive: true, insight: 'Heavy corporate and retail mix. Inner circle packed.' },
      evening: { crowdLevel: 1.0, safetyScore: 0.9, isActive: true, insight: 'Maximum density. Beautifully lit heritage columns. High energy.' },
      night: { crowdLevel: 0.6, safetyScore: 0.8, isActive: true, insight: 'Bars and clubs pumping in outer circle. High police presence, safe.' }
    }
  },
  {
    areaId: 'hkv', // Hauz Khas Village
    type: 'hotspot',
    personality: 'Nightlife Cluster & Heritage',
    costLevel: 3,
    intentTags: ['nightlife cluster', 'date spot', 'food exploration', 'party', 'hidden gem'],
    behavior: {
      morning: { crowdLevel: 0.1, safetyScore: 0.9, isActive: false, insight: 'Clubs closed. Fort area beautiful and empty for morning walks.' },
      afternoon: { crowdLevel: 0.4, safetyScore: 0.8, isActive: true, insight: 'Boutiques and cafes open. Relaxed, artistic vibe.' },
      evening: { crowdLevel: 0.9, safetyScore: 0.7, isActive: true, insight: 'Massive influx of youth. Traffic jams at the single entry road.' },
      night: { crowdLevel: 1.0, safetyScore: 0.6, isActive: true, insight: 'Intense party central. Very loud, very crowded. Watch your drinks.' }
    }
  }
];
