import { MapContainer, TileLayer, Polyline, ZoomControl, Marker, Popup } from "react-leaflet";

export default function TrafficMap({
  routes = [],
  selectedRoute = [],
  alternativeRoutes = [],
  showCongestion,
  resolvedMode = "normal",
  startMarker = null,
  endMarker = null,
}) {
  const defaultCenter = [53.3498, -6.2603]; // Dublin

  const getSelectedRouteColor = () => {
    if (!showCongestion) {
      return "#2563eb"; // blue
    }

    switch (resolvedMode) {
      case "upper":
        return "#ef4444"; // red
      case "lower":
        return "#f97316"; // orange
      default:
        return "#2563eb"; // blue
    }
  };

  const getAlternativeRouteColor = () => {
    return "#6b7280";
  };

  const center =
    selectedRoute?.[0]?.coordinates?.[0] ||
    alternativeRoutes?.[0]?.coordinates?.[0] ||
    routes?.[0]?.coordinates?.[0] ||
    startMarker ||
    defaultCenter;

  return (
    <div className="relative w-full h-full z-0">
      <MapContainer
        center={center}
        zoom={13}
        zoomControl={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ZoomControl position="bottomright" />

        {/* 灰色候选路线 */}
        {alternativeRoutes.map((route, index) => (
          <Polyline
            key={`alt-${route.id ?? index}`}
            positions={route.coordinates}
            pathOptions={{
              color: getAlternativeRouteColor(),
              weight: 6,
              opacity: 0.85,
              lineCap: "round",
              lineJoin: "round",
            }}
          />
        ))}

        {/* 主选中路线 */}
        {selectedRoute.map((route, index) => (
          <Polyline
            key={`selected-${route.id ?? index}`}
            positions={route.coordinates}
            pathOptions={{
              color: getSelectedRouteColor(),
              weight: 8,
              opacity: 0.95,
              lineCap: "round",
              lineJoin: "round",
            }}
          />
        ))}

        {/* 起点 marker */}
        {startMarker && (
          <Marker position={startMarker}>
            <Popup>Start</Popup>
          </Marker>
        )}

        {/* 终点 marker */}
        {endMarker && (
          <Marker position={endMarker}>
            <Popup>Destination</Popup>
          </Marker>
        )}

        {/* 兼容旧 routes */}
        {selectedRoute.length === 0 &&
          alternativeRoutes.length === 0 &&
          routes.map((segment, index) => (
            <Polyline
              key={`legacy-${index}`}
              positions={segment.coordinates}
              pathOptions={{
                color: "#2563eb",
                weight: 8,
                opacity: 0.95,
                lineCap: "round",
                lineJoin: "round",
              }}
            />
          ))}
      </MapContainer>
    </div>
  );
}