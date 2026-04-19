import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  ZoomControl,
  Marker,
  Popup,
  useMap,
  CircleMarker
} from "react-leaflet";

function RecenterMap({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center && Array.isArray(center) && center.length === 2) {
      map.setView(center);
    }
  }, [center, map]);

  return null;
}

export default function TrafficMap({
  routes = [],
  selectedRoute = [],
  alternativeRoutes = [],
  showCongestion,
  resolvedMode = "normal",
  startMarker = null,
  endMarker = null,
  center = null,
}) {
  const fallbackCenter = [53.3498, -6.2603]; // Dublin

  const getSelectedRouteColor = () => {
    // 默认：推荐路线显示蓝色
    if (!showCongestion) {
      return "#2563eb"; // blue
    }

    // 打开拥堵覆盖层后：按 AI 决策语义显示
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
    return "#6b7280"; // deeper grey
  };

  // 地图实际中心优先级：
  // 外部传入 current location center
  // -> 起点 marker
  // -> 主路线第一个点
  // -> 候选路线第一个点
  // -> 旧 routes 第一个点
  // -> Dublin fallback
  const mapCenter =
    center ||
    startMarker ||
    selectedRoute?.[0]?.coordinates?.[0] ||
    alternativeRoutes?.[0]?.coordinates?.[0] ||
    routes?.[0]?.coordinates?.[0] ||
    fallbackCenter;

  return (
    <div className="relative w-full h-full z-0">
      <MapContainer
        center={mapCenter}
        zoom={13}
        zoomControl={false}
        className="w-full h-full"
      >
        <RecenterMap center={mapCenter} />

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

        {/* 当前用户位置（蓝点） */}
        {center && (
          <CircleMarker
            center={center}
            radius={8}
            pathOptions={{
              color: "#2563eb",      // 边框蓝
              fillColor: "#3b82f6",  // 填充蓝
              fillOpacity: 1,
            }}
          >
            <Popup>Your Location</Popup>
          </CircleMarker>
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