export const RouteService = {
  async getRoute(start, destination, congestionMode = "normal") {
    const response = await fetch("http://127.0.0.1:5001/api/route", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start,
        destination,
        congestionMode,   // 🔥 只加这一行
      }),
    });

    if (!response.ok) {
      throw new Error(`Route request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.path || !Array.isArray(data.path)) {
      throw new Error("Invalid route response: missing path array.");
    }

    return data;
  },
};