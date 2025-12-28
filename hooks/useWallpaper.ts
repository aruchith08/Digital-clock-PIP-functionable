import { useState, useEffect, useCallback } from 'react';

const WALLPAPERS = [
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=2560&q=80', // Lake & Mountains
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2560&q=80', // Sunlight Forest
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2560&q=80', // Misty Peaks
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2560&q=80', // Calm Beach
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2560&q=80', // Starry Night
  'https://images.unsplash.com/photo-1497436072909-60f360e1d4b0?auto=format&fit=crop&w=2560&q=80', // Foggy Hills
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2560&q=80', // Yosemite Valley
  'https://images.unsplash.com/photo-1501854140884-074bf86ee91c?auto=format&fit=crop&w=2560&q=80', // Dark Lake
];

export const useWallpaper = () => {
  // Start with a random wallpaper to keep it fresh
  const [index, setIndex] = useState(() => Math.floor(Math.random() * WALLPAPERS.length));

  const nextWallpaper = useCallback(() => {
    setIndex((prev) => (prev + 1) % WALLPAPERS.length);
  }, []);

  useEffect(() => {
    const INTERVAL = 30 * 60 * 1000; // 30 minutes
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % WALLPAPERS.length);
    }, INTERVAL);

    return () => clearInterval(timer);
  }, []);

  return { wallpaper: WALLPAPERS[index], nextWallpaper };
};