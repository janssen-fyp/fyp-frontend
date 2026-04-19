// import { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import TrafficMap from "../components/TrafficMap";
// import CongestionToggle from "../components/CongestionToggle";

// import { TrafficService } from "../services/traffic-service";

// export default function Home() {
//   // 地图路段数据（带颜色等级）
//   const [routes, setRoutes] = useState([]);

//   // 预测图表数据
//   const [predictionData, setPredictionData] = useState([]);

//   // 拥堵开关
//   const [showCongestion, setShowCongestion] = useState(true);

//   // 获取路线 & 预测请求（RoutePlanner 调用）
//   const handleGetRoute = async (start, destination) => {
//     console.log("Getting route from", start, "to", destination);

//     // 1. 向 backend 请求 AI 预测（未来你会根据 start/destination 来请求）
//     const prediction = await TrafficService.getPrediction(start, destination);

//     // // Prophet 返回格式 { ds, yhat }，这里转换为折线图格式
//     // const formattedPrediction = prediction.map((p, i) => ({
//     //   minute: i,
//     //   value: Math.round(p.yhat),
//     // }));

//     // setPredictionData(formattedPrediction);
//     setPredictionData(prediction);

//     // 2. 示例地图路线 —— 未来将由你的 route service 返回
//     const sampleRoutes = [
//       {
//         level: "Low",
//         coordinates: [
//           [53.35, -6.26],
//           [53.36, -6.27],
//           [53.37, -6.28],
//         ],
//       },
//       {
//         level: "Moderate",
//         coordinates: [
//           [53.34, -6.23],
//           [53.33, -6.22],
//         ],
//       },
//       {
//         level: "High",
//         coordinates: [
//           [53.32, -6.25],
//           [53.31, -6.24],
//         ],
//       },
//     ];

//     setRoutes(sampleRoutes);
//   };

//   return (
//     <div className="w-full h-screen flex overflow-hidden">

//       {/* 左侧 Sidebar */}
//       <Sidebar
//         onGetRoute={handleGetRoute}
//         predictionData={predictionData}
//       />

//       {/* 右侧地图区域 */}
//       <div className="flex-1 relative">
//         <TrafficMap routes={routes} showCongestion={showCongestion} />

//         {/* 拥堵层开关 */}
//         <CongestionToggle
//           enabled={showCongestion}
//           onToggle={() => setShowCongestion(!showCongestion)}
//         />
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import TrafficMap from "../components/TrafficMap";
import CongestionToggle from "../components/CongestionToggle";

import { TrafficService } from "../services/traffic-service";
import { RouteService } from "../services/route-service";

import {HistoryService} from "../services/history-service"

