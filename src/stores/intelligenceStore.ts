import { create } from 'zustand';
import { useWeatherStore } from '@/stores/weatherStore';
import { AREA_PROFILES, AreaProfile } from '@/data/areaProfiles';
import { MARKET_DATA } from '@/data/marketData';

/**
 * The unified Urban Intelligence output for a specific area at THIS exact moment in time.
 */
export interface RealTimeContext {
  areaId: string;
  personality: string;
  costLevel: 1 | 2 | 3;
  predictedCrowd: number; // 0.0 to 1.0 based on current time
  predictedSafety: number; // 0.0 to 1.0 based on current time
  isCurrentlyActive: boolean;
  liveInsight: string;     // The 'If You Go Here' context
  advisoryLevel: 'optimal' | 'moderate' | 'avoid'; // Derived visual feedback
  matchScore?: number; // Used for Intent Engine sorting
}

interface IntelligenceStore {
  // Purpose-Based Exploration (Feature 3)
  activeIntent: string | null;
  setIntent: (intent: string | null) => void;
  
  // Real-time Advisory / Pulse (Feature 6 & 8)
  getRealTimeContext: (areaId: string) => RealTimeContext | null;
  
  // Engine Query
  queryTopMatchesForIntent: (intent: string) => RealTimeContext[];
  
  // Highlighting State
  highlightedAreaIds: string[];
  setHighlightedAreas: (ids: string[]) => void;
}

export const useIntelligenceStore = create<IntelligenceStore>((set, get) => ({
  activeIntent: null,
  setIntent: (intent) => set({ activeIntent: intent }),
  highlightedAreaIds: [],
  setHighlightedAreas: (ids) => set({ highlightedAreaIds: ids }),

  getRealTimeContext: (areaId: string) => {
    let profile = AREA_PROFILES.find(p => p.areaId === areaId);

    // Dynamic Fallback Profile for unmapped markets
    if (!profile) {
      const market = MARKET_DATA.find(m => m.id === areaId);
      if (!market) return null;
      
      const isFood = market.category_id === 'food';
      const isWholesale = market.category_id === 'wholesale' || market.category_id === 'industrial';
      
      profile = {
        areaId: market.id,
        type: 'market',
        personality: 'Bustling Commercial Zone',
        costLevel: 2,
        intentTags: [market.category_id],
        behavior: {
          morning: { crowdLevel: isFood || isWholesale ? 0.8 : 0.3, safetyScore: 0.8, isActive: true, insight: 'Early trading hours.' },
          afternoon: { crowdLevel: 0.8, safetyScore: 0.7, isActive: true, insight: 'Peak retail and commercial activity.' },
          evening: { crowdLevel: 0.9, safetyScore: 0.6, isActive: true, insight: 'High footfall. Exercise standard caution.' },
          night: { crowdLevel: 0.1, safetyScore: 0.4, isActive: false, insight: 'Market closed. Activity drops significantly.' }
        }
      } as AreaProfile;
    }

    // We fetch the current time simulated by the existing WeatherStore
    // To avoid React hook call inside a normal function, we access zustand state directly
    const timeOfDay = useWeatherStore.getState().timeOfDay; 
    const phase = profile.behavior[timeOfDay];

    // Determine algorithmic advisory level based on Crowd and Safety thresholds
    let advisory: 'optimal' | 'moderate' | 'avoid' = 'moderate';
    
    if (!phase.isActive || phase.safetyScore <= 0.4 || phase.crowdLevel >= 0.95) {
      advisory = 'avoid'; // Unsafe, closed, or crushingly crowded
    } else if (phase.safetyScore >= 0.8 && phase.crowdLevel <= 0.6) {
      advisory = 'optimal'; // Safe and manageable crowds
    }

    return {
      areaId: profile.areaId,
      personality: profile.personality,
      costLevel: profile.costLevel,
      predictedCrowd: phase.crowdLevel,
      predictedSafety: phase.safetyScore,
      isCurrentlyActive: phase.isActive,
      liveInsight: phase.insight,
      advisoryLevel: advisory,
    };
  },

  queryTopMatchesForIntent: (intent: string) => {
    const allContexts: RealTimeContext[] = [];
    const timeOfDay = useWeatherStore.getState().timeOfDay;

    AREA_PROFILES.forEach(profile => {
      // 1. Check if the intent matches the profile tags
      const isMatch = profile.intentTags.some(tag => 
        tag.toLowerCase() === intent.toLowerCase()
      );

      if (isMatch) {
        const phase = profile.behavior[timeOfDay];
        
        // 2. Score the match. 
        // A good match is active, safe, and ideally not crushingly crowded.
        let score = 50; // Base match
        if (phase.isActive) score += 30; // Highly penalize closed areas
        score += (phase.safetyScore * 20); // Bonus for safety
        score -= (phase.crowdLevel * 10); // Penalty for extreme crowds
        
        const context = get().getRealTimeContext(profile.areaId);
        if (context) {
          allContexts.push({
            ...context,
            matchScore: score
          });
        }
      }
    });

    // Sort by highest score first, return top 3
    return allContexts.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0)).slice(0, 3);
  }
}));
