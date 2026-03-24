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
      const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&limit=1&entity=song`);
      const data = await response.json();

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
          
          // Play and update state
          await globalAudio.play();
          
          set({ 
            currentTrack: newTrack, 
            isPlaying: true,
            isLoading: false 
          });
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
