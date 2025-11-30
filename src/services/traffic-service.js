import API from "./api";
import axios from "axios";
const API_BASE = "http://127.0.0.1:8001";

export const TrafficService = {
  async getPrediction(start, destination) {
    const res = await axios.get(`${API_BASE}/predict`, {
      params: { start, destination },
    });
    return res.data.prediction;
  }
};
