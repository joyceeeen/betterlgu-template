import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface LeafletMapProps {
  coords: [number, number];
  popupText: string;
}

export default function LeafletMap({ coords, popupText }: LeafletMapProps) {
  return (
    <MapContainer
      center={coords}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coords}>
        <Popup>{popupText}</Popup>
      </Marker>
    </MapContainer>
  );
}
