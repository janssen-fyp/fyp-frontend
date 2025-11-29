import { MapContainer, TileLayer, Polyline, ZoomControl } from "react-leaflet";

export default function TrafficMap({ routes = [], showCongestion }) {
  const defaultCenter = [53.3498, -6.2603]; // Dublin

  const getColor = (level) => {
    if (!showCongestion) return "#4ade80";
    switch (level) {
      case "Low":
        return "#4ade80";
      case "Moderate":
        return "#f97316";
      case "High":
        return "#ef4444";
      default:
        return "#3b82f6";
    }
  };

  return (
    <div className="relative w-full h-full z-0">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        zoomControl={false}
        className="w-full h-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <ZoomControl position="bottomright" />

        {routes.map((segment, index) => (
          <Polyline
            key={index}
            positions={segment.coordinates}
            pathOptions={{
              color: getColor(segment.level),
              weight: 6,
              opacity: 0.9,
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}
