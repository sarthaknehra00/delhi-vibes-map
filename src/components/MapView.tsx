import { useCallback, useRef } from "react";
import Map, { Marker, MapRef } from "react-map-gl/mapbox";
import { AREAS } from "@/data/areas";
import { useVibeStore } from "@/stores/vibeStore";

const MAPBOX_TOKEN = "MAPBOX_TOKEN_REMOVED";

export function MapView() {
  const mapRef = useRef<MapRef>(null);
  const { selectArea, selectedAreaId, vibes } = useVibeStore();

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

  // Count vibes per area for marker sizing
  const vibeCounts: Record<string, number> = {};
  vibes.forEach((v) => {
    if (!v.reported) vibeCounts[v.areaId] = (vibeCounts[v.areaId] || 0) + 1;
  });

  return (
    <div className="h-full w-full">
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
        {AREAS.map((area) => {
          const count = vibeCounts[area.id] || 0;
          const isSelected = selectedAreaId === area.id;
          const size = Math.min(52, 32 + count * 2);

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
                  {count > 0 ? count : "•"}
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
