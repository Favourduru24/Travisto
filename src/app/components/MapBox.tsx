'use client';
import { useEffect, useRef } from 'react';
import { world_map } from '@/app/constants/world_map';

interface MapBoxProps {
  selectedCountry?: string;
}

export default function MapBox({ selectedCountry }: MapBoxProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;

    let map: any;

    const initMap = async () => {
      const L = await import('leaflet');
      await import('leaflet/dist/leaflet.css');

      // Check if map is already initialized
      if ((mapRef.current as any)._leaflet_id) {
        map = (mapRef.current as any)._leaflet_map_instance;
        if (map) {
          map.setView(getCenter(selectedCountry), selectedCountry ? 5 : 2);
          return;
        }
      }

      // Initialize new map
      map = L.map(mapRef.current).setView(getCenter(selectedCountry), selectedCountry ? 5 : 2);
      (mapRef.current as any)._leaflet_map_instance = map; // store instance

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      L.geoJSON(world_map as any, {
        style: (feature: any) => ({
          color:
            feature?.properties?.name?.toLowerCase() === selectedCountry?.toLowerCase()
              ? '#EA382E'
              : '#3388ff',
          weight:
            feature?.properties?.name?.toLowerCase() === selectedCountry?.toLowerCase()
              ? 3
              : 1,
          fillOpacity:
            feature?.properties?.name?.toLowerCase() === selectedCountry?.toLowerCase()
              ? 0.5
              : 0.2,
        }),
      }).addTo(map);
    };

    initMap();

    // Cleanup: remove map on unmount
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [selectedCountry]);

  return <div ref={mapRef} className="h-[500px] w-full rounded-xl"></div>;
}

// Helper to get selected country center
function getCenter(selectedCountry?: string): [number, number] {
  const selectedFeature = world_map.features.find(
    (f) =>
      f.properties?.name?.toLowerCase() === selectedCountry?.toLowerCase() ||
      f.properties?.admin?.toLowerCase() === selectedCountry?.toLowerCase()
  );

  if (!selectedFeature) return [20, 0];

  const coords = selectedFeature.geometry.coordinates;
  const flat = coords.flat(Infinity);
  const lons = flat.filter((_: any, i: number) => i % 2 === 0);
  const lats = flat.filter((_: any, i: number) => i % 2 === 1);
  const lon = lons.reduce((a: number, b: number) => a + b, 0) / lons.length;
  const lat = lats.reduce((a: number, b: number) => a + b, 0) / lats.length;
  return [lat, lon];
}
