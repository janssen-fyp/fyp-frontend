export const HistoryService = {
  async getHistory() {
    const response = await fetch("http://127.0.0.1:5001/api/history");

    if (!response.ok) {
      throw new Error(`History request failed with status ${response.status}`);
    }

    return await response.json();
  },
};