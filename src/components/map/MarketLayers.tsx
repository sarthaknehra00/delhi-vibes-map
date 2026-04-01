"use client";

import { useMemo } from "react";
import { Source, Layer, LayerProps } from "react-map-gl/mapbox";
import { useMarketStore } from "@/stores/marketStore";
import { useIntelligenceStore } from "@/stores/intelligenceStore";
import { MARKET_CATEGORIES } from "@/data/marketData";

/**
 * MarketLayers — Draws deep, glassmorphic polygons for focused markets.
 * Renders ONLY when a specific market is selected via the MarketPanel.
 */
export function MarketLayers() {
  const { focusedMarket } = useMarketStore();
  const { getRealTimeContext } = useIntelligenceStore();

  const geoJSON = useMemo(() => {
    if (!focusedMarket) {
      return { type: "FeatureCollection" as const, features: [] };
    }

    return {
      type: "FeatureCollection" as const,
      features: [
        {
          type: "Feature",
          properties: {
            id: focusedMarket.id,
            category_id: focusedMarket.category_id,
          },
          geometry: {
            type: "Polygon",
            coordinates: focusedMarket.area_polygon,
          },
        },
      ],
    };
  }, [focusedMarket]);

  // Determine highlight color based on category AND live intelligence advisory
  const activeColor = useMemo(() => {
    if (!focusedMarket) return "#3b82f6";
    
    // Check Intelligence context for "Avoid" or "Optimal" states
    const intel = getRealTimeContext(focusedMarket.id);
    if (intel) {
      if (intel.advisoryLevel === "avoid") return "#ef4444"; // Pulsing Red for danger/heavy crowd
      if (intel.advisoryLevel === "optimal") return "#10b981"; // Emerald for ideal conditions
    }

    // Default to category aesthetic
    const cat = MARKET_CATEGORIES.find((c) => c.id === focusedMarket.category_id);
    return cat?.color || "#3b82f6";
  }, [focusedMarket, getRealTimeContext]);

  if (!focusedMarket) return null;

  // ── Polygon Styling (Glassmorphic glow) ──

  const fillLayer: LayerProps = {
    id: "market-highlight-fill",
    type: "fill",
    source: "market-focus-data",
    paint: {
      "fill-color": activeColor,
      "fill-opacity": 0.15, // Subtle glass fill
    },
  };

  const lineLayer: LayerProps = {
    id: "market-highlight-line",
    type: "line",
    source: "market-focus-data",
    paint: {
      "line-color": activeColor,
      "line-width": ["interpolate", ["linear"], ["zoom"], 12, 1, 16, 4],
      "line-opacity": 0.9,
    },
  };

  const glowLayer: LayerProps = {
    id: "market-highlight-glow",
    type: "line",
    source: "market-focus-data",
    paint: {
      "line-color": activeColor,
      "line-width": ["interpolate", ["linear"], ["zoom"], 12, 6, 16, 20],
      "line-opacity": 0.25,
      "line-blur": 6, // Soft glow around the outline
    },
  };

  return (
    <Source id="market-focus-data" type="geojson" data={geoJSON as any}>
      <Layer {...fillLayer} />
      <Layer {...glowLayer} />
      <Layer {...lineLayer} />
    </Source>
  );
}
