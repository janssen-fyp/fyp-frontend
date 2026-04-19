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
  const [startCoords, setStartCoords] = useState(null);
  const [locationError, setLocationError] = useState("");

  const handleUseCurrentLocation = () => {
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };

        setStart("Current Location");
        setStartCoords(coords);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocationError("Unable to retrieve current location.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleStartChange = (e) => {
    setStart(e.target.value);
    setStartCoords(null); // 手动输入时取消 current location 坐标
  };

  const handleSubmit = () => {
    if (!start.trim() || !destination.trim()) return;

    if (onGetRoute) {
      onGetRoute(start, destination, congestionMode, startCoords);
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

        <div className="flex flex-col mb-2">
          <label className="text-sm text-gray-600 mb-1">Start Location</label>
          <input
            type="text"
            placeholder="Enter starting point"
            value={start}
            onChange={handleStartChange}
            className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg outline-none border border-gray-200 focus:border-blue-400"
          />
        </div>

        <button
          type="button"
          onClick={handleUseCurrentLocation}
          className="w-full mb-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          Use Current Location
        </button>

        {locationError && (
          <div className="text-xs text-red-500 mb-3">{locationError}</div>
        )}

        {startCoords && (
          <div className="text-xs text-green-600 mb-3">
            Using current location:
            {" "}
            {startCoords.lat.toFixed(5)}, {startCoords.lon.toFixed(5)}
          </div>
        )}

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