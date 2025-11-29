import { useState } from "react";
import Sidebar from "../components/Sidebar";
import TrafficMap from "../components/TrafficMap";
import CongestionToggle from "../components/CongestionToggle";

import { TrafficService } from "../services/traffic-service";

export default function Home() {
  // 地图路段数据（带颜色等级）
  const [routes, setRoutes] = useState([]);

  // 预测图表数据
  const [predictionData, setPredictionData] = useState([]);

  // 拥堵开关
  const [showCongestion, setShowCongestion] = useState(true);

  // 获取路线 & 预测请求（RoutePlanner 调用）
  const handleGetRoute = async (start, destination) => {
    console.log("Getting route from", start, "to", destination);

    // 1. 向 backend 请求 AI 预测（未来你会根据 start/destination 来请求）
    const prediction = await TrafficService.getPrediction("M50-01", 2);

    // Prophet 返回格式 { ds, yhat }，这里转换为折线图格式
    const formattedPrediction = prediction.map((p, i) => ({
      minute: i,
      value: Math.round(p.yhat),
    }));

    setPredictionData(formattedPrediction);

    // 2. 示例地图路线 —— 未来将由你的 route service 返回
    const sampleRoutes = [
      {
        level: "Low",
        coordinates: [
          [53.35, -6.26],
          [53.36, -6.27],
          [53.37, -6.28],
        ],
      },
      {
        level: "Moderate",
        coordinates: [
          [53.34, -6.23],
          [53.33, -6.22],
        ],
      },
      {
        level: "High",
        coordinates: [
          [53.32, -6.25],
          [53.31, -6.24],
        ],
      },
    ];

    setRoutes(sampleRoutes);
  };

  return (
    <div className="w-full h-screen flex overflow-hidden">

      {/* 左侧 Sidebar */}
      <Sidebar
        onGetRoute={handleGetRoute}
        predictionData={predictionData}
      />

      {/* 右侧地图区域 */}
      <div className="flex-1 relative">
        <TrafficMap routes={routes} showCongestion={showCongestion} />

        {/* 拥堵层开关 */}
        <CongestionToggle
          enabled={showCongestion}
          onToggle={() => setShowCongestion(!showCongestion)}
        />
      </div>
    </div>
  );
}
