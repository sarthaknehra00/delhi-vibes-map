import { create } from 'zustand';

interface Track {
  name: string;
  artist: string;
  albumArt: string;
  previewUrl: string;
}

interface AudioState {
  currentTrack: Track | null;
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  playVibe: (query: string) => Promise<void>;
  togglePlay: () => void;
  setVolume: (vol: number) => void;
}

// Global audio element to prevent multiple instances
let globalAudio: HTMLAudioElement | null = null;

export const useAudioStore = create<AudioState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  isLoading: false,
  volume: 0.5,

  playVibe: async (query: string) => {
    // Stop current track if any
    if (globalAudio) {
      globalAudio.pause();
      globalAudio.src = '';
    }

    set({ isLoading: true, isPlaying: false, currentTrack: null });

    try {
      // iTunes Search API is completely free and requires no API key.
      // Append country=IN to find regional Indian songs.
      let response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&limit=1&entity=song&country=IN`);
      let data = await response.json();

      // Fallback 1: Try searching just the artist or last part of the query to preserve the vibe
      if (!data.results || data.results.length === 0) {
        const words = query.split(' ');
        if (words.length >= 2) {
          const fallbackQuery = words.slice(-2).join(' ');
          response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(fallbackQuery)}&limit=1&entity=song&country=IN`);
          data = await response.json();
        }
      }

      // Fallback 2: Default Delhi Vibe if everything else fails
      if (!data.results || data.results.length === 0) {
        response = await fetch(`https://itunes.apple.com/search?term=Delhi+6+Arziyan&limit=1&entity=song&country=IN`);
        data = await response.json();
      }

      if (data.results && data.results.length > 0) {
        const track = data.results[0];
        
        if (track.previewUrl) {
          const newTrack: Track = {
            name: track.trackName,
            artist: track.artistName,
            albumArt: track.artworkUrl100, // 100x100 standard size
            previewUrl: track.previewUrl
          };

          // Initialize global audio if needed
          if (!globalAudio) {
            globalAudio = new Audio();
            globalAudio.onended = () => set({ isPlaying: false });
          }

          globalAudio.src = newTrack.previewUrl;
          globalAudio.volume = get().volume;
          
          // Update state immediately so player mounts (Optimistic UI)
          set({ 
            currentTrack: newTrack, 
            isPlaying: true,
            isLoading: false 
          });

          // Play audio and gracefully handle AbortError from rapid clicks
          const playPromise = globalAudio.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              if (error.name !== 'AbortError') {
                console.error("Audio playback error:", error);
              }
              // Adjust state if playback actually failed (e.g. browser autoplay restrictions)
              if (globalAudio?.paused) {
                set({ isPlaying: false });
              }
            });
          }
        } else {
          set({ isLoading: false });
        }
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error("Failed to fetch vibe track from iTunes", error);
      set({ isLoading: false });
    }
  },

  togglePlay: () => {
    const { isPlaying } = get();
    if (globalAudio && get().currentTrack) {
      if (isPlaying) {
        globalAudio.pause();
      } else {
        globalAudio.play();
      }
      set({ isPlaying: !isPlaying });
    }
  },

  setVolume: (vol: number) => {
    if (globalAudio) {
      globalAudio.volume = vol;
    }
    set({ volume: vol });
  }
}));
