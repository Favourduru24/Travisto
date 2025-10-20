'use client'

import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet'
import { useEffect } from 'react'
import { world_map } from '@/app/constants/world_map'

interface MapBoxProps {
  selectedCountry?: string // name of selected country (e.g. "Angola")
}

const MapBox = ({ selectedCountry }: MapBoxProps) => {
  // Find the selected country in your world_map data
  const selectedFeature = world_map.features.find(
    (f) =>
      f.properties?.name?.toLowerCase() === selectedCountry?.toLowerCase() ||
      f.properties?.admin?.toLowerCase() === selectedCountry?.toLowerCase()
  )


  // Get the center of that country's coordinates
  const center = selectedFeature
    ? getFeatureCenter(selectedFeature.geometry.coordinates)
    : [20, 0] // Default center of the world

  return (
    <MapContainer
      center={center as [number, number]}
      zoom={selectedFeature ? 5 : 2}
      scrollWheelZoom
      className="h-[500px] w-full rounded-xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Change map view when selectedCountry changes */}
      <ChangeView center={center as [number, number]} zoom={selectedFeature ? 5 : 2} />

      {/* Draw all countries */}
      <GeoJSON
        data={world_map}
        style={(feature) => ({
          color:
            feature?.properties?.name?.toLowerCase() === selectedCountry?.toLowerCase()
              ? '#EA382E' // red if selected
              : '#3388ff', // blue for others
          weight:
            feature?.properties?.name?.toLowerCase() === selectedCountry?.toLowerCase()
              ? 3
              : 1,
          fillOpacity:
            feature?.properties?.name?.toLowerCase() === selectedCountry?.toLowerCase()
              ? 0.5
              : 0.2,
        })}
      />
    </MapContainer>
  )
}

function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, zoom)
  }, [center, zoom, map])
  return null
}

// Helper to find country center
function getFeatureCenter(coords: any): [number, number] {
  try {
    const flat = coords.flat(Infinity)
    const lons = flat.filter((_: any, i: number) => i % 2 === 0)
    const lats = flat.filter((_: any, i: number) => i % 2 === 1)
    const lon = lons.reduce((a: number, b: number) => a + b, 0) / lons.length
    const lat = lats.reduce((a: number, b: number) => a + b, 0) / lats.length
    return [lat, lon]
  } catch {
    return [20, 0]
  }
}

export default MapBox
