# 🌍 Delhi NCR Vibe & Food Map

A highly interactive, deeply-researched socio-economic discovery platform for Delhi NCR. This Next.js 15 application leverages geospatial mapping, real-time dynamic environmental states, and curated music APIs to deliver a stunning Gen-Z "vibe map" experience.

## ✨ Core Features

1. **Autonomous Socio-Economic Map (Voronoi Engine)**
   - Replaced manual drawing tools with a data-driven Nearest-Neighbor (Voronoi) mathematical algorithm rendering over **47,000 grid cells** in real-time.
   - Maps micro-neighborhoods across Delhi & NCR into accurate sociological categories (Rich/Elite, Middle Class, Working Class, Corporate, Students, Tourist, and Sketchy).
   - Glassmorphic translucent map overlay without blocky polygon meshes.

2. **Real-Time Dynamic Ambience**
   - Integrates the free, key-less **Open-Meteo API** to track real-time temperatures.
   - The map dynamically shifts its Mapbox basemap styles based on the time of day (`light-v11` for morning, `navigation-night-v1` for evening, `dark-v11` for night).
   - Pure CSS visual overlays trigger automatically (Rain, Fog, Lightning) based on live precipitation and cloud cover data.

3. **Curated Locality Audio Discovery**
   - Employs the free **iTunes Search API** to fetch region-specific, hand-picked tracks for specific neighborhoods.
   - Example: Clicking *Hauz Khas* plays Lana Del Rey, while clicking *Shahdara* plays Seedhe Maut.
   - Features a floating glassmorphic Audio Player with robust network/timeout error handling.

4. **Curated Food Discovery Engine**
   - 300+ heavily researched Delhi NCR restaurants and street food hotspots mapped to 80+ localities.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS v4 + Shadcn UI
- **State Management**: Zustand (Multi-store architecture handling paint, audio, food, and weather states)
- **Geospatial Engine**: Deck.gl & react-map-gl (Mapbox)
- **Authentication/DB**: Supabase (Provisioned and integrated)

---

## 🔑 Environment Variables Setup

To run this application, you must provide the following keys in a `.env.local` file at the root of the project:

```env
# [REQUIRED] Mapbox Token for the Basemap tiles
NEXT_PUBLIC_MAPBOX_TOKEN="pk.ey..."

# [OPTIONAL/PENDING] Supabase Keys for Auth and remote database syncing
# Note: The app currently successfully falls back to LocalStorage caching if Supabase isn't linked yet.
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

*Note: The **iTunes** and **Open-Meteo** APIs are completely free and do not require API keys!*

---

## 🚀 How to Run Locally

1. **Install Dependencies**
   Ensure you have Node.js 18+ installed.
   ```bash
   npm install
   ```

2. **Configure Environment**
   Create the `.env.local` file and insert your Mapbox token (crucial for map rendering).

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The application will boot up at `http://localhost:3000`.

---

## 📂 Architecture & Key Files for Engineers

If you are a new engineer taking over the codebase, focus on these files:

- `src/stores/paintStore.ts`: Houses the **Voronoi Calculation Engine** that bootstraps the 100% map coverage.
- `src/data/seedZones.ts`: The absolute source of truth for the demographic center points and influence radii (e.g. Karkardooma=Rich, Vaishali=Middle Class). Edit this to change the socio-economic spread.
- `src/data/hotspots.ts`: Data dictionary mapping neighborhood names to audio vibe search queries.
- `src/components/map/MapContainer.tsx`: The primary `DeckGL` injection file handling the map styles, dynamic opacity (fixed at `0.22`), and the borderless geojson rendering.
- `src/stores/audioStore.ts`: The global audio singleton handling iTunes network requests gracefully.

---

## 📝 Roadmap

- **Database Migration**: Move `localStorage` user preference logic to the initialized Supabase postgres instance.
- **Social Features**: Build out the user review and comment systems attached to the `FoodPanel`.
