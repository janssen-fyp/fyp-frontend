// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// export default function TrafficPredictionChart({ data }) {
//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mt-6">
//       <h3 className="font-semibold text-gray-800 mb-1">Traffic Prediction</h3>
//       <p className="text-sm text-gray-500 mb-4">Next 60 min forecast</p>

//       <div className="w-full h-56">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#eee" />

//             <XAxis
//               dataKey="minute"
//               label={{ value: "Minutes", position: "insideBottom", offset: -5 }}
//               tick={{ fill: "#6b7280", fontSize: 12 }}
//             />

//             <YAxis
//               label={{
//                 value: "Congestion %",
//                 angle: -90,
//                 position: "insideLeft",
//                 offset: 10,
//               }}
//               tick={{ fill: "#6b7280", fontSize: 12 }}
//             />

//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "#fff",
//                 borderRadius: "8px",
//                 border: "1px solid #ddd",
//               }}
//             />

//             <Line
//               type="monotone"
//               dataKey="value"
//               stroke="#3b82f6"
//               strokeWidth={3}
//               dot={{ r: 4 }}
//               activeDot={{ r: 6 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }


import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TrafficPredictionChart({ data = [] }) {
  const chartData = data.map((item) => ({
    time: new Date(item.ds).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    value: Math.round(item.yhat),
  }));

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mt-6">
      <h3 className="font-semibold text-gray-800 mb-1">Traffic Prediction</h3>
      <p className="text-sm text-gray-500 mb-4">Next 6 hour forecast</p>

      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />

            <XAxis
              dataKey="time"
              label={{ value: "Time", position: "insideBottom", offset: -5 }}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />

            <YAxis
              label={{
                value: "Vehicles",
                angle: -90,
                position: "insideLeft",
                offset: 10,
              }}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}