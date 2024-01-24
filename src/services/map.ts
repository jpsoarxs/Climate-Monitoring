import axios from "axios";

const getMapData = async () => {
  const response = await axios.get(
    "https://api.rainviewer.com/public/weather-maps.json"
  );

  if (!response.data) {
    return {};
  }

  return response.data;
};

export { getMapData };
