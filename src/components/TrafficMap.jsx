import { MapContainer, TileLayer, Polyline, ZoomControl } from "react-leaflet";

export default function TrafficMap({ routes = [], showCongestion }) {
  // 默认地图中心点（可改为都柏林）
  const defaultCenter = [53.3498, -6.2603]; // Dublin

  // 根据拥堵等级返回不同颜色
  const getColor = (level) => {
    if (!showCongestion) return "#4ade80"; // 绿色（默认）
    switch (level) {
      case "Low":
        return "#4ade80"; // green-400
      case "Moderate":
        return "#f97316"; // orange-500
      case "High":
        return "#ef4444"; // red-500
      default:
        return "#3b82f6"; // blue (备用)
    }
  };

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        {/* OpenStreetMap 图层 */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 地图 zoom 按钮 */}
        <ZoomControl position="bottomright" />

        {/* 渲染传入的多段路线 */}
        {routes.map((segment, index) => (
          <Polyline
            key={index}
            positions={segment.coordinates}
            pathOptions={{
              color: getColor(segment.level), // 根据拥堵等级渲染颜色
              weight: 6,
              opacity: 0.9,
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}
