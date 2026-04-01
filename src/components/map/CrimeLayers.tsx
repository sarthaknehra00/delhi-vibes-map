"use client";

import { useMemo } from "react";
import { Source, Layer } from "react-map-gl/mapbox";
import type { LayerProps } from "react-map-gl/mapbox";
import { useCrimeStore } from "@/stores/crimeStore";
import { generateHeatmapGeoJSON } from "@/data/crimeData";

/**
 * CrimeLayers — Renders NCRB crime density data as a Mapbox heatmap layer.
 * Must be placed as a child of react-map-gl <Map>.
 */
export function CrimeLayers() {
  const { viewMode, selectedYear, activeCategories } = useCrimeStore();

  // Generate density-weighted GeoJSON from real NCRB data
  const geoJSON = useMemo(() => {
    if (viewMode === "off") {
      return { type: "FeatureCollection" as const, features: [] };
    }
    return generateHeatmapGeoJSON(
      selectedYear,
      activeCategories.size > 0 ? activeCategories : null,
    );
  }, [viewMode, selectedYear, activeCategories]);

  if (viewMode === "off") return null;

  // ── Heatmap layer config ──────────────────────────────────
  const heatmapLayer: LayerProps = {
    id: "crime-heatmap",
    type: "heatmap",
    source: "crime-data",
    maxzoom: 16,
    paint: {
      // Weight each point by its real crime count
      "heatmap-weight": [
        "interpolate",
        ["linear"],
        ["get", "weight"],
        0, 0,
        100, 0.4,
        500, 0.7,
        2000, 1,
      ],
      // Increase intensity as zoom level increases
      "heatmap-intensity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        9, 0.4,
        12, 1.0,
        15, 1.5,
      ],
      // Radius grows with zoom
      "heatmap-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        9, 18,
        12, 28,
        15, 40,
      ],
      // Color ramp: transparent → blue → purple → amber → red → deep red
      "heatmap-color": [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        0,    "rgba(0, 0, 0, 0)",
        0.1,  "rgba(59, 130, 246, 0.2)",    // soft blue
        0.25, "rgba(139, 92, 246, 0.35)",   // purple
        0.4,  "rgba(245, 158, 11, 0.5)",    // amber
        0.6,  "rgba(239, 68, 68, 0.65)",    // red
        0.8,  "rgba(220, 38, 38, 0.8)",     // deep red
        1,    "rgba(185, 28, 28, 0.9)",      // darkest red
      ],
      // Slight fade at very high zoom to reveal underlying map
      "heatmap-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        13, 0.85,
        17, 0.4,
      ],
    },
  };

  return (
    <Source
      id="crime-data"
      type="geojson"
      data={geoJSON as any}
    >
      <Layer {...heatmapLayer} />
    </Source>
  );
}