export default function Home() {
  const [routes, setRoutes] = useState([]);
  const [predictionData, setPredictionData] = useState([]);
  const [showCongestion, setShowCongestion] = useState(true);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [routeError, setRouteError] = useState("");
  const [resolvedMode, setResolvedMode] = useState(null);

  const [selectedRoute, setSelectedRoute] = useState([]);
  const [alternativeRoutes, setAlternativeRoutes] = useState([]);

  const [startMarker, setStartMarker] = useState(null);
  const [endMarker, setEndMarker] = useState(null);

  const [predictionSummary, setPredictionSummary] = useState(null);
  const [congestionScenario, setCongestionScenario] = useState(null);
  const [alternativesCount, setAlternativesCount] = useState(0);
  const [selectedRouteId, setSelectedRouteId] = useState(null);

  const [historyItems, setHistoryItems] = useState([]);

  const handleGetRoute = async (start, destination, congestionMode) => {
  console.log("Getting route from", start, "to", destination, "mode:", congestionMode);

  setRouteError("");
  setLoadingRoute(true);

  try {
    const prediction = await TrafficService.getPrediction(start, destination);
    setPredictionData(prediction);

    const routeResult = await RouteService.getRoute(
      start,
      destination,
      congestionMode
    );
    setResolvedMode(routeResult.effectiveCongestionMode);

    console.log("Route Result:", routeResult);
    console.log("Prediction inference:", routeResult.predictionInference);

    const historyResult = await HistoryService.getHistory();
    setHistoryItems(historyResult.items || []);

    setAlternativesCount(routeResult.alternativesCount ?? 0);
    setSelectedRouteId(routeResult.selectedRouteId ?? null);

    if (routeResult.predictionInference?.predictionSummary) {
      setPredictionSummary(routeResult.predictionInference.predictionSummary);
    } else {
      setPredictionSummary(null);
    }

    if (routeResult.predictionInference?.inference) {
      setCongestionScenario(routeResult.predictionInference.inference);
    } else {
      setCongestionScenario(null);
    }

    if (routeResult.startCoord) {
      setStartMarker([routeResult.startCoord.lat, routeResult.startCoord.lon]);
    } else {
      setStartMarker(null);
    }

    if (routeResult.endCoord) {
      setEndMarker([routeResult.endCoord.lat, routeResult.endCoord.lon]);
    } else {
      setEndMarker(null);
    }
    
    // const mappedRoutes = [
    //   {
    //     level: "Moderate",
    //     coordinates: routeResult.path,
    //   },
    // ];

    // setRoutes(mappedRoutes);

    const selected = [
      {
        id: routeResult.selectedRouteId ?? 0,
        coordinates: routeResult.path,
      },
    ];

    const alternatives = Array.isArray(routeResult.alternatives)
      ? routeResult.alternatives
          .filter((route) => route.id !== routeResult.selectedRouteId)
          .filter((route) => Array.isArray(route.path) && route.path.length > 0)
          .map((route) => ({
            id: route.id,
            coordinates: route.path,
          }))
      : [];

    setSelectedRoute(selected);
    setAlternativeRoutes(alternatives);

    // 旧的 routes 如果你还想兼容别处，可以一起保留
    setRoutes(selected);
    
  } catch (error) {
    console.error("Failed to get route:", error);
    setRouteError(error.message || "Failed to load route.");
    setRoutes([]);
    setSelectedRoute([]);
    setAlternativeRoutes([]);
    setStartMarker(null);
    setEndMarker(null);
    setPredictionSummary(null);
    setCongestionScenario(null);
    setAlternativesCount(0);
    setSelectedRouteId(null);
  } finally {
    setLoadingRoute(false);
  }
};

  return (
    <div className="w-full h-screen flex overflow-hidden">
      <Sidebar
        onGetRoute={handleGetRoute}
        predictionData={predictionData}
      />

      <div className="flex-1 relative">
       
        <TrafficMap
          routes={routes}
          selectedRoute={selectedRoute}
          alternativeRoutes={alternativeRoutes}
          showCongestion={showCongestion}
          resolvedMode={resolvedMode}
          startMarker={startMarker}
          endMarker={endMarker}
        />

        <CongestionToggle
          enabled={showCongestion}
          onToggle={() => setShowCongestion(!showCongestion)}
        />

        {loadingRoute && (
          <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow text-sm text-blue-600 z-[1000]">
            Loading route...
          </div>
        )}

        {routeError && (
          <div className="absolute top-16 left-4 bg-white px-4 py-2 rounded-lg shadow text-sm text-red-600 z-[1000]">
            {routeError}
          </div>
        )}

        {(resolvedMode || predictionSummary || congestionScenario) && (
          <div className="absolute top-28 left-4 bg-white px-4 py-3 rounded-lg shadow text-sm z-[1000] space-y-1 min-w-[260px]">
            <div>
              AI Selected:{" "}
              <strong
                className={
                  resolvedMode === "upper"
                    ? "text-red-500"
                    : resolvedMode === "lower"
                    ? "text-orange-500"
                    : "text-blue-600"
                }
              >
                {resolvedMode === "upper"
                  ? "Upper Congestion Route"
                  : resolvedMode === "lower"
                  ? "Lower Congestion Route"
                  : "Normal Route"}
              </strong>
            </div>

            {predictionSummary && (
              <div className="text-gray-700">
                Predicted Traffic:{" "}
                <strong>{Math.round(predictionSummary.averageYhat)}</strong>
              </div>
            )}

            {congestionScenario && (
              <>
                <div className="text-gray-700">
                  Threshold: <strong>{congestionScenario.threshold}</strong>
                </div>
                <div className="text-gray-700">
                  Congestion Scenario:{" "}
                  <strong className="capitalize">{congestionScenario.scenario}</strong>
                </div>
              </>
            )}

            <div className="text-gray-700">
              Alternatives Count: <strong>{alternativesCount}</strong>
            </div>

            <div className="text-gray-700">
              Selected Route:{" "}
              <strong>
                {selectedRouteId !== null ? `Route ${selectedRouteId}` : "N/A"}
              </strong>
            </div>
          </div>
        )}

        {historyItems.length > 0 && (
          <div className="absolute bottom-4 left-4 bg-white px-4 py-3 rounded-lg shadow text-sm z-[1000] max-w-[320px]">
            <div className="font-semibold mb-2">Recent Route Decisions</div>

            <div className="space-y-1 max-h-40 overflow-y-auto">
              {historyItems.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  className="text-xs text-gray-700 border-b pb-1"
                >
                  <div>
                    {item.start_location} → {item.destination}
                  </div>

                  <div>
                    {item.effective_mode} | traffic{" "}
                    {Math.round(item.predicted_traffic || 0)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}