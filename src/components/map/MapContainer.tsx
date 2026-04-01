"use client";

import { useRef, useCallback, useMemo, useState, useEffect } from 'react';
import Map, { MapRef } from 'react-map-gl/mapbox';
import { DeckGL } from '@deck.gl/react';
import { FlyToInterpolator } from '@deck.gl/core';
import { GeoJsonLayer, TextLayer } from '@deck.gl/layers';
import { usePaintStore } from '@/stores/paintStore';
import { useFoodStore } from '@/stores/foodStore';
import { useWeatherStore, TimeOfDay } from '@/stores/weatherStore';
import { useCrimeStore } from '@/stores/crimeStore';
import { CATEGORY_MAP } from '@/data/categories';
import { HOTSPOTS, Hotspot } from '@/data/hotspots';
import { cellToPolygon, getDominantCategory } from '@/lib/gridUtils';
import { CrimeLayers } from './CrimeLayers';
import { MarketLayers } from './MarketLayers';
import { useMarketStore } from '@/stores/marketStore';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const INITIAL_VIEW_STATE = {
  longitude: 77.2090, // Delhi Center
  latitude: 28.6139,
  zoom: 11,
  pitch: 0,
  bearing: 0
};

// Zoom thresholds per tier
const TIER_ZOOM_MIN: Record<number, number> = {
  1: 9.5,   // Major landmarks — always visible
  2: 11,    // Notable neighborhoods
  3: 12.5,  // Local / niche areas
};

// Font sizes per tier (creates visual hierarchy)
const TIER_FONT_SIZE: Record<number, number> = {
  1: 13,
  2: 11.5,
  3: 10,
};

/** Returns whether a map style is "dark" based on timeOfDay */
function isDarkTheme(time: TimeOfDay) {
  return time === 'evening' || time === 'night';
}

