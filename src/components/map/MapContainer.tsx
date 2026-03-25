"use client";

import { useRef, useCallback, useMemo } from 'react';
import Map, { MapRef, Marker } from 'react-map-gl/mapbox';
import { DeckGL } from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import { usePaintStore } from '@/stores/paintStore';
import { useFoodStore } from '@/stores/foodStore';
import { useWeatherStore, TimeOfDay } from '@/stores/weatherStore';
import { CATEGORY_MAP } from '@/data/categories';
import { HOTSPOTS } from '@/data/hotspots';
import { cellToPolygon, getDominantCategory } from '@/lib/gridUtils';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const INITIAL_VIEW_STATE = {
  longitude: 77.2090, // Delhi Center
  latitude: 28.6139,
  zoom: 11,
  pitch: 0,
  bearing: 0
};

export function MapContainer() {
  const mapRef = useRef<MapRef>(null);
  const { cells, version, drawMode, activeTool, isDrawing, startDrawing, stopDrawing, paintAt, eraseAt } = usePaintStore();
  const { setSelectedHotspot } = useFoodStore();
  const { timeOfDay } = useWeatherStore();

  const getMapStyle = (time: TimeOfDay) => {
    switch(time) {
      case 'morning':
      case 'afternoon': return 'mapbox://styles/mapbox/light-v11';
      case 'evening': return 'mapbox://styles/mapbox/navigation-night-v1';
      case 'night': return 'mapbox://styles/mapbox/dark-v11';
      default: return 'mapbox://styles/mapbox/dark-v11';
    }
  };

  // Convert cells map to GeoJSON for Deck.gl
  const geoJsonData = useMemo(() => {
    // Dynamic opacity based on sun cycle - boost saturation linearly in daylight to beat the white basemap
    const baseOpacity = (timeOfDay === 'morning' || timeOfDay === 'afternoon') ? 0.45 : 0.22;
    
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

  return (
    <div className="absolute inset-0 w-full h-full bg-[#0d0d0d]">
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={{ dragPan: true, dragRotate: false, scrollZoom: true }}
        layers={deckLayers}
        onClick={(info) => {
          handleLayerClick(info);
        }}
        getCursor={() => "grab"}
      >
        <Map
          ref={mapRef}
          mapStyle={getMapStyle(timeOfDay)}
          mapboxAccessToken={MAPBOX_TOKEN}
          reuseMaps
        >
          {HOTSPOTS.map((hotspot) => (
            <Marker key={hotspot.id} longitude={hotspot.lng} latitude={hotspot.lat} anchor="center" style={{zIndex: 50}}>
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedHotspot(hotspot.id);
                }}
                className="group relative flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-110 hover:z-50"
              >
                {/* Advanced DOM Element Label */}
                <span className="backdrop-blur-md bg-black/75 text-white px-3 py-1.5 rounded-full text-xs font-semibold border border-white/20 shadow-xl whitespace-nowrap">
                  {hotspot.name}
                </span>
                
                {/* Decorative Map Pin Base */}
                <div className="w-1.5 h-1.5 bg-white rounded-full mt-1 shadow-md opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all"></div>
              </div>
            </Marker>
          ))}
        </Map>
      </DeckGL>
    </div>
  );
}
