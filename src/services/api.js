// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5001/api",
// });

// export default API;

const API_BASE_URL = "http://127.0.0.1:5001";

export async function fetchPrediction(site = 6041, hours = 6) {
  const res = await fetch(`${API_BASE_URL}/api/predict?site=${site}&hours=${hours}`);

  if (!res.ok) {
    throw new Error(`Prediction request failed: ${res.status}`);
  }

  return res.json();
}