export function MapContainer() {
  const mapRef = useRef<MapRef>(null);
  const { cells, version, drawMode, activeTool, isDrawing, startDrawing, stopDrawing, paintAt, eraseAt } = usePaintStore();
  const { setSelectedHotspot } = useFoodStore();
  const { timeOfDay } = useWeatherStore();
  const { viewMode: crimeViewMode } = useCrimeStore();
  const flyToTrigger = useMarketStore(s => s.flyToTrigger);
  const [viewState, setViewState] = useState<any>(INITIAL_VIEW_STATE);

  const getMapStyle = (time: TimeOfDay) => {
    switch(time) {
      case 'morning':
      case 'afternoon': return 'mapbox://styles/mapbox/light-v11';
      case 'evening': return 'mapbox://styles/mapbox/navigation-night-v1';
      case 'night': return 'mapbox://styles/mapbox/dark-v11';
      default: return 'mapbox://styles/mapbox/dark-v11';
    }
  };

  // Filter hotspots based on current zoom level
  const visibleHotspots = useMemo(() => {
    return HOTSPOTS.filter((h) => viewState.zoom >= TIER_ZOOM_MIN[h.tier]);
  }, [viewState.zoom]);

  const dark = isDarkTheme(timeOfDay);

  // Convert cells map to GeoJSON for Deck.gl
  const geoJsonData = useMemo(() => {
    // Highly translucent map opacity as requested by the user
    const baseOpacity = (timeOfDay === 'morning' || timeOfDay === 'afternoon') ? 0.18 : 0.10;
    
    // We add 'version' as a dependency to force re-render when cells map is updated
    const features: any[] = [];
    cells.forEach((cell, key) => {
      const dominant = getDominantCategory(cell.votes);
      if (!dominant) return;
      features.push({
        type: 'Feature',
        properties: {
          category: dominant,
          opacity: baseOpacity, // Context-aware opacity
        },
        geometry: {
          type: 'Polygon',
          coordinates: [cellToPolygon(cell.row, cell.col)],
        },
      });
    });
    return { type: 'FeatureCollection', features };
  }, [cells, version, timeOfDay]);

  const deckLayers = [
    new GeoJsonLayer({
      id: 'paint-cells-layer',
      data: geoJsonData as any,
      pickable: true,
      stroked: false, // User explicitly requested to remove the "squares" blocking the view
      filled: true,
      getFillColor: (d: any) => {
        const cat = CATEGORY_MAP[d.properties.category as keyof typeof CATEGORY_MAP];
        const hex = cat ? cat.color.replace('#', '') : '888888';
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return [r, g, b, Math.floor(d.properties.opacity * 255)];
      },
    }),

    // ── Modern label layer ──────────────────────────────────────
    new TextLayer({
      id: 'hotspots-layer',
      data: visibleHotspots,
      pickable: true,
      getPosition: (d: Hotspot) => [d.lng, d.lat],
      getText: (d: Hotspot) => d.name,
      getSize: (d: Hotspot) => TIER_FONT_SIZE[d.tier],
      getAngle: 0,
      getTextAnchor: 'middle' as const,
      getAlignmentBaseline: 'center' as const,

      // Adaptive text color: dark charcoal on light maps, soft white on dark maps
      getColor: dark ? [240, 240, 245, 230] : [30, 30, 40, 210],

      // Subtle frosted-glass background instead of solid black
      background: true,
      getBackgroundColor: dark
        ? [20, 20, 30, 120]     // very subtle dark frosted pill
        : [255, 255, 255, 140], // soft white frosted pill
      backgroundPadding: [8, 4],

      fontWeight: '500',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',

      // Tier-based opacity: major labels are bolder, local ones are subtler
      getPixelOffset: [0, 0],

      // Transitions for smooth appearance
      transitions: {
        getSize: 300,
        getColor: 300,
      },

      // Re-create when zoom or theme changes
      updateTriggers: {
        getSize: [viewState.zoom],
        getColor: [dark],
        getBackgroundColor: [dark],
      },
    }),
  ];

  const handleLayerClick = useCallback((info: any) => {
    if (info.layer?.id === 'hotspots-layer' && info.object) {
      setSelectedHotspot(info.object.id);
      return true;
    }
    return false;
  }, [setSelectedHotspot]);

  const handleMouseDown = useCallback((info: any, e: any) => {
    if (drawMode === "navigate") return;
    if (e.leftButton) {
      startDrawing();
      const coords = info.coordinate;
      if (coords) {
        if (activeTool === "paint") paintAt(coords[1], coords[0]);
        else eraseAt(coords[1], coords[0]);
      }
    }
  }, [drawMode, startDrawing, activeTool, paintAt, eraseAt]);

  const handleDrag = useCallback((info: any, e: any) => {
    if (drawMode === "navigate" || !isDrawing) return;
    const coords = info.coordinate;
    if (coords) {
      if (activeTool === "paint") paintAt(coords[1], coords[0]);
      else eraseAt(coords[1], coords[0]);
    }
  }, [drawMode, isDrawing, activeTool, paintAt, eraseAt]);

  const handleMouseUp = useCallback(() => {
    if (isDrawing) stopDrawing();
  }, [isDrawing, stopDrawing]);

  // Hook into Market Explorer's flyTo trigger
  useEffect(() => {
    if (flyToTrigger.market) {
      setViewState({
        longitude: flyToTrigger.market.coordinates[0],
        latitude: flyToTrigger.market.coordinates[1],
        zoom: flyToTrigger.market.zoom_level,
        pitch: 0,
        bearing: 0,
        transitionDuration: 2500,
        transitionInterpolator: new FlyToInterpolator(),
      });
    }
  }, [flyToTrigger.timestamp]);

  return (
    <div className="absolute inset-0 w-full h-full bg-[#0d0d0d]">
      <DeckGL
        viewState={viewState}
        controller={{ dragPan: true, dragRotate: false, scrollZoom: true }}
        layers={deckLayers}
        onClick={(info) => {
          handleLayerClick(info);
        }}
        onViewStateChange={({ viewState: newViewState }: any) => {
          setViewState(newViewState);
        }}
        getCursor={() => "grab"}
      >
        <Map
          ref={mapRef}
          mapStyle={getMapStyle(timeOfDay)}
          mapboxAccessToken={MAPBOX_TOKEN}
          reuseMaps
        >
          {/* Crime data visualization layers (native Mapbox) */}
          <CrimeLayers />
          
          {/* Market Explorer highlighted layers */}
          <MarketLayers />
        </Map>
      </DeckGL>
    </div>
  );
}

