import { create } from 'zustand';

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';
export type WeatherCondition = 'clear' | 'clouds' | 'fog' | 'rain' | 'thunderstorm';

interface WeatherState {
  temperature: number | null;
  isDay: boolean;
  timeOfDay: TimeOfDay;
  condition: WeatherCondition;
  icon: string;
  isLoading: boolean;
  fetchWeather: () => Promise<void>;
}

// Convert WMO code to our simplified visual states
function parseWmoCode(code: number): WeatherCondition {
  // Fog
  if (code === 45 || code === 48) return 'fog';
  // Thunderstorm
  if (code >= 95 && code <= 99) return 'thunderstorm';
  // Rain / Drizzle / Showers
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'rain';
  // Snow (Just in case Delhi freezes over, map it to Rain/Fog visually)
  if (code >= 71 && code <= 77 || code === 85 || code === 86) return 'rain';
  // Clouds
  if (code === 1 || code === 2 || code === 3) return 'clouds';
  // Default Clear
  return 'clear';
}

function getWeatherIcon(condition: WeatherCondition, isDay: boolean): string {
  switch (condition) {
    case 'clear': return isDay ? '☀️' : '🌙';
    case 'clouds': return isDay ? '⛅' : '☁️';
    case 'fog': return '🌫️';
    case 'rain': return '🌧️';
    case 'thunderstorm': return '⚡';
    default: return '☀️';
  }
}

function getTimeOfDay(hour: number): TimeOfDay {
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 20) return 'evening';
  return 'night';
}

export const useWeatherStore = create<WeatherState>((set) => ({
  temperature: null,
  isDay: true,
  timeOfDay: 'afternoon',
  condition: 'clear',
  icon: '☀️',
  isLoading: true,

  fetchWeather: async () => {
    try {
      // Fetch Delhi coordinates (28.6139, 77.2090)
      const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&current=temperature_2m,is_day,weather_code&timezone=Asia%2FKolkata');
      const data = await res.json();

      if (data.current) {
        const temp = Math.round(data.current.temperature_2m);
        const isDayVal = data.current.is_day === 1;
        const code = data.current.weather_code;
        
        // Extract hour from current time in IST
        const dateStr = data.current.time; // Format: "2026-03-24T14:00"
        const hour = parseInt(dateStr.split('T')[1].split(':')[0], 10);
        
        const timeOfDay = getTimeOfDay(hour);
        const condition = parseWmoCode(code);

        set({
          temperature: temp,
          isDay: isDayVal,
          timeOfDay: timeOfDay,
          condition: condition,
          icon: getWeatherIcon(condition, isDayVal),
          isLoading: false
        });
      }
    } catch (err) {
      console.error("Failed to fetch weather from Open-Meteo", err);
      set({ isLoading: false });
    }
  }
}));
