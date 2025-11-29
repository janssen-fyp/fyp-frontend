import RoutePlanner from "./RoutePlanner";
import TrafficPredictionChart from "./TrafficPredictionChart";

export default function Sidebar({
  onGetRoute,
  predictionData,
}) {
  return (
    <div className="w-[380px] h-full bg-gray-50 border-r border-gray-200 p-6 overflow-y-auto flex flex-col">
      {/* Route Planner */}
      <RoutePlanner onGetRoute={onGetRoute} />

      {/* Traffic Prediction Chart */}
      <TrafficPredictionChart data={predictionData} />
    </div>
  );
}
