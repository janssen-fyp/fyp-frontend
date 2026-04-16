// import { useState } from "react";

// export default function RoutePlanner({ onGetRoute }) {
//   const [start, setStart] = useState("");
//   const [destination, setDestination] = useState("");

//   const handleSubmit = () => {
//     if (onGetRoute) {
//       onGetRoute(start, destination);
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
//       <h2 className="text-lg font-semibold text-gray-800">
//         Traffic Intelligence
//       </h2>
//       <p className="text-sm text-gray-500 mb-4">
//         Route optimization & prediction
//       </p>

//       <div className="mb-6">
//         <h3 className="font-medium text-gray-700 mb-2">Route Planner</h3>

//         {/* Start Location */}
//         <div className="flex flex-col mb-4">
//           <label className="text-sm text-gray-600 mb-1">Start Location</label>
//           <input
//             type="text"
//             placeholder="Enter starting point"
//             value={start}
//             onChange={(e) => setStart(e.target.value)}
//             className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg outline-none border border-gray-200 focus:border-blue-400"
//           />
//         </div>

//         {/* Destination */}
//         <div className="flex flex-col mb-6">
//           <label className="text-sm text-gray-600 mb-1">Destination</label>
//           <input
//             type="text"
//             placeholder="Enter destination"
//             value={destination}
//             onChange={(e) => setDestination(e.target.value)}
//             className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg outline-none border border-gray-200 focus:border-blue-400"
//           />
//         </div>

//         {/* Get Route button */}
//         <button
//           onClick={handleSubmit}
//           className="w-full py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
//         >
//           Get Route
//         </button>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";

export default function RoutePlanner({ onGetRoute }) {
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [congestionMode, setCongestionMode] = useState("normal");

  const handleSubmit = () => {
    if (!start.trim() || !destination.trim()) return;

    if (onGetRoute) {
      onGetRoute(start, destination, congestionMode);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800">
        Traffic Intelligence
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Route optimization & prediction
      </p>

      <div className="mb-6">
        <h3 className="font-medium text-gray-700 mb-2">Route Planner</h3>

        <div className="flex flex-col mb-4">
          <label className="text-sm text-gray-600 mb-1">Start Location</label>
          <input
            type="text"
            placeholder="Enter starting point"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg outline-none border border-gray-200 focus:border-blue-400"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label className="text-sm text-gray-600 mb-1">Destination</label>
          <input
            type="text"
            placeholder="Enter destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg outline-none border border-gray-200 focus:border-blue-400"
          />
        </div>

        <div className="flex flex-col mb-6">
          <label className="text-sm text-gray-600 mb-1">Congestion Mode</label>
          <select
            value={congestionMode}
            onChange={(e) => setCongestionMode(e.target.value)}
            className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg outline-none border border-gray-200 focus:border-blue-400"
          >
            <option value="normal">Normal</option>
            <option value="upper">Upper Congestion</option>
            <option value="lower">Lower Congestion</option>
            <option value="auto">Auto (Prediction Driven)</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Get Route
        </button>
      </div>
    </div>
  );
}