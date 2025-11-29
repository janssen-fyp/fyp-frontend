import API from "./api";

export const TrafficService = {
  getPrediction: async (roadId, hours) => {
    const response = await API.get("/traffic/predict", {
      params: { roadId, hours },
    });
    return response.data;
  },
};
