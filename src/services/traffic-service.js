// import API from "./api";
// import axios from "axios";
// const API_BASE = "http://127.0.0.1:8001";

// export const TrafficService = {
//   async getPrediction(start, destination) {
//     const res = await axios.get(`${API_BASE}/predict`, {
//       params: { start, destination },
//     });
//     return res.data.prediction;
//   }
// };


import { fetchPrediction } from "./api";

export const TrafficService = {
  async getPrediction(start, destination) {
    console.log("Fetching prediction for:", start, destination);

    // 现在先固定用 site 6041，后面再根据 route / nearest site 动态决定
    const data = await fetchPrediction(6041, 6);

    return data.prediction;
  },
};