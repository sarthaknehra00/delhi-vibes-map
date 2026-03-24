"use client";

import { useRef, useCallback, useMemo } from 'react';
import Map, { MapRef } from 'react-map-gl/mapbox';
import { DeckGL } from '@deck.gl/react';
import { GeoJsonLayer, TextLayer } from '@deck.gl/layers';
import { usePaintStore } from '@/stores/paintStore';
import { useFoodStore } from '@/stores/foodStore';
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

  // Convert cells map to GeoJSON for Deck.gl
  const geoJsonData = useMemo(() => {
    // We add 'version' as a dependency to force re-render when cells map is updated
    const features: any[] = [];
    cells.forEach((cell, key) => {
      const dominant = getDominantCategory(cell.votes);
      if (!dominant) return;
      const totalVotes = Object.values(cell.votes).reduce((a, b) => a + b, 0);
      features.push({
        type: 'Feature',
        properties: {
          category: dominant,
          opacity: Math.min(0.8, 0.3 + totalVotes * 0.1),
        },
        geometry: {
          type: 'Polygon',
          coordinates: [cellToPolygon(cell.row, cell.col)],
        },
      });
    });
    return { type: 'FeatureCollection', features };
  }, [cells, version]);

  const deckLayers = [
    new GeoJsonLayer({
      id: 'paint-cells-layer',
      data: geoJsonData as any,
      pickable: true,
      stroked: true,
      filled: true,
      lineWidthMinPixels: 1,
      getFillColor: (d: any) => {
        const cat = CATEGORY_MAP[d.properties.category as keyof typeof CATEGORY_MAP];
        const hex = cat ? cat.color.replace('#', '') : '888888';
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return [r, g, b, Math.floor(d.properties.opacity * 255)];
      },
      getLineColor: [255, 255, 255, 40],
      getLineWidth: 1,
    }),
    new TextLayer({
      id: 'hotspots-layer',
      data: HOTSPOTS,
      pickable: true,
      getPosition: (d: any) => [d.lng, d.lat],
      getText: (d: any) => `${d.emoji} ${d.name}`,
      getSize: 22,
      getAngle: 0,
      getTextAnchor: 'middle',
      getAlignmentBaseline: 'center',
      getColor: [255, 255, 255],
      getBackgroundColor: [0, 0, 0, 160],
      background: true,
      backgroundPadding: [4, 4],
      fontWeight: 'bold',
      fontFamily: 'Inter, sans-serif',
      outlineWidth: 2,
      outlineColor: [0, 0, 0],
    })
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
        controller={drawMode === "navigate" ? { dragPan: true, dragRotate: false } : { dragPan: false, dragRotate: false, scrollZoom: true }}
        layers={deckLayers}
        onDragStart={handleMouseDown}
        onDrag={handleDrag}
        onDragEnd={handleMouseUp}
        onClick={(info, event) => {
          if (handleLayerClick(info)) return;
          handleMouseDown(info, event);
        }}
        getCursor={() => drawMode === "navigate" ? "grab" : "crosshair"}
      >
        <Map
          ref={mapRef}
          mapStyle="mapbox://styles/mapbox/dark-v11"
          mapboxAccessToken={MAPBOX_TOKEN}
          reuseMaps
        />
      </DeckGL>
    </div>
  );
}
