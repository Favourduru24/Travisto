'use client'
import { MapContainer } from 'react-leaflet/MapContainer'
import {Marker} from 'react-leaflet/Marker'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Popup } from 'react-leaflet/Popup'
// import { useMap } from 'react-leaflet/hooks'

 const MapBox = () => {
     
    const position: [number, number] = [51.505, -0.09]

     return(
  <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
)
 }

 export default MapBox