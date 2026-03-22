import { useCallback, useRef } from "react";
import Map, { Marker, MapRef } from "react-map-gl/mapbox";
import { AREAS, TAGS } from "@/data/areas";
import { useVibeStore } from "@/stores/vibeStore";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export function MapView() {
  const mapRef = useRef<MapRef>(null);
  const { selectArea, selectedAreaId, vibes, activeFilters } = useVibeStore();

  const handleMarkerClick = useCallback(
    (areaId: string, lat: number, lng: number) => {
      selectArea(areaId);
      mapRef.current?.flyTo({
        center: [lng, lat],
        zoom: 13,
        duration: 800,
      });
    },
    [selectArea]
  );

  // Filter vibes based on active tags
  const filteredVibes = vibes.filter((v) => {
    if (v.reported) return false;
    if (activeFilters.length === 0) return true;
    return v.tags.some((tag) => activeFilters.includes(tag));
  });

  // Count vibes per area for marker sizing
  const vibeCounts: Record<string, number> = {};
  filteredVibes.forEach((v) => {
    vibeCounts[v.areaId] = (vibeCounts[v.areaId] || 0) + 1;
  });

  // Filter areas to show only those with vibes matching the filter (or all if no filter)
  const visibleAreas = AREAS.filter((area) => {
    if (activeFilters.length === 0) return true;
    return vibeCounts[area.id] > 0;
  });

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: 77.2090,
          latitude: 28.6139,
          zoom: 10.5,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        maxBounds={[
          [76.6, 28.2],
          [77.8, 29.0],
        ]}
        minZoom={9}
        maxZoom={16}
        attributionControl={false}
      >
        {visibleAreas.map((area) => {
          const count = vibeCounts[area.id] || 0;
          const isSelected = selectedAreaId === area.id;
          const size = Math.min(52, 32 + count * 2);

          const areaVibes = filteredVibes.filter((v) => v.areaId === area.id);
          const areaTagCounts: Record<string, number> = {};
          areaVibes.forEach((v) => v.tags.forEach((t) => {
            if (activeFilters.length === 0 || activeFilters.includes(t)) {
              areaTagCounts[t] = (areaTagCounts[t] || 0) + 1;
            }
          }));

          let dominantTagEmoji = "";
          if (Object.keys(areaTagCounts).length > 0) {
            const sortedTags = Object.entries(areaTagCounts).sort(([, countA], [, countB]) => countB - countA);
            const dominantTagId = sortedTags[0][0];
            const dominantTag = TAGS.find((t) => t.id === dominantTagId);
            if (dominantTag) {
              dominantTagEmoji = dominantTag.emoji;
            }
          }

          return (
            <Marker
              key={area.id}
              longitude={area.lng}
              latitude={area.lat}
              anchor="center"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                handleMarkerClick(area.id, area.lat, area.lng);
              }}
            >
              <button
                className="group relative flex items-center justify-center transition-transform duration-200 active:scale-90"
                style={{
                  width: size,
                  height: size,
                  transform: isSelected ? "scale(1.2)" : "scale(1)",
                }}
                aria-label={`View vibes for ${area.name}`}
              >
                {/* Pulse ring */}
                {count > 3 && (
                  <span
                    className="absolute inset-0 rounded-full bg-primary/20 animate-ping"
                    style={{ animationDuration: "2s" }}
                  />
                )}
                {/* Marker body */}
                <span
                  className="relative z-10 flex items-center justify-center rounded-full border-2 font-bold shadow-md transition-all duration-200"
                  style={{
                    width: size,
                    height: size,
                    fontSize: size > 40 ? 13 : 11,
                    backgroundColor: isSelected ? "hsl(50, 100%, 50%)" : "hsl(0, 0%, 100%)",
                    borderColor: isSelected ? "hsl(0, 0%, 7%)" : "hsl(50, 100%, 50%)",
                    color: "hsl(0, 0%, 7%)",
                  }}
                >
                  {dominantTagEmoji || (count > 0 ? count : "•")}
                </span>
                {/* Label */}
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-accent px-1.5 py-0.5 text-[10px] font-semibold text-accent-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                  {area.name}
                </span>
              </button>
            </Marker>
          );
        })}
      </Map>
    </div>
  );
}